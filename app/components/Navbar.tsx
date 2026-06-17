"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import DevshLogo from "@/public/brand/devsh-logo-glow.png"
import { ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"

type Link = {
    name: string,
    url: string
}

const links: Link[] = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Services", url: "/services" },
    { name: "When to Call", url: "/when-to-call-devsh" },
    { name: "Sponsorship", url: "/#sponsorship" },
    { name: "Pricing", url: "/pricing.pdf" },
    { name: "Nabla", url: "/nabla" },
    { name: "Research", url: "/presentations" },
    { name: "Blog", url: "/blog" },
]

function DropdownIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
    )
}

function NavbarLink({children, href, active, onClick}: {children: ReactNode, href: string, active?: boolean, onClick?: () => void}) {
    return (
        <li>
            <Link
                className={`group relative block rounded-md px-2.5 py-1.5 text-sm transition-colors duration-200 ${
                    active ? "text-white" : "text-neutral-400 hover:text-white"
                }`}
                href={href}
                aria-current={active ? "page" : undefined}
                onClick={onClick}
            >
                {children}
                <span
                    aria-hidden="true"
                    className={`absolute inset-x-2 bottom-0 h-px origin-center bg-[var(--brand-accent-bright)] transition-transform duration-200 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
            </Link>
        </li>
    )
}

export default function Navbar() {
    const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
    const pathname = usePathname()

    useEffect(() => {
        setIsDropdownEnabled(false)
    }, [pathname])

    const isActive = (href: string) => (
        href === "/" ? pathname === "/" : pathname === href
    )

    return (
        <nav className="sticky top-0 z-40 border-b border-[rgba(125,205,185,0.18)] bg-black/90 shadow-[0_1rem_3rem_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="site-container flex min-h-16 flex-row items-center justify-between gap-4 py-3">
                <Link className="group flex min-w-0 flex-row items-center gap-3" href="/">
                    <Image src={DevshLogo} alt="Company Logo" className="h-9 w-9 flex-shrink-0 object-contain"/>
                    <span className="min-w-0 truncate bg-[linear-gradient(135deg,#fff_20%,#f4fffb_72%,var(--brand-accent-bright)_100%)] bg-clip-text text-base font-semibold leading-none text-transparent transition-opacity duration-200 group-hover:opacity-95 sm:text-xl">
                        DevSH Graphics Programming
                    </span>
                </Link>
                <ul className="desktop-nav shrink-0 flex-row items-center gap-1.5">
                    {links.map((link, index) => <NavbarLink href={link.url} active={isActive(link.url)} key={index}>{link.name}</NavbarLink>)}
                </ul>
                <button
                    className={`desktop-nav-toggle h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-[rgba(125,205,185,0.25)] bg-white/[0.02] text-neutral-200 transition duration-300 hover:border-[rgba(125,205,185,0.5)] hover:text-white ${isDropdownEnabled ? "rotate-180" : "rotate-0"}`}
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
                    className="desktop-mobile-menu w-full flex-col gap-1 border-b border-[rgba(125,205,185,0.18)] bg-black/95 px-5 py-4 text-center backdrop-blur-xl"
                >
                    {links.map((link, index) => (
                        <NavbarLink
                            href={link.url}
                            active={isActive(link.url)}
                            key={index}
                            onClick={() => setIsDropdownEnabled(false)}
                        >
                            {link.name}
                        </NavbarLink>
                    ))}
                </motion.ul>
            )}
        </nav>
    )
}
