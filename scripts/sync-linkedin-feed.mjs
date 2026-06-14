import { mkdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultOutputPath = path.join(rootDir, "public", "social", "linkedin-posts.json");
const apiBaseUrl = process.env.LINKEDIN_API_BASE_URL ?? "https://api.linkedin.com/rest";
const linkedInVersion = process.env.LINKEDIN_VERSION ?? "202605";
const profileUrl = process.env.LINKEDIN_PROFILE_URL ?? "https://www.linkedin.com/company/devsh-graphics-programming/";
const outputPath = path.resolve(rootDir, process.env.LINKEDIN_FEED_OUTPUT ?? defaultOutputPath);
const postLimit = readIntegerEnv("LINKEDIN_POST_LIMIT", 3, { min: 1, max: 12 });
const fetchCount = readIntegerEnv("LINKEDIN_FETCH_COUNT", Math.max(postLimit * 3, 10), {
  min: postLimit,
  max: 100,
});
const sortBy = process.env.LINKEDIN_SORT_BY ?? "CREATED";

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
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
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

function mapPost(post) {
  const text = normalizeText(post.commentary) || normalizeText(fallbackTitle(post));
  const title = truncateText(firstSentence(text), 88);
  const excerptSource = text.length > title.length ? text.slice(title.length) : text;
  const excerpt = truncateText(excerptSource, 180);

  return {
    id: post.id,
    publishedAt: postTimestamp(post),
    title,
    excerpt,
    url: postUrl(post),
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
    .map(mapPost)
    .slice(0, postLimit);
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
  const organizationUrn = await findOrganizationUrn();
  const posts = await fetchPosts(organizationUrn);

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
