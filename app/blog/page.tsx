import path from "path";
import fs from "fs";
import PostThumbnail from "./PostThumbnail";

const blogDataDir = path.join(process.cwd(), 'blog');

function returnPostInfoPath(slug: string) {
    return path.join(blogDataDir, slug, "info.json")
}

export default async function Page() {
    const slugs = fs.readdirSync(blogDataDir)

    const posts = await Promise.all(slugs.map(async (slug) => ({
        slug: slug,
        info: JSON.parse(fs.readFileSync(returnPostInfoPath(slug), "utf-8"))
    })))

    return (
        <div className="container mx-auto flex flex-col items-center gap-12 px-4 w-full py-8 overflow-x-hidden">
            {posts.map((post, index) => (
                <PostThumbnail post={post} key={index}/>
            ))}
        </div>
    )
}