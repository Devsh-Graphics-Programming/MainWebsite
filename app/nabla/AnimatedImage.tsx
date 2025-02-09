"use client"

import { motion, AnimationControls, TargetAndTransition, Transition, VariantLabels } from "framer-motion"
import Image, { ImageProps } from "next/image"
import React, { useState, useRef, useEffect } from "react"

interface AnimatedImageProps extends ImageProps
{
    visible?: boolean | AnimationControls | TargetAndTransition | VariantLabels,
    invisible?: boolean | AnimationControls | TargetAndTransition | VariantLabels,
    transition?: Transition
}

export default function AnimatedImage(props: AnimatedImageProps) {
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        const image = imageRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 1
            }
        );

        if (imageRef.current) {
            observer.observe(imageRef.current)
        };

        return () => {
            if (image) {
                observer.unobserve(image)
            }
        }
    }, [])

    const AnimatedImage = motion.create(Image);
    return <AnimatedImage 
        ref={imageRef}
        src={props.src} alt={props.alt}
        width={props.width}
        height={props.height}
        animate={isVisible ? props.visible : props.invisible}
        transition={props.transition}
        className={props.className}
    />
}