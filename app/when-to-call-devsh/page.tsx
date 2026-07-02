import type { Metadata } from "next";
import Link from "next/link";
import NablaShaderBackdrop from "../nabla/NablaShaderBackdrop";
import ResponsiveImage from "../components/ResponsiveImage";

export const metadata: Metadata = {
  title: "When to Call DevSH",
};

// --- DATA ---

const performanceWalls = [
  {
    title: "Your performance has flatlined.",
    description: "You’ve optimized everything you can think of, but your renderer still halts to a crawl when processing larger, more detailed scenes or datasets."
  },
  {
    title: "The hardware is crashing under load.",
    description: "Your software is triggering GPU timeouts (TDRs) or crashes, and duct-tape fixes to stability aren't holding up anymore."
  },
  {
    title: "Your architecture assumes infinite compute.",
    description: "You built around traditional Object-Oriented patterns and now need to pivot to Data-Oriented design to unchoke the CPU."
  },
  {
    title: "You need to hit strict framerates.",
    description: "Your application or game is dropping frames, and you need deep hardware-level optimization to maintain a seamless experience."
  }
];

const modernizationDebt = [
  {
    title: "You are trapped by expensive middleware.",
    description: "You are paying massive licensing fees for closed-source, aging renderers like HOOPS Visualize, lack source code access, and are left to fix critical issues yourself."
  },
  {
    title: "You need to move off legacy APIs.",
    description: "You need to port from aging APIs (like older DirectX or OpenGL) to Vulkan, but don't have the internal expertise to architect it correctly from day one."
  },
  {
    title: "Rendering isn't your startup's USP.",
    description: "You need a high-performance engine to power your actual product, but building and maintaining a specialized graphics team in-house is a distraction from your core business."
  },
  {
    title: "The prototype won't scale.",
    description: "Your \"vibe-coded\" software got you through the startup phase, but you need an enterprise-grade foundation to actually ship."
  }
];

const competitiveGap = [
  {
    title: "Your team needs a permanent skill upgrade.",
    description: "You don't just want a temporary fix; your internal team needs direct, hands-on training in GPU programming and CPU optimization to maintain your competitive edge."
  },
  {
    title: "Competitors are out-rendering you.",
    description: "Your clients are migrating to rival tools because they offer faster rendering times, superior visual quality, and better interactivity."
  },
  {
    title: "You have cutting-edge research, but no product.",
    description: "You have a brilliant computational geometry algorithm, but need to bridge the gap from academic research to a highly performant, shippable product."
  }
];

const notFitPoints = [
  "You need general application or basic web development where GPU systems are not material.",
  "You have isolated, small tasks with no clear business context or product relevance.",
  "You are unwilling to refactor legacy code or address core architectural debt.",
];

const engagementModels = [
  {
    name: "Technical Fit Call",
    detail: "A simple conversation to understand your needs.",
  },
  {
    name: "Deep-Dive Diagnostic",
    detail: "We audit your codebase, profile the performance bottlenecks, and map the technical debt.",
  },
  {
    name: "The Architecture Plan",
    detail: "We deliver a concrete roadmap and assign our specialized subject matter experts to tackle specific layers of your stack.",
  },
  {
    name: "Execution & Knowledge Transfer",
    detail: "We don't just patch the code; we implement the solution, hit the performance targets, and upskill your internal team.",
  },
];

const proofPoints = [
  {
    title: "100x rendering performance improvement",
    company: "Applications in CADD",
    text: "GPU-driven rendering work for large civil engineering and point cloud datasets.",
    image: "/clients/apps_in_cadd/scene1_cropped.png",
  },
  {
    title: "From CPU render farm to GPU-based system",
    company: "Ditt Officemakers",
    text: "Interior visualization workflows, GPU path tracing, denoising, and rendering infrastructure.",
    image: "/clients/ditt/ditt2.jpg",
  },
  {
    title: "Public graphics engineering credibility",
    company: "Standards, compilers, and open source",
    text: "Public work across graphics standards, shader compilers, open source tooling, and conference talks.",
    image: "/nabla/nsc.png",
  },
];

const introText =
  "I think you should talk to DevSH. They are a specialist graphics and GPU engineering consultancy for product companies. They are a strong fit when rendering architecture, Vulkan/SPIR-V, shader tooling, GPU performance, or low-level graphics delivery is shaping product decisions. The best first conversation is with whoever owns the product or engineering outcome.";

// --- ICONS ---

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M4 10h11" />
      <path d="M10 5l5 5-5 5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[0.15rem] h-5 w-5 shrink-0 text-[var(--brand-accent-bright)]" aria-hidden="true">
      <path d="M4 10l4 4 8-8" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[0.15rem] h-5 w-5 shrink-0 text-red-400" aria-hidden="true">
      <path d="M15 5L5 15M5 5l10 10" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <rect x="5" y="5" width="10" height="10" rx="1" />
      <path d="M9 5V3a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-2" />
    </svg>
  );
}

// --- COMPONENTS ---

function CategoryCard({ title, items }: { title: string; items: { title: string; description: string }[] }) {
  return (
    // Changed bg-black/45 to bg-emerald-950/20 and border-white/10 to border-emerald-900/30
    <div className="relative overflow-hidden rounded-lg border border-emerald-900/30 bg-emerald-950/20 p-6 shadow-[0_1rem_3rem_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8 lg:p-10">
      
      {/* Updated gradient to fade into emerald instead of brand-accent to match the card */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" aria-hidden="true" />
      
      <h3 className="mt-0 mb-6 text-2xl font-semibold leading-tight text-white sm:mb-6 sm:text-3xl">
        {title}
      </h3>
      
      <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4">
            <CheckIcon />
            <div>
              <h4 className="mt-0 mb-0 text-base font-semibold text-white sm:text-lg">{item.title}</h4>
              <p className="mb-0 mt-2 text-sm leading-relaxed text-neutral-300 sm:text-base">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProofCard({ point }: { point: (typeof proofPoints)[number] }) {
  return (
    <article className="group grid gap-5 overflow-hidden rounded-lg border border-white/10 bg-black/35 p-4 transition duration-300 hover:border-[var(--brand-accent-bright)]/50 sm:grid-cols-[0.42fr_0.58fr] sm:items-center">
      <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-black">
        <ResponsiveImage
          src={point.image}
          alt=""
          sizes="(min-width: 64rem) 22vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>
      <div className="min-w-0">
        <p className="section-kicker">{point.company}</p>
        <h3 className="!mb-0 !mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">{point.title}</h3>
        <p className="!mb-0 !mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">{point.text}</p>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <main className="services-shell min-h-screen overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="service-hero relative flex flex-col justify-center py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="service-hero-cloud absolute inset-0 z-0">
          <div className="service-hero-cloud-base" />
          <NablaShaderBackdrop />
          <div className="service-hero-cloud-vignette" />
        </div>

        <div className="site-container relative z-10">
          <div className="max-w-4xl">
            <p className="section-kicker">Specialist Graphics Engineering</p>
            <h1 className="!mb-0 !mt-4 bg-[linear-gradient(135deg,#fff_18%,#f4fffb_58%,var(--brand-accent-bright)_100%)] bg-clip-text pb-1 text-4xl font-semibold leading-[1.06] text-balance text-transparent drop-shadow-[0_0_1.8rem_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl">
              We unblock rendering pipelines and rescue failing graphics architectures.
            </h1>
            <p className="cloud-lead !mt-6 max-w-2xl text-lg sm:text-xl">
              Expert GPU programming and data-oriented optimization for teams hitting the absolute limits of their hardware.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="mailto:newclients@devsh.eu" className="premium-cta brand-button inline-flex items-center gap-3 rounded-lg border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5">
                Schedule a Consultation
                <ArrowIcon />
              </a>
              <a href="#intro-kit" className="inline-flex items-center gap-3 rounded-lg border border-white/18 bg-black/28 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_1.2rem_rgba(0,0,0,0.28)] transition hover:border-white/32 hover:bg-white/[0.08]">
                Make an Introduction
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHEN TO CALL US - 3 Compact Cards */}
      <section className="site-container py-10 sm:py-10 lg:py-10">
        <div className="section-head mx-auto mb-10 max-w-5xl sm:mb-14">
          <h2 className="section-heading">When it's time to bring us in.</h2>
        </div>
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:gap-4">
          <CategoryCard title="Modernization & Tech Debt" items={modernizationDebt} />
          <CategoryCard title="Performance & Stability Walls" items={performanceWalls} />
          <CategoryCard title="The Competitive Gap" items={competitiveGap} />
        </div>
      </section>

      {/* 3. WHEN NOT TO CALL US */}
      <section className="site-container pb-14 sm:pb-16 lg:pb-20">
        <div className="mx-auto max-w-5xl relative overflow-hidden rounded-lg border border-red-900/30 bg-red-950/20 p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" aria-hidden="true" />
          <h3 className="mb-4 text-2xl font-semibold leading-tight text-white sm:mb-4 sm:text-3xl">Who this is not for</h3>
          <ul className="grid gap-6 p-0 list-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
            {notFitPoints.map((item, index) => (
              <li key={index} className="flex gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                <XIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. ENGAGEMENT MODEL */}
      <section className="border-y border-white/10 bg-black/45 py-14 sm:py-16 lg:py-20">
        <div className="site-container grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="section-kicker">How we integrate with your team</p>
            <h2 className="section-heading !mt-3">Our Engineering Process</h2>
          </div>
          <div className="grid gap-4">
            {engagementModels.map((model, index) => (
              <article key={model.name} className="grid gap-4 rounded-lg border border-white/10 bg-black/35 p-5 sm:grid-cols-[4rem_1fr] sm:p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-md border border-[var(--brand-accent-bright)]/30 bg-[var(--brand-accent)]/10 text-lg font-semibold text-[var(--brand-accent-bright)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="!m-0 text-xl font-semibold leading-tight text-white sm:text-2xl">{model.name}</h3>
                  <p className="!mb-0 !mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">{model.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EVIDENCE */}
      <section className="border-b border-white/10 bg-black py-14 sm:py-16 lg:py-20">
        <div className="site-container">
          <div className="section-head mb-10 sm:mb-12">
            <h2 className="section-heading">Proven Results</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {proofPoints.map((point) => (
              <ProofCard key={point.title} point={point} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. FORWARDABLE INTRODUCTION */}
      <section id="intro-kit" className="site-container py-14 sm:py-16 lg:py-20">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(12,31,30,0.72),rgba(4,14,14,0.92))] p-6 sm:p-8 lg:p-10 shadow-[0_1.5rem_5rem_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)]">
           <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-accent-bright)]/55 to-transparent" aria-hidden="true" />
           <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="!m-0 text-base leading-relaxed text-neutral-300 sm:text-lg max-w-2xl">
                Need to get budget approval or share this with your CTO? Send them this brief summary of our value proposition.
              </p>
              
              <button 
                id="copy-intro-btn"
                data-copy-text={introText}
                className="inline-flex shrink-0 items-center gap-2 rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <CopyIcon />
                <span id="copy-btn-label">Copy to Clipboard</span>
              </button>

              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    document.getElementById('copy-intro-btn').addEventListener('click', async function() {
                      try {
                        await navigator.clipboard.writeText(this.getAttribute('data-copy-text'));
                        const label = document.getElementById('copy-btn-label');
                        label.textContent = 'Copied!';
                        setTimeout(() => { label.textContent = 'Copy to Clipboard'; }, 2000);
                      } catch (err) {
                        console.error('Failed to copy', err);
                      }
                    });
                  `,
                }}
              />
           </div>
          <div className="min-w-0 rounded-md border border-white/10 bg-black/55 p-5">
            <pre className="!m-0 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-neutral-200 sm:text-base">{introText}</pre>
          </div>
        </div>
      </section>

      {/* 7. NEXT STEPS */}
      <section className="site-container pb-16 sm:pb-20 lg:pb-24">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/45 p-8 text-center sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-accent-bright)]/70 to-transparent" aria-hidden="true" />
          <h2 className="!mb-0 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">Ready to unblock your pipeline?</h2>
          <p className="!mx-auto !mb-0 !mt-5 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            Let's discuss your specific technical constraints, review your current architecture, and determine if our engineering expertise aligns with your roadmap.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="mailto:newclients@devsh.eu" className="premium-cta brand-button inline-flex items-center gap-3 rounded-lg border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5">
              Book a Consultation
              <ArrowIcon />
            </a>
            <Link href="/pricing.pdf" className="inline-flex items-center gap-3 rounded-lg border border-white/18 bg-black/28 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/32 hover:bg-white/[0.08]">
              Check public rates
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}