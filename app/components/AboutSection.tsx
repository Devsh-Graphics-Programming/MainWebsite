import CTAButton from "./CTAButton";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 pb-14 pt-6 sm:pb-20 sm:pt-6 lg:pb-24 lg:pt-6">
      <div className="site-container-narrow">
        <div className="section-head mb-9 sm:mb-10">
          <h2 className="section-heading">About DevSH</h2>
        </div>

        <div className="flex flex-col gap-5 text-base leading-relaxed text-neutral-300 sm:text-lg">
          <p className="!m-0">
            DevSH Graphics Programming Sp. z O.O is a company focused on
            Graphics, GPU and High Performance Computing. Our consultants
            develop and maintain Renderers, Simulations and Compilers for our
            Clients, integrated into or working alongside their teams. We are
            not a Software House &mdash; we work very closely and synergize with
            our Clients&apos; engineers. We also conduct our own R&amp;D
            developing our own Open Source Middleware and Libraries, the most
            prominent being Nabla, as well as contributing to existing ones.
          </p>
          <p className="!m-0">
            The primary mission for all of our self-funded developments is to
            advance Open Source ecosystems with innovative tooling with a
            particular focus on Khronos Standards. We maintain a single source
            HLSL202x/C++20 Standard Template Header Only Library and our Utility
            and Rapid Prototyping Framework Nabla designed to give a CUDA-like
            programming experience within the Vulkan ecosystem.
          </p>
          <p className="!m-0">
            We have honed the culture of remote work since the company&apos;s
            inception, and way before the 2019 paradigm shift. Subject to
            availability and specific expertise required, our consultants&apos;
            regular working hours overlap the normal working hours from San
            Francisco to Sydney.
          </p>
          <p className="!m-0">
            Our alumni have since worked at Intel, Huawei, ARM and Apple as
            driver and devtech developers, and on AAA games.
          </p>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
