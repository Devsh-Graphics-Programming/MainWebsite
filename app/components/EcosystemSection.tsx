// ─── Edit conference photos here ───────────────────────────────────────────
// `image`: path under /public or full URL. Leave null for a placeholder.
type Photo = { caption: string; image: string | null };

const photos: Photo[] = [
  { caption: "Presenting at Vulkanised 2025", image: null },
  { caption: "SIGGRAPH 2025 Technical Talk",  image: null },
  { caption: "GDC 2026 Panel Discussion",     image: null },
  { caption: "Khronos DevU Workshop",         image: null },
];
// ─────────────────────────────────────────────────────────────────────────────

function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div className="group relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-white/5">
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
        {photo.image ? (
          <img
            src={photo.image}
            alt={photo.caption}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#0e1f1f] flex items-center justify-center text-white/15">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="w-10 h-10"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Bottom gradient + caption */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <p className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white font-medium text-sm sm:text-base !m-0">
        {photo.caption}
      </p>
    </div>
  );
}

export default function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="-mx-4 px-4 py-16 sm:py-24 scroll-mt-24"
      style={{ backgroundColor: "var(--brand-deep)" }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <h2 className="!mt-0 !mb-4 text-3xl sm:text-4xl lg:text-5xl">
            Advancing the Ecosystem
          </h2>
          <p className="!m-0 text-neutral-300 text-base sm:text-lg leading-relaxed">
            We actively contribute to the graphics programming community through
            presentations at major conferences like Vulkanised, SIGGRAPH, GDC,
            and Khronos workshops, sharing our research and innovations with the
            industry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {photos.map((p) => (
            <PhotoCard key={p.caption} photo={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
