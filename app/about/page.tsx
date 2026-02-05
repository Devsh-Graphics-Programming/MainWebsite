import Link from "next/link"
import Image, { StaticImageData } from "next/image";
import { Paragraph, Chapter } from "../components/TextUtils"
import ContactEmail from "./ContactEmail"

import vulkanised2023_1 from "@/public/vulkanised_photos/2023/2023_1.jpg";
import vulkanised2023_2 from "@/public/vulkanised_photos/2023/2023_2.jpg";
import vulkanised2024_1 from "@/public/vulkanised_photos/2024/2024_1.jpg";
import vulkanised2024_2 from "@/public/vulkanised_photos/2024/2024_2.jpg";

function VulkanisedPhoto({ src, alt, priority = false }: { src: StaticImageData | string, alt: string, priority?: boolean }) {
    return (
        <div className="relative w-[400px] aspect-video overflow-hidden rounded-md bg-neutral-900/70 ring-1 ring-white/5">
            <Image
                src={src}
                alt=""
                aria-hidden="true"
                fill
                sizes="400px"
                placeholder="blur"
                className="object-cover blur-lg scale-105 opacity-60"
            />
            <Image
                src={src}
                alt={alt}
                fill
                sizes="400px"
                placeholder="blur"
                priority={priority}
                className="object-contain"
            />
        </div>
    )
}

export default function Page() {
    return (
        <main className="container mx-auto max-sm:px-8 flex flex-col gap-4 sm:gap-8 sm:items-center h-full justify-center">
            <Chapter title="About Us">
                <Paragraph>
                    DevSH Graphics Programming Sp. z O.O is a company focused on Graphics, GPU and High Performance Computing. Our consultants develop and maintain Renderers, Simulations and Compilers for our Clients, integrated into or working alongside their teams. We are not a Software House, we work very closely and synergize with our Clients&apos; engineers.
                    We also conduct our own R&amp;D developing our own Open Source Middleware and Libraries, the most prominent being Nabla, as well as contributing to existing ones.
                    <br />
                    <br />
                    The primary mission for all of our self-funded developments is to advance Open Source ecosystems with innovative tooling with a particular focus on Khronos Standards. We maintain a single source HLSL202x/C++20 Standard Template Header Only Library and our Utility and Rapid Prototyping Framework <Link href="https://github.com/Devsh-Graphics-Programming/Nabla" target="_blank" rel="noopener noreferer" className="no-underline text-teal-600 devsh-link">Nabla</Link> designed {/*this prevents visual bug, "designed must stay here"*/}
                    to give a CUDA-like programming experience within the Vulkan ecosystem.
                    <br />
                    <br />
                    We have honed the culture of remote work, since the company&apos;s inception, and way before the 2019 paradigm shift. Subject to availability and specific expertise required, our consultants&apos; regular working hours overlap the normal working hours from San Francisco to Sydney.
                    <br />
                    <br />
                    Our alumni have since worked at Intel, Huawei, ARM and Apple as driver and devtech developers and on AAA games.
                </Paragraph>

                <div className="grid grid-cols-1 lg:grid-cols-2 my-4 gap-4">
                    <VulkanisedPhoto 
                        src={vulkanised2023_1} 
                        alt="Vulkanised photo 1"
                        priority
                    />
                    <VulkanisedPhoto 
                        src={vulkanised2023_2} 
                        alt="Vulkanised photo 2"
                        priority
                    />
                    <VulkanisedPhoto 
                        src={vulkanised2024_1} 
                        alt="Vulkanised photo 3"
                        priority
                    />
                    <VulkanisedPhoto 
                        src={vulkanised2024_2} 
                        alt="Vulkanised photo 4"
                        priority
                    />
                </div>
            </Chapter>
            <Chapter title="Contact">
                <Paragraph>
                    If you&apos;re interested in our offer, you can reach us at this e-mail address: <ContactEmail/>
                </Paragraph>
            </Chapter>
        </main>
    )
}
