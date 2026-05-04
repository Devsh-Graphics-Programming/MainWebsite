import Image from "next/image";

const items: { title: string; image: string | null; href: string }[] = [
  { title: "High-Performance Compute & Optimization",      image: "/nabla/nsc.png",                      href: "#projects"             },
  { title: "Path Tracing and Physically-Based Rendering",  image: "/nabla/rt_screenshot_both.jpg",       href: "#project-ditt"         },
  { title: "CAD & Scientific Visualization",               image: "/clients/apps_in_cadd/scene1_cropped.png", href: "#project-appscadd" },
  { title: "Computational Geometry",                       image: "/clients/apps_in_cadd/drawing3.jpg",      href: "#project-appscadd" },
  { title: "Real-Time Graphics & Engine Optimization",     image: "/clients/wild/wild_gif2.gif",         href: "#projects"             },
  { title: "VR & Mobile GPU",                              image: "/clients/imverse/imverse1.webp",      href: "#project-wild"         },
  { title: "Photogrammetry and Differentiable Rendering",  image: "/clients/baw/volume_reconstruct.png", href: "#project-buildaworld"  },
];
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
      className="media-hover group relative block aspect-[4/3] max-w-[22rem] flex-[1_1_18rem] overflow-hidden rounded-lg border border-white/10 bg-[var(--surface-soft)] sm:max-w-[19rem]"
    >
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
          loading="eager"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[#111]" />
          <div className="absolute inset-0 flex items-center justify-center text-white/10">
            <PlaceholderIcon />
          </div>
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

      <div className="absolute inset-0 rounded-lg ring-2 ring-inset ring-transparent transition-all duration-700 group-hover:ring-[var(--brand-accent)]/70" />

      <div className="absolute bottom-0 left-0 right-0 px-4 py-4" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)" }}>
        <p className="!m-0 text-center text-sm font-medium leading-snug text-white drop-shadow transition-colors duration-500 group-hover:text-[var(--brand-accent-bright)] sm:text-base">
          {title}
        </p>
      </div>
    </a>
  );
}

export default function ExpertiseGrid() {
  return (
    <section className="w-full pb-9 pt-3 sm:pb-11 sm:pt-4 lg:pb-12">
      <div className="site-container">
        <div className="section-head mb-7 sm:mb-8">
          <h2 className="section-heading">Our Expertise</h2>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-4">
          {items.map((it) => (
            <Card key={it.title} title={it.title} image={it.image} href={it.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
