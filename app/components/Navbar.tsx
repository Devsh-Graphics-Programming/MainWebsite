"use client"

import Image from "next/image"
import Link from "next/link"
import DevshLogo from "@/public/devsh_transparent_1920.png"
import { ReactNode, useState } from "react"
import { motion } from "framer-motion"

type Link = {
    name: string,
    url: string
}

const links: Link[] = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
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
        <li className="transition-colors duration-300 text-md text-neutral-400 hover:text-neutral-300">
            <Link href={href} onClick={onClick}>{children}</Link>
        </li>
    )
}

export default function Navbar() {
    const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);

    return (
        <nav className="sticky top-0 border-b border-[#181818] bg-black">
            <div className="bg-black container mx-auto flex flex-row justify-between items-center px-8 py-8 z-20">
                <Link className="flex flex-row items-center gap-2 grow-0" href="/">
                    <Image src={DevshLogo} alt="Company Logo" className="w-[32px]"/>
                    <span className="text-md sm:text-2xl">DevSH Graphics Programming</span>
                </Link>
                <ul className="hidden sm:flex grow-0 flex-row gap-2">
                    {links.map((link, index) => <NavbarLink href={link.url} key={index}>{link.name}</NavbarLink>)}
                </ul>
                <button className={`transition-transform duration-300 sm:hidden ${isDropdownEnabled ? "rotate-180" : "rotate-0"}`} onClick={() => setIsDropdownEnabled(!isDropdownEnabled)}>
                    <DropdownIcon/>
                </button>
            </div>
            {isDropdownEnabled && (
                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0  }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col w-full py-4 text-center sm:hidden bg-black border-b border-[#181818] gap-1"
                >
                    {links.map((link, index) => <NavbarLink href={link.url} key={index}>{link.name}</NavbarLink>)}
                </motion.ul>
            )}
        </nav>
    )
}