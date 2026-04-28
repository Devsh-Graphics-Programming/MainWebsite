export default function HeroHeader() {
  return (
    <section className="w-full pt-4 pb-6 sm:pt-6 sm:pb-8">
      <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
        <h1 className="!my-0 text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight sm:whitespace-nowrap">
          Elite Graphics Programming &amp; Performance Optimization.
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-neutral-400 font-thin max-w-2xl">
          TODO some cool shit
        </p>

        <a
          href="mailto:newclients@devsh.eu"
          className="group relative inline-flex items-center justify-center gap-3 min-w-[280px] sm:min-w-[340px] px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-semibold text-black rounded-md transition-all duration-150 hover:scale-[1.03] hover:shadow-[0_0_40px_var(--brand-accent-glow)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
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
