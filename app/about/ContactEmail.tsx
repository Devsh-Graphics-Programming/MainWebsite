"use client"

import { useEffect, useState } from "react"

export default function ContactEmail() {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        setEmail(isShown ? "newclients@devsh.eu" : "");
    }, [isShown])

    return (
        <span
            onClick={() => setIsShown(true)}
            className={`inline-block px-2 border ${isShown ? "border-teal-900" : "border-[#181818]"} rounded-md hover:border-teal-900 transition-colors duration-300`}>
                {isShown ? email : "Click to show"}
        </span>
    )
}