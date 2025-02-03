"use client"
import Image from "next/image"
import { useEffect, useState, cache } from "react"

async function fetchDataForLogin(login: string) {
    return await fetch(`https://api.github.com/users/${login}`)
}

const getGithubData = cache(fetchDataForLogin)

export default function AuthorInfo({login}: { login: string }) {
    const [data, setData] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getGithubData(login)
                if (!response.ok && response.headers.has("X-RateLimit-Reset")) {
                    const rateLimit = response.headers.get("X-RateLimit-Reset") as any as number;
                    const date = new Date(rateLimit * 1000)
                    throw Error(`This address has been rate limited by github. Rate limit ends at ${date.toUTCString()}`)
                }
                setData(await response.json())
            } catch(error) {
                console.log("Error fetching data: ", error)
            } finally {
                setLoading(false)
            }
        }
        
        getGithubData(login) // https://react.dev/reference/react/cache#caching-asynchronous-work
        fetchData()
    }, [])

    if (loading) return <p>Loading...</p>
    return (
        <div className="flex flex-row gap-4">
            <Image 
                src={data && data.avatar_url ? data.avatar_url : `https://api.dicebear.com/9.x/initials/png?seed=${login}`} 
                alt="Author's Profile Picture" 
                width={128} height={128} 
                className="aspect-square w-[128px] h-[128px] rounded-full"
            />
            <div className="flex flex-col flex-wrap justify-center p-4">
                <p className="text-sm md:text-lg font-bold">{data && data.name} &bdquo;{login}&rdquo;</p>
                {data && data.company && <span className="text-md">{data.company}</span>}
                {data && data.location && <span className="text-md font-thin">{data.location}</span>}
            </div>
        </div>
    )
}