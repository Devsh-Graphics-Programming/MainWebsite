import fs from 'fs';
import path from 'path';
import { ReactNode } from "react";
import { BlogContextProvider } from "./BlogContext";
import BlogExplorer from './BlogExplorer';

const blogDir = path.join(process.cwd(), 'blog');

function getPostTitle(slug: string) {
    const postInfoPath = path.join(blogDir, slug, "info.json");
    return JSON.parse(fs.readFileSync(postInfoPath, "utf-8")).title
}

export default function Layout({children}: {children: ReactNode}) {
    const slugs = fs.readdirSync(blogDir);

    const simplifiedPostInfos = slugs.map((slug) => ({
        slug: slug,
        title: getPostTitle(slug)
    }))

    return (
        <BlogContextProvider serverData={{activeSlug: null, posts: simplifiedPostInfos}}>
            <div className="flex flex-row h-full">
                <BlogExplorer/>
                {children}
            </div>
        </BlogContextProvider>
    )
}