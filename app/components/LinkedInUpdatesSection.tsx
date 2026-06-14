"use client";

import { useEffect, useMemo, useState } from "react";

type LinkedInPost = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  publishedAt: string;
};

type LinkedInFeed = {
  fetchedAt: string;
  profileUrl: string;
  posts: LinkedInPost[];
};

const FEED_URL = "/social/linkedin-posts.json";
const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/company/devsh-graphics-programming/";
const MAX_POSTS = 3;
const LINKEDIN_FEED_ENABLED = false;

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

function ExternalArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M7 5h8v8" />
      <path d="M15 5 6 14" />
    </svg>
  );
}

function UpdateCard({ post }: { post: LinkedInPost }) {
  const publishedAt = formatDate(post.publishedAt);

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open LinkedIn post: ${post.title}`}
      className="surface-panel brand-hover group relative flex min-h-[18rem] flex-col overflow-hidden p-5 outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:p-6"
    >
      <div>
        <div className="mb-5 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-widest">
          <span className="text-neutral-500">{publishedAt}</span>
          <span className="inline-flex items-center gap-1.5 rounded border border-[var(--brand-accent)]/25 bg-[var(--brand-accent)]/10 px-2 py-1 text-[var(--brand-accent-bright)]">
            <LinkedInIcon />
            LinkedIn
            <ExternalArrow />
          </span>
        </div>

        <h3 className="!m-0 text-xl font-semibold leading-snug text-white text-balance sm:text-2xl">
          {post.title}
        </h3>
        <p className="!mb-0 !mt-4 line-clamp-4 text-base leading-relaxed text-neutral-300">
          {post.excerpt}
        </p>
      </div>
    </a>
  );
}

function LoadingCard() {
  return (
    <div className="surface-panel min-h-[18rem] p-5 sm:p-6" aria-hidden="true">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="h-3 w-20 rounded bg-[var(--brand-accent)]/20" />
      </div>
      <div className="h-7 w-10/12 rounded bg-white/10" />
      <div className="mt-3 h-7 w-8/12 rounded bg-white/10" />
      <div className="mt-5 flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-white/[0.07]" />
        <div className="h-4 w-11/12 rounded bg-white/[0.07]" />
        <div className="h-4 w-7/12 rounded bg-white/[0.07]" />
      </div>
    </div>
  );
}

export default function LinkedInUpdatesSection() {
  const [feed, setFeed] = useState<LinkedInFeed | null | undefined>(undefined);

  useEffect(() => {
    if (!LINKEDIN_FEED_ENABLED) {
      return;
    }

    let active = true;

    async function loadFeed() {
      try {
        const response = await fetch(FEED_URL, { cache: "no-store" });

        if (!response.ok) {
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
            className="inline-flex w-fit items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-[var(--brand-accent-bright)] outline-none transition hover:border-[var(--brand-accent)]/60 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <LinkedInIcon />
            Follow us on LinkedIn
            <ExternalArrow />
          </a>
        </div>

        {LINKEDIN_FEED_ENABLED ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {isLoading
              ? Array.from({ length: MAX_POSTS }, (_, index) => <LoadingCard key={index} />)
              : posts.map((post) => <UpdateCard key={post.id} post={post} />)}
          </div>
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
