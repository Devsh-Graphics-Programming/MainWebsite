"use client"

import vulkanised from "@/app/data/vulkanised.json";
import YouTube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Navigation, EffectCoverflow } from "swiper/modules";
import { useState, useEffect } from "react";

import 'swiper/css';
import 'swiper/css/bundle'

type Size = {
    width: number | undefined,
    height: number | undefined
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState<Size>({width: undefined, height: undefined})

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth, 
                height: window.innerHeight 
            })
        }

        window.addEventListener("resize", handleResize);
        handleResize()
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowSize
}

function Gallery({ videos }: { videos: string[] }) {
    const [playerSize, setPlayerSize] = useState<Size>({width: 280, height: 160})
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