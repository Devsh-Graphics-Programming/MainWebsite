import vulkanisedData from "@/app/data/vulkanised.json";
import { YouTubeEmbed } from "@next/third-parties/google";

function Videos({ ytIdList }: { ytIdList: string[] }) {
    return (
        <>
            {ytIdList.map((ytId, index) => (
                <div className="w-full aspect-video overflow-auto" key={index}>
                    <YouTubeEmbed videoid={ytId}/>
                </div>
            ))}
        </>
    )
}

export default function VulkanisedGallery() {
    return (
        <div className="grid grid-cols-2 gap-4 w-full">
            {vulkanisedData.map((yearData, index) => (
                <div key={index}>
                    <h2>{yearData.year}</h2>
                    <div className="flex flex-col gap-2">
                        <Videos ytIdList={yearData.videos}/>
                    </div>
                </div>
            ))}
        </div>
    )   
}