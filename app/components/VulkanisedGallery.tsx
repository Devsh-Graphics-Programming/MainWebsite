import vulkanised from "@/app/data/vulkanised.json";
import { YouTubeEmbed } from "@next/third-parties/google";

function Gallery({ videos }: { videos: string[] }) {
    return (
        <div className="flex flex-col w-full h-full gap-4">
            {videos.map((video, index) => (
                <div className="aspect-video w-full" key={index}>
                    <YouTubeEmbed videoid={video}/>
                </div>
            ))}
        </div>
    )
}

export default function VulkanisedGallery() {
    return (
        <div className="flex flex-col lg:flex-row justify-center gap-8 w-full">
            {vulkanised.map((year, index) => (
                <div className="w-full max-w-[]" key={index}>
                    <h3 className="my-2">{`Vulkanised ${year.year}`}</h3>
                    <Gallery videos={year.videos}/>
                </div>
            ))}
        </div>
    )
}