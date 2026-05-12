import Image from "next/image";

type Photo = { caption: string; image: string | null };

const photos: Photo[] = [
  { caption: "Presenting at Shading Language Symposium 2026", image: "/vulkanised_photos/2026/2026_02.jpg" },
  { caption: "Our booth at Vulkanised 2026",                  image: "/vulkanised_photos/2026/2026_10.jpg" },
  { caption: "Presenting at Vulkanised 2023",                 image: "/vulkanised_photos/2023/2023_1.jpg"  },
  { caption: "Presenting at Vulkanised 2026",                 image: "/vulkanised_photos/2026/2026_09.jpg" },
];
function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <div className="media-hover group relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-black">
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.06]">
        {photo.image ? (
          <Image
            src={photo.image}
            alt={photo.caption}
            fill
            sizes="(min-width: 40rem) 50vw, 100vw"
            loading="eager"
            className="object-cover"
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <p className="absolute bottom-0 left-0 right-0 !m-0 px-4 py-3 text-sm font-medium text-white sm:text-base">
        {photo.caption}
      </p>
    </div>
  );
}

export default function EcosystemSection() {
  return (
    <section
      id="ecosystem"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/10 bg-black pb-6 pt-14 sm:pb-6 sm:pt-[4.5rem] lg:pb-6 lg:pt-20"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(125,205,185,0.13),transparent_44%),linear-gradient(180deg,rgba(0,0,0,0.96),rgba(0,0,0,1)_58%)]"
      />
      <div className="site-container relative z-10">
        <div className="section-head mb-9 sm:mb-10">
          <p className="section-kicker">Community and standards</p>
          <h2 className="section-heading">
            Advancing the Ecosystem
          </h2>
          <p className="section-lede text-neutral-200">
            We actively contribute to the graphics programming community through
            our technical blog and presentations at major conferences like
            Vulkanised and the Shading Languages Symposium.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="/presentations"
              className="group inline-flex items-center gap-2.5 rounded-md border bg-black/25 px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/40 hover:shadow-[0_0_1.5rem_rgba(85,181,166,0.18)] sm:px-6 sm:text-base"
              style={{ borderColor: "rgba(125, 205, 185, 0.7)", color: "var(--brand-accent-bright)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
              Watch our Presentations
            </a>
            <a
              href="/blog"
              className="group inline-flex items-center gap-2.5 rounded-md border bg-black/25 px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/40 hover:shadow-[0_0_1.5rem_rgba(85,181,166,0.18)] sm:px-6 sm:text-base"
              style={{ borderColor: "rgba(125, 205, 185, 0.7)", color: "var(--brand-accent-bright)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                <line x1="8" y1="7" x2="16" y2="7" />
                <line x1="8" y1="11" x2="16" y2="11" />
                <line x1="8" y1="15" x2="12" y2="15" />
              </svg>
              Technical Blog
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
          {photos.map((p) => (
            <PhotoCard key={p.caption} photo={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
