"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion";

export default function ContactEmail() {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [email, setEmail] = useState<string>()

    useEffect(() => {
        setEmail(isShown ? "newclients@devsh.eu" : "");
    }, [isShown])

    return (
        <motion.div
            onHoverStart={() => setIsShown(true)}
            onHoverEnd={() => setIsShown(false)}
            className="px-2 border border-[#181818] rounded-md">
                {isShown ? email : "Hover your cursor on this text to show"}
        </motion.div>
    )
}