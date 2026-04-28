import { useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"

export default function Slide({ children, className }: { children?: React.ReactNode, className?: string | undefined }) {
    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <AnimatePresence>
            <motion.section 
                ref={ref}
                animate={ isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 } }
                transition={{ duration: 0.5 }}
                className={`flex flex-col items-center ${className ?? ""}`}
            >
                {children}
            </motion.section>
        </AnimatePresence>
    )
}
