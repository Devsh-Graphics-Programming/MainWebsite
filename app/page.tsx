import Link from "next/link";
import VulkanisedGallery from "./components/VulkanisedGallery";

export default function Home() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 sm:gap-8 sm:items-center">
      <h1>Website Under Construction</h1>
      <h3>Check out our Vulkanised videos below</h3>
      <VulkanisedGallery/>
      <h3>And <Link href="https://youtube.com/watch?v=L0i_cO1iSEM&t=9343" className="text-teal-300 hover:underline" target="_blank" rel="noopener noreferer">MINE GameDev video</Link></h3>
    </div>
  );
}
