// ─── Edit this list to update the expertise cards ───────────────────────────
// Set `image` to a path under /public (e.g. "/expertise/compute.jpg") or a
// full URL.  Leave as null to keep the placeholder until the image is ready.
const items: { title: string; image: string | null }[] = [
  { title: "High-Performance Compute & Optimization",      image: null },
  { title: "Path Tracing and Physically-Based Rendering",  image: null },
  { title: "CAD Visualization & Scientific Visualization", image: null },
  { title: "Computational Geometry",                       image: null },
  { title: "Real-Time Graphics & Engine Optimization",     image: null },
  { title: "VR & Mobile GPU Optimizations",                image: null },
  { title: "Photogrammetry and Differentiable Rendering",  image: null },
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

function Card({ title, image }: { title: string; image: string | null }) {
  return (
    <div className="group relative w-full sm:w-[210px] aspect-[16/9] rounded-lg overflow-hidden border border-[#222] transition-all duration-150 hover:border-[var(--brand-accent)] hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--brand-accent-glow)] cursor-default flex-shrink-0">
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
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

      {/* Title overlaid at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
        <p className="text-white text-xs sm:text-[0.8rem] font-medium leading-snug drop-shadow-sm transition-colors duration-150 group-hover:text-[var(--brand-accent-bright)]">
          {title}
        </p>
      </div>
    </div>
  );
}

export default function ExpertiseGrid() {
  return (
    <section className="w-full md:w-[60%] mx-auto pb-4 sm:pb-6">
      <h2 className="text-center !mt-0 !mb-4 text-2xl sm:text-3xl">Our Expertise</h2>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
        {items.map((it) => (
          <Card key={it.title} title={it.title} image={it.image} />
        ))}
      </div>
    </section>
  );
}
