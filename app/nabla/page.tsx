import Link from "next/link";
import NablaHeroFrame from "./NablaHeroFrame";
import NablaShaderBackdrop from "./NablaShaderBackdrop";
import OptimizedLoopVideo from "../components/OptimizedLoopVideo";
import ResponsiveImage from "../components/ResponsiveImage";

const repoUrl = "https://github.com/Devsh-Graphics-Programming/Nabla";

type MediaItem = {
  src: string;
  title: string;
  poster?: string;
  type?: "image" | "video";
  featured?: boolean;
  crop?: "windowChrome" | "materials";
};

type FeatureGroup = {
  title: string;
  items: string[];
};

const showcase: MediaItem[] = [
  {
    src: "/optimized/nabla/fft_bloom_heart.mp4",
    poster: "/optimized/nabla/fft_bloom_heart-poster.webp",
    type: "video",
    title: "Fast Fourier Transform Bloom",
    featured: true,
  },
  {
    src: "/optimized/nabla/stipples.mp4",
    poster: "/optimized/nabla/stipples-poster.webp",
    type: "video",
    title: "GPU-Accelerated Vectorized Linework",
  },
  {
    src: "/optimized/nabla/sdf_func_manip.mp4",
    poster: "/optimized/nabla/sdf_func_manip-poster.webp",
    type: "video",
    title: "SDF Function Manipulation",
  },
  {
    src: "/nabla/imguiintegration.jpg",
    title: "ImGui Integration",
    crop: "windowChrome",
  },
  {
    src: "/optimized/nabla/2d_csg.mp4",
    poster: "/optimized/nabla/2d_csg-poster.webp",
    type: "video",
    title: "2D Constructive Solid Geometry",
  },
  {
    src: "/nabla/path_traced_1.png",
    title: "Path-Traced Scene",
  },
  {
    src: "/nabla/path_traced_2.png",
    title: "Path-Traced Reflections",
  },
  {
    src: "/clients/ditt/ditt6.png",
    title: "Production Integration",
  },
  {
    src: "/nabla_screenshot1.jpg",
    title: "Interior Rendering",
  },
];

const featureGroups: FeatureGroup[] = [
  {
    title: "Core Profile",
    items: [
      "Curated List of Vulkan Features and Extensions the Nabla Core Profile",
      "Easy filtering of Vulkan Physical Devices by capabilities",
      "SPIR-V and Vulkan as first class citizens",
      "First class integration of Renderdoc",
      "Embraces Buffer Device Address and Descriptor Indexing to the full",
      "Minimally Invasive (vulkan handle acquisition, multiple windows, content playing second fiddle)",
    ],
  },
  {
    title: "Synchronization & Lifetime",
    items: [
      "Extensive use of Timeline Semaphores (event handlers, CPU callbacks on GPU conditions)",
      "GPU Object life cycle tracking (descriptor sets and commandbuffers)",
      "Designed for Interoperation (memory export, import and Coming Soon: CUDA Interop)",
    ],
  },
  {
    title: "HLSL & C++ Single Source",
    items: [
      "Reusability: HLSL2021 Standard Template Library",
      "Testability: HLSL subset compiling as both C++ Host and SPIR-V Device code",
      "Future Proof: C++20 Concepts in HLSL for safe and documented Static Polymorphism",
      "Insane: Boost PreProcessor and Template Metaprogramming in HLSL!",
      "Unit tested BxDFs in a Statically Polymorhic framework",
      "SPIR-V Introspection and Layout creation",
    ],
  },
  {
    title: "Assets & I/O",
    items: [
      "Cancellable Future based Async I/O",
      "Virtual File System (archive mounting, our alternative to #embed, everything is referenced by absolute path)",
      "Asset Managment: Directed Acyclic Graphs",
      "Asset Converter: Merkle Trees de-duplicating GPU Object Instances",
    ],
  },
  {
    title: "Extensions",
    items: [
      "Extensions: ImGUI, FFT, Workgroup Prefix Sum, Blur",
      "Counting Sort In Progress: Autoexposure, Tonemap, GPU MPMC Queue, OptiX Interop, Global Scan",
    ],
  },
  {
    title: "Roadmap",
    items: [
      "In Progress: GPU ECS (Property Pools)",
      "Coming Soon: Scene Loaders, GPU Driven Scene Graph, Material Compiler v2 for efficient scheduling of BxDF graph evaluation",
    ],
  },
];

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

function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="nabla-backdrop-base" />
      <NablaShaderBackdrop />
      <div className="nabla-dot-field" />
    </div>
  );
}

function MediaFrame({ item, eager = false }: { item: MediaItem; eager?: boolean }) {
  const cropClass = item.crop === "windowChrome" ? "nabla-media-object--window-chrome" : item.crop === "materials" ? "nabla-media-object--materials" : "";
  const baseClass = `nabla-media-object absolute inset-0 h-full w-full object-cover ${cropClass}`;

  return (
    <article className={`nabla-media-card group relative overflow-hidden rounded-lg border border-white/10 bg-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ${item.featured ? "aspect-[16/9] lg:col-span-2 lg:row-span-2" : "aspect-video"}`}>
      {item.type === "video" ? (
        <OptimizedLoopVideo src={item.src} poster={item.poster} aria-label={item.title} className={baseClass} />
      ) : (
        <ResponsiveImage
          src={item.src}
          alt={item.title}
          loading={eager ? "eager" : "lazy"}
          sizes={item.featured ? "(min-width: 80rem) 52vw, (min-width: 64rem) 64vw, 100vw" : "(min-width: 80rem) 24vw, (min-width: 48rem) 45vw, 100vw"}
          className={baseClass}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,rgba(125,205,185,0.22),transparent_42%)] opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4">
        <p className="!m-0 text-sm font-semibold text-white sm:text-base">{item.title}</p>
      </div>
    </article>
  );
}

function HeroPreviewTile({ item }: { item: MediaItem }) {
  const cropClass = item.crop === "windowChrome" ? "nabla-media-object--window-chrome" : item.crop === "materials" ? "nabla-media-object--materials" : "";
  const mediaClass = `nabla-media-object absolute inset-0 h-full w-full object-cover ${cropClass}`;

  return (
    <div className="group relative aspect-[4/3] min-w-0 overflow-hidden rounded-md border border-white/10 bg-black/70 transition duration-300 hover:border-[var(--brand-accent-bright)]/55">
      {item.type === "video" ? (
        <OptimizedLoopVideo src={item.src} poster={item.poster} aria-label={item.title} className={mediaClass} />
      ) : (
        <ResponsiveImage
          src={item.src}
          alt={item.title}
          sizes="(min-width: 64rem) 12vw, 28vw"
          className={mediaClass}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
      <p className="absolute inset-x-0 bottom-0 !m-0 p-3 text-xs font-semibold leading-tight text-white sm:text-sm">{item.title}</p>
    </div>
  );
}

function HeroMediaPanel() {
  return (
    <div className="relative mx-auto w-full max-w-3xl lg:max-w-none">
      <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_42%,rgba(125,205,185,0.24),rgba(85,181,166,0.08)_42%,transparent_72%)] blur-3xl" aria-hidden="true" />
      <NablaHeroFrame>
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span className="h-2 w-2 rounded-full bg-yellow-300/70" />
              <span className="h-2 w-2 rounded-full bg-[var(--brand-accent-bright)]/80" />
            </div>
            <p className="!m-0 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-neutral-500">Nabla showcase</p>
          </div>

          <div className="p-2 sm:p-3">
            <div className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-black shadow-[0_1rem_3rem_rgba(0,0,0,0.35)]">
              <ResponsiveImage
                src="/nabla/rt_screenshot_both.jpg"
                alt="Raytracing"
                loading="eager"
                sizes="(min-width: 64rem) 48vw, 100vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_105%,rgba(125,205,185,0.24),transparent_44%),linear-gradient(180deg,transparent_44%,rgba(0,0,0,0.86)_100%)]" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="!m-0 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent-bright)]">Featured render</p>
                <h2 className="!mb-0 !mt-1 text-2xl font-semibold leading-tight text-white sm:text-3xl">Raytracing pipeline</h2>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              <HeroPreviewTile item={{ src: "/nabla/nsc.png", title: "Shader Compiler" }} />
              <HeroPreviewTile item={{ src: "/optimized/nabla/fluid_sim.mp4", poster: "/optimized/nabla/fluid_sim-poster.webp", type: "video", title: "Fluid Simulation" }} />
              <HeroPreviewTile item={{ src: "/nabla/Iridescence.png", title: "Materials", crop: "materials" }} />
            </div>
          </div>
      </NablaHeroFrame>
    </div>
  );
}

function FeatureStory({ group }: { group: FeatureGroup }) {
  return (
    <section className="nabla-feature-story">
      <div className="nabla-feature-story-heading">
        <h3 className="!m-0 text-2xl font-semibold leading-tight text-white sm:text-3xl">{group.title}</h3>
      </div>
      <ul className="nabla-feature-list">
        {group.items.map((item) => (
          <li key={item}>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SystemSurface() {
  const items = [
    {
      title: "Vulkan Core",
      text: "SPIR-V and Vulkan as first class citizens",
    },
    {
      title: "Single Source",
      text: "HLSL subset compiling as both C++ Host and SPIR-V Device code",
    },
    {
      title: "GPU Lifetime",
      text: "GPU Object life cycle tracking (descriptor sets and commandbuffers)",
    },
    {
      title: "Async Assets",
      text: "Cancellable Future based Async I/O",
    },
  ];

  return (
    <section className="site-container relative z-10 py-10 sm:py-14">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="nabla-system-tile relative overflow-hidden rounded-lg border border-white/10 bg-black/42 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <h3 className="!mb-3 !mt-0 text-xl font-semibold leading-tight text-white">{item.title}</h3>
            <p className="!m-0 text-sm leading-relaxed text-neutral-300">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="relative isolate overflow-hidden bg-black">
      <PageBackdrop />

      <section className="site-container relative z-10 grid min-h-[calc(100svh-4.5rem)] grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-24">
        <div className="relative isolate max-w-2xl">
          <div className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_36%_48%,rgba(0,0,0,0.64),rgba(0,0,0,0.34)_40%,transparent_72%)] blur-2xl sm:-inset-x-12 sm:-inset-y-14" aria-hidden="true" />
          <div className="pointer-events-none absolute -inset-x-5 -inset-y-6 -z-10 rounded-[2rem] bg-[linear-gradient(90deg,rgba(0,0,0,0.34),rgba(0,0,0,0.12)_54%,transparent)]" aria-hidden="true" />
          <div className="relative">
            <p className="section-kicker mt-7 drop-shadow-[0_0.1rem_0.55rem_rgba(0,0,0,0.75)]">Open Source Rendering Framework</p>
            <h1 className="!mb-5 !mt-2 bg-[linear-gradient(135deg,#fff_18%,#f4fffb_58%,var(--brand-accent-bright)_100%)] bg-clip-text text-balance text-5xl font-semibold leading-[0.95] text-transparent drop-shadow-[0_0_1.6rem_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl">Nabla</h1>
            <p className="cloud-lead max-w-xl">
              A Vulkan-only, thread-agnostic C++ and HLSL framework for demanding rendering middleware.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-cta brand-button inline-flex items-center gap-3 rounded-lg border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
              >
                <GitHubIcon />
                View on GitHub
                <ArrowIcon />
              </a>
              <Link
                href="#showcase"
                className="inline-flex items-center rounded-lg border border-white/18 bg-black/28 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_1.2rem_rgba(0,0,0,0.28)] transition hover:border-white/32 hover:bg-white/[0.08]"
              >
                Explore showcase
              </Link>
            </div>
          </div>
        </div>

        <HeroMediaPanel />
      </section>

      <section id="showcase" className="site-container relative z-10 py-14 sm:py-20">
        <div className="section-head mb-8 sm:mb-10">
          <p className="section-kicker">Showcase</p>
          <h2 className="section-heading">Nabla in motion</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {showcase.map((item, index) => (
            <MediaFrame key={item.title} item={item} eager={index === 0} />
          ))}
        </div>
      </section>

      <SystemSurface />

      <section id="framework" className="site-container relative z-10 py-14 sm:py-20">
        <div className="nabla-about-card grid gap-8 rounded-2xl border border-white/10 bg-black/48 p-6 shadow-[0_1.5rem_5rem_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.1)] sm:p-8 lg:grid-cols-[0.36fr_0.64fr] lg:gap-10 lg:p-10 xl:p-12">
          <div className="flex min-w-0 flex-col justify-between gap-8">
            <div>
              <p className="section-kicker">Framework</p>
              <h2 className="section-heading !mt-2 max-w-sm">Vulkan-first and built to integrate</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-accent-bright)]/80">
              <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">Vulkan-only</span>
              <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">Thread-agnostic</span>
              <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2">C++ / HLSL bridge</span>
            </div>
          </div>
          <div className="relative flex min-w-0 items-center lg:border-l lg:border-white/10 lg:pl-10 xl:pl-12">
            <div className="prose prose-invert max-w-none text-base font-light leading-[1.78] text-neutral-300 sm:text-lg">
              <p>
                <Link href={repoUrl} className="devsh-link">Nabla</Link> (previously <Link href="https://github.com/buildaworldnet/IrrlichtBAW" className="devsh-link">IrrlichtBaW</Link>) started as a fork and renovation of the Irrlicht engine, it has since become the Ship of Theseus. Nabla is Vulkan-only thread agnostic, free of singletons and was redesigned with interoperability and headless rendering, allowing you to use it un-intrusively within other engines and share resources from them.
              </p>
              <p>
                Most importantly it bridges C++ and HLSL allowing Single Source Programming and compiling most HLSL both for the CPU Host and GPU Device, giving you a CUDA-like experience with Vulkan. Furthermore it provides header only libraries for HLSL such as: unit tested BxDFs, FFTs, parts of C++ STL and much more!
              </p>
              <p>
                It&apos;s the perfect choice for building Vulkan middlewares.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="site-container relative z-10 py-14 sm:py-20 lg:pb-28">
        <div className="mb-8 max-w-3xl sm:mb-10">
          <p className="section-kicker">Main Features</p>
          <h2 className="section-heading !mt-2">A complete low-level toolkit</h2>
        </div>
        <div className="nabla-features-editorial">
          {featureGroups.map((group) => (
            <FeatureStory key={group.title} group={group} />
          ))}
        </div>
      </section>
    </main>
  );
}
