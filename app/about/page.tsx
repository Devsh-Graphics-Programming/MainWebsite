import Link from "next/link"
import Image, { StaticImageData } from "next/image";
import { Paragraph, Chapter } from "../components/TextUtils"
import ContactEmail from "./ContactEmail"

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
                    DevSH Graphics Programming Sp. z O.O is a specialized collective of graphics engineers and mathematicians focused entirely on GPU architecture, rendering, and High-Performance Computing. We are not a traditional software house. We don’t build CRUD apps, and we don't do repetitive contract work. Instead, our consultants integrate directly alongside our clients' engineering teams to architect renderers, simulations, and compilers at the frontier of what hardware can do.
                    <br /><br />
                    We train and work with the best in the field. Our alumni have gone on to drive the industry forward at Intel, ARM, and Apple as core driver and dev-tech engineers, as well as architecting engines for AAA games.
                    <br /><br />
                    We invest heavily in our own R&D and Open Source middleware—most notably Nabla, our rapid prototyping framework designed to deliver a CUDA-like programming experience within the Vulkan ecosystem.
                    <br /><br />
                    We operate on a simple, uncompromising principle: work exists to serve your life, not the other way around.
                    <br /><br />
                    Because we reject the preposterous expectation that engineers should uproot their lives, spouses, and kids to move to a specific city for a job, DevSH has been a remote-first company since its inception—long before the industry paradigm shifted. We hire top-tier talent wherever they live. As a result, our team is globally distributed, with regular working hours overlapping all the way from San Francisco to Sydney.
                </Paragraph>
            </Chapter>
        </main>
    );
}