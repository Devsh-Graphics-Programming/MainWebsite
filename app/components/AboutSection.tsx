import CTAButton from "./CTAButton";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-16 sm:py-24 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-center !mt-0 !mb-10 sm:!mb-12 text-3xl sm:text-4xl lg:text-5xl">
          About Us
        </h2>

        <div className="flex flex-col gap-5 text-base sm:text-lg leading-relaxed text-neutral-300">
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

        <div className="flex justify-center mt-12 sm:mt-16">
          <CTAButton />
        </div>
      </div>
    </section>
  );
}
