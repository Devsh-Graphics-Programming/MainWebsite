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