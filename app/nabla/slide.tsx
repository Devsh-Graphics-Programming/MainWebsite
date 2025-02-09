"use client"

import React, { useState, useRef, useEffect, ReactNode } from "react"
import AnimatedContainer from "../components/AnimatedContainer"
import { AnimationControls, TargetAndTransition, Transition, VariantLabels } from "framer-motion";

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
            className={`w-full h-full max-w-full max-h-fit snap-center snap-always ${props.className}`}
        >
            {props.children}
        </AnimatedContainer>
    )
}