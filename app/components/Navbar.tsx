"use client"

import Image from "next/image"
import Link from "next/link"
import DevshLogo from "@/public/devsh_transparent_1920.png"
import { ReactNode, useState } from "react"
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
        <nav className="sticky top-0 z-20">
            <div className="bg-black flex flex-row justify-between items-center p-4">
                <Link className="grow-0" href="/">
                    <Image src={DevshLogo} alt="Company Logo" className="w-[48px] sm:w-[72px]"></Image>
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
            <ul className={`w-full py-4 text-center bg-black transition-transform duration-300 delay-1000 ${isDropdownEnabled ? "visible" : "hidden"}`}>
                <NavbarLink href="/nabla" onClick={() => setIsDropdownEnabled(false)}>Nabla</NavbarLink>
                <NavbarLink href="/blog" onClick={() => setIsDropdownEnabled(false)}>Blog</NavbarLink>
                <NavbarLink href="/projects" onClick={() => setIsDropdownEnabled(false)}>Projects</NavbarLink>
            </ul>
        </nav>
    )
}