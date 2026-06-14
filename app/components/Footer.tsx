import Link from "next/link";
import GP_Links from "./GP_Links";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing.pdf" },
  { label: "Nabla", href: "/nabla" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/devsh-graphics-programming/", icon: "linkedin" },
  { label: "X", href: "https://x.com/devsh_gfx_prog", icon: "x" },
  { label: "GitHub", href: "https://github.com/Devsh-Graphics-Programming", icon: "github" },
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5ZM.26 8h4.48v15H.26V8Zm7.08 0h4.29v2.05h.06c.6-1.13 2.06-2.32 4.24-2.32 4.53 0 5.37 2.98 5.37 6.86V23h-4.47v-7.46c0-1.78-.03-4.07-2.48-4.07-2.48 0-2.86 1.94-2.86 3.94V23H7.34V8Z" />
      </svg>
    );
  }

  if (icon === "x") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M13.83 10.17 20.9 2h-1.67l-6.14 7.09L8.18 2H2.53l7.42 10.72L2.53 21.3H4.2l6.49-7.5 5.18 7.5h5.65l-7.69-11.13Zm-2.3 2.66-.75-1.07L4.8 3.25h2.58l4.83 6.88.75 1.07 6.27 8.92h-2.58l-5.12-7.29Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18.92-.26 1.9-.38 2.88-.39.98.01 1.96.13 2.88.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.24 2.75.12 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-t-[#181818] bg-black">
      <div className="site-container py-6">
        <div className="grid gap-6 border-b border-white/10 pb-5 lg:grid-cols-[minmax(22rem,1fr)_auto_auto] lg:gap-12">
          <address className="max-w-xl text-[0.72rem] leading-snug text-neutral-500 not-italic sm:text-xs">
            <p className="!m-0 text-sm font-semibold text-white">DevSH Graphics Programming Sp. z o.o.</p>
            <p className="!mb-0 !mt-2 text-[0.95rem] leading-relaxed text-neutral-300 sm:text-base">
              High-performance software consultancy for demanding visual and compute systems.
            </p>
            <div className="mt-4 grid gap-1">
              <p className="!m-0">ul. Lipuska 36, 80-178 Gdansk, Poland</p>
              <p className="!m-0">
                <span className="block sm:inline">NIP 5833334868</span>
                <span className="hidden sm:inline"> | </span>
                <span className="block sm:inline">REGON 382168019</span>
                <span className="hidden sm:inline"> | </span>
                <span className="block sm:inline">KRS 0000764661</span>
              </p>
              <p className="!m-0">Share capital: 15 000 PLN paid in full</p>
            </div>
          </address>

          <nav aria-label="Footer navigation" className="grid content-start grid-cols-2 gap-x-8 gap-y-2 text-sm lg:min-w-52">
            {quickLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-neutral-400 transition-colors hover:text-[var(--brand-accent-bright)]">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-xs text-neutral-500 lg:min-w-56 lg:items-end lg:text-right">
            <a className="transition-colors hover:text-[var(--brand-accent-bright)]" href="mailto:devsh@devsh.eu">
              mail: devsh@devsh.eu
            </a>

            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid h-8 w-8 place-items-center rounded border border-white/10 bg-white/[0.025] text-neutral-500 transition hover:border-[var(--brand-accent)]/50 hover:bg-[var(--brand-accent)]/10 hover:text-[var(--brand-accent-bright)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-2 focus:ring-offset-black"
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-4 text-[10px] leading-none text-neutral-700 sm:flex-row sm:items-center">
          <p className="!m-0">© 2026 DevSH Graphics Programming Sp. z o.o.</p>
          <div className="flex items-center gap-3">
            <GP_Links />
            <a href="/build-info.json" className="transition-colors hover:text-neutral-500">
              build info
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
