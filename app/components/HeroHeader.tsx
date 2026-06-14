import NablaShaderBackdrop from "../nabla/NablaShaderBackdrop";
import CTAButton from "./CTAButton";

export default function HeroHeader() {
  return (
    <section className="home-hero-cloud relative isolate flex w-full items-center overflow-hidden py-12 sm:py-14 lg:py-16">
      <div aria-hidden="true" className="home-hero-cloud-field">
        <div className="home-hero-cloud-base" />
        <NablaShaderBackdrop />
        <div className="home-hero-cloud-vignette" />
      </div>
      <div className="site-container relative z-10 flex flex-col items-center text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="!my-0 max-w-5xl bg-[linear-gradient(135deg,#fff_18%,#f5fffb_62%,var(--brand-accent-bright)_100%)] bg-clip-text text-4xl font-bold leading-[1.02] text-transparent drop-shadow-[0_0_1.4rem_rgba(0,0,0,0.45)] sm:text-5xl lg:text-4xl xl:text-5xl">
            High-Performance Graphics Software Development
          </h1>
          <p className="cloud-lead max-w-3xl">
            Supercharge your visually-demanding applications with next-generation rendering solutions, high-performance compute, and relentless optimization.
          </p>
        </div>
        <div className="mt-8 sm:mt-9">
          <CTAButton href="/services" />
        </div>
        <div
          aria-hidden="true"
          className="mt-4 h-px w-full max-w-md bg-gradient-to-r from-transparent via-[var(--brand-accent)]/30 to-transparent sm:mt-5"
        />
      </div>
    </section>
  );
}
