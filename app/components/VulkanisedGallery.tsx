"use client"

import vulkanised from "@/app/data/vulkanised.json";
import YouTube from "react-youtube";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
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
            setPlayerSize({width: 280, height: (280*9)/16})
            if (size.width >= 768) setPlayerSize({width: 480, height: 270})
            if (size.width >= 1024) setPlayerSize({width: 720, height: 405})
        }
    }, [size])

    return (
        <>
        <button></button>
        <Swiper
            modules={[Pagination, Mousewheel, EffectCoverflow, Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            pagination={{
                type: "progressbar",
            }}
            navigation
            effect="coverflow"
            coverflowEffect={{
            }}
            className={`aspect-video w-[280px] md:w-[480px] lg:w-[720px] text-black`}
        >
            {videos.map((video, index) => (
                <SwiperSlide key={index}>
                    <YouTube
                        videoId={video}
                        opts={{width: playerSize.width, height: playerSize.height}}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        </>
    )
}

export default function VulkanisedGallery() {
    return (
        <div className="flex flex-col justify-center">
            {vulkanised.map((year, index) => (
                <div key={index}>
                    <h3 className="my-2">{`Vulkanised ${year.year}`}</h3>
                    <Gallery videos={year.videos}/>
                </div>
            ))}
        </div>
    )
}