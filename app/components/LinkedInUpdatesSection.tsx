"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type LinkedInPostMedia = {
  type: "image";
  url: string;
  remoteUrl?: string;
  alt?: string;
};

type LinkedInQuotedPost = {
  title: string;
  excerpt: string;
  url: string;
};

type LinkedInTextSegment = {
  text: string;
  href?: string;
};

type LinkedInPost = {
  id: string;
  title: string;
  excerpt: string;
  text?: string;
  textSegments?: LinkedInTextSegment[];
  url: string;
  publishedAt: string;
  media?: LinkedInPostMedia[];
  reshared?: boolean;
  quoted?: LinkedInQuotedPost;
};

type LinkedInFeed = {
  fetchedAt: string;
  profileUrl: string;
  posts: LinkedInPost[];
};

const FEED_URL = "/social/linkedin-posts.json";
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/company/devsh-graphics-programming/";
const MAX_POSTS = 3;
const LINKEDIN_FEED_ENABLED = true;
const SPOTLIGHT_HEADLINE_WORDS = 15;
const TIMELINE_TITLE_WORDS = 8;
const BODY_FADE_CHARACTERS = 260;
const WEAK_TEXT_BOUNDARY_WORDS = new Set(["a", "an", "and", "for", "in", "of", "on", "or", "the", "to", "with"]);

function isPost(value: unknown): value is LinkedInPost {
  if (!value || typeof value !== "object") {
    return false;
  }

  const post = value as Record<string, unknown>;

  return (
    typeof post.id === "string" &&
    typeof post.title === "string" &&
    typeof post.excerpt === "string" &&
    typeof post.url === "string" &&
    typeof post.publishedAt === "string"
  );
}

function normalizeFeed(value: unknown): LinkedInFeed | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const feed = value as Record<string, unknown>;
  const posts = Array.isArray(feed.posts) ? feed.posts.filter(isPost) : [];

  if (posts.length === 0 || typeof feed.profileUrl !== "string") {
    return null;
  }

  return {
    fetchedAt: typeof feed.fetchedAt === "string" ? feed.fetchedAt : "",
    profileUrl: feed.profileUrl,
    posts,
  };
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function LinkedInIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.26 8h4.48v15H.26V8Zm7.08 0h4.29v2.05h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V23h-4.47v-7.46c0-1.78-.03-4.07-2.48-4.07-2.48 0-2.86 1.94-2.86 3.94V23H7.34V8Z" />
    </svg>
  );
}

function ExternalArrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 5h8v8" />
      <path d="M15 5 6 14" />
    </svg>
  );
}

function PostIdentity({ compact = false, date }: { compact?: boolean; date?: string }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Image
        src="/brand/devsh-logo-glow.png"
        alt=""
        width={compact ? 32 : 40}
        height={compact ? 32 : 40}
        className={compact ? "h-8 w-8 flex-none object-contain" : "h-10 w-10 flex-none object-contain"}
      />
      <div className="min-w-0">
        <p className="!m-0 text-[0.94rem] font-semibold leading-tight text-white">
          DevSH Graphics Programming
        </p>
        {date ? <p className="!m-0 mt-1 text-xs leading-tight text-neutral-500">{date}</p> : null}
      </div>
    </div>
  );
}

function getPostSegments(post: LinkedInPost) {
  const fallbackText = (post.text || post.excerpt || post.title).trim();

  return post.textSegments && post.textSegments.length > 0 ? post.textSegments : [{ text: fallbackText }];
}

function getPostText(post: LinkedInPost) {
  return getPostSegments(post)
    .map((segment) => segment.text)
    .join("")
    .trim();
}

function clipWords(text: string, maxWords: number) {
  const words = text.trim().split(/\s+/).filter(Boolean);

  if (words.length <= maxWords) {
    return text.trim();
  }

  const clipped = words.slice(0, maxWords);
  const cleanWord = (word: string) => word.replace(/[^\p{L}\p{N}#++-]/gu, "").toLowerCase();

  if (words[maxWords] && WEAK_TEXT_BOUNDARY_WORDS.has(cleanWord(words[maxWords]))) {
    clipped.push(...words.slice(maxWords, Math.min(words.length, maxWords + 2)));
  }

  while (clipped.length > Math.max(4, maxWords - 3)) {
    const last = cleanWord(clipped[clipped.length - 1]);

    if (!WEAK_TEXT_BOUNDARY_WORDS.has(last)) {
      break;
    }

    clipped.pop();
  }

  return clipped.join(" ");
}

function getFirstTextBlock(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .find(Boolean);
}

function getPostHeadline(post: LinkedInPost) {
  const text = getPostText(post);
  const fallback = post.title.replace(/\s*\.\.\.$/, "").trim();
  const source = getFirstTextBlock(text) || fallback;

  return clipWords(source, SPOTLIGHT_HEADLINE_WORDS);
}

function getTimelineTitle(post: LinkedInPost) {
  return clipWords(getPostHeadline(post), TIMELINE_TITLE_WORDS);
}

function getPostBodySegments(post: LinkedInPost) {
  const segments = getPostSegments(post);
  const joined = segments.map((segment) => segment.text).join("");
  const headline = getPostHeadline(post);
  const headlineStart = joined.indexOf(headline);

  if (headlineStart < 0) {
    return segments;
  }

  let skip = headlineStart + headline.length;

  while (skip < joined.length && /\s/.test(joined[skip])) {
    skip += 1;
  }

  while (skip < joined.length && /[,.;:]/.test(joined[skip])) {
    skip += 1;
  }

  while (skip < joined.length && /\s/.test(joined[skip])) {
    skip += 1;
  }

  const bodySegments: LinkedInTextSegment[] = [];
  let remainingSkip = skip;

  for (const segment of segments) {
    if (remainingSkip >= segment.text.length) {
      remainingSkip -= segment.text.length;
      continue;
    }

    if (remainingSkip > 0) {
      bodySegments.push({ ...segment, text: segment.text.slice(remainingSkip) });
      remainingSkip = 0;
      continue;
    }

    bodySegments.push(segment);
  }

  if (bodySegments.length === 0) {
    return segments;
  }

  bodySegments[0] = {
    ...bodySegments[0],
    text: bodySegments[0].text.replace(/^([a-z])/, (match) => match.toUpperCase()),
  };

  return bodySegments;
}

function preparePreviewSegments(segments: LinkedInTextSegment[]) {
  const text = segments.map((segment) => segment.text).join("");

  return {
    segments,
    faded: text.trim().length > BODY_FADE_CHARACTERS,
  };
}

function shouldFadePostBody(post: LinkedInPost) {
  return preparePreviewSegments(getPostBodySegments(post)).faded;
}

function PostPreviewText({ post }: { post: LinkedInPost }) {
  const preview = preparePreviewSegments(getPostBodySegments(post));

  return (
    <div>
      <p
        className="linkedin-preview-copy !m-0 whitespace-pre-wrap text-[0.98rem] font-medium leading-relaxed text-neutral-200 sm:text-[1.04rem]"
      >
        {preview.segments.map((segment, index) =>
          segment.href ? (
            <a
              key={`${segment.href}-${index}`}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-accent-bright)] underline decoration-[var(--brand-accent)]/35 underline-offset-[0.18em] transition hover:text-white hover:decoration-white/70"
            >
              {segment.text}
            </a>
          ) : (
            <span key={index}>{segment.text}</span>
          )
        )}
      </p>
    </div>
  );
}

function QuotedPost({ post }: { post: LinkedInPost }) {
  if (!post.reshared && !post.quoted) {
    return null;
  }

  const quoted = post.quoted ?? {
    title: "Referenced LinkedIn post",
    excerpt: "Open the original update to view the full referenced post, media, and discussion.",
    url: post.url,
  };

  return (
    <a
      href={quoted.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 block overflow-hidden rounded-md border border-white/10 bg-black/42 text-inherit outline-none transition hover:border-[var(--brand-accent)]/45 hover:bg-white/[0.035] focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label={`Open referenced LinkedIn post: ${quoted.title}`}
    >
      <div className="border-b border-white/10 bg-white/[0.025] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <PostIdentity compact />
          <LinkedInIcon className="h-5 w-5 flex-none text-[#0a66c2]" />
        </div>
      </div>
      <div className="p-4">
        <p className="!m-0 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-accent-bright)]/78">
          Referenced post
        </p>
        <p className="!mb-0 !mt-2 line-clamp-2 text-[1.02rem] font-semibold leading-snug text-white">
          {quoted.title}
        </p>
        {quoted.excerpt ? (
          <p className="!mb-0 !mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-400">
            {quoted.excerpt}
          </p>
        ) : null}
      </div>
    </a>
  );
}

function SpotlightMedia({ post }: { post: LinkedInPost }) {
  const media = post.media?.filter((item) => item.type === "image" && item.url) ?? [];

  if (media.length === 0) {
    return null;
  }

  if (media.length === 1) {
    const image = media[0];

    return (
      <div className="linkedin-spotlight-media">
        <Image src={image.url} alt={image.alt || ""} fill sizes="(min-width: 1024px) 34vw, 90vw" />
      </div>
    );
  }

  const [primary, secondary, ...rest] = media;
  const hero = secondary ?? primary;
  const inset = secondary ? primary : undefined;

  return (
    <div className="linkedin-spotlight-media">
      <Image src={hero.url} alt={hero.alt || ""} fill sizes="(min-width: 1024px) 34vw, 90vw" />
      {inset ? (
        <div className="linkedin-spotlight-media-inset">
          <Image src={inset.url} alt={inset.alt || ""} fill sizes="10rem" />
          {rest.length > 0 ? (
            <div className="absolute inset-0 grid place-items-center bg-black/62 text-sm font-semibold text-white">
              +{rest.length}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function UpdateSpotlight({ post }: { post: LinkedInPost }) {
  const publishedAt = formatDate(post.publishedAt);
  const headline = getPostHeadline(post);
  const hasMedia = post.media?.some((item) => item.type === "image" && item.url) ?? false;
  const fadeCopy = shouldFadePostBody(post);

  return (
    <article
      key={post.id}
      className={`linkedin-spotlight linkedin-spotlight-enter ${hasMedia ? "" : "linkedin-spotlight--text-only"} group relative`}
    >
      <div className={`linkedin-spotlight-layout ${hasMedia ? "" : "linkedin-spotlight-layout--text-only"}`}>
        <div className="linkedin-spotlight-copy-col flex min-h-0 min-w-0 flex-col">
          <div className={`linkedin-spotlight-scrollcopy ${fadeCopy ? "linkedin-spotlight-scrollcopy--faded" : ""} min-w-0`}>
            <div className="mb-7 flex items-center gap-4">
              <PostIdentity date={publishedAt} />
            </div>

            <h3 className="linkedin-spotlight-title !m-0 max-w-3xl font-semibold leading-tight text-white">
              {headline}
            </h3>

            <div className="mt-6 max-w-3xl">
              <PostPreviewText post={post} />
            </div>
          </div>

          <div className="linkedin-spotlight-actions">
            <QuotedPost post={post} />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-action-link linkedin-action-link--post group/link"
              >
                <span className="linkedin-action-link-icon">
                  <LinkedInIcon className="h-3.5 w-3.5" />
                </span>
                <span>Read on LinkedIn</span>
                <ExternalArrow className="linkedin-action-arrow h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {hasMedia ? <SpotlightMedia post={post} /> : null}
      </div>
    </article>
  );
}

function TimelineButton({
  post,
  active,
  onSelect,
}: {
  post: LinkedInPost;
  active: boolean;
  onSelect: () => void;
}) {
  const publishedAt = formatDate(post.publishedAt);

  return (
    <button
      type="button"
      onClick={onSelect}
      className="linkedin-timeline-button group/timeline text-left"
      aria-current={active ? "true" : undefined}
    >
      <span className="linkedin-timeline-marker" aria-hidden="true" />
      <span className="block min-w-0">
        <span className="linkedin-timeline-meta">
          <span>{publishedAt}</span>
        </span>
        <span className="linkedin-timeline-title">
          {getTimelineTitle(post)}
        </span>
      </span>
    </button>
  );
}

function LoadingSpotlight() {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)]" aria-hidden="true">
      <div className="surface-panel min-h-[30rem] p-5 sm:p-7 lg:p-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div className="h-11 w-56 rounded bg-white/10" />
          <div className="h-8 w-12 rounded bg-white/10" />
        </div>
        <div className="h-9 w-10/12 rounded bg-white/10" />
        <div className="mt-3 h-9 w-8/12 rounded bg-white/10" />
        <div className="mt-7 flex max-w-3xl flex-col gap-3">
          <div className="h-4 w-full rounded bg-white/[0.07]" />
          <div className="h-4 w-11/12 rounded bg-white/[0.07]" />
          <div className="h-4 w-9/12 rounded bg-white/[0.07]" />
          <div className="h-4 w-7/12 rounded bg-white/[0.07]" />
        </div>
      </div>
      <div className="grid gap-3">
        {Array.from({ length: MAX_POSTS }, (_, index) => (
          <div key={index} className="h-32 rounded-lg border border-white/10 bg-white/[0.025]" />
        ))}
      </div>
    </div>
  );
}

export default function LinkedInUpdatesSection() {
  const [feed, setFeed] = useState<LinkedInFeed | null | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!LINKEDIN_FEED_ENABLED) {
      return;
    }

    let active = true;

    async function loadFeed() {
      try {
        const response = await fetch(FEED_URL, { cache: "no-store" });

        if (!response.ok) {
          if (active) {
            setFeed(null);
          }

          return;
        }

        const data = normalizeFeed(await response.json());

        if (active) {
          setFeed(data);
        }
      } catch {
        if (active) {
          setFeed(null);
        }
      }
    }

    void loadFeed();

    return () => {
      active = false;
    };
  }, []);

  const posts = useMemo(() => feed?.posts.slice(0, MAX_POSTS) ?? [], [feed]);
  const isLoading = feed === undefined;
  const activePost = posts[Math.min(activeIndex, Math.max(posts.length - 1, 0))];

  useEffect(() => {
    if (activeIndex >= posts.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, posts.length]);

  if (LINKEDIN_FEED_ENABLED && (feed === null || (!isLoading && posts.length === 0))) {
    return null;
  }

  return (
    <section id="updates" className="scroll-mt-24 border-t border-white/10 bg-black py-12 sm:py-14 lg:py-16">
      <div className="site-container">
        <div className="mb-12 grid gap-5 sm:mb-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end lg:mb-16">
          <div className="max-w-3xl">
            <p className="section-kicker">Company updates</p>
            <h2 className="!mb-0 !mt-2 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Latest from DevSH
            </h2>
          </div>

          <a
            href={feed?.profileUrl ?? LINKEDIN_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-action-link linkedin-action-link--header group/link"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
            <ExternalArrow className="linkedin-action-arrow h-4 w-4" />
          </a>
        </div>

        {LINKEDIN_FEED_ENABLED ? (
          isLoading ? (
            <LoadingSpotlight />
          ) : activePost ? (
            <div className="linkedin-updates-stage">
              <UpdateSpotlight key={activePost.id} post={activePost} />
              <div className="linkedin-timeline" aria-label="Recent DevSH updates">
                {posts.map((post, index) => (
                  <TimelineButton
                    key={post.id}
                    post={post}
                    active={index === activeIndex}
                    onSelect={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            </div>
          ) : null
        ) : (
          <div className="border-y border-white/10 py-12 text-center sm:py-14">
            <p className="!m-0 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Coming soon
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
