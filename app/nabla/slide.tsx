"use client"

import React, { useState, useRef, useEffect, ReactNode } from "react"
import AnimatedContainer from "../components/AnimatedContainer"
import { AnimationControls, TargetAndTransition, Transition, VariantLabels } from "framer-motion";

// const Slide = React.forwardRef<AnimatedContainerProps, SlideProps>((props, ref) => {
//     const [isVisible, setIsVisible] = useState(false);
//     const containerRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 setIsVisible(entry.isIntersecting);
//             },
//             {
//                 root: null,
//                 rootMargin: '0px',
//                 threshold: 1
//             }
//         );

//         if (containerRef.current) {
//             observer.observe(containerRef.current);
//         }

//         return () => {
//             if (containerRef.current) {
//                 observer.unobserve(containerRef.current)
//             }
//         }
//     }, [])

//     return (
//         <AnimatedContainer
//             ref={ref}
//             className={`w-full h-full max-h-full snap-center snap-always ${props.className}`}
//             animate={isVisible ? props.visible : props.invisible}
//             {...props}
//         >
//             <div id="visibility-wrapper" ref={containerRef}>
//                 {props.children}
//             </div>
//         </AnimatedContainer>
//     )
// })

// export default Slide;

type SlideProps = {
    children?: ReactNode,
    className?: string,
    invisible?: boolean | AnimationControls | TargetAndTransition | VariantLabels,
    visible?: boolean | AnimationControls | TargetAndTransition | VariantLabels,
    transition?: Transition
};

export default function Slide(props: SlideProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (container) {
                observer.unobserve(container)
            }
        }
    }, [])

    return (
        <AnimatedContainer
            ref={containerRef}
            animate={isVisible ? props.visible : props.invisible}
            transition={props.transition}
            className={`w-full h-full snap-center snap-always ${props.className}`}
        >
            {props.children}
        </AnimatedContainer>
    )
}