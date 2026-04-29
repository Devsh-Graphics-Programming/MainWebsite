// ─── Edit this list to update the expertise cards ───────────────────────────
// `image`: path under /public (e.g. "/expertise/compute.jpg") or null.
// `href`:  anchor target — use "#projects" for the section top or
//          "#project-{slug}" to jump to a specific project.
const items: { title: string; image: string | null; href: string }[] = [
  { title: "High-Performance Compute & Optimization",      image: "/nabla/nsc.png",                      href: "#projects"             },
  { title: "Path Tracing and Physically-Based Rendering",  image: "/nabla/rt_screenshot_both.jpg",       href: "#project-ditt"         },
  { title: "CAD & Scientific Visualization",               image: "/clients/apps_in_cadd/scene1.png",    href: "#project-appscadd"     },
  { title: "Computational Geometry",                       image: "/nabla/sdf_func_manip.gif",           href: "#project-appscadd"     },
  { title: "Real-Time Graphics & Engine Optimization",     image: "/clients/wild/wild_gif2.gif",         href: "#projects"             },
  { title: "VR & Mobile GPU",                              image: "/clients/imverse/imverse1.webp",      href: "#project-wild"         },
  { title: "Photogrammetry and Differentiable Rendering",  image: "/clients/baw/volume_reconstruct.png", href: "#project-buildaworld"  },
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

function Card({ title, image, href }: { title: string; image: string | null; href: string }) {
  return (
    <a
      href={href}
      aria-label={`Jump to ${title}`}
      className="group relative block w-[160px] sm:w-[200px] md:w-[240px] aspect-square rounded-lg overflow-hidden border border-[#333] transition-all duration-[750ms] hover:shadow-[0_0_24px_var(--brand-accent-glow)] flex-shrink-0"
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
      <div className="absolute inset-0 rounded-lg ring-2 ring-inset ring-transparent transition-all duration-[750ms] group-hover:ring-[var(--brand-accent)]/60" />

      {/* Title overlaid at bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-3">
        <p className="text-white text-xs sm:text-sm font-medium leading-snug drop-shadow-sm transition-colors duration-[750ms] group-hover:text-[var(--brand-accent-bright)]">
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
          <Card key={it.title} title={it.title} image={it.image} href={it.href} />
        ))}
      </div>
    </section>
  );
}
