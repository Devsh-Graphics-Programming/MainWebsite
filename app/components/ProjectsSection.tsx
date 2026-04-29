// ─── Partner logos strip ─────────────────────────────────────────────────────
// `logo`: path under /public. Set to null to show initials placeholder.
// `url`:  company website. Set to null if no link.
type Partner = { name: string; initials: string; logo: string | null; url: string | null };

const partners: Partner[] = [
  { name: "Ditt",                    initials: "DT",  logo: "/partners/ditt.png",     url: "https://www.ditt.nl/" },
  { name: "Build A World",           initials: "BAW", logo: null,                     url: null },
  { name: "Applications in CADD",    initials: "AC",  logo: "/partners/appscadd.png", url: "https://appsincadd.co.uk/" },
  { name: "Wild Inc.",               initials: "WI",  logo: null,                     url: null },
  { name: "Imverse",                 initials: "IM",  logo: "/partners/imverse.png",  url: "https://www.imverse.ch/" },
  { name: "RELEX Solutions",         initials: "RX",  logo: "/partners/relex.png",    url: "http://relexsolutions.com/" },
  { name: "Synera",                  initials: "SY",  logo: "/partners/synera.png",   url: "http://synera.io/" },
];
// ─────────────────────────────────────────────────────────────────────────────

// ─── Projects ────────────────────────────────────────────────────────────────
// `slug`   — must match the expertise item slug in ExpertiseGrid
// `images` — 4-slot array for the 2×2 image grid; null = placeholder
type Project = {
  slug: string;
  company: string;
  title: string;
  bullets: string[];
  images: (string | null)[];
};

const projects: Project[] = [
  {
    slug: "ditt",
    company: "Ditt",
    title: "Interactive GPU Path Tracer",
    bullets: [
      "Interactive GPU Path Tracer (OpenCL and OptiX) ingesting existing Mitsuba scenes",
      "Maintenance of in-house interior design tool",
      "Integration of new Real-Time rendering techniques for rapid previews in the design tool",
      "Denoisers (AI, RWMC, etc.) and Image Processing (e.g. FFT Convolution Bloom)",
      "Consulting w.r.t. existing Mitsuba render farm",
      "Ongoing Vulkan Real-Time Path Tracer development",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "buildaworld",
    company: "Build A World Aps.",
    title: "Photogrammetry & Point Cloud Pipeline",
    bullets: [
      "Photogrammetry (generating point clouds from drone flythroughs)",
      "LiDAR Point Cloud Processing and Volume Reconstruction (3D game worlds from aerial scans)",
      "Maintaining and Extending the existing OpenGL engine",
      "GLSL Shader Development (ocean simulation, particle simulation)",
      "Distributed Networked Fluid Simulation",
      "Physics Engine Development (high performance voxel connectivity for destruction)",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "appscadd",
    company: "Applications in CADD",
    title: "GPU-Driven Graphics Engine for n4ce v5.0",
    bullets: [
      "Development of a tailor-made, GPU-driven graphics engine for n4ce v5.0 using the Nabla platform",
      "Engineered for extremely large point cloud datasets and modern large-scale civil engineering projects",
      "Significant performance improvements over the legacy n4ce renderer, designed to remain scalable for the next years",
      "Close collaboration to integrate the new renderer seamlessly into the n4ce v5.0 product",
      "Design and implementation of a modern build system, including shader preprocessing & embedded SPIR-V tooling",
      "Ongoing optimisation and support during the lead-up to the public BETA release",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "wild",
    company: "Wild Inc.",
    title: "Vulkan Mobile GPU Rendering",
    bullets: [
      "Solving Vulkan synchronization issues",
      "Implementing bindless rendering",
      "Work around DXC and Adreno 600 limitations to allow the usage of Buffer Device Address",
      "Implementation of GPU-driven rendering",
      "Occlusion culling with a novel algorithm specifically designed for mobile TBDR GPUs (see our Vulkanised 2026 talk)",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "imverse",
    company: "Imverse",
    title: "GPGPU Computer Vision",
    bullets: [
      "GPGPU Consulting and Contracting to solve Computer Vision problems",
      "GPU Accelerated Silhouette Carving from RGB+D real-time video inputs",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "relex",
    company: "RELEX Solutions",
    title: "Web & Native Renderer Feasibility",
    bullets: [
      "Investigation of the new .Net 6 WASM and Blazor SDKs (example issues reported to Microsoft)",
      "Feasibility studies of TypeScript and C# interoperation and Unified Web & Native Renderer",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "synera",
    company: "Synera",
    title: "Renderer Performance Analysis & Design",
    bullets: [
      "Deep performance analysis identifying Rendering bottlenecks on complex scenes",
      "Plan of action and initial design for a new Renderer",
    ],
    images: [null, null, null, null],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function LogoTile({ partner }: { partner: Partner }) {
  const inner = partner.logo ? (
    <img
      src={partner.logo}
      alt={partner.name}
      className="h-10 w-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:brightness-110"
    />
  ) : (
    <div className="flex items-center justify-center h-10 px-4 rounded border border-white/20 bg-white/5 transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:border-[var(--brand-accent)]/60">
      <span className="text-white text-xs font-semibold tracking-widest">{partner.name}</span>
    </div>
  );

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        title={partner.name}
        className="group flex items-center"
      >
        {inner}
      </a>
    );
  }
  return (
    <div title={partner.name} className="group flex items-center">
      {inner}
    </div>
  );
}

function PartnerLogos() {
  return (
    <div className="mb-14 sm:mb-20">
      <p className="text-center text-sm sm:text-base text-neutral-500 uppercase tracking-widest mb-6 sm:mb-8">
        Trusted by
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
        {partners.map((p) => (
          <LogoTile key={p.name} partner={p} />
        ))}
      </div>
    </div>
  );
}

function PlaceholderTile({ label }: { label: string }) {
  return (
    <div className="relative w-full aspect-square rounded-md overflow-hidden bg-[#111] border border-[#1d1d1d] flex items-center justify-center text-white/10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    </div>
  );
}

function ImageGrid({ images, title }: { images: (string | null)[]; title: string }) {
  const slots = [0, 1, 2, 3].map((i) => images[i] ?? null);
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
      {slots.map((src, i) =>
        src ? (
          <img
            key={i}
            src={src}
            alt={`${title} preview ${i + 1}`}
            className="w-full aspect-square object-cover rounded-md border border-[#1d1d1d]"
          />
        ) : (
          <PlaceholderTile key={i} label={`${title} ${i + 1}`} />
        )
      )}
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <article
      id={`project-${project.slug}`}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start"
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <h3 className="!mt-0 !mb-1 text-2xl sm:text-3xl font-semibold leading-snug">
          {project.company}
        </h3>
        <p
          className="!m-0 mb-5 text-sm sm:text-base font-medium"
          style={{ color: "var(--brand-accent)" }}
        >
          {project.title}
        </p>
        <ul className="flex flex-col gap-3 list-none p-0 !m-0">
          {project.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm sm:text-base text-neutral-300 leading-relaxed"
            >
              <span
                className="mt-[0.45rem] inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--brand-accent)" }}
                aria-hidden="true"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <ImageGrid images={project.images} title={project.title} />
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-16 sm:py-24 scroll-mt-24">
      <div className="container mx-auto">
        <h2 className="text-center !mt-0 !mb-12 sm:!mb-16 text-3xl sm:text-4xl lg:text-5xl">
          Engineered Solutions for Our Partners
        </h2>

        <PartnerLogos />

        <div className="flex flex-col gap-16 sm:gap-24">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
