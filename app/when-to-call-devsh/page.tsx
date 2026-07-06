import type { Metadata } from "next";
import Link from "next/link";
import NablaShaderBackdrop from "../nabla/NablaShaderBackdrop";
import ResponsiveImage from "../components/ResponsiveImage";

export const metadata: Metadata = {
  title: "When to Call DevSH",
};

const pitchText = `Hey [Name],

I’ve been looking into external help and found a highly specialized team in graphics and GPGPU compute called DevSH (devsh.eu).

They aren't general contractors; they integrate directly with internal teams to architect custom renderers, path tracers, and simulations, as well as modernize graphics stacks and optimize both graphics and compute pipelines. They're known mostly for optimizing a CAD renderer by a factor of 100x after porting it to Vulkan, but you might also recognize them from their talks at Vulkanised and the Shading Languages Symposium, or their activity in the Graphics Programming Discord.

They capture top-tier talent (PhDs, ex-IHV driver developers, AAA rendering architects) that is typically very hard to hire.

You can see their past projects here: devsh.eu
They also publish their rates openly here: https://www.devsh.eu/pricing.pdf

I think it's worth booking a technical discovery call with them to see if they can help us out. Thoughts?`;

// --- DATA ---
export const customSolutionsAndTechDebt = [
  {
    title: "You are trapped by expensive middleware.",
    description: "You are paying massive licensing fees for closed-source, aging renderers like HOOPS Visualize, lack source code access, and are left to fix critical issues yourself."
  },
  {
    title: "Your legacy codebase is a liability.",
    description: "You are stuck on outdated graphics or compute APIs and need to port to modern standards like Vulkan to stay relevant. You need a team that can modernize the engine while maintaining full backward compatibility so business continues as usual."
  },
  {
    title: "Your MVP is buckling under real-world usage.",
    description: "The prototype code that got you funded or through the early startup phase cannot handle production scale. You need to transition from a duct-taped proof-of-concept to an enterprise-grade foundation."
  },
  {
    title: "Graphics or GPU programming is distracting from your core business.",
    description: "You need a high-performance engine to power your startup's actual product, but trying to build and manage a specialized in-house gpu team is burning cash and focus."
  }
];

export const performanceStabilityWalls = [
  {
    title: "Your software chokes on large datasets.",
    description: "You’ve optimized everything you can, but your application still halts to a crawl when clients try to load complex, real-world scenes. This performance plateau is now blocking sales or user adoption."
  },
  {
    title: "Stability issues are damaging your reputation.",
    description: "Your software is constantly crashing under load or triggering GPU timeouts (TDRs) for your users. You are exhausted from applying hotfixes that don't address the root cause of the instability."
  },
  {
    title: "Your architecture assumes infinite compute power.",
    description: "You built around traditional Object-Oriented patterns and now need to pivot to Data-Oriented design to unchoke the CPU."
  },
  {
    title: "You need to hit strict framerates.",
    description: "Your application or game is dropping frames, and you need deep hardware-level optimization to maintain a seamless experience."
  }
];

export const competitiveGapAndTeamStrategy = [
  {
    title: "Your core technology isn't scaling with modern hardware.",
    description: "Your core algorithms, based on decades-old research, aren't scaling on modern GPUs, or your workloads desperately need to be parallelized. When standard methods hit a wall, we invent and engineer novel, hardware-aware solutions tailored exactly to solve your unique bottlenecks."
  },
  {
    title: "You have cutting-edge research, but no product.",
    description: "You’ve developed cutting-edge research, algorithms, or geometry processing techniques, but you lack the engineering roadmap to turn that academic success into a robust, shippable software product."
  },
  {
    title: "Your team needs a permanent skill upgrade.",
    description: "You don't just want a temporary fix; your internal team needs direct, hands-on training in GPU programming and CPU optimization to maintain your competitive edge."
  },
  {
    title: "Competitors are out-rendering you.",
    description: "Your clients are migrating to rival tools because they offer faster rendering times, superior visual quality, and better interactivity."
  },
];

const notFitPoints = [
  "You need general application or basic web development where GPU or rendering systems are not material.",
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

const MailIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

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
      <section className="service-hero service-hero-compact relative flex flex-col justify-center py-6 sm:py-8 lg:py-10">
        <div aria-hidden="true" className="service-hero-cloud absolute inset-0 z-0">
          <div className="service-hero-cloud-base" />
          <NablaShaderBackdrop />
          <div className="service-hero-cloud-vignette" />
        </div>

        <div className="site-container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mx-auto !mb-0 !mt-0 max-w-3xl bg-[linear-gradient(135deg,#fff_18%,#f4fffb_58%,var(--brand-accent-bright)_100%)] bg-clip-text pb-1 text-3xl font-semibold leading-[1.15] tracking-tight text-transparent drop-shadow-[0_0_1.8rem_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl">
              Give your software the ultimate visual and computational advantage.
            </h1>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:newclients@devsh.eu"
                className="premium-cta brand-button inline-flex items-center gap-3 rounded-lg border px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
              >
                Book a Technical Discovery Call
                <ArrowIcon />
              </a>

              <a
                href="#intro-kit"
                className="inline-flex items-center gap-3 rounded-lg border border-white/18 bg-black/28 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_1.2rem_rgba(0,0,0,0.28)] transition hover:border-white/32 hover:bg-white/[0.08]"
              >
                Make an Introduction
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHEN TO CALL US & WHEN NOT TO */}
      <section className="site-container py-10 sm:py-16 lg:py-20">
        <div className="section-head mx-auto mb-10 max-w-5xl sm:mb-14">
          <h2 className="section-heading">When to Bring in the Big Guns</h2>
          <p className="mt-3 text-lg opacity-80 sm:text-xl">
            Call us if any of the following is you.
          </p>
        </div>
        
        {/* All cards share this single flex container with a uniform gap */}
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:gap-4">
          
          <CategoryCard title="The Competitive Gap" items={competitiveGapAndTeamStrategy} />
          <CategoryCard title="Modernization and Tech Debt" items={customSolutionsAndTechDebt} />
          <CategoryCard title="Performance & Stability Walls" items={performanceStabilityWalls} />

          {/* 3. WHEN NOT TO CALL US (Red Card) */}
          <div className="relative mt-2 overflow-hidden rounded-lg border border-red-900/30 bg-red-950/20 px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" aria-hidden="true" />
            
            {/* Added mt-0 to kill any stray margins, and changed mb-4 to mb-6 to match the green cards */}
            <h3 className="mt-0 mb-6 text-2xl font-semibold leading-tight text-white sm:mb-6 sm:text-3xl">
              Who this is not for
            </h3>
            
            <ul className="m-0 grid gap-6 p-0 list-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
              {notFitPoints.map((item, index) => (
                <li key={index} className="flex gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  <XIcon />
                  <span className="mt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* 4. ENGAGEMENT MODEL */}
      <section className="site-container py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          
          {/* Centered Header Section */}
          <div className="mb-12 text-center sm:mb-16">
            <p className="section-kicker mx-auto">How we integrate with your team</p>
            <h2 className="section-heading !mt-3 mx-auto">Our Engineering Process</h2>
          </div>
          
          {/* 4-Column Grid: Stacks on mobile, 2x2 on tablet, 1x4 horizontal on desktop */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {engagementModels.map((model, index) => (
              <article 
                key={model.name} 
                className="group relative flex flex-col items-center rounded-2xl border border-emerald-900/30 bg-emerald-950/20 p-6 pt-8 text-center shadow-[0_1rem_3rem_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-700/50 hover:bg-emerald-900/20 sm:p-8 sm:pt-10"
              >
                {/* Top Gradient Accent */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent transition-opacity duration-300 group-hover:via-emerald-400/60" aria-hidden="true" />
                
                {/* Step Number Box */}
                <div className="relative mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[var(--brand-accent-bright)]/30 bg-[var(--brand-accent)]/10 text-xl font-bold text-[var(--brand-accent-bright)] shadow-[0_0_20px_rgba(0,255,128,0.15)] transition-transform duration-300 group-hover:scale-110 group-hover:border-[var(--brand-accent-bright)]/50">
                  {String(index + 1).padStart(2, "0")}
                </div>
                
                {/* Content */}
                <div className="flex flex-1 flex-col">
                  <h3 className="!m-0 text-lg font-semibold leading-tight text-white sm:text-xl">
                    {model.name}
                  </h3>
                  <p className="!mb-0 !mt-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                    {model.detail}
                  </p>
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

      {/* 5. THE INTERNAL PITCH (Shareable Summary) */}
      <section id="intro-kit" className="site-container py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-12">
          
          {/* Left Column: Context & Header */}
          <div className="text-left">
            <h2 className="mb-4 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
              Need to share this with your CTO or get budget approval?
            </h2>
            <p className="text-base leading-relaxed text-neutral-400 sm:text-lg">
              Send them this brief summary of our value proposition, track record, and pricing.
            </p>
          </div>

          {/* Right Column: The Interactive Box */}
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left shadow-[0_2rem_4rem_rgba(0,0,0,0.4)]">
            
            {/* Toolbar Area */}
            <div className="flex flex-col items-center justify-between gap-4 border-b border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:px-5">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">Internal Pitch Draft</span>
              <div className="flex w-full gap-2 sm:w-auto">
                <button
                  id="copy-intro-btn"
                  data-copy-text={pitchText}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 sm:flex-none"
                >
                  <CopyIcon />
                  <span id="copy-btn-label">Copy text</span>
                </button>
                <a
                  href={`mailto:?subject=${encodeURIComponent("Engineering partner for graphics/compute bottlenecks")}&body=${encodeURIComponent(pitchText)}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[var(--brand-accent)]/20 px-3 py-1.5 text-xs font-semibold text-[var(--brand-accent-bright)] transition hover:bg-[var(--brand-accent)]/30 sm:flex-none"
                >
                  <MailIcon />
                  Email draft
                </a>
              </div>
            </div>
            
            {/* Text Area (Injects the variable directly, handles \n natively via whitespace-pre-wrap) */}
            <div className="whitespace-pre-wrap p-5 font-mono text-sm leading-relaxed text-neutral-300">
              {pitchText}
            </div>

            {/* Inline Vanilla JS for the Copy Button */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  document.getElementById('copy-intro-btn').addEventListener('click', async function() {
                    try {
                      await navigator.clipboard.writeText(this.getAttribute('data-copy-text'));
                      const label = document.getElementById('copy-btn-label');
                      label.textContent = 'Copied!';
                      setTimeout(() => { label.textContent = 'Copy text'; }, 2000);
                    } catch (err) {
                      console.error('Failed to copy', err);
                    }
                  });
                `,
              }}
            />
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="site-container relative z-10">
          
          {/* The Mildly Colored Premium Card */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-emerald-900/30 bg-emerald-950/20 p-10 text-center shadow-[0_2rem_5rem_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-14 lg:p-16">
            
            {/* Premium Gradient Top Border on the Card */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" aria-hidden="true" />
            
            {/* Sophisticated Ambient Glow contained inside the card */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-900/20 blur-[100px]" aria-hidden="true" />
            
            <h2 className="mb-12 text-balance text-2xl font-semibold leading-relaxed tracking-tight bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-transparent sm:text-3xl lg:text-4xl">
              Tap into an expert team of graphics engineers and GPU programmers to solve your hardest challenges.
            </h2>
            
            {/* Bigger Buttons: px-10, py-5, text-lg, rounded-xl */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a
                href="mailto:newclients@devsh.eu"
                className="premium-cta brand-button inline-flex items-center gap-3 rounded-xl border px-10 py-5 text-lg font-semibold shadow-[0_0_24px_rgba(0,255,128,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(0,255,128,0.25)]"
              >
                Book a Technical Discovery Call
                <ArrowIcon />
              </a>
              
              <Link 
                href="/pricing.pdf" 
                className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-10 py-5 text-lg font-semibold text-white shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
              >
                Check public rates
                <ArrowIcon />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}