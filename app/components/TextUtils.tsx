import type { ReactNode } from "react";

export function Paragraph({children}: {children?: ReactNode}) {
    return <p className="prose prose-invert max-w-none text-base font-light leading-relaxed text-neutral-300 sm:text-lg">{children}</p>
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
        <div className={`flex flex-col gap-5 ${className ?? ""}`}>
            <h1 className="section-heading">{title}</h1>
            <div className="min-w-0">
                {children}
            </div>
        </div>
    )
}
