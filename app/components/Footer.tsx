import GP_Links from "./GP_Links"

export default function footer() {
    return (
        <div className="flex flex-col items-center justify-center p-1 border-t border-t-[#181818]">
            <GP_Links/>
            <a
                href="/build-info.json"
                className="pb-1 text-[10px] leading-none text-neutral-700 transition-colors hover:text-neutral-500"
            >
                build info
            </a>
        </div>
    )
}
