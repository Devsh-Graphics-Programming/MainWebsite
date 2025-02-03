import type { ReactNode } from "react";

export default function TextBlock({children}: {children: ReactNode}) {
    return <div className="prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-invert font-thin">{children}</div>
}