import CTAButton from "./CTAButton";

export default function HeroHeader() {
  return (
    <section className="relative isolate w-full overflow-hidden pb-1 pt-10 sm:pt-14 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(125,205,185,0.13),transparent_42%),radial-gradient(ellipse_at_50%_48%,rgba(85,181,166,0.07),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[12%] -z-10 h-[min(54vw,34rem)] w-[min(84vw,56rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(125,205,185,0.12)_0%,rgba(85,181,166,0.05)_36%,transparent_70%)] blur-3xl"
      />
      <div className="site-container relative flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="section-kicker">GPU consulting, rendering systems, performance engineering</p>
          <h1 className="!my-0 max-w-5xl text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl">
            Elite Graphics &amp; Performance
          </h1>
          <p className="!m-0 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg lg:text-xl">
            We build and optimize graphics engines, GPU pipelines, compilers, and visualization systems for teams shipping demanding rendering products.
          </p>
        </div>
        <div className="mt-8 sm:mt-9">
          <CTAButton />
        </div>
        <div
          aria-hidden="true"
          className="mt-4 h-px w-full max-w-md bg-gradient-to-r from-transparent via-[var(--brand-accent)]/30 to-transparent sm:mt-5"
        />
      </div>
    </section>
  );
}
