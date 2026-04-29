// ─── Edit Nabla section content here ───────────────────────────────────────
// `visual`: path under /public to a 1:1 image / gif / svg. Leave null for the
//           styled "N" placeholder tile.
const NABLA = {
  repoUrl: "https://github.com/Devsh-Graphics-Programming/Nabla",
  visual: null as string | null,
  stats: {
    commits: "2,847",
    openPRs: "156",
  },
  bullets: [
    "Single-source HLSL202x/C++20 Standard Template Header-Only Library",
    "CUDA-like programming experience within the Vulkan ecosystem",
    "Utility and Rapid Prototyping Framework for modern GPU development",
    "Advancing Open Source ecosystems with innovative tooling",
    "Focus on Khronos Standards compliance and compatibility",
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function NablaVisual() {
  if (NABLA.visual) {
    return (
      <img
        src={NABLA.visual}
        alt="Nabla framework"
        className="w-full aspect-square object-cover rounded-xl"
      />
    );
  }
  return (
    <div
      className="w-full aspect-square rounded-xl flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, var(--brand-accent) 0%, var(--brand-deep) 70%)",
      }}
    >
      <span
        className="text-white font-bold select-none"
        style={{ fontSize: "min(40vw, 200px)", lineHeight: 1 }}
      >
        N
      </span>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center flex-1">
      <p
        className="!m-0 text-3xl sm:text-4xl font-bold"
        style={{ color: "var(--brand-accent-bright)" }}
      >
        {value}
      </p>
      <p className="!m-0 mt-1 text-xs sm:text-sm text-neutral-300 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function NablaSection() {
  return (
    <section id="nabla" className="w-full py-16 sm:py-24 scroll-mt-24">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="!mt-0 !mb-3 text-3xl sm:text-4xl lg:text-5xl">Nabla</h2>
          <p className="!m-0 text-neutral-400 text-base sm:text-lg">
            Our Open Source Rendering Framework
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-center">
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <NablaVisual />
          </div>

          <div className="flex flex-col gap-6 max-w-xl">
            <a
              href={NABLA.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl p-5 sm:p-6 border border-white/5 transition-all duration-150 hover:border-[var(--brand-accent)]/60 hover:-translate-y-0.5"
              style={{ backgroundColor: "var(--brand-deep)" }}
            >
              <div className="flex items-center gap-2 text-[var(--brand-accent-bright)] mb-4">
                <GitHubIcon className="w-5 h-5" />
                <span className="text-sm sm:text-base font-medium">View on GitHub</span>
              </div>
              <div className="flex items-stretch gap-4">
                <StatBlock value={NABLA.stats.commits} label="Commits" />
                <div className="w-px bg-white/10" aria-hidden="true" />
                <StatBlock value={NABLA.stats.openPRs} label="Open PRs" />
              </div>
            </a>

            <ul className="flex flex-col gap-3 list-none p-0 !m-0">
              {NABLA.bullets.map((b, i) => (
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
        </div>
      </div>
    </section>
  );
}
