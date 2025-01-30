"use client"

import vulkanised from "@/app/data/vulkanised.json";
import YouTube from "react-youtube";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Mousewheel, Autoplay, Scrollbar, EffectCoverflow } from "swiper/modules";
import { useState } from "react";

import 'swiper/css';
import 'swiper/css/bundle'

function Gallery({ videos }: { videos: string[] }) {
    return (
        <Swiper
            modules={[Pagination, Mousewheel, Autoplay, EffectCoverflow]}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            }}
            pagination={{
                type: "progressbar",
            }}
            effect="coverflow"
            coverflowEffect={{
            }}
            className="aspect-video h-full w-[280px] md:w-[480px] lg:w-[720px] text-black"
        >
            {videos.map((video, index) => (
                <SwiperSlide key={index}>
                    <YouTube 
                        videoId={video} 
                        onPlay={() => useSwiper().autoplay.stop()}
                        onEnd={() => useSwiper().autoplay.start()}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default function VulkanisedGallery() {
    return (
        <div className="flex flex-col justify-center gap-4">
            {vulkanised.map((year, index) => (
                <div key={index}>
                    <h3>{`Vulkanised ${year.year}`}</h3>
                    <Gallery videos={year.videos}/>
                </div>
            ))}
        </div>
    )
}