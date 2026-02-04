import VulkanisedGallery from "./components/VulkanisedGallery";
import { Chapter, DimmedParagraph } from "./components/TextUtils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 sm:gap-8 sm:items-center z-0">
      <div>
        <Chapter title="Briefly About Us">
          <DimmedParagraph>
            DevSH Graphics Programming Sp. z O.O is a company focused on Graphics, GPU and High Performance Computing. Our consultants develop and maintain Renderers, Simulations and Compilers for our Clients, integrated into or working alongside their teams. We are not a Software House, we work very closely and synergize with our Clients&apos; engineers.
            We also conduct our own R&amp;D developing our own Open Source Middleware and Libraries, the most prominent being Nabla, as well as contributing to existing ones.
            <br />
            <br />
            The primary mission for all of our self-funded developments is to advance Open Source ecosystems with innovative tooling with a particular focus on Khronos Standards. We maintain a single source HLSL202x/C++20 Standard Template Header Only Library and our Utility and Rapid Prototyping Framework Nabla designed to give a CUDA-like programming experience within the Vulkan ecosystem.
            <br />
            <br />
            We have honed the culture of remote work, since the company&apos;s inception, and way before the 2019 paradigm shift. Subject to availability and specific expertise required, our consultants&apos; regular working hours overlap the normal working hours from San Francisco to Sydney.
            <br />
            <br />
            Our alumni have since worked at Intel, Huawei, ARM and Apple as driver and devtech developers and on AAA games.
          </DimmedParagraph>
        </Chapter>
        <Link href="/about" className="devsh-link">Learn more here &rarr;</Link>
      </div>
      <h3>Check out our Vulkanised videos below</h3>
      <VulkanisedGallery/>
      <h3>and <Link href="https://youtube.com/watch?v=L0i_cO1iSEM&t=9343" className="devsh-link" target="_blank" rel="noopener noreferer">MINE GameDev video</Link></h3>
    </main>
  );
}
