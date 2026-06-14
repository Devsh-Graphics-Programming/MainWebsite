import CTAButton from "./CTAButton";

export default function AboutSection() {
  return (
    <section id="about" className="home-about-teaser scroll-mt-24 py-16 sm:py-20 lg:py-24">
      <div className="site-container">
        <div className="section-head">
          <h2 className="section-heading">Who We Are</h2>
          <div className="mt-8 sm:mt-9">
            <CTAButton href="/about" label="Meet DevSH" />
          </div>
        </div>
      </div>
    </section>
  );
}
