export type PostInfo = {
    title: string,
    author_github_login: string,
    coauthors?: string[],
    date: number,
    tags: string[]
}

export type Post = {
    slug: string,
    info: PostInfo
}

export type PostSimplified = {
    slug: string,
    title: string
}

export type SearchPArams = {
    [key: string]: string | undefined
}

export type BlogContextData = {
    activeSlug: string | null,
    posts: PostSimplified[] | null
}

export type BlogContext = {
    data: BlogContextData
    setData: (data: BlogContextData) => void
}