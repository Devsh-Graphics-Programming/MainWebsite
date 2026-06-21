import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutputPath = path.join(rootDir, "public", "social", "linkedin-posts.json");
const apiBaseUrl = process.env.LINKEDIN_API_BASE_URL ?? "https://api.linkedin.com/rest";
const linkedInVersion = process.env.LINKEDIN_VERSION ?? "202605";
const profileUrl = process.env.LINKEDIN_PROFILE_URL ?? "https://www.linkedin.com/company/devsh-graphics-programming/";
const publicFallbackUrl = process.env.LINKEDIN_PUBLIC_FALLBACK_URL ?? profileUrl;
const publicFallbackEnabled = process.env.LINKEDIN_PUBLIC_FALLBACK_ENABLED !== "false";
const outputPath = resolveConfiguredPath(process.env.LINKEDIN_FEED_OUTPUT, defaultOutputPath);
const mediaOutputDir = resolveConfiguredPath(
  process.env.LINKEDIN_MEDIA_OUTPUT_DIR,
  path.join(rootDir, "public", "social", "linkedin-media")
);
const mediaUrlPrefix = process.env.LINKEDIN_MEDIA_URL_PREFIX ?? "/social/linkedin-media";
const postLimit = readIntegerEnv("LINKEDIN_POST_LIMIT", 3, { min: 1, max: 12 });
const fetchCount = readIntegerEnv("LINKEDIN_FETCH_COUNT", Math.max(postLimit * 8, 24), {
  min: postLimit,
  max: 100,
});
const sortBy = process.env.LINKEDIN_SORT_BY ?? "CREATED";

function resolveConfiguredPath(value, fallback) {
  if (!value) {
    return fallback;
  }

  return path.isAbsolute(value) ? value : path.resolve(rootDir, value);
}

function readIntegerEnv(name, fallback, { min, max }) {
  const raw = process.env[name];

  if (!raw) {
    return fallback;
  }

  const parsed = Number.parseInt(raw, 10);

  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new Error(`${name} must be an integer between ${min} and ${max}.`);
  }

  return parsed;
}

function requiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required.`);
  }

  return value;
}

function baseHeaders() {
  return {
    Authorization: `Bearer ${requiredEnv("LINKEDIN_ACCESS_TOKEN")}`,
    "Linkedin-Version": linkedInVersion,
    "X-Restli-Protocol-Version": "2.0.0",
  };
}

async function linkedInGet(pathname, params = {}, extraHeaders = {}) {
  const url = new URL(`${apiBaseUrl}${pathname}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      ...baseHeaders(),
      ...extraHeaders,
    },
  });
  const body = await response.text();

  if (!response.ok) {
    const details = body ? ` ${body.slice(0, 800)}` : "";
    throw new Error(`LinkedIn API request failed with HTTP ${response.status}.${details}`);
  }

  return body ? JSON.parse(body) : {};
}

async function findOrganizationUrn() {
  const organizationUrn = process.env.LINKEDIN_ORGANIZATION_URN?.trim();

  if (organizationUrn) {
    return organizationUrn;
  }

  const organizationId = process.env.LINKEDIN_ORGANIZATION_ID?.trim();

  if (organizationId) {
    return `urn:li:organization:${organizationId}`;
  }

  const vanityName = process.env.LINKEDIN_ORGANIZATION_VANITY?.trim();

  if (!vanityName) {
    throw new Error("Set LINKEDIN_ORGANIZATION_URN, LINKEDIN_ORGANIZATION_ID, or LINKEDIN_ORGANIZATION_VANITY.");
  }

  const response = await linkedInGet("/organizations", {
    q: "vanityName",
    vanityName,
  });
  const organization = response.elements?.[0];

  if (!organization?.id) {
    throw new Error(`LinkedIn organization was not found for vanityName=${vanityName}.`);
  }

  return `urn:li:organization:${organization.id}`;
}

function normalizeText(value) {
  return String(value ?? "")
    .replace(/@\[([^\]]+)\]\(urn:li:[^)]+\)/g, "$1")
    .replace(/\{hashtag\|\\?#\|([^}]+)\}/g, "#$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\\([()])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function unescapeLinkedInText(value) {
  return String(value ?? "").replace(/\\([()_#])/g, "$1");
}

function personSearchUrl(value) {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(value)}`;
}

function mentionUrl(urn, text) {
  const organizationMatch = urn.match(/^urn:li:organization:(\d+)$/);

  if (organizationMatch) {
    return `https://www.linkedin.com/company/${organizationMatch[1]}/`;
  }

  if (/^urn:li:person:[^)]+$/.test(urn) && text) {
    return personSearchUrl(text);
  }

  return undefined;
}

function hashtagUrl(value) {
  return `https://www.linkedin.com/feed/hashtag/?keywords=${encodeURIComponent(value)}`;
}

function pushTextSegment(segments, text) {
  if (text) {
    segments.push({ text: unescapeLinkedInText(text) });
  }
}

function richTextSegments(value) {
  const raw = String(value ?? "");
  const segments = [];
  const tokenPattern = /@\[([^\]]+)\]\((urn:li:[^)]+)\)|\{hashtag\|\\?#\|([^}]+)\}|https?:\/\/[^\s]+/g;
  let cursor = 0;

  for (const match of raw.matchAll(tokenPattern)) {
    pushTextSegment(segments, raw.slice(cursor, match.index));

    if (match[1] && match[2]) {
      const text = unescapeLinkedInText(match[1]);
      const urn = unescapeLinkedInText(match[2]);
      const href = mentionUrl(urn, text);
      segments.push(href ? { text, href } : { text });
    } else if (match[3]) {
      const text = `#${unescapeLinkedInText(match[3])}`;
      segments.push({ text, href: hashtagUrl(match[3]) });
    } else {
      const token = match[0];
      const href = token.replace(/[),.]+$/, "");
      const suffix = token.slice(href.length);
      segments.push({ text: href, href });
      pushTextSegment(segments, suffix);
    }

    cursor = match.index + match[0].length;
  }

  pushTextSegment(segments, raw.slice(cursor));

  return segments.filter((segment) => segment.text.length > 0);
}

function decodeHtmlEntities(value) {
  return String(value ?? "")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function segmentsToText(segments) {
  return segments.map((segment) => segment.text).join("").trim();
}

function extractLinks(value) {
  return Array.from(String(value ?? "").matchAll(/https?:\/\/\S+/g), (match) =>
    match[0].replace(/[),.]+$/, "")
  );
}

function truncateText(value, maxLength) {
  const text = normalizeText(value);

  if (text.length <= maxLength) {
    return text;
  }

  const shortened = text.slice(0, maxLength - 3).replace(/\s+\S*$/, "").trim();
  return `${shortened || text.slice(0, maxLength - 3)}...`;
}

function firstSentence(value) {
  const text = normalizeText(value);
  const match = text.match(/^(.{35,}?[.!?])\s/);
  return match?.[1] ?? text;
}

function fallbackTitle(post) {
  return (
    post.content?.article?.title ??
    post.content?.media?.title ??
    post.content?.multiImage?.title ??
    "LinkedIn update"
  );
}

function splitSummary(value, maxTitleLength) {
  const text = normalizeText(value);

  if (text.length <= maxTitleLength) {
    return { title: text, excerpt: "" };
  }

  const preferredCut = Math.max(
    text.lastIndexOf(". ", maxTitleLength),
    text.lastIndexOf("! ", maxTitleLength),
    text.lastIndexOf("? ", maxTitleLength)
  );
  const wordCut = text.lastIndexOf(" ", maxTitleLength - 3);
  const cut = preferredCut >= 35 ? preferredCut + 1 : wordCut >= 35 ? wordCut : maxTitleLength - 3;
  const titleBase = text.slice(0, cut).trim();
  let excerpt = text.slice(cut).replace(/^[\s.,!?;:-]+/, "").trim();
  const lastTitleWord = titleBase.match(/(\S+)$/)?.[1]?.replace(/[.,!?;:-]+$/, "").toLowerCase();
  const firstExcerptWord = excerpt.match(/^(\S+)/)?.[1]?.replace(/[.,!?;:-]+$/, "").toLowerCase();

  if (lastTitleWord && firstExcerptWord === lastTitleWord) {
    excerpt = excerpt.replace(/^\S+\s*/, "").trim();
  }

  return {
    title: `${titleBase}...`,
    excerpt,
  };
}

function postTimestamp(post) {
  const value = post.publishedAt ?? post.createdAt ?? post.lastModifiedAt;
  const timestamp = Number(value);

  if (!Number.isFinite(timestamp)) {
    return new Date().toISOString();
  }

  return new Date(timestamp).toISOString();
}

function postUrl(post) {
  return `https://www.linkedin.com/feed/update/${post.id}/`;
}

function imageIds(post) {
  const images = post.content?.multiImage?.images;

  if (Array.isArray(images)) {
    return images.map((image) => image?.id).filter((id) => typeof id === "string");
  }

  const singleImage = post.content?.media?.id ?? post.content?.image?.id;

  return typeof singleImage === "string" ? [singleImage] : [];
}

function safeFilePart(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
}

function imageExtension(contentType) {
  if (contentType?.includes("png")) {
    return ".png";
  }

  if (contentType?.includes("webp")) {
    return ".webp";
  }

  return ".jpg";
}

async function downloadImage(downloadUrl, postId, index) {
  const response = await fetch(downloadUrl);

  if (!response.ok) {
    throw new Error(`LinkedIn image download failed with HTTP ${response.status}.`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const filename = `${safeFilePart(postId)}-${index + 1}${imageExtension(contentType)}`;
  const outputPath = path.join(mediaOutputDir, filename);
  const temporaryPath = `${outputPath}.tmp`;

  await mkdir(mediaOutputDir, { recursive: true });
  await writeFile(temporaryPath, Buffer.from(await response.arrayBuffer()));
  await rename(temporaryPath, outputPath);

  return `${mediaUrlPrefix.replace(/\/$/, "")}/${filename}`;
}

async function mapImage(id, postId, index) {
  try {
    const image = await linkedInGet(`/images/${encodeURIComponent(id)}`);

    if (image.status !== "AVAILABLE" || typeof image.downloadUrl !== "string") {
      return null;
    }

    let url = image.downloadUrl;

    try {
      url = await downloadImage(image.downloadUrl, postId, index);
    } catch {
      url = image.downloadUrl;
    }

    return {
      type: "image",
      url,
      remoteUrl: image.downloadUrl,
      alt: typeof image.altText === "string" ? image.altText : "",
    };
  } catch {
    return null;
  }
}

async function mapPublicImage(downloadUrl, postId, index) {
  try {
    const url = await downloadImage(downloadUrl, postId, index);

    return {
      type: "image",
      url,
      remoteUrl: downloadUrl,
      alt: "",
    };
  } catch {
    return {
      type: "image",
      url: downloadUrl,
      remoteUrl: downloadUrl,
      alt: "",
    };
  }
}

async function mapPost(post) {
  const rawCommentary = String(post.commentary ?? "");
  const textSegments = richTextSegments(rawCommentary || fallbackTitle(post));
  const richText = segmentsToText(textSegments);
  const text = normalizeText(post.commentary) || normalizeText(fallbackTitle(post));
  const summary = splitSummary(firstSentence(text), 88);
  const title = summary.title || "LinkedIn update";
  const excerpt = truncateText(summary.excerpt, 180);
  const media = (await Promise.all(imageIds(post).map((id, index) => mapImage(id, post.id, index)))).filter(Boolean);
  const parent = post.reshareContext?.parent;
  const links = extractLinks(rawCommentary);

  return {
    id: post.id,
    publishedAt: postTimestamp(post),
    title,
    excerpt,
    text: richText || text,
    textSegments,
    url: postUrl(post),
    media,
    reshared: Boolean(parent),
    quoted:
      typeof parent === "string"
        ? {
            title: "Referenced LinkedIn post",
            excerpt: "Open the original update to view the full referenced post, media, and discussion.",
            url: links[0] ?? `https://www.linkedin.com/feed/update/${parent}/`,
          }
        : undefined,
  };
}

function activityIdFromUrl(value) {
  return String(value ?? "").match(/activity-(\d+)/)?.[1];
}

function publicPostUrl(post, activityId) {
  return (
    post.url ??
    post.mainEntityOfPage ??
    (activityId ? `https://www.linkedin.com/feed/update/urn:li:activity:${activityId}/` : profileUrl)
  );
}

function publicPostText(post) {
  return String(post.text ?? post.headline ?? post.name ?? "").trim();
}

function parsePublicPosts(html) {
  const match = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);

  if (!match) {
    return [];
  }

  const data = JSON.parse(match[1].trim());
  const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [];

  return graph
    .filter((post) => post?.["@type"] === "DiscussionForumPosting")
    .map((post) => {
      const url = publicPostUrl(post);
      const activityId = activityIdFromUrl(url);

      return {
        post,
        activityId,
        url,
      };
    })
    .filter(({ post, activityId }) => activityId && publicPostText(post))
    .sort((left, right) => new Date(right.post.datePublished).getTime() - new Date(left.post.datePublished).getTime());
}

function publicPostSection(html, activityId, nextActivityId) {
  const scriptEnd = html.search(/<\/script>/i);
  const start = html.indexOf(`activity-${activityId}`, scriptEnd >= 0 ? scriptEnd : 0);

  if (start < 0) {
    return "";
  }

  const next = nextActivityId ? html.indexOf(`activity-${nextActivityId}`, start + 1) : -1;

  return decodeHtmlEntities(html.slice(start, next > start ? next : start + 60000));
}

function publicPostMediaUrls(section) {
  const urls = Array.from(
    section.matchAll(/https:\/\/media\.licdn\.com\/dms\/image\/[^"'<\s]+/g),
    (match) => match[0]
  );
  const feedImages = urls.filter((url) =>
    /\/(feedshare|feedshare-document-cover-images)_/.test(url)
  );

  return Array.from(new Set(feedImages)).slice(0, 4);
}

async function mapPublicPost(entry, nextEntry, html) {
  const textSegments = richTextSegments(entry.post.text);
  const text = segmentsToText(textSegments);
  const summary = splitSummary(firstSentence(text), 88);
  const mediaUrls = publicPostMediaUrls(publicPostSection(html, entry.activityId, nextEntry?.activityId));
  const media = (
    await Promise.all(mediaUrls.map((url, index) => mapPublicImage(url, `urn:li:activity:${entry.activityId}`, index)))
  ).filter(Boolean);

  return {
    id: `urn:li:activity:${entry.activityId}`,
    publishedAt: postTimestamp({ publishedAt: Date.parse(entry.post.datePublished) }),
    title: summary.title || "LinkedIn update",
    excerpt: truncateText(summary.excerpt, 180),
    text,
    textSegments,
    url: entry.url,
    media,
  };
}

function isVisiblePublishedPost(post, organizationUrn) {
  return (
    typeof post.id === "string" &&
    post.author === organizationUrn &&
    post.lifecycleState === "PUBLISHED" &&
    post.visibility === "PUBLIC" &&
    post.distribution?.feedDistribution === "MAIN_FEED"
  );
}

function isNativeOrganizationPost(post) {
  return !post.reshareContext?.parent;
}

async function fetchPosts(organizationUrn) {
  const response = await linkedInGet(
    "/posts",
    {
      q: "author",
      author: organizationUrn,
      count: fetchCount,
      sortBy,
    },
    {
      "X-RestLi-Method": "FINDER",
    }
  );

  return (response.elements ?? [])
    .filter((post) => isVisiblePublishedPost(post, organizationUrn))
    .filter(isNativeOrganizationPost)
    .slice(0, postLimit)
    .reduce(async (promise, post) => {
      const posts = await promise;
      posts.push(await mapPost(post));
      return posts;
    }, Promise.resolve([]));
}

async function fetchPublicPosts() {
  const response = await fetch(publicFallbackUrl);

  if (!response.ok) {
    throw new Error(`LinkedIn public page request failed with HTTP ${response.status}.`);
  }

  const html = await response.text();
  const entries = parsePublicPosts(html).slice(0, postLimit);

  return entries.reduce(async (promise, entry, index) => {
    const posts = await promise;
    posts.push(await mapPublicPost(entry, entries[index + 1], html));
    return posts;
  }, Promise.resolve([]));
}

async function writeFeed(posts) {
  const feed = {
    fetchedAt: new Date().toISOString(),
    profileUrl,
    posts,
  };
  const temporaryPath = `${outputPath}.tmp`;

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(temporaryPath, `${JSON.stringify(feed, null, 2)}\n`, "utf8");
  await rename(temporaryPath, outputPath);
}

async function main() {
  let posts = [];

  if (process.env.LINKEDIN_ACCESS_TOKEN?.trim()) {
    try {
      const organizationUrn = await findOrganizationUrn();
      posts = await fetchPosts(organizationUrn);
    } catch (error) {
      if (!publicFallbackEnabled) {
        throw error;
      }

      console.warn(`LinkedIn API sync failed; using public page fallback. ${error.message}`);
      posts = await fetchPublicPosts();
    }
  } else {
    posts = await fetchPublicPosts();
  }

  if (posts.length === 0) {
    throw new Error("LinkedIn returned no visible published posts for this organization.");
  }

  await writeFeed(posts);

  console.log(`Generated ${path.relative(rootDir, outputPath)} with ${posts.length} LinkedIn posts.`);
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
