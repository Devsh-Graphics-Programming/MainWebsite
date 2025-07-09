import devshLogo from "@/public/devsh_transparent_1920.png"
import nablaScreenshot1 from "@/public/nabla_screenshot1.jpg"

import Image from "next/image"
import Slide from "./slide"
import { TextBlock } from "../components/TextUtils"
import Link from "next/link"

import fluidGif from "@/public/nabla/fluid.gif"
import imguiPng from "@/public/nabla/imgui.png"
import rt_screenshotJpg from "@/public/nabla/rt_screenshot.jpg"
import rt_screenshot1Jpg from "@/public/nabla/rt_screenshot1.jpg"
import sdf_function_manipGif from "@/public/nabla/sdf_func_manip.gif"
import volume_reconstructPng from "@/public/nabla/volume_reconstruct.png"

const images = [
    { path: fluidGif, optimized: false },
    { path: imguiPng, optimized: true },
    { path: rt_screenshotJpg, optimized: true },
    { path: rt_screenshot1Jpg, optimized: true },
    { path: sdf_function_manipGif, optimized: false },
    { path: volume_reconstructPng, optimized: true }
]

export default async function Page() {
    return (
        <main className="container mx-auto flex flex-col p-4 overflow-y-auto snap-mandatory scroll-smooth">
            <Slide className="h-dvh">
                <Image src={devshLogo} alt="Nabla Logo" className="aspect-square w-[240px] xl:w-[480px]"/> 
                <TextBlock>
                    <Link href="https://github.com/Devsh-Graphics-Programming/Nabla" className="hover:text-teal-200 transition-colors duration-300">Nabla</Link> (previously called <Link href="https://github.com/buildaworldnet/IrrlichtBAW" className="hover:text-teal-200 transition-colors duration-300">IrrlichtBaW</Link>) is a new renovated version of older Irrlicht engine. The name change to Nabla allows for using Nabla side by side with the legacy Irrlicht and IrrlichtBaW engines. The project currently aims for a thread-able and Vulkan-centered API, the Vulkan backend is almost complete, and OpenGL and ES backends are currently in maintenance mode.
                </TextBlock>
            </Slide>
            <Slide className="h-dvh">
                <div className="grid grid-cols-2 gap-4">
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
                    <div className="grid">
                        <Image src={nablaScreenshot1} alt="Nabla Screenshot 1" className="aspect-video w-full max-h-full object-cover max-lg:hidden"/>
                    </div>
                </div>
            </Slide>
            <Slide>
                <h1>Showcase</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-full overflow-y-scroll">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-full h-full aspect-video">
                            <Image 
                                src={image.path} 
                                width={1280} 
                                height={720} 
                                alt="Showcase screenshot" 
                                className="object-contain"
                                unoptimized={image.optimized ? false : true}
                            />
                        </div>
                    ))}
                </div>
            </Slide>
        </main>
    )
}