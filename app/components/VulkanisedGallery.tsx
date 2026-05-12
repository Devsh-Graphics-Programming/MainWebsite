import vulkanisedData from "@/app/data/vulkanised.json";
import { YouTubeEmbed } from "@next/third-parties/google";

function Videos({ ytIdList }: { ytIdList: string[] }) {
    return (
        <>
            {ytIdList.map((ytId, index) => (
                <div className="media-hover group aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black" key={index}>
                    <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]">
                        <YouTubeEmbed videoid={ytId} params="wmode=transparent"/>
                    </div>
                </div>
            ))}
        </>
    )
}

export default function VulkanisedGallery() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full z-0">
            {vulkanisedData.map((yearData, index) => (
                <div key={index}>
                    <h2 className="text-center">
                        {yearData.url ? (
                            <a href={yearData.url} target="_blank" rel="noopener noreferrer">
                                {yearData.title}
                            </a>
                        ) : (
                            yearData.title
                        )}
                    </h2>
                    <div className="flex flex-col gap-2 pt-4">
                        <Videos ytIdList={yearData.videos}/>
                    </div>
                </div>
            ))}
        </div>
    )   
}
