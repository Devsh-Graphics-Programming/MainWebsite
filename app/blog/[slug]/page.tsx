import fs from 'fs';
import path from 'path';
import PostView from './PostView';
import Link from 'next/link';

const postsDir = path.join(process.cwd(), 'blog')

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const slug = (await params).slug

    return (
        <main className="relative flex flex-col items-center container mx-auto p-4">
            <Link href="/blog" className='sticky top-0 flex flex-row gap-2 rounded-xl bg-black px-4 py-2 border'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                </svg>
                Return to the blog main page
            </Link>
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