"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AnimatedContainer({children, className}: {children?: React.ReactNode, className?: string}) {
    return (
        <motion.div
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}