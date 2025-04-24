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
            className="bg-neutral-950 px-4 py-2">
                {isShown ? email : "Hover on this text to show"}
        </motion.div>
    )
}