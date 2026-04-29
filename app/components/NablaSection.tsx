"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Edit Nabla section content here ────────────────────────────────────────
// stats: fetched from GitHub API on 2025-04-29 — update periodically
const NABLA = {
  repoUrl: "https://github.com/Devsh-Graphics-Programming/Nabla",
  stats: {
    stars:   "685",
    forks:   "73",
    openPRs: "40",
    commits: "15,969",
  },
  bullets: [
    "Single-source HLSL202x / C++20 Standard Template Header-Only Library",
    "CUDA-like programming experience within the Vulkan ecosystem",
    "Utility and Rapid Prototyping Framework for modern GPU development",
    "Advancing Open Source ecosystems with innovative tooling",
    "Focus on Khronos Standards compliance and compatibility",
  ],
  // Replace null with a path under /public to show a real image
  slides: [
    { src: null as string | null, caption: "Real-time ray tracing showcase" },
    { src: null as string | null, caption: "Vulkan compute pipeline"         },
    { src: null as string | null, caption: "Cross-platform rendering"        },
    { src: null as string | null, caption: "Shader development tools"        },
  ],
};
// ────────────────────────────────────────────────────────────────────────────

function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 6a4 4 0 0 1-1-7.87V3.5a2.5 2.5 0 0 0 2.45 2.5H10a2 2 0 0 1 2 2v7a4 4 0 1 1-2 0V9.5a4 4 0 0 0-3.55-3.98A4 4 0 0 1 5 9zm0 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm14-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-6a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
    </svg>
  );
}

function StatBadge({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 flex-1 min-w-0">
      <span style={{ color: "var(--brand-accent)" }}>{icon}</span>
      <div className="min-w-0">
        <p className="!m-0 text-xl sm:text-2xl font-bold leading-none" style={{ color: "var(--brand-accent-bright)" }}>
          {value}
        </p>
        <p className="!m-0 mt-0.5 text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}

// ── Slideshow ─────────────────────────────────────────────────────────────────
const FADE_MS = 400;
const AUTO_MS = 4500;

function PlaceholderSlide({ caption }: { caption: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3"
      style={{
        background:
          "radial-gradient(ellipse at 40% 40%, rgba(85,181,166,0.18) 0%, rgba(28,58,59,0.5) 60%, rgba(0,0,0,0.8) 100%)",
      }}
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(85,181,166,0.15)", border: "1px solid rgba(85,181,166,0.3)" }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-[var(--brand-accent)]" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <p className="text-neutral-400 text-xs sm:text-sm text-center px-6">{caption}</p>
    </div>
  );
}

function Slideshow() {
  const slides = NABLA.slides;
  const [active, setActive]   = useState(0);
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
    const t = setInterval(() => goTo((active + 1) % slides.length), AUTO_MS);
    return () => clearInterval(t);
  }, [active, goTo, slides.length]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const slide = slides[visible];

  return (
    <div className="flex flex-col gap-4">
      {/* 16:9 frame */}
      <div className="relative w-full rounded-xl overflow-hidden border border-white/10" style={{ aspectRatio: "16/9" }}>
        <div
          className="absolute inset-0 transition-opacity"
          style={{ opacity, transitionDuration: `${FADE_MS}ms` }}
        >
          {slide.src ? (
            <img
              src={slide.src}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
          ) : (
            <PlaceholderSlide caption={slide.caption} />
          )}
        </div>
        {/* Caption bar */}
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-2 text-xs sm:text-sm text-neutral-300 transition-opacity"
          style={{
            opacity,
            transitionDuration: `${FADE_MS}ms`,
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
          }}
        >
          {slide.caption}
        </div>
      </div>

      {/* Dot controls */}
      <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Slideshow controls">
        {slides.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={s.caption}
            onClick={() => goTo(i)}
            className="transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]"
            style={{
              width:  i === active ? "24px" : "8px",
              height: "8px",
              backgroundColor: i === active ? "var(--brand-accent)" : "rgba(85,181,166,0.3)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── N glyph (centered top decoration) ────────────────────────────────────────
function NablaGlyph() {
  return (
    <div
      className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-2xl flex items-center justify-center flex-shrink-0"
      style={{
        background:
          "radial-gradient(circle at 35% 35%, var(--brand-accent) 0%, var(--brand-deep) 75%)",
        boxShadow: "0 0 40px rgba(85,181,166,0.25)",
      }}
    >
      <span
        className="text-white font-bold select-none leading-none"
        style={{ fontSize: "56px" }}
      >
        N
      </span>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function NablaSection() {
  return (
    <section id="nabla" className="w-full py-16 sm:py-24">
      <div className="container mx-auto">

        {/* Section header + centred N glyph */}
        <div className="flex flex-col items-center gap-6 mb-12 sm:mb-16 text-center">
          <div>
            <h2 className="!mt-0 !mb-2 text-3xl sm:text-4xl lg:text-5xl">Nabla</h2>
            <p className="!m-0 text-neutral-400 text-base sm:text-lg">
              Our Open Source Rendering Framework
            </p>
          </div>
          <NablaGlyph />
        </div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-start">

          {/* LEFT — GitHub card + bullets */}
          <div className="flex flex-col gap-6">
            <a
              href={NABLA.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl p-5 sm:p-6 border border-white/5 transition-all duration-200 hover:border-[rgba(85,181,166,0.5)] hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--brand-deep)" }}
            >
              <div className="flex items-center gap-2 mb-5" style={{ color: "var(--brand-accent-bright)" }}>
                <GitHubIcon className="w-5 h-5" />
                <span className="text-sm sm:text-base font-semibold">Devsh-Graphics-Programming / Nabla</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatBadge icon={<StarIcon />}    value={NABLA.stats.stars}   label="Stars"    />
                <StatBadge icon={<ForkIcon />}    value={NABLA.stats.forks}   label="Forks"    />
                <StatBadge
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm1 14.5v-5h-2v5h2zm0-7v-2h-2v2h2z" />
                    </svg>
                  }
                  value={NABLA.stats.openPRs}
                  label="Open PRs"
                />
                <StatBadge
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                    </svg>
                  }
                  value={NABLA.stats.commits}
                  label="Commits"
                />
              </div>
            </a>

            <ul className="flex flex-col gap-3 list-none p-0 !m-0">
              {NABLA.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base sm:text-lg text-neutral-300 leading-relaxed"
                >
                  <span
                    className="mt-2.5 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "var(--brand-accent)" }}
                    aria-hidden="true"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — Slideshow */}
          <Slideshow />
        </div>
      </div>
    </section>
  );
}
