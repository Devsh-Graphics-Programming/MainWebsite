import Link from "next/link"
import Image, { StaticImageData } from "next/image";
import { Paragraph, Chapter } from "../components/TextUtils"
import ContactEmail from "./ContactEmail"

import vulkanised2023_1 from "@/public/vulkanised_photos/2023/2023_1.jpg";
import vulkanised2023_2 from "@/public/vulkanised_photos/2023/2023_2.jpg";
import vulkanised2024_1 from "@/public/vulkanised_photos/2024/2024_1.jpg";
import vulkanised2024_2 from "@/public/vulkanised_photos/2024/2024_2.jpg";

function VulkanisedPhoto({ src, alt }: { src: StaticImageData | string, alt: string }) {
    return <Image src={src} alt={alt} className="aspect-video w-[400px]"/>
}

export default function Page() {
    return (
        <main className="container mx-auto max-sm:px-8 flex flex-col gap-4 sm:gap-8 sm:items-center h-full justify-center">
            <Chapter title="About Us">
                <Paragraph>
                    DevSH Graphics Programming (DevSH) sp. z o.o. ( devsh.eu ) is a company specializing in High
                    Performance Computing with a particular focus on Computer Graphics and GPU Programming.
                    Currently boasting a team of 10 Consultants and 3 separate concurrent projects.
                    We offer consulting and co-development to Third Parties with their own products, as well as con-
                    duct our own Research and Development, developing Open-Source Middleware and Libraries.
                </Paragraph>

                <Paragraph>
                    The primary mission for all of our self-funded developments is to advance open source ecosys-
                    tems with innovative tooling, with a particular focus on Vulkan and SPIR-V.
                    We maintain a single source HLSL202x/C++20 Standard Template Header Only Library and our
                    Utility and Rapid Prototyping Framework <Link href="https://github.com/Devsh-Graphics-Programming/Nabla" target="_blank" rel="noopener noreferer" className="no-underline text-teal-600 devsh-link">Nabla</Link> designed {/*this prevents visual bug, "designed must stay here"*/}
                    to give a CUDA-like programming experience in the Vulkan ecosystem.
                </Paragraph>

                <Paragraph>
                    We&apos;ve honed the culture of remote work, since the company&apos;s inception before 2019. Subject to
                    availability of consultants and specific expertise required their regular working hours overlap the
                    normal working hours from San Francisco to Sydney.
                </Paragraph>

                <div className="grid grid-cols-1 lg:grid-cols-2 my-4 gap-4">
                    <VulkanisedPhoto 
                        src={vulkanised2023_1} 
                        alt="Vulkanised photo 1"
                    />
                    <VulkanisedPhoto 
                        src={vulkanised2023_2} 
                        alt="Vulkanised photo 2"
                    />
                    <VulkanisedPhoto 
                        src={vulkanised2024_1} 
                        alt="Vulkanised photo 3"
                    />
                    <VulkanisedPhoto 
                        src={vulkanised2024_2} 
                        alt="Vulkanised photo 4"
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