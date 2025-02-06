import devshLogo from "@/public/devsh_transparent_1920.png"
import nablaScreenshot1 from "@/public/nabla/nabla_screenshot1.jpg"
// import nablaScreenshot2 from "@/public/nabla/nabla_screenshot2.gif"

import Image from "next/image"
import Slide from "./slide"
import TextBlock from "../components/TextBlock"
import Link from "next/link"

export default function Page() {
    return (
        <div id="scroll-override" className="w-full h-full max-h-full max-w-full overflow-y-auto snap-y snap-mandatory">
            <Slide
                visible={{ opacity: 1 }}
                invisible={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center"
            >
                <Image src={devshLogo} alt="Nabla Logo" className="aspect-square w-[240px] xl:w-[480px]"/> 
                <TextBlock>
                    <Link href="https://github.com/Devsh-Graphics-Programming/Nabla">Nabla</Link> (previously called <Link href="https://github.com/buildaworldnet/IrrlichtBAW">IrrlichtBaW</Link>) is a new renovated version of older Irrlicht engine. The name change to Nabla allows for using Nabla side by side with the legacy Irrlicht and IrrlichtBaW engines. The project currently aims for a thread-able and Vulkan-centered API, the Vulkan backend is almost complete, and OpenGL and ES backends are currently in maintenance mode.
                </TextBlock>
            </Slide>
            <Slide
                visible={{ opacity: 1 }}
                invisible={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-row items-center justify-center"
            >
                <div className="container mx-auto flex justify-center w-full max-w-full max-h-full py-4 px-4 lg:px-8">
                    <div>
                        <h1>Main Features</h1>
                        <ul className="px-2 py-4 flex flex-col flex-wrap gap-1 list-disc list-inside font-thin text-sm sm:text-md lg:text-lg">
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
                </div>
                <Image src={nablaScreenshot1} alt="Nabla Screenshot 1" className="aspect-[9/16] w-full max-h-full object-cover max-lg:hidden"/>
            </Slide>
            {/* WIP <Slide
                visible={{ opacity: 1 }}
                invisible={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Image src={nablaScreenshot2} alt="Nabla Screenshot 2"/>
            </Slide> */}
        </div>
    )
}