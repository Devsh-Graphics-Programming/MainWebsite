import vulkanisedData from "@/data/vulkanised.json";

function YouTubeEmbed({ videoId }: { videoId: string }) {
    return (
        <div className="w-full aspect-video overflow-hidden">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?wmode=transparent`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
            />
        </div>
    )
}

function Videos({ ytIdList }: { ytIdList: string[] }) {
    return (
        <>
            {ytIdList.map((ytId, index) => (
                <YouTubeEmbed key={index} videoId={ytId} />
            ))}
        </>
    )
}

export default function VulkanisedGallery() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full z-0">
            {vulkanisedData.map((yearData, index) => (
                <div key={index}>
                    <h2 className="text-center">{yearData.year}</h2>
                    <div className="flex flex-col gap-2 pt-4">
                        <Videos ytIdList={yearData.videos}/>
                    </div>
                </div>
            ))}
        </div>
    )   
}
