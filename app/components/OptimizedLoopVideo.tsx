'use client'

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react"

type OptimizedLoopVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> & {
    src: string;
    active?: boolean;
}

export default function OptimizedLoopVideo({ src, className, active = true, poster, ...props }: OptimizedLoopVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const hasLoaded = useRef(false)
    const [isNearViewport, setIsNearViewport] = useState(false)

    useEffect(() => {
        if (!videoRef.current)
            return;

        if (!("IntersectionObserver" in window)) {
            setIsNearViewport(true);
            return;
        }

        const intersectionObserver = new IntersectionObserver((entries, _) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsNearViewport(true);
                    intersectionObserver.unobserve(entry.target);
                }
            }); 
        }, { rootMargin: "300px 0px" });

        intersectionObserver.observe(videoRef.current)

        return () => {
            intersectionObserver.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!videoRef.current || hasLoaded.current || !isNearViewport || !active) return;

        videoRef.current.src = src;
        videoRef.current.load();
        hasLoaded.current = true;
    }, [active, isNearViewport, src])

    useEffect(() => {
        if (!videoRef.current || !hasLoaded.current) return;

        if (active) {
            void videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    }, [active])

    return <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            preload="none"
            poster={poster}
            className={className}
            {...props}
        />
}
