import type { PostInfo } from "./BlogTypes";
import dynamic from "next/dynamic"
import Link from "next/link";
import AuthorInfo from "./AuthorInfo";
import DynamicDate from "./DynamicDate";

function Tag({tag}: {tag: string}) {
    return (
        <Link href={`/blog?tag=${tag}`} className="px-2 py-1 ring-1 ring-white rounded-lg text-md font-thin hover:ring-2 transition-all duration-300 ease-in-out">
            {tag}
        </Link>
    )
}

export default function PostThumbnail({ post }: { post: { slug: string, info: PostInfo } }) {
    const Content = dynamic(() => import(`@/blog/${post.slug}/page.mdx`))

    return (
        <div className="flex flex-col gap-4">
            <h1>{post.info.title}</h1>
            <DynamicDate date={post.info.date}/>
            <AuthorInfo login={post.info.author_github_login}/>
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