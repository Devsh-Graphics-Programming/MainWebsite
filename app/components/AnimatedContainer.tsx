"use client"

import React from "react"
import { HTMLMotionProps, motion } from "framer-motion"

interface AnimatedContainerProps extends HTMLMotionProps<"div"> {
    children?: React.ReactNode
}

const AnimatedContainer = React.forwardRef<HTMLDivElement, AnimatedContainerProps>((props, ref) => (
    <motion.div ref={ref} {...props}>
        {props.children}
    </motion.div>
))

export default AnimatedContainer;