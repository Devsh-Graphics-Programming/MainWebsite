export type AuthorInfo = {
    login: string,
    name: string,
    avatarUrl: string,
    company?: string,
    location?: string
}

export type PostInfo = {
    title: string,
    author: AuthorInfo,
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