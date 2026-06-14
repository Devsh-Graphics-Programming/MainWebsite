import { aboutParagraphs } from "../data/aboutContent";
import NablaShaderBackdrop from "../nabla/NablaShaderBackdrop";

const heroStatement = "We are not a traditional software house";
const extractedSentence = `${heroStatement}.`;
const bodyParagraphs = aboutParagraphs.map((paragraph) =>
  paragraph.replace(` ${extractedSentence}`, "")
);

export default function Page() {
  return (
    <main className="about-shell min-h-screen overflow-hidden">
      <section className="service-hero about-hero flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="service-hero-cloud">
          <div className="service-hero-cloud-base" />
          <NablaShaderBackdrop />
          <div className="service-hero-cloud-vignette" />
        </div>
        <div className="site-container relative z-10 flex flex-col items-center text-center">
          <div className="flex max-w-5xl flex-col items-center gap-5">
            <h1 className="!m-0 bg-[linear-gradient(135deg,#fff_18%,#f4fffb_58%,var(--brand-accent-bright)_100%)] bg-clip-text text-5xl font-semibold leading-[0.96] tracking-tight text-transparent drop-shadow-[0_0_1.8rem_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl">
              Who We Are
            </h1>
            <p className="about-hero-statement">
              {heroStatement}
            </p>
          </div>
        </div>
      </section>

      <section className="site-container-narrow about-content">
        <div className="about-editorial">
          {bodyParagraphs.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "about-copy about-copy--lead" : "about-copy"}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
