import path from "path";
import fs from "fs";
import PostThumbnail from "./PostThumbnail";

async function getPostInfo(slug: string) {
    const infoFilePath = path.join(process.cwd(), 'blog', slug, 'info.json')
    const jsonPostInfo = JSON.parse(fs.readFileSync(infoFilePath, 'utf-8'))
    const ghApiResponse = await (await fetch(`https://api.github.com/users/${jsonPostInfo.author_github_login}`)).json()

    return { 
        title: jsonPostInfo.title,
        author: {
            login: jsonPostInfo.author_github_login,
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
    const blogDataDir = path.join(process.cwd(), 'blog');
    const slugs = fs.readdirSync(blogDataDir)

    const posts = await Promise.all(slugs.map(async (slug) => ({
        slug: slug,
        info: await getPostInfo(slug)
    })))

    return (
        <main className="container mx-auto flex flex-col items-center gap-12 px-4 py-8">
            {posts.map((post, index) => (
               <PostThumbnail post={post} key={index}/> 
            ))}
        </main>
    )
}