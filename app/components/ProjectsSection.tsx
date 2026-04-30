import Image from "next/image";

type Partner = {
  name: string;
  initials: string;
  logo: string | null;
  url: string | null;
  logoTone?: "normal" | "invert";
};

type ProjectImage = {
  src: string;
  alt: string;
  fit?: "cover" | "contain";
};

type Project = {
  slug: string;
  company: string;
  url?: string;
  title: string;
  summary: string;
  bullets: string[];
  images: ProjectImage[];
  accent?: string;
  scope?: string[];
  visualLayout?: "grid" | "stacked";
};

const partners: Partner[] = [
  { name: "Ditt", initials: "DT", logo: "/partners/ditt.png", url: "https://www.ditt.nl/" },
  { name: "Applications in CADD", initials: "AC", logo: "/partners/appscadd.png", url: "https://appsincadd.co.uk/" },
  { name: "Wild Inc.", initials: "WI", logo: null, url: null },
  { name: "Imverse", initials: "IM", logo: "/partners/imverse.png", url: "https://www.imverse.ch/" },
  { name: "RELEX Solutions", initials: "RX", logo: "/partners/relex.png", url: "https://relexsolutions.com/" },
  { name: "Synera", initials: "SY", logo: "/partners/synera.png", url: "https://www.synera.io/", logoTone: "invert" },
];

const projects: Project[] = [
  {
    slug: "ditt",
    company: "Ditt",
    url: "https://www.ditt.nl/",
    title: "Interactive GPU Path Tracer",
    summary: "Real-time and offline rendering work for interior design workflows using OpenCL, OptiX, Mitsuba and Vulkan.",
    bullets: [
      "Interactive GPU Path Tracer (OpenCL and OptiX) ingesting existing Mitsuba scenes",
      "Maintenance of in-house interior design tool",
      "Integration of new Real-Time rendering techniques for rapid previews in the design tool",
      "Denoisers (AI, RWMC, etc.) and Image Processing (e.g. FFT Convolution Bloom)",
      "Consulting w.r.t. existing Mitsuba render farm",
      "Ongoing Vulkan Real-Time Path Tracer development",
    ],
    images: [
      { src: "/nabla_screenshot1.jpg", alt: "Path traced interior scene", fit: "cover" },
      { src: "/clients/ditt/ditt1.jpg", alt: "Interior design rendering viewport", fit: "cover" },
      { src: "/clients/ditt/ditt2.jpg", alt: "Rendered interior preview", fit: "cover" },
      { src: "/clients/ditt/ditt4.png", alt: "Rendering pipeline output", fit: "contain" },
    ],
  },
  {
    slug: "appscadd",
    company: "Applications in CADD",
    url: "https://appsincadd.co.uk/",
    title: "GPU-Driven Graphics Engine for n4ce v5.0",
    summary: "A tailored GPU-driven renderer for large point cloud and civil engineering datasets on top of Nabla.",
    bullets: [
      "Development of a tailor-made, GPU-driven graphics engine for n4ce v5.0 using the Nabla platform",
      "Delivered a 100x performance improvement over the legacy system, transforming rendering times from multi-second bottlenecks into fluid, real-time visualization",
      "Engineered for extremely large point cloud datasets and modern large-scale civil engineering projects",
      "Significant performance improvements over the legacy n4ce renderer, designed to remain scalable for the next years",
      "Close collaboration to integrate the new renderer seamlessly into the n4ce v5.0 product",
      "Design and implementation of a modern build system, including shader preprocessing & embedded SPIR-V tooling",
      "Ongoing optimisation and support during the lead-up to the public BETA release",
    ],
    images: [
      { src: "/clients/apps_in_cadd/scene1.png", alt: "n4ce point cloud rendering viewport", fit: "contain" },
      { src: "/clients/apps_in_cadd/scene2.png", alt: "Large point cloud terrain visualization", fit: "cover" },
    ],
    visualLayout: "stacked",
  },
  {
    slug: "wild",
    company: "Wild Inc.",
    title: "Vulkan Mobile GPU Rendering",
    summary: "Deep Vulkan work for mobile GPUs, focused on synchronization, bindless rendering and tile-based renderer constraints.",
    bullets: [
      "Solving Vulkan synchronization issues",
      "Implementing bindless rendering",
      "Work around DXC and Adreno 600 limitations to allow the usage of Buffer Device Address",
      "Implementation of GPU-driven rendering",
      "Occlusion culling with a novel algorithm specifically designed for mobile TBDR GPUs (see our Vulkanised 2026 talk)",
      "And much more",
    ],
    images: [
      { src: "/clients/wild/wild_gif2.gif", alt: "Mobile rendering capture", fit: "cover" },
      { src: "/clients/wild/wild3.jpg", alt: "Wild project rendering scene", fit: "cover" },
      { src: "/clients/wild/wild4.jpg", alt: "Wild rendering environment", fit: "cover" },
    ],
  },
  {
    slug: "imverse",
    company: "Imverse",
    url: "https://www.imverse.ch/",
    title: "GPGPU Computer Vision",
    summary: "Computer vision acceleration work for real-time volumetric capture and RGB+D processing.",
    bullets: [
      "GPGPU Consulting and Contracting to solve Computer Vision problems",
      "GPU Accelerated Silhouette Carving from RGB+D real-time video inputs",
    ],
    images: [
      { src: "/clients/imverse/imverse1.webp", alt: "Imverse volumetric capture output", fit: "cover" },
    ],
  },
  {
    slug: "relex",
    company: "RELEX Solutions",
    url: "https://relexsolutions.com/",
    title: "Web & Native Renderer Feasibility",
    summary: "Feasibility work around .NET, WASM, Blazor, TypeScript and C# interop for a unified renderer path.",
    bullets: [
      "Investigation of the new .NET 6 WASM and Blazor SDKs (example issues reported to Microsoft)",
      "Feasibility studies of TypeScript and C# interoperation and Unified Web & Native Renderer",
    ],
    images: [],
    accent: "Architecture study",
    scope: [".NET / WASM", "Interop", "Renderer architecture"],
  },
  {
    slug: "synera",
    company: "Synera",
    url: "https://www.synera.io/",
    title: "Renderer Performance Analysis & Design",
    summary: "Performance diagnosis and renderer architecture planning for complex engineering scenes.",
    bullets: [
      "Deep performance analysis identifying Rendering bottlenecks on complex scenes",
      "Plan of action and initial design for a new Renderer",
      "Conclusion and recommendations for the renderer redesign",
    ],
    images: [],
    accent: "Performance appraisal",
    scope: ["Profiling", "Bottlenecks", "Renderer design"],
  },
  {
    slug: "buildaworld",
    company: "Build A World Aps.",
    title: "Photogrammetry & Point Cloud Pipeline",
    summary: "World reconstruction work spanning point clouds, LiDAR, OpenGL rendering, simulation and voxel physics.",
    bullets: [
      "Photogrammetry (generating point clouds from drone flythroughs)",
      "LiDAR Point Cloud Processing and Volume Reconstruction (3D game worlds from aerial scans)",
      "Maintaining and Extending the existing OpenGL engine",
      "GLSL Shader Development (ocean simulation, particle simulation)",
      "Distributed Networked Fluid Simulation",
      "Physics Engine Development (high performance voxel connectivity for destruction)",
    ],
    images: [
      { src: "/clients/baw/volume_reconstruct.png", alt: "Volume reconstruction output", fit: "cover" },
      { src: "/clients/baw/baw3.jpg", alt: "Generated world terrain", fit: "cover" },
      { src: "/clients/baw/baw2.jpg", alt: "Photogrammetry reconstruction scene", fit: "cover" },
      { src: "/clients/baw/baw7.jpg", alt: "Point cloud reconstruction output", fit: "cover" },
    ],
  },
];

function LogoMark({ partner }: { partner: Partner }) {
  if (partner.logo) {
    return (
      <span className="relative block h-8 w-20 sm:w-24">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          sizes="7rem"
          loading="eager"
          className={`object-contain opacity-90 transition duration-200 group-hover:opacity-100 ${
            partner.logoTone === "invert" ? "invert" : ""
          }`}
        />
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className="flex h-9 w-9 items-center justify-center rounded border border-white/10 text-xs font-semibold text-[var(--brand-accent-bright)] sm:h-10 sm:w-10"
        aria-hidden="true"
      >
        {partner.initials}
      </span>
      <span className="text-sm font-medium text-neutral-200">{partner.name}</span>
    </div>
  );
}

function LogoTile({ partner }: { partner: Partner }) {
  const className =
    `group flex h-14 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] px-4 transition duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-accent)]/50 hover:bg-white/[0.07] hover:shadow-[0_0_1.5rem_rgba(85,181,166,0.16)] ${
      partner.logo ? "min-w-[6.75rem]" : "min-w-[8.75rem]"
    }`;

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer" title={partner.name} className={className}>
        <LogoMark partner={partner} />
      </a>
    );
  }

  return (
    <div title={partner.name} className={className}>
      <LogoMark partner={partner} />
    </div>
  );
}

function PartnerLogos() {
  return (
    <div className="mb-6 py-3 sm:mb-7 sm:py-4 lg:mb-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center sm:gap-6">
        <div className="max-w-3xl">
          <p className="section-kicker">Trusted by product teams</p>
          <h3 className="!mb-0 !mt-3 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
            Trusted where graphics work has to ship.
          </h3>
        </div>

        <div className="flex max-w-5xl flex-wrap justify-center gap-2.5 sm:gap-3">
          {partners.map((p) => (
            <LogoTile key={p.name} partner={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectImageCard({ image, priority }: { image: ProjectImage; priority?: boolean }) {
  return (
    <div className="media-hover group relative aspect-video w-full overflow-hidden rounded-lg bg-black ring-1 ring-inset ring-white/10">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 64rem) 50vw, 100vw"
        priority={priority}
        loading={priority ? undefined : "eager"}
        unoptimized={image.src.endsWith(".gif")}
        className={`${image.fit === "contain" ? "object-contain" : "object-cover"} rounded-lg transition-transform duration-500 group-hover:scale-[1.035]`}
      />
    </div>
  );
}

function ConsultingScope({ project }: { project: Project }) {
  const scope = project.scope ?? ["Analysis", "Design", "Review"];

  return (
    <div className="surface-panel brand-hover flex h-full flex-col justify-center p-5 sm:p-7 lg:p-8">
      <p className="section-kicker">{project.accent ?? "Consulting scope"}</p>
      <h3 className="!mb-3 !mt-3 text-2xl font-semibold leading-tight sm:!mt-4 sm:text-3xl">{project.title}</h3>
      <p className="!m-0 text-base leading-relaxed text-neutral-300">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
        {scope.map((item) => (
          <span key={item} className="rounded border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-neutral-300">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ImageGrid({ images, layout = "grid" }: { images: ProjectImage[]; layout?: Project["visualLayout"] }) {
  if (images.length === 0) {
    return null;
  }

  if (images.length === 1) {
    return <ProjectImageCard image={images[0]} priority />;
  }

  if (layout === "stacked") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:gap-5">
        {images.map((image, index) => (
          <ProjectImageCard key={`${image.src}-${index}`} image={image} priority={index === 0} />
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {images.map((image, index) => (
          <div key={`${image.src}-${index}`} className={index === 2 ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%_-_0.5rem)]" : ""}>
            <ProjectImageCard image={image} priority={index === 0} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.slice(0, 4).map((image, index) => (
        <ProjectImageCard key={`${image.src}-${index}`} image={image} priority={index === 0} />
      ))}
    </div>
  );
}

function ExternalArrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M7 5h8v8" />
      <path d="M15 5 6 14" />
    </svg>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const reverse = index % 2 === 1;
  const hasImages = project.images.length > 0;

  const heading = project.url ? (
    <a href={project.url} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 hover:text-[var(--brand-accent-bright)]">
      {project.company}
      <ExternalArrow />
    </a>
  ) : (
    project.company
  );

  if (!hasImages) {
    return (
      <article id={`project-${project.slug}`} className="scroll-mt-24 border-t border-white/10 pt-8 sm:pt-9 lg:pt-10">
        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-10">
          <div className={`order-2 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
            <ConsultingScope project={project} />
          </div>
          <div className={`order-1 flex flex-col justify-center py-1 lg:py-2 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
            <p className="section-kicker mb-3">{project.accent ?? project.title}</p>
            <h3 className="!mb-3 !mt-0 text-2xl font-semibold leading-tight sm:text-3xl">{heading}</h3>
            <ul className="!m-0 flex list-none flex-col gap-3 p-0 sm:gap-3.5">
              {project.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-accent)]" aria-hidden="true" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      id={`project-${project.slug}`}
      className="grid scroll-mt-24 grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:gap-7 sm:pt-9 lg:grid-cols-2 lg:gap-10 lg:pt-10"
    >
      <div className={`flex flex-col justify-center ${reverse ? "lg:order-2" : ""}`}>
        <div className="mb-4 flex flex-col gap-3">
          <p className="section-kicker">{project.accent ?? project.title}</p>
          <h3 className="!m-0 text-2xl font-semibold leading-tight sm:text-3xl">{heading}</h3>
          <p className="!m-0 text-base leading-relaxed text-neutral-300 sm:text-lg">{project.summary}</p>
        </div>

        <ul className="!m-0 flex list-none flex-col gap-3 p-0 sm:gap-3.5">
          {project.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-accent)]" aria-hidden="true" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`self-center ${reverse ? "lg:order-1" : ""}`}>
        <ImageGrid images={project.images} layout={project.visualLayout} />
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 pb-12 pt-0 sm:pb-16 lg:pb-20">
      <div className="site-container">
        <div className="section-head mb-7 sm:mb-9">
          <p className="section-kicker">Commercial work</p>
          <h2 className="section-heading">Engineered Solutions for Our Partners</h2>
          <p className="section-lede text-neutral-400">
            Long-term rendering, GPU, compiler and visualization work delivered close to client engineering teams.
          </p>
        </div>

        <PartnerLogos />

        <div className="flex flex-col gap-8 sm:gap-9">
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
