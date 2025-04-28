import type { ReactNode } from "react";

export function Paragraph({children}: {children?: ReactNode}) {
    return <p className="block prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-invert font-thin">{children}</p>
}

export function TextBlock({children}: {children?: ReactNode}) {
    return <div className="block prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-invert font-thin">{children}</div>
}