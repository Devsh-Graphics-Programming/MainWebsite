import type { ReactNode } from "react";

export function Paragraph({children}: {children?: ReactNode}) {
    return <p className="block prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-invert font-thin w-auto">{children}</p>
}

export function DimmedParagraph({children}: {children?: ReactNode}) {
    return (
        <div className="relative">
            <Paragraph>
                {children}
            </Paragraph>
            <div className="absolute bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-black z-10"/>
        </div>
    )
}

export function Chapter({title, children, className}: {title: string, children?: React.ReactNode, className?: string}) {
    return (
        <div className={className}>
            <h1>{title}</h1>
            <div className="pl-2">
                {children}
            </div>
        </div>
    )
}