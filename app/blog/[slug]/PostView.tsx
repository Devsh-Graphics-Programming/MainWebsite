"use client"

import dynamic from "next/dynamic";
import { useBlogContext } from "../BlogContext"
import { useEffect } from "react";

export default function PostView({slug}: {slug: string}) {
    const { data, setData } = useBlogContext();
    const Content = dynamic(() => import(`@/blog/${slug}/page.mdx`), {ssr: false, loading: () => <>Loading Post</>})

    useEffect(() => {
        setData({posts: data.posts, activeSlug: slug})
        return () => setData({posts: data.posts, activeSlug: null}) // reset the active slug on page change
    }, [])

    return <Content/>
}