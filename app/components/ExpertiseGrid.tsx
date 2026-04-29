// ─── Edit this list to update the expertise cards ───────────────────────────
// `image`: path under /public (e.g. "/expertise/compute.jpg") or full URL.
//          Leave as null to keep the placeholder until the image is ready.
// `slug`:  must match the matching project's id in ProjectsSection so clicking
//          the card scrolls down to the corresponding project.
const items: { title: string; image: string | null; slug: string }[] = [
  { title: "High-Performance Compute & Optimization",      image: null, slug: "compute" },
  { title: "Path Tracing and Physically-Based Rendering",  image: null, slug: "pathtracing" },
  { title: "CAD & Scientific Visualization",               image: null, slug: "cad" },
  { title: "Computational Geometry",                       image: null, slug: "geometry" },
  { title: "Real-Time Graphics & Engine Optimization",     image: null, slug: "realtime" },
  { title: "VR & Mobile GPU",                              image: null, slug: "vrmobile" },
  { title: "Photogrammetry and Differentiable Rendering",  image: null, slug: "photogrammetry" },
];
// ─────────────────────────────────────────────────────────────────────────────

function PlaceholderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function Card({ title, image, slug }: { title: string; image: string | null; slug: string }) {
  return (
    <a
      href={`#project-${slug}`}
      aria-label={`Jump to ${title} project`}
      className="group relative block w-[160px] sm:w-[200px] md:w-[240px] aspect-square rounded-lg overflow-hidden border border-[#333] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_12px_48px_var(--brand-accent-glow)] flex-shrink-0"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[#111]" />
          <div className="absolute inset-0 flex items-center justify-center text-white/10">
            <PlaceholderIcon />
          </div>
        </>
      )}

      {/* Gradient fade so text is readable over any image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Accent border overlay — appears on hover without causing layout shift */}
      <div className="absolute inset-0 rounded-lg ring-2 ring-inset ring-transparent transition-all duration-500 group-hover:ring-[var(--brand-accent)]" />

      {/* Title overlaid at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-3">
        <p className="text-white text-xs sm:text-sm font-medium leading-snug drop-shadow-sm transition-colors duration-500 group-hover:text-[var(--brand-accent-bright)]">
          {title}
        </p>
      </div>
    </a>
  );
}

export default function ExpertiseGrid() {
  return (
    <section className="w-full md:w-[60%] mx-auto pb-10 sm:pb-16">
      <h2 className="text-center !mt-0 !mb-6 text-2xl sm:text-3xl">Our Expertise</h2>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
        {items.map((it) => (
          <Card key={it.slug} title={it.title} image={it.image} slug={it.slug} />
        ))}
      </div>
    </section>
  );
}
