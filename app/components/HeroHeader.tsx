export default function HeroHeader() {
  return (
    <section className="w-full pt-8 pb-12 sm:pt-12 sm:pb-20">
      <div className="flex flex-col items-center text-center gap-6 sm:gap-8">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl">
          Elite Graphics Programming
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, var(--brand-accent), var(--brand-accent-bright))",
            }}
          >
            &amp; Performance Optimization.
          </span>
        </h1>

        <p className="text-base sm:text-xl lg:text-2xl text-neutral-400 font-thin max-w-2xl">
          Renderers, simulations and compilers built by consultants who ship at the silicon level.
        </p>

        <a
          href="mailto:newclients@devsh.eu"
          className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 mt-2 text-base sm:text-lg font-medium text-black rounded-md transition-all duration-150 hover:scale-[1.03] hover:shadow-[0_0_40px_var(--brand-accent-glow)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
          style={{
            backgroundColor: "var(--brand-accent)",
          }}
        >
          <span>Talk With Our Experts</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
