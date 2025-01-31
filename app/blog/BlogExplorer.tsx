"use client"
import Link from "next/link";
import { useBlogContext } from "./BlogContext"
import { useState, useEffect, useRef } from "react";

export default function BlogExplorer() {
    const { data } = useBlogContext();

    return (
        <div className="absolute left-0 flex flex-col h-full min-w-fit px-8 py-4 border-r">
            <h3>Blog Explorer</h3>
            {data.posts ? data.posts.map((post, index) => (
                <Link
                    key={index}
                    href={`/blog/${post.slug}`} 
                    className={`transition-colors duration-300 text-lg ${post.slug === data.activeSlug ? "text-neutral-100" : "text-neutral-400"} hover:text-neutral-100`}
                >
                    {post.title}
                </Link>
            )) : <></>}
        </div>
    )
}