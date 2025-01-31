import fs from 'fs';
import path from 'path';
import PostView from './PostView';

const postsDir = path.join(process.cwd(), 'blog')

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const slug = (await params).slug

    return (
        <main className="flex flex-col items-center container mx-auto p-4">
            <div className="prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-invert font-thin">
                <PostView slug={slug}/>
            </div>
        </main>
    )
}

// this will cause this page to throw 404 if post doesn't exist
export function generateStaticParams() {
    const dirNames = fs.readdirSync(postsDir)
    return dirNames.map<{slug: string}>((dirName) => ({ slug: dirName }))
}

export const dynamicParams = false;