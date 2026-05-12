import CTAButton from "./CTAButton";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pb-14 pt-6 sm:pb-20 sm:pt-6 lg:pb-24 lg:pt-6">
      <div className="site-container-narrow">
        <div className="section-head mb-9 sm:mb-10">
          <h2 className="section-heading">Who We Are</h2>
        </div>

        <div className="flex flex-col gap-5 text-base leading-relaxed text-neutral-300 sm:text-lg">
          <p className="!m-0">
            DevSH Graphics Programming Sp. z O.O is a specialized collective of graphics engineers and mathematicians focused entirely on GPU architecture, rendering, and High-Performance Computing. We are not a traditional software house. We don’t build CRUD apps, and we don&apos;t do repetitive contract work. Instead, our consultants integrate directly alongside our clients&apos; engineering teams to architect renderers, simulations, and compilers at the frontier of what hardware can do.
          </p>
          <p className="!m-0">
            We train and work with the best in the field. Our alumni have gone on to drive the industry forward at Intel, ARM, and Apple as core driver and dev-tech engineers, as well as architecting engines for AAA games.
          </p>
          <p className="!m-0">
            We invest heavily in our own R&amp;D and Open Source middleware&mdash;most notably Nabla, our rapid prototyping framework designed to deliver a CUDA-like programming experience within the Vulkan ecosystem.
          </p>
          <p className="!m-0">
            We operate on a simple, uncompromising principle: work exists to serve your life, not the other way around.
          </p>
          <p className="!m-0">
            Because we reject the preposterous expectation that engineers should uproot their lives, spouses, and kids to move to a specific city for a job, DevSH has been a remote-first company since its inception&mdash;long before the industry paradigm shifted. We hire top-tier talent wherever they live. As a result, our team is globally distributed, with regular working hours overlapping all the way from San Francisco to Sydney.
          </p>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <CTAButton href="/services" />
        </div>
      </div>
    </section>
  );
}
