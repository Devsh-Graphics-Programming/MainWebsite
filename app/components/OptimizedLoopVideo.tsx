'use client'

import { useEffect, useRef, VideoHTMLAttributes } from "react"

export default function OptimizedLoopVideo({ src, className }: VideoHTMLAttributes<HTMLVideoElement>) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (window["IntersectionObserver"] === undefined && window["IntersectionObserver"] === null)
            return;

        if (!videoRef.current)
            return;

        // lil debug stuff
        videoRef.current.onload = () => console.log("Video Loaded")
        videoRef.current.onplay = () => console.log("Video is playing");

        const intersectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(video => {
                if (video.isIntersecting) {
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source] as HTMLVideoElement;
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src as string;
                        }
                    }
                    
                    console.log("Loading video");
                    (video.target as HTMLVideoElement).load();
                    video.target.classList.remove("lazy");
                    intersectionObserver.unobserve(video.target);
                }
            }); 
        });

        intersectionObserver.observe(videoRef.current)

        return () => {
            intersectionObserver.disconnect()
        }
    }, [])

    return <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className={`lazy ${className}`}
        >
            <source data-src={src}/>
        </video>
}