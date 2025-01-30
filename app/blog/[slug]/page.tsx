import dynamic from "next/dynamic";
import fs from 'fs';
import path from 'path';

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const slug = (await params).slug

    const { default: Post } = await import(`@/blog/${slug}/page.mdx`)

    return (
        <main className="flex flex-col items-center container mx-auto p-4">
            <div className="prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-invert font-thin">
                <Post/>
            </div>
        </main>
    )
}

// this will cause this page to throw 404 if post doesn't exist
export function generateStaticParams() {
    const postsDir = path.join(process.cwd(), 'blog')
    const dirNames = fs.readdirSync(postsDir)

    return dirNames.map<{slug: string}>((dirName) => ({ slug: dirName }))
}

export const dynamicParams = false;