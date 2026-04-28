import { useEffect, useRef, VideoHTMLAttributes } from "react"

export default function OptimizedLoopVideo({ src, className }: VideoHTMLAttributes<HTMLVideoElement>) {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (window["IntersectionObserver"] === undefined || window["IntersectionObserver"] === null)
            return;

        if (!videoRef.current)
            return;

        const intersectionObserver = new IntersectionObserver((entries, _) => {
            entries.forEach(video => {
                if (video.isIntersecting) {
                    for (const source in video.target.children) {
                        const videoSource = video.target.children[source] as HTMLVideoElement;
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src as string;
                        }
                    }
                    
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
