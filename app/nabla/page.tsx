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
                <div className="container mx-auto flex justify-center w-full max-w-full max-h-full py-4 px-4 lg:px-8 overflow-y-scroll">
                    <div>
                        <h1>Main Features</h1>
                        <ul className="px-2 py-4 flex flex-col flex-wrap gap-1 list-disc list-inside font-thin text-sm sm:text-md lg:text-lg">
                            <li>Curated List of Vulkan Features and Extensions the Nabla Core Profile</li>
                            <li>Easy filtering of Vulkan Physical Devices by capabilities</li>
                            <li>SPIR-V and Vulkan as first class citizens</li>
                            <li>First class integration of Renderdoc</li>
                            <li>Extensive use of Timeline Semaphores (event handlers, cpu callbacks on gpu conditions)</li>
                            <li>GPU Object life cycle tracking (descriptor sets and commandbuffers)</li>
                            <li>Reusability: HLSL2021 Standard Template Library</li>
                            <li>Testability: HLSL subset compiling as both C++ Host and SPIR-V Device code</li>
                            <li>Future Proof: C++20 Concepts in HLSL for safe and documented Static Polymorphism</li>
                            <li>Insane: Boost PreProcessor and Template Metaprogramming in HLSL!</li>
                            <li>Embraces Buffer Device Address and Descriptor Indexing to the full</li>
                            <li>Minimally Invasive (vulkan handle acquisition, multiple windows, content playing second fiddle)</li>
                            <li>Designed for Interoperation (memory export, import and Coming Soon: CUDA Interop)</li>
                            <li>Cancellable Future based Async I/O</li>
                            <li>Virtual File System (archive mounting, our alternative to #embed, everything is referenced by absolute path)</li>
                            <li>Asset Managment: Directed Acyclic Graphs</li>
                            <li>Asset Converter: Merkle Trees de-duplicating GPU Object Instances</li>
                            <li>Unit tested BxDFs in a Statically Polymorhic framework</li>
                            <li>In Progress: GPU ECS (Property Pools)</li>
                            <li>SPIR-V Introspection and Layout creation</li>
                            <li>Extensions (ImGUI, FFT, Workgroup Prefix Sum, Blur, Counting Sort In Progress: Autoexposure, Tonemap, GPU MPMC Queue, OptiX Interop, Global Scan)</li>
                            <li>Coming Soon: Scene Loaders, GPU Driven Scene Graph, Material Compiler v2 for efficient scheduling of BxDF graph evaluation</li>
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