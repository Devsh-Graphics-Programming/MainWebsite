import VulkanisedGallery from "./components/VulkanisedGallery";
import { Chapter, DimmedParagraph } from "./components/TextUtils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 sm:gap-8 sm:items-center z-0">
      <div>
        <Chapter title="Briefly About Us">
          <DimmedParagraph>
            DevSH Graphics Programming sp. z o.o. operates as an organization dedicated to High-Performance Computing (HPC), with a 
            specific concentration in Computer Graphics and GPU Programming. We currently maintain a 
            team of ten consultants who are executing three concurrent projects, encompassing both 
            third-party consulting and development services for their products, as well as our own internal 
            Research and Development initiatives focused on producing Open-Source Middleware and Libraries.
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
