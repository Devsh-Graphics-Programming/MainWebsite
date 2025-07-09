import VulkanisedGallery from "./components/VulkanisedGallery";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col gap-4 sm:gap-8 sm:items-center">
      <h1>Website Under Construction</h1>
      <h3>Check out our Vulkanised videos below</h3>
      <VulkanisedGallery/>
      <h3>and <Link href="https://youtube.com/watch?v=L0i_cO1iSEM&t=9343" className="devsh-link" target="_blank" rel="noopener noreferer">MINE GameDev video</Link></h3>
    </main>
  );
}
