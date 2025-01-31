'use client'
import type { PostInfo, AuthorInfo } from "./BlogTypes";
import dynamic from "next/dynamic"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function AuthorInfo({author}: {author: AuthorInfo}) {
    return (
        <div className="flex flex-row gap-4">
            <Image src={author.avatarUrl} alt="Author's Profile Picture" width={128} height={128} className="aspect-square rounded-full"/>
            <div className="flex flex-col justify-center p-4">
                <span className="text-lg font-bold">{author.name} &bdquo;{author.login}&rdquo;</span>
                {author.company ? <span className="text-md">{author.company}</span> : <></>}
                {author.location ? <span className="text-md font-thin">{author.location}</span> : <></>}
            </div>
        </div>
    )
}

function Tag({tag}: {tag: string}) {
    return (
        <Link href={`/blog?tag=${tag}`} className="px-2 py-1 ring-1 ring-white rounded-lg text-md font-thin hover:ring-2 transition-all duration-300 ease-in-out">
            {tag}
        </Link>
    )
}

export default function PostThumbnail({ post }: { post: { slug: string, info: PostInfo } }) {
    const [locale, setLocale] = useState('en-US');
    const Content = dynamic(() => import(`@/blog/${post.slug}/page.mdx`), { ssr: false, loading: () => <span>Loading...</span> })

    useEffect(() => {
        if (typeof window !== 'undefined')
            setLocale(navigator.language || 'en-US')
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <h1>{post.info.title}</h1>
            <span className="text-sm font-thin">{new Date(post.info.date * 1000).toLocaleDateString(locale)}</span>
            <AuthorInfo author={post.info.author}/>
            <div className="flex flex-row gap-2">
                {post.info.tags.map((tag, index) => (
                    <Tag tag={tag} key={index}></Tag>
                ))}
            </div>
            <article className="prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-invert line-clamp-5 font-thin">
                <Content/>
            </article>
            <Link href={`/blog/${post.slug}`}>Read More</Link>
        </div>
    )
}