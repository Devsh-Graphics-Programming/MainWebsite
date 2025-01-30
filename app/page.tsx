import VulkanisedGallery from "./components/VulkanisedGallery";

export default function Home() {
  return (
    <main className="container mx-auto p-4 flex flex-col gap-4 items-center">
      <h1 className="text-center">Website Under Construction</h1>
      <h3 className="text-center">Check out our Vulkanised videos below</h3>
      <VulkanisedGallery/>
    </main>
  );
}
