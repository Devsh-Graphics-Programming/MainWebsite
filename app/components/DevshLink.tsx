import Link from "next/link";

type DevshLinkProps = {
    href: string,
    children?: React.ReactNode,
    className?: string,
    target?: string,
    rel?: string
}

export default function DevshLink({ href, children, className, target, rel }: DevshLinkProps) {
    return <Link 
        href={href} 
        className={`no-underline font-thin text-teal-600 hover:text-teal-300 transition-colors duration-300 ${className}`}
        target={target}
        rel={rel}
        >
            {children}
        </Link>
}