"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

type Commit = {
    sha: string,
    node_id: string,
    author?: {
        avatar_url: string,
        login: string,
        html_url: string
    }
    commit: {
        author: {
            name: string,
            email: string,
            date: string
        },
        message: string,
    },
    html_url: string
}

export default function LatestCommits({ repo }: { repo: string }) {
    const [data, setData] = useState<null | Commit[]>()
    const [locale, setLocale] = useState("en-US")

    useEffect(() => {
        async function fetchData() {
            const response = await (await fetch(`https://api.github.com/repos/Devsh-Graphics-Programming/${repo}/commits?per_page=10`)).json()
            setData(response)
        }

        setLocale(navigator.language)
        fetchData()
    }, [repo])

    function makeDicebearUrl(nick: string) {
        return `https://api.dicebear.com/9.x/initials/png?seed=${nick}`
    }

    function makeRepoUrl(repo: string) {
        return `https://github.com/Devsh-Graphics-Programming/${repo}`
    }

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-[#181818] p-4">
            <h3>Latest commits in <Link href={makeRepoUrl(repo)} className="hover:underline hover:text-teal-200 transition-colors duration-300">{repo}</Link></h3>
            <div className="flex flex-col gap-1">
                {data && data.map((commit, index) => (
                    <div className="grid grid-cols-3" key={index}>
                        <Link href={commit.author ? commit.author.html_url : commit.html_url} className="flex flex-row gap-2">
                            <Image 
                                src={commit.author ? commit.author.avatar_url : makeDicebearUrl(commit.commit.author.name)}
                                alt={commit.author ? commit.author.login : commit.commit.author.name}
                                width={26}
                                height={26}
                                className="rounded-full aspect-square w-[24px] h-[24px]"
                            />
                            <span className="hover:underline hover:text-teal-200 transition-colors duration-300">{commit.commit.author.name}</span>
                        </Link>
                        <span className="font-thin text-neutral-300">{new Date(commit.commit.author.date).toLocaleDateString(locale)}</span>
                        <Link href={commit.html_url} className="hover:underline hover:text-teal-200 transition-colors duration-300 font-thin line-clamp-1">{commit.commit.message}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}