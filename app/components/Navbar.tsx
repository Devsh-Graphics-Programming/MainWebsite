"use client"

import Image from "next/image"
import Link from "next/link"
import DevshLogo from "@/public/devsh_transparent_1920.png"
import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import Bars from "@/app/icons/bars"

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
                    <NavbarLink href="/nabla">Nabla</NavbarLink>
                    <NavbarLink href="/blog">Blog</NavbarLink>
                    <NavbarLink href="/projects">Projects</NavbarLink>
                </ul>
                <button className={`transition-transform duration-300 sm:hidden ${isDropdownEnabled ? "rotate-180" : "rotate-0"}`} onClick={() => setIsDropdownEnabled(!isDropdownEnabled)}>
                    <Bars/>
                </button>
            </div>
            {isDropdownEnabled && (
                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0  }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col w-full py-4 text-center sm:hidden bg-black border-b border-[#181818]"
                >
                    <NavbarLink href="/nabla" onClick={() => setIsDropdownEnabled(false)}>Nabla</NavbarLink>
                    <NavbarLink href="/blog" onClick={() => setIsDropdownEnabled(false)}>Blog</NavbarLink>
                    <NavbarLink href="/projects" onClick={() => setIsDropdownEnabled(false)}>Projects</NavbarLink>
                </motion.ul>
            )}
        </nav>
    )
}