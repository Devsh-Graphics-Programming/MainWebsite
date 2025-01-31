"use client"

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { BlogContext, BlogContextData } from "./BlogTypes";

const BlogContext = createContext<undefined | BlogContext>(undefined);

export function BlogContextProvider({children, serverData}: {children: ReactNode, serverData?: BlogContextData}) {
    const [data, setData] = useState<BlogContextData>(serverData ? serverData : {activeSlug: null, slugs: null});

    return (
        <BlogContext.Provider value={{data, setData}}>
            {children}
        </BlogContext.Provider>
    )
}

export function useBlogContext() {
    const context = useContext(BlogContext);

    if (!context) {
        throw new Error("useBlogContext has to be used within BlogContextProvider")
    }

    return context
}