"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const NABLA = {
  repoUrl: "https://github.com/Devsh-Graphics-Programming/Nabla",
  stats: {
    stars: "685",
    forks: "73",
    openPRs: "40",
    commits: "15,969",
  },
  highlights: [
    "Single-source HLSL202x / C++20 Standard Template Header-Only Library",
    "CUDA-like programming experience within the Vulkan ecosystem",
    "Utility and Rapid Prototyping Framework for modern GPU development",
    "Advancing Open Source ecosystems with innovative tooling",
    "Focus on Khronos Standards compliance and compatibility",
  ],
  slides: [
    { src: "/nabla/rt_screenshot_both.jpg", caption: "Raytracing" },
    { src: "/nabla/fluid.gif", caption: "Fluid Simulation" },
    { src: "/nabla/nsc.png", caption: "Nabla Shader Compiler & Godbolt docker integration" },
    { src: "/nabla/imguiintegration.jpg", caption: "ImGui Integration" },
  ],
};

const FADE_MS = 400;
const AUTO_MS = 4500;

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="m10 1.5 2.47 5 5.53.8-4 3.9.94 5.5L10 14.1 5.06 16.7l.94-5.5-4-3.9 5.53-.8L10 1.5Z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M5 2.5a2.5 2.5 0 0 0-1 4.79v5.42a2.5 2.5 0 1 0 1.5 0V8h3.75A3.75 3.75 0 0 0 13 4.25v-.96a2.5 2.5 0 1 0-1.5 0v.96A2.25 2.25 0 0 1 9.25 6.5H5.5A2.5 2.5 0 0 0 5 2.5Z" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <circle cx="10" cy="10" r="4" />
    </svg>
  );
}

function StatBadge({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <div className="rounded border border-white/10 bg-black/20 p-3">
      <div className="flex items-center gap-2 text-[var(--brand-accent-bright)]">
        {icon}
        <span className="text-lg font-semibold leading-none sm:text-xl">{value}</span>
      </div>
      <p className="!m-0 mt-1 text-xs uppercase tracking-widest text-neutral-500">{label}</p>
    </div>
  );
}

function Slideshow() {
  const slides = NABLA.slides;
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === active) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpacity(0);
      timerRef.current = setTimeout(() => {
        setVisible(idx);
        setActive(idx);
        setOpacity(1);
      }, FADE_MS);
    },
    [active],
  );

  useEffect(() => {
    const interval = setInterval(() => goTo((active + 1) % slides.length), AUTO_MS);
    return () => clearInterval(interval);
  }, [active, goTo, slides.length]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const slide = slides[visible];

  return (
    <div className="flex flex-col gap-3">
      <div className="media-hover group relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
        <div className="absolute inset-0 transition-opacity duration-500" style={{ opacity }}>
          <Image
            src={slide.src}
            alt={slide.caption}
            fill
            sizes="(min-width: 64rem) 50vw, 100vw"
            loading="eager"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            unoptimized={slide.src.endsWith(".gif")}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 py-4">
          <p className="!m-0 text-base font-medium text-white sm:text-xl">{slide.caption}</p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Nabla showcase slides">
        {slides.map((slideItem, index) => (
          <button
            key={slideItem.caption}
            role="tab"
            aria-selected={index === active}
            aria-label={slideItem.caption}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] ${
              index === active ? "w-6 bg-[var(--brand-accent)]" : "w-2 bg-[var(--brand-accent)]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function NablaGlyph({ className = "h-12 w-12 sm:h-14 sm:w-14" }: { className?: string }) {
  return (
    <span className={`relative mx-auto grid select-none place-items-center ${className}`}>
      <span
        aria-hidden="true"
        className="absolute -inset-[180%] rounded-full bg-[radial-gradient(circle,rgba(125,205,185,0.5)_0%,rgba(85,181,166,0.2)_32%,transparent_70%)] blur-2xl"
      />
      <Image
        src="/nabla-glow.svg"
        alt="Nabla"
        fill
        sizes="3.5rem"
        loading="eager"
        draggable={false}
        className="relative z-10 object-contain drop-shadow-[0_0_0.9rem_rgba(125,205,185,0.9)]"
      />
    </span>
  );
}

function NablaBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_10%,rgba(85,181,166,0.13),transparent_48%),linear-gradient(180deg,rgba(0,0,0,0.96),rgba(3,13,13,0.98)_45%,rgba(0,0,0,0.98))]"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute left-1/2 top-[4%] h-[min(72vw,48rem)] w-[min(72vw,48rem)] -translate-x-1/2 text-[var(--brand-accent)] opacity-[0.075] blur-[0.02rem]"
      >
        <path
          d="M18 16h64L50 86 18 16Z"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M29 27h42L50 72 29 27Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[12%] h-[min(58vw,38rem)] w-[min(58vw,38rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,205,185,0.16)_0%,rgba(85,181,166,0.08)_30%,transparent_68%)] blur-3xl"
      />
    </>
  );
}

export default function NablaSection() {
  return (
    <section id="nabla" className="relative scroll-mt-24 overflow-hidden border-y border-white/10 py-12 sm:py-14 lg:py-16">
      <NablaBackdrop />
      <div className="site-container relative z-10">
        <div className="section-head mb-7 sm:mb-8">
          <NablaGlyph />
          <p className="section-kicker">Open source engine work</p>
          <h2 className="!m-0 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Nabla</h2>
          <p className="!m-0 text-base leading-relaxed text-neutral-300 sm:text-lg">
            Our Open Source Rendering Framework
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-10">
          <div className="flex flex-col gap-4">
            <a
              href={NABLA.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="surface-panel brand-hover block p-5 sm:p-6"
            >
              <div className="flex items-center gap-3 text-[var(--brand-accent-bright)]">
                <GitHubIcon />
                <span className="text-sm font-semibold sm:text-base">Devsh-Graphics-Programming / Nabla</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <StatBadge icon={<StarIcon />} value={NABLA.stats.stars} label="Stars" />
                <StatBadge icon={<ForkIcon />} value={NABLA.stats.forks} label="Forks" />
                <StatBadge icon={<DotIcon />} value={NABLA.stats.openPRs} label="Open PRs" />
                <StatBadge icon={<DotIcon />} value={NABLA.stats.commits} label="Commits" />
              </div>
            </a>

            <ul className="!m-0 flex list-none flex-col gap-2.5 border-l border-white/10 pl-4">
              {NABLA.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-base leading-relaxed text-neutral-300">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-accent)]" aria-hidden="true" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <Slideshow />
        </div>
      </div>
    </section>
  );
}
