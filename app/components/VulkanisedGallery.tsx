"use client"

import vulkanised from "@/app/data/vulkanised.json";
import YouTube from "react-youtube";
import { useState, useEffect } from "react"; 
import useWindowSize, { WindowSize } from "../hooks/useWindowSize";

import 'swiper/css';
import 'swiper/css/bundle'

function Gallery({ videos }: { videos: string[] }) {
    const [playerSize, setPlayerSize] = useState<WindowSize>({width: 280, height: 160})
    const size = useWindowSize()

    // things just couldn't be ez since js yt player iframe is unresponsive so we have to force it
    useEffect(() => {
        if (size.width && size.height) {
            setPlayerSize({width: 320, height: 180})
            if (size.width >= 768) setPlayerSize({width: 640, height: 360})
            if (size.width >= 1024) setPlayerSize({width: 854, height: 480})
        }
    }, [size])

    return (
        <div className="flex flex-col w-full gap-4">
            {videos.map((video, index) => (
                <YouTube
                    key={index}
                    videoId={video}
                    opts={{
                        width: playerSize.width,
                        height: playerSize.height
                    }}
                />
            ))}
        </div>
    )
}

export default function VulkanisedGallery() {
    return (
        <div className="flex flex-col justify-center gap-16">
            {vulkanised.map((year, index) => (
                <div key={index}>
                    <h3 className="my-2">{`Vulkanised ${year.year}`}</h3>
                    <Gallery videos={year.videos}/>
                </div>
            ))}
        </div>
    )
}