import path from 'path';
import fs from 'fs';
import PostThumbnail from './PostThumbnail';

// {
//     "title": "Test Entry",
//     "author": "YasInvolved",
//     "coauthors": [],
//     "tags": [],
//     "date": 1738092566
// }

export type JsonPostInfo = {
    title: string,
    author: string,
    coauthors?: string[],
    tags: string[],
    date: number
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

export default async function Page() {
    const postDir = path.join(process.cwd(), 'blog')
    const slugs = fs.readdirSync(postDir);

    const posts = await Promise.all(slugs.map(async (slug) => ({
        slug: slug,
        info: await getPostInfo(slug)
    })))

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