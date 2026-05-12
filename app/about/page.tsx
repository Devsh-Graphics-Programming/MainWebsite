import Link from "next/link"
import Image, { StaticImageData } from "next/image";
import { Paragraph, Chapter } from "../components/TextUtils"
import ContactEmail from "./ContactEmail"
import { aboutParagraphs } from "../data/aboutContent"

import vulkanised2026_01 from "@/public/vulkanised_photos/2026/2026_01.jpg";
import vulkanised2026_02 from "@/public/vulkanised_photos/2026/2026_02.jpg";
import vulkanised2026_03 from "@/public/vulkanised_photos/2026/2026_03.jpg";
import vulkanised2026_04 from "@/public/vulkanised_photos/2026/2026_04.jpg";
import vulkanised2026_06 from "@/public/vulkanised_photos/2026/2026_06.jpg";
import vulkanised2026_07 from "@/public/vulkanised_photos/2026/2026_07.jpg";
import vulkanised2026_08 from "@/public/vulkanised_photos/2026/2026_08.jpg";
import vulkanised2026_09 from "@/public/vulkanised_photos/2026/2026_09.jpg";
import vulkanised2023_1 from "@/public/vulkanised_photos/2023/2023_1.jpg";
import vulkanised2023_2 from "@/public/vulkanised_photos/2023/2023_2.jpg";
import vulkanised2024_1 from "@/public/vulkanised_photos/2024/2024_1.jpg";
import vulkanised2024_2 from "@/public/vulkanised_photos/2024/2024_2.jpg";

const vulkanisedPhotos: { src: StaticImageData; alt: string }[] = [
    { src: vulkanised2026_01, alt: "Vulkanised 2026 photo 1" },
    { src: vulkanised2026_02, alt: "Vulkanised 2026 photo 2" },
    { src: vulkanised2026_04, alt: "Vulkanised 2026 photo 4" },
    { src: vulkanised2026_03, alt: "Vulkanised 2026 photo 3" },
    { src: vulkanised2026_06, alt: "Vulkanised 2026 photo 6" },
    { src: vulkanised2026_08, alt: "Vulkanised 2026 photo 8" },
    { src: vulkanised2026_09, alt: "Vulkanised 2026 photo 9" },
    { src: vulkanised2026_07, alt: "Vulkanised 2026 photo 7" },
    { src: vulkanised2023_1, alt: "Vulkanised 2023 photo 1" },
    { src: vulkanised2023_2, alt: "Vulkanised 2023 photo 2" },
    { src: vulkanised2024_1, alt: "Vulkanised 2024 photo 1" },
    { src: vulkanised2024_2, alt: "Vulkanised 2024 photo 2" }
];

function VulkanisedPhoto({ src, alt, priority = false }: { src: StaticImageData | string, alt: string, priority?: boolean }) {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-900/70 ring-1 ring-white/10">
            <Image
                src={src}
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 64rem) 50vw, 100vw"
                placeholder="blur"
                loading="eager"
                className="object-cover blur-lg scale-105 opacity-60"
            />
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 64rem) 50vw, 100vw"
                placeholder="blur"
                priority={priority}
                loading={priority ? undefined : "eager"}
                className="object-contain"
            />
        </div>
    )
}

export default function Page() {
    return (
        <main className="site-container-narrow section-pad flex flex-col gap-10 sm:gap-14">
            <Chapter title="Who We Are">
                <Paragraph>
                    {aboutParagraphs.map((paragraph, index) => (
                        <span key={index}>
                            {paragraph}
                            {index < aboutParagraphs.length - 1 && <><br /><br /></>}
                        </span>
                    ))}
                </Paragraph>
            </Chapter>
        </main>
    );
}

