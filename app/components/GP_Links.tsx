import Link from "next/link"
import Image from "next/image"

export default function GP_Links() {
    return (
        <div className="flex flex-row items-center gap-1">
            <Link href="https://graphics-programming.org/webring/frogs/devsh/prev">⬅️</Link>
            <Link href="https://graphics-programming.org/webring/">
                <Image src="https://graphics-programming.org/img/froge.webp" alt="a friendly froge" width={28} height={28}/>
            </Link>
            <Link href="https://graphics-programming.org/webring/frogs/devsh/next">➡️</Link>
        </div>
    )
}