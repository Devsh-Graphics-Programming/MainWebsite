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
