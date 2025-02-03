import fs from 'fs';
import path from 'path';
import PostView from './PostView';
import AuthorInfo from '../AuthorInfo';

const postsDir = path.join(process.cwd(), 'blog')

export default async function Page({params}: {params: Promise<{slug: string}>}) {
    const slug = (await params).slug
    const infoPath = path.join(postsDir, slug, "info.json")
    const info = JSON.parse(fs.readFileSync(infoPath, "utf-8"))

    return (
        <main className="flex flex-col items-center container mx-auto p-4 gap-8">
            <AuthorInfo login={info.author_github_login}/>
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