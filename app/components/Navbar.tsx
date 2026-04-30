"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DevshLogo from "@/public/devsh_transparent_1920.png"
import { ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"

type Link = {
    name: string,
    url: string
}

const links: Link[] = [
    { name: "Home", url: "/" },
    { name: "About / Contact", url: "/about" },
    { name: "Nabla", url: "/nabla" },
    { name: "Services", url: "/services" },
    { name: "Blog", url: "/blog" },
]

function DropdownIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
    )
}

function NavbarLink({children, href, onClick}: {children: ReactNode, href: string, onClick?: () => void}) {
    return (
        <li className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white">
            <Link className="block rounded px-2 py-1" href={href} onClick={onClick}>{children}</Link>
        </li>
    )
}

export default function Navbar() {
    const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
    const pathname = usePathname()

    useEffect(() => {
        setIsDropdownEnabled(false)
    }, [pathname])

    return (
        <nav className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
            <div className="site-container flex min-h-16 flex-row items-center justify-between gap-4 py-3">
                <Link className="flex min-w-0 flex-row items-center gap-2.5" href="/">
                    <Image src={DevshLogo} alt="Company Logo" className="h-8 w-8 flex-shrink-0"/>
                    <span className="min-w-0 truncate text-base font-semibold leading-none sm:text-xl">
                        <span className="sm:hidden">DevSH Graphics</span>
                        <span className="hidden sm:inline">DevSH Graphics Programming</span>
                    </span>
                </Link>
                <ul className="hidden shrink-0 flex-row items-center gap-1 md:flex">
                    {links.map((link, index) => <NavbarLink href={link.url} key={index}>{link.name}</NavbarLink>)}
                </ul>
                <button
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded border border-white/10 text-neutral-200 transition-transform duration-300 md:hidden ${isDropdownEnabled ? "rotate-180" : "rotate-0"}`}
                    aria-label="Toggle navigation"
                    aria-expanded={isDropdownEnabled}
                    onClick={() => setIsDropdownEnabled(!isDropdownEnabled)}
                >
                    <DropdownIcon/>
                </button>
            </div>
            {isDropdownEnabled && (
                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0  }}
                    transition={{ duration: 0.5 }}
                    className="flex w-full flex-col gap-1 border-b border-white/10 bg-black px-5 py-4 text-center md:hidden"
                >
                    {links.map((link, index) => <NavbarLink href={link.url} key={index}>{link.name}</NavbarLink>)}
                </motion.ul>
            )}
        </nav>
    )
}
