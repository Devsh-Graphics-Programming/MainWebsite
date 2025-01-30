import path from 'path';
import fs from 'fs';
import PostThumbnail from './PostThumbnail';
import type { PostInfo } from './PostInfo';

type SearchParams = {
    [key: string]: string | undefined
}

type Post = {
    slug: string,
    info: PostInfo
}

async function getPostInfo(slug: string) {
    const infoFilePath = path.join(process.cwd(), 'blog', slug, 'info.json')
    const jsonPostInfo = JSON.parse(fs.readFileSync(infoFilePath, 'utf-8'))
    const ghApiResponse = await (await fetch(`https://api.github.com/users/${jsonPostInfo.author}`)).json()

    return { 
        title: jsonPostInfo.title,
        author: {
            login: ghApiResponse.login,
            name: ghApiResponse.name,
            avatarUrl: ghApiResponse.avatar_url,
            company: ghApiResponse.company,
            location: ghApiResponse.location
        },
        coauthors: jsonPostInfo.coauthors,
        date: jsonPostInfo.date,
        tags: jsonPostInfo.tags,
    }
}

function filterPostsByTag(posts: Post[], tag: string) {
    return posts.filter((post) => post.info.tags.includes(tag))
}

export default async function Page({searchParams}: {searchParams?: Promise<SearchParams> }) {
    const postDir = path.join(process.cwd(), 'blog')
    const slugs = fs.readdirSync(postDir);

    const posts = await Promise.all(slugs.map(async (slug) => ({
        slug: slug,
        info: await getPostInfo(slug)
    })))

    const params: SearchParams | undefined = await searchParams;

    if (params && params["tag"])
    {
        const filteredPosts = filterPostsByTag(posts, params["tag"])

        return (
            <main className="flex flex-col container mx-auto items-center p-4 gap-12 space-y-4">
                <h1>Filtering posts with tag: {params["tag"]}</h1>
                {filteredPosts.map((post, index) => (
                    <PostThumbnail post={post} key={index}></PostThumbnail>
                ))}
            </main>
        )
    }

    return (
        <>
            <main className="flex flex-col container mx-auto items-center p-4 gap-12 space-y-4">
                {posts.map((post, index) => (
                    <PostThumbnail post={post} key={index}></PostThumbnail>
                ))}
            </main>
        </>
    )
}