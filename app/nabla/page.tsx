import devshLogo from "@/public/devsh_transparent_1920.png"
import nablaScreenshot1 from "@/public/nabla_screenshot1.jpg"

import Image from "next/image"
import Slide from "./slide"
import { Paragraph } from "../components/TextUtils"
import Link from "next/link"

import fluidGif from "@/public/nabla/fluid.gif"
import imguiPng from "@/public/nabla/imgui.png"
import rt_screenshotJpg from "@/public/nabla/rt_screenshot.jpg"
import rt_screenshot1Jpg from "@/public/nabla/rt_screenshot1.jpg"
import sdf_function_manipGif from "@/public/nabla/sdf_func_manip.gif"
import path_traced_1Png from "@/public/nabla/path_traced_1.png"
import path_traced_2Png from "@/public/nabla/path_traced_2.png"
import ditt6 from "@/public/clients/ditt/ditt6.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props"

function GridImage({ src, unoptimized }: { src: string | StaticImport, unoptimized?: boolean }) {
    return (
        <Image
            src={src}
            width={1280} 
            height={720} 
            alt="Showcase screenshot"
            className="relative w-full h-full aspect-video"
            unoptimized={unoptimized}
        />
    )
}

export default function Page() {
    return (
        <main className="container mx-auto flex flex-col px-12 overflow-y-auto snap-mandatory scroll-smooth">
            <Slide>
                <Image src={devshLogo} alt="Nabla Logo" className="aspect-square w-[240px] xl:w-[480px]"/>
            </Slide>
            <Slide className="h-full sm:p-12">
                <h1>Showcase</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-2">
                    <GridImage src={nablaScreenshot1} />
                    <GridImage src={fluidGif} unoptimized />
                    <GridImage src={imguiPng} />
                    <GridImage src={rt_screenshotJpg} />
                    <GridImage src={rt_screenshot1Jpg} />
                    <GridImage src={sdf_function_manipGif} unoptimized />
                    <GridImage src={path_traced_1Png} />
                    <GridImage src={path_traced_2Png} />
                    <GridImage src={ditt6} />
                </div>
            </Slide>
            <Slide>
                <h1>About</h1>
                <Paragraph>
                    <Link href="https://github.com/Devsh-Graphics-Programming/Nabla" className="hover:text-teal-200 transition-colors duration-300">Nabla</Link> (previously <Link href="https://github.com/buildaworldnet/IrrlichtBAW" className="hover:text-teal-200 transition-colors duration-300">IrrlichtBaW</Link>) started as a fork and renovation of the Irrlicht engine, it has since become the Ship of Theseus. Nabla is Vulkan-only thread agnostic, free of singletons and was redesigned with interoperability and headless rendering, allowing you to use it un-intrusively within other engines and share resources from them.
                    <br />
                    <br />
                    Most importantly it bridges C++ and HLSL allowing Single Source Programming and compiling most HLSL both for the CPU Host and GPU Device, giving you a CUDA-like experience with Vulkan. Furthermore it provides header only libraries for HLSL such as; unit tested BxDFs, FFTs, parts of C++ STL and much more!
                    <br />
                    <br />
                    It&apos;s the perfect choice for building Vulkan middlewares.
                </Paragraph>
            </Slide>
            <Slide className="max-h-full flex flex-col">
                <h1>Main Features</h1>
                <ul className="px-2 py-4 gap-1 list-disc list-inside font-thin text-sm sm:text-md lg:text-lg">
                    <li>Curated List of Vulkan Features and Extensions the Nabla Core Profile</li>
                    <li>Easy filtering of Vulkan Physical Devices by capabilities</li>
                    <li>SPIR-V and Vulkan as first class citizens</li>
                    <li>First class integration of Renderdoc</li>
                    <li>Extensive use of Timeline Semaphores (event handlers, CPU callbacks on GPU conditions)</li>
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
            </Slide>
        </main>
    )
}
