// ─── Edit this list to update each project ─────────────────────────────────
// `slug`   — must match the matching expertise item's slug
// `title`  — project name
// `bullets`— bullet points shown next to the image grid
// `images` — array of paths/URLs for the 4-image mockup grid (2x2).
//            Leave entries as null to keep the placeholder.
type Project = {
  slug: string;
  title: string;
  bullets: string[];
  images: (string | null)[];
};

const projects: Project[] = [
  {
    slug: "compute",
    title: "High-Performance Compute Pipeline",
    bullets: [
      "TODO: Headline result, e.g. 4× throughput gain",
      "TODO: Key technique, e.g. GPU kernel fusion",
      "TODO: Outcome / measurable impact",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "pathtracing",
    title: "Advanced Ray Tracing Pipeline",
    bullets: [
      "Implemented custom BVH acceleration structures",
      "Optimized sampling algorithms for real-time performance",
      "Reduced render times by 65% through GPU kernel optimization",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "cad",
    title: "CAD & Scientific Visualization Platform",
    bullets: [
      "TODO: Dataset scale handled (e.g. multi-billion triangles)",
      "TODO: Interactive feature, e.g. cross-sections / clipping",
      "TODO: Performance metric, e.g. 120 FPS at 4K",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "geometry",
    title: "Computational Geometry Toolkit",
    bullets: [
      "TODO: Algorithm class, e.g. robust mesh booleans",
      "TODO: Numerical stability technique",
      "TODO: Integration target / production usage",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "realtime",
    title: "Real-Time Engine Optimization",
    bullets: [
      "TODO: Engine / target platform",
      "TODO: Frame-time reduction achieved",
      "TODO: Bottleneck eliminated (CPU / GPU / memory)",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "vrmobile",
    title: "VR & Mobile GPU Rendering",
    bullets: [
      "TODO: Headset / SoC targeted",
      "TODO: Bandwidth or thermal win",
      "TODO: Visual quality preserved or improved",
    ],
    images: [null, null, null, null],
  },
  {
    slug: "photogrammetry",
    title: "Photogrammetry & Differentiable Rendering",
    bullets: [
      "TODO: Reconstruction pipeline (e.g. Gaussian splatting)",
      "TODO: Capture-to-asset turnaround time",
      "TODO: Differentiable component / loss",
    ],
    images: [null, null, null, null],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function PlaceholderTile() {
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
  // Always render 4 slots in a 2x2 grid.
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
          <PlaceholderTile key={i} />
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
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center scroll-mt-24"
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <h3 className="!mt-0 !mb-5 text-2xl sm:text-3xl font-semibold">
          {project.title}
        </h3>
        <ul className="flex flex-col gap-3 list-none p-0">
          {project.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base sm:text-lg text-neutral-300 leading-relaxed"
            >
              <span
                className="mt-2 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
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

        <div className="flex flex-col gap-16 sm:gap-24">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
