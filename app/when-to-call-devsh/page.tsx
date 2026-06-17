import type { Metadata } from "next";
import Link from "next/link";
import NablaShaderBackdrop from "../nabla/NablaShaderBackdrop";
import ResponsiveImage from "../components/ResponsiveImage";

export const metadata: Metadata = {
  title: "When to Call DevSH | Graphics and GPU Engineering Consultancy",
  description:
    "When to call DevSH for business-critical graphics, rendering, Vulkan, SPIR-V, shader tooling, and GPU performance decisions.",
};

const introductionEmailBody = [
  "Hi DevSH,",
  "",
  "I would like to introduce a team facing a graphics engineering decision where DevSH may be a strong fit.",
  "",
  "Context:",
  "- Who I am introducing:",
  "- What they are working on:",
  "- Why I think DevSH could help:",
  "- Current graphics / GPU stack, if useful:",
  "- Is this exploratory, active, or urgent?",
  "",
].join("\n");

const contactHref = `mailto:newclients@devsh.eu?subject=${encodeURIComponent("DevSH introduction")}&body=${encodeURIComponent(introductionEmailBody)}`;

const callSignals = [
  {
    title: "Rendering architecture will shape what ships",
    text: "Platform support, performance envelope, visual quality, or data scale now affects product scope, delivery confidence, or customer value.",
  },
  {
    title: "Performance is visible beyond engineering",
    text: "Frame time, latency, memory pressure, shader cost, or GPU throughput is tied to demos, deployments, contracts, or roadmap confidence.",
  },
  {
    title: "The issue sits below application-level debugging",
    text: "Vulkan synchronization, shaders, compiler behavior, cross-vendor behavior, or graphics tooling needs specialist ownership.",
  },
  {
    title: "Hiring signals a deeper graphics constraint",
    text: "An open graphics role can mean the company knows the problem is durable but needs senior direction before expanding the team.",
  },
  {
    title: "A graphics-heavy product needs senior external review",
    text: "Rendering quality, large data, geometry, simulation, or GPU compute is close enough to the product promise that a second senior view matters.",
  },
  {
    title: "Shader tooling is slowing senior engineers down",
    text: "SPIR-V, HLSL, DXC, Slang, validation, build systems, and toolchain behavior need ownership instead of recurring escalations.",
  },
];

const goodFit = [
  "Product companies where graphics, visualization, simulation, or GPU compute is close to customer value.",
  "Product or engineering leaders accountable for architecture, performance, tooling, delivery, or customer outcomes.",
  "Internal engineering teams that want senior external judgment alongside their own product knowledge.",
  "Problems where correctness, cross-platform behavior, low-level API detail, and performance all matter at once.",
];

const notFit = [
  "General application work where graphics, rendering, GPU systems, or low-level tooling are not material to the product.",
  "Requests where the main need is broad implementation support rather than specialist graphics judgment.",
  "Procurement processes built only around individual roles rather than specialist consultancy.",
  "Small isolated tasks with no clear owner, business context, or meaningful product relevance.",
];

const connectorRoles = [
  "Senior engineers who hear that another team is blocked by rendering, GPU performance, or shader tooling.",
  "Standards, conference, open-source, and vendor contacts who see graphics-heavy product teams up close.",
  "Founders, advisors, operators, and investors who see a company struggling with visualization, performance, or GPU delivery.",
  "Past clients and partners who recognize a problem similar to one DevSH has already helped solve.",
];

const decisionRoles = [
  "CTO or VP Engineering",
  "Founder or technical co-founder",
  "Head of Graphics or Rendering",
  "Technical Director",
  "Product engineering leader responsible for a graphics-heavy roadmap",
];

const engagementModels = [
  {
    name: "Technical fit call",
    detail: "A focused call with the decision-maker and technical lead to understand product context, current constraints, and fit.",
  },
  {
    name: "Diagnostic engagement",
    detail: "A bounded review of architecture, performance, shaders, API usage, or toolchain constraints with evidence-backed next steps.",
  },
  {
    name: "Specialist engineering sprint",
    detail: "Senior engineers work inside the codebase to remove a blocking graphics constraint or deliver a high-leverage subsystem.",
  },
  {
    name: "Long-term R&D partnership",
    detail: "Ongoing work for products where rendering, GPU systems, or low-level graphics infrastructure are part of the competitive advantage.",
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M4 10h11" />
      <path d="M10 5l5 5-5 5" />
    </svg>
  );
}

function SignalCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="brand-hover surface-panel flex min-h-[15rem] flex-col justify-between p-5 sm:p-6">
      <div>
        <div className="mb-5 h-px w-20 bg-gradient-to-r from-[var(--brand-accent-bright)] to-transparent" aria-hidden="true" />
        <h3 className="!m-0 text-xl font-semibold leading-tight text-white sm:text-2xl">{title}</h3>
      </div>
      <p className="!mb-0 !mt-5 text-sm leading-relaxed text-neutral-300 sm:text-base">{text}</p>
    </article>
  );
}

function FitList({ title, items, tone }: { title: string; items: string[]; tone: "good" | "bad" }) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-white/10 bg-black/35 p-5 sm:p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-accent-bright)]/55 to-transparent" aria-hidden="true" />
      <p className="section-kicker">{tone === "good" ? "Strong fit" : "Better served elsewhere"}</p>
      <h2 className="!mb-0 !mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">{title}</h2>
      <ul className="!m-0 !mt-6 flex list-none flex-col gap-4 p-0">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[0.75rem_1fr] gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
            <span className={`mt-[0.48rem] h-2 w-2 justify-self-start rounded-full sm:mt-[0.56rem] ${tone === "good" ? "bg-[var(--brand-accent-bright)]" : "bg-white/35"}`} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ReferralList({ title, kicker, items }: { title: string; kicker: string; items: string[] }) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-white/10 bg-black/35 p-5 sm:p-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-accent-bright)]/55 to-transparent" aria-hidden="true" />
      <p className="section-kicker">{kicker}</p>
      <h2 className="!mb-0 !mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">{title}</h2>
      <ul className="!m-0 !mt-6 flex list-none flex-col gap-4 p-0">
        {items.map((item) => (
          <li key={item} className="grid grid-cols-[0.75rem_1fr] gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
            <span className="mt-[0.48rem] h-2 w-2 justify-self-start rounded-full bg-[var(--brand-accent-bright)] shadow-[0_0_0.8rem_rgba(125,205,185,0.7)] sm:mt-[0.56rem]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
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
      <section className="service-hero flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20 sm:py-24 lg:py-28">
        <div aria-hidden="true" className="service-hero-cloud">
          <div className="service-hero-cloud-base" />
          <NablaShaderBackdrop />
          <div className="service-hero-cloud-vignette" />
        </div>

        <div className="site-container relative z-10 grid items-center gap-10 lg:grid-cols-[0.95fr_0.75fr] lg:gap-14">
          <div className="max-w-5xl">
            <p className="section-kicker">When to call DevSH</p>
            <h1 className="!mb-0 !mt-4 max-w-5xl bg-[linear-gradient(135deg,#fff_18%,#f4fffb_58%,var(--brand-accent-bright)_100%)] bg-clip-text pb-1 text-4xl font-semibold leading-[1.06] text-balance text-transparent drop-shadow-[0_0_1.8rem_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl xl:text-7xl">
              Specialist graphics engineering for the problems your best engineers escalate.
            </h1>
            <p className="cloud-lead !mt-6 max-w-3xl">
              DevSH works with product companies when rendering architecture, GPU performance, shader tooling, or low-level graphics decisions are too consequential for routine implementation work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contactHref} className="premium-cta brand-button inline-flex items-center gap-3 rounded-lg border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5">
                Make an introduction
                <ArrowIcon />
              </a>
              <Link href="/pricing.pdf" className="inline-flex items-center gap-3 rounded-lg border border-white/18 bg-black/28 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_1.2rem_rgba(0,0,0,0.28)] transition hover:border-white/32 hover:bg-white/[0.08]">
                Check public rates
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <aside className="relative rounded-lg border border-white/10 bg-black/45 p-5 shadow-[0_1.5rem_5rem_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.1)] sm:p-6">
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-accent-bright)]/70 to-transparent" aria-hidden="true" />
            <p className="section-kicker">Best first conversation</p>
            <h2 className="!mb-0 !mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl">A rendering or GPU decision has become a product decision.</h2>
            <div className="mt-7 grid gap-3">
              {["Roadmap impact", "Leadership involved", "GPU-level expertise"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] px-3 py-2.5 text-sm font-semibold text-neutral-200">
                  <span className="h-2 w-2 rounded-full bg-[var(--brand-accent-bright)] shadow-[0_0_0.8rem_rgba(125,205,185,0.7)]" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="site-container py-14 sm:py-16 lg:py-20">
        <div className="section-head mb-10 sm:mb-12">
          <p className="section-kicker">Call DevSH when</p>
          <h2 className="section-heading">The outcome depends on specialist graphics judgment.</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {callSignals.map((signal) => (
            <SignalCard key={signal.title} {...signal} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/45 py-14 sm:py-16 lg:py-20">
        <div className="site-container">
          <div className="section-head mb-10 sm:mb-12">
            <p className="section-kicker">Who can spot the fit</p>
            <h2 className="section-heading">Strong introductions come from people close to the problem.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <ReferralList title="People who often recognize the problem first." kicker="Connector profile" items={connectorRoles} />
            <ReferralList title="The first call should include someone accountable for the product outcome." kicker="Accountable owner" items={decisionRoles} />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/45 py-14 sm:py-16 lg:py-20">
        <div className="site-container grid gap-5 lg:grid-cols-2">
          <FitList title="DevSH is strongest when graphics is close to product value." items={goodFit} tone="good" />
          <FitList title="These requests are usually better handled elsewhere." items={notFit} tone="bad" />
        </div>
      </section>

      <section className="site-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="section-kicker">How an engagement starts</p>
            <h2 className="section-heading !mt-3">Start with the product decision, then scope the engineering work.</h2>
            <p className="!mb-0 !mt-5 text-base leading-relaxed text-neutral-300 sm:text-lg">
              We look at product context, technical constraint, clear ownership, and business context. If there is a fit, the next step is scoped around a concrete technical outcome.
            </p>
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

      <section className="border-y border-white/10 bg-black py-14 sm:py-16 lg:py-20">
        <div className="site-container">
          <div className="section-head mb-10 sm:mb-12">
            <p className="section-kicker">Evidence</p>
            <h2 className="section-heading">Evidence of deep graphics engineering.</h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {proofPoints.map((point) => (
              <ProofCard key={point.title} point={point} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-8 rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(12,31,30,0.72),rgba(4,14,14,0.92))] p-5 shadow-[0_1.5rem_5rem_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-8 lg:grid-cols-[0.72fr_1fr] lg:p-10">
          <div>
            <p className="section-kicker">Forwardable introduction</p>
            <h2 className="!mb-0 !mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl">A short introduction you can forward.</h2>
            <p className="!mb-0 !mt-5 text-base leading-relaxed text-neutral-300 sm:text-lg">
              Use this when someone asks who can help with a hard rendering, graphics, or GPU systems problem.
            </p>
          </div>
          <div className="min-w-0 rounded-md border border-white/10 bg-black/55 p-4 sm:p-5">
            <pre className="!m-0 whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-neutral-200 sm:text-base">{introText}</pre>
          </div>
        </div>
      </section>

      <section className="site-container pb-16 sm:pb-20 lg:pb-24">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/45 p-6 text-center sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-accent-bright)]/70 to-transparent" aria-hidden="true" />
          <p className="section-kicker">Next step</p>
          <h2 className="!mb-0 !mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">Make the introduction when the graphics decision matters.</h2>
          <p className="!mx-auto !mb-0 !mt-5 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            DevSH is most useful when product or engineering leadership already knows that rendering architecture, GPU performance, or shader tooling can shape delivery.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={contactHref} className="premium-cta brand-button inline-flex items-center gap-3 rounded-lg border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5">
              Send an introduction
              <ArrowIcon />
            </a>
            <Link href="/services" className="inline-flex items-center gap-3 rounded-lg border border-white/18 bg-black/28 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/32 hover:bg-white/[0.08]">
              See services
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
