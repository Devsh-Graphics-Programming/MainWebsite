import devshLogo from "@/public/devsh_transparent_1920.png"
import nablaScreenshot1 from "@/public/nabla/screenshot1.jpg"
import check from "@/public/list/check.svg"

import Image from "next/image"
import AnimatedContainer from "../components/AnimatedContainer"
import TextBlock from "../components/TextBlock"
import Link from "next/link"

export default function Page() {
    return (
        <div id="scroll-override" className="w-full h-full max-h-full overflow-y-auto snap-y snap-mandatory overflow-x-clip">
            <div className="container mx-auto p-4 gap-4 sm:gap-8 sm:items-center h-full">
                <AnimatedContainer
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col xl:flex-row items-center w-full h-full snap-center snap-always my-8"
                >
                    <Image src={devshLogo} alt="Nabla Logo" className="aspect-square w-[240px] xl:w-[480px]"/> 
                    <TextBlock>
                        <Link href="https://github.com/Devsh-Graphics-Programming/Nabla">Nabla</Link> (previously called <Link href="https://github.com/buildaworldnet/IrrlichtBAW">IrrlichtBaW</Link>) is a new renovated version of older Irrlicht engine. The name change to Nabla allows for using Nabla side by side with the legacy Irrlicht and IrrlichtBaW engines. The project currently aims for a thread-able and Vulkan-centered API, the Vulkan backend is almost complete, and OpenGL and ES backends are currently in maintenance mode.
                    </TextBlock>
                </AnimatedContainer>
                <AnimatedContainer
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-row items-center w-full h-full snap-center snap-always gap-12 max-w-full"
                >
                    <div className="grow min-w-fit flex flex-col gap-8">
                        <h1>Features</h1>
                        <ul className="grow flex flex-col list-none xl:gap-2 text-md xl:text-xl list-image-[url(/list/check.svg)] list-inside">
                            <li>Frontend API with Vulkan as First Class Citizen</li>
                            <li>Thread safe and context pollution safe OpenGL</li>
                            <li>Asset management pipeline</li>
                            <li>Automatic pipeline layout creation</li>
                            <li>Shader introspection</li>
                            <li>Using SPIR-V shaders in OpenGL and ES</li>
                            <li>Libraries of GLSL shader functions</li>
                            <li>Compute shaders</li>
                            <li>Virtual Texturing</li>
                            <li>Virtual Geometry (programmable and non programmble fetching) with triangle batching</li>
                            <li>CUDA and Vulkan interop</li>
                            <li>CPU asset manipulation (image filtering, image format transcoding, mesh optimization and manipulation)</li>
                            <li>GPU driven Scene Graph</li>
                            <li>Material Compiler for Path Tracing UberShaders</li>
                        </ul>
                    </div>
                    <Image
                        src={nablaScreenshot1} 
                        alt="Showcase Image"
                        className="shrink object-cover object-center max-xl:hidden max-h-full"
                    />
                </AnimatedContainer>
            </div>
        </div>
    )
}