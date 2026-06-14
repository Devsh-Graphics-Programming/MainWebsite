"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import NablaHeroFrame from "../nabla/NablaHeroFrame";
import NablaShaderBackdrop from "../nabla/NablaShaderBackdrop";
import OptimizedLoopVideo from "./OptimizedLoopVideo";
import ResponsiveImage from "./ResponsiveImage";

const NABLA = {
  repoUrl: "https://github.com/Devsh-Graphics-Programming/Nabla",
  stats: [
    { value: "685", label: "Stars" },
    { value: "73", label: "Forks" },
    { value: "15,969", label: "Commits" },
  ],
  highlights: [
    "Vulkan-only and thread-agnostic",
    "Single-source C++ and HLSL workflow",
    "Built for demanding rendering middleware",
  ],
};

type PreviewItem = {
  src: string;
  title: string;
  poster?: string;
  type?: "image" | "video";
  crop?: "materials";
};

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path fillRule="evenodd" d="M5 4.75A.75.75 0 0 1 5.75 4h8.5a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0V6.56l-8.22 8.22a.75.75 0 0 1-1.06-1.06l8.22-8.22H5.75A.75.75 0 0 1 5 4.75Z" clipRule="evenodd" />
    </svg>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/22 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <p className="!m-0 text-xl font-semibold leading-none text-[var(--brand-accent-bright)]">{value}</p>
      <p className="!m-0 mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">{label}</p>
    </div>
  );
}

function NablaHomeBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="nabla-backdrop-base" />
      <NablaShaderBackdrop />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_26%_46%,rgba(0,0,0,0.62),rgba(0,0,0,0.18)_44%,transparent_72%),linear-gradient(180deg,rgba(0,0,0,0.82),transparent_24%,rgba(0,0,0,0.72)_100%)]" />
      <div className="nabla-dot-field" />
    </div>
  );
}

function PreviewTile({ item }: { item: PreviewItem }) {
  const cropClass = item.crop === "materials" ? "nabla-media-object--materials" : "";
  const mediaClass = `nabla-media-object absolute inset-0 h-full w-full object-cover ${cropClass}`;

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-black/70 transition duration-300 hover:border-[var(--brand-accent-bright)]/55">
      {item.type === "video" ? (
        <OptimizedLoopVideo src={item.src} poster={item.poster} aria-label={item.title} className={mediaClass} />
      ) : (
        <ResponsiveImage src={item.src} alt={item.title} sizes="(min-width: 64rem) 12vw, 30vw" className={mediaClass} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <p className="absolute inset-x-0 bottom-0 !m-0 p-3 text-xs font-semibold leading-tight text-white sm:text-sm">{item.title}</p>
    </div>
  );
}

function NablaShowcaseFrame() {
  const tiles: PreviewItem[] = [
    { src: "/nabla/nsc.png", title: "Shader Compiler" },
    { src: "/optimized/nabla/fluid_sim.mp4", poster: "/optimized/nabla/fluid_sim-poster.webp", type: "video", title: "Fluid Simulation" },
    { src: "/nabla/Iridescence.png", title: "Materials", crop: "materials" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-3xl lg:max-w-none">
      <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_46%,rgba(125,205,185,0.22),rgba(85,181,166,0.08)_42%,transparent_72%)] blur-3xl" aria-hidden="true" />
      <NablaHeroFrame>
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-300/70" />
            <span className="h-2 w-2 rounded-full bg-[var(--brand-accent-bright)]/80" />
          </div>
          <p className="!m-0 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-neutral-500">Nabla preview</p>
        </div>

        <div className="p-2 sm:p-3">
          <div className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_1rem_3rem_rgba(0,0,0,0.35)]">
            <ResponsiveImage
              src="/nabla/rt_screenshot_both.jpg"
              alt="Raytracing pipeline"
              loading="eager"
              sizes="(min-width: 64rem) 44vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_105%,rgba(125,205,185,0.22),transparent_44%),linear-gradient(180deg,transparent_44%,rgba(0,0,0,0.84)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <p className="!m-0 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent-bright)]">Featured render</p>
              <h3 className="!mb-0 !mt-1 text-2xl font-semibold leading-tight text-white sm:text-3xl">Raytracing pipeline</h3>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {tiles.map((item) => (
              <PreviewTile key={item.title} item={item} />
            ))}
          </div>
        </div>
      </NablaHeroFrame>
    </div>
  );
}

function ActionLink({ children, href, external = false, primary = false }: { children: ReactNode; href: string; external?: boolean; primary?: boolean }) {
  const className = primary
    ? "premium-cta brand-button inline-flex items-center gap-3 rounded-lg border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
    : "inline-flex items-center gap-3 rounded-lg border border-white/18 bg-black/28 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_1.2rem_rgba(0,0,0,0.28)] transition hover:border-white/32 hover:bg-white/[0.08]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function NablaSection() {
  return (
    <section id="nabla" className="relative scroll-mt-24 overflow-hidden border-y border-white/10 py-16 sm:py-20 lg:py-24">
      <NablaHomeBackdrop />
      <div className="site-container relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
        <div className="relative isolate max-w-2xl">
          <div className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_34%_48%,rgba(0,0,0,0.64),rgba(0,0,0,0.32)_42%,transparent_72%)] blur-2xl" aria-hidden="true" />
          <p className="section-kicker drop-shadow-[0_0.1rem_0.55rem_rgba(0,0,0,0.75)]">Open Source Rendering Framework</p>
          <h2 className="!mb-5 !mt-2 bg-[linear-gradient(135deg,#fff_18%,#f4fffb_58%,var(--brand-accent-bright)_100%)] bg-clip-text text-balance text-5xl font-semibold leading-[0.96] text-transparent drop-shadow-[0_0_1.6rem_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl">Nabla</h2>
          <p className="cloud-lead max-w-xl">
            A Vulkan-only, thread-agnostic C++ and HLSL framework for demanding rendering middleware.
          </p>

          <div className="mt-7 grid max-w-xl grid-cols-3 gap-3 sm:mt-8">
            {NABLA.stats.map((stat) => (
              <StatPill key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>

          <ul className="!m-0 !mt-7 flex list-none flex-col gap-3 p-0 sm:!mt-8">
            {NABLA.highlights.map((highlight) => (
              <li key={highlight} className="grid grid-cols-[0.5rem_1fr] gap-3 text-base font-medium leading-relaxed text-neutral-200">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)] shadow-[0_0_0.9rem_rgba(125,205,185,0.7)]" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="/nabla" primary>
              Explore Nabla
              <ArrowIcon />
            </ActionLink>
            <ActionLink href={NABLA.repoUrl} external>
              <GitHubIcon />
              GitHub
              <ArrowIcon />
            </ActionLink>
          </div>
        </div>

        <NablaShowcaseFrame />
      </div>
    </section>
  );
}
