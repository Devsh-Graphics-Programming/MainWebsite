"use client"
import Link from "next/link";
import { useBlogContext } from "./BlogContext"
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function BlogExplorer() {
    const { data } = useBlogContext();
    const [isOpen, setIsOpen] = useState(false)
    const startXRef = useRef<number | null>(null)

    function handleTouchStart(e: TouchEvent) {
        startXRef.current = e.touches[0].clientX
    }

    function handleTouchEnd(e: TouchEvent) {
        if (!startXRef.current) return
        const distance = e.changedTouches[0].clientX - startXRef.current

        if (distance > 75) setIsOpen(true);
        else if (distance < -75) setIsOpen(false);
    }

    useEffect(() => {
        document.addEventListener("touchstart", handleTouchStart)
        document.addEventListener("touchend", handleTouchEnd)

        return () => {
            document.removeEventListener("touchstart", handleTouchStart)
            document.removeEventListener("touchend", handleTouchEnd)
        }
    }, [])

    return (
        <>
        {isOpen &&
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                exit={{ x: -100 }}
                className="max-sm:absolute flex flex-col flex-wrap h-full px-4 py-2 sm:px-8 sm:py-4 bg-black border-r border-[#181818]"
            >

                <h3>Blog Explorer (beta)</h3>
                {data.posts ? data.posts.map((post, index) => (
                    <Link
                        key={index}
                        href={`/blog/${post.slug}`} 
                        className={`transition-colors duration-300 text-lg ${post.slug === data.activeSlug ? "text-neutral-100" : "text-neutral-400"} hover:text-neutral-100`}
                    >
                        {post.title}
                    </Link>
                )) : <></>}
            </motion.div>}
        </>
    )
}