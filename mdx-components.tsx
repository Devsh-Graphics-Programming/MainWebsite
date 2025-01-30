import dynamic from "next/dynamic";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from "next/link";
import type { LinkProps } from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        img: (props: ImageProps) => (
            <Image 
                sizes="100vw" 
                style={{width: '100%', height: 'auto'}}
                width={500}
                height={500}
                {...props}
            />
        ),
        a: (props) => (
            <Link
                {...(props as LinkProps)}
            />
        ),
        ...components
    }
}