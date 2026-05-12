import CTAButton from "./CTAButton";
import { aboutParagraphs } from "../data/aboutContent";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pb-14 pt-6 sm:pb-20 sm:pt-6 lg:pb-24 lg:pt-6">
      <div className="site-container-narrow">
        <div className="section-head mb-9 sm:mb-10">
          <h2 className="section-heading">Who We Are</h2>
        </div>

        <div className="flex flex-col gap-5 text-base leading-relaxed text-neutral-300 sm:text-lg">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index} className="!m-0">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <CTAButton href="/services" />
        </div>
      </div>
    </section>
  );
}
