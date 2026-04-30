import devshLogo from "@/public/devsh_transparent_1920.png"
import nablaScreenshot1 from "@/public/nabla_screenshot1.jpg"

import Image from "next/image"
import Slide from "./slide"
import { Paragraph } from "../components/TextUtils"
import Link from "next/link"

import fluidGif from "@/public/nabla/fluid.gif"
import imguiIntegrationJpg from "@/public/nabla/imguiintegration.jpg"
import rt_screenshotJpg from "@/public/nabla/rt_screenshot.jpg"
import rt_screenshot1Jpg from "@/public/nabla/rt_screenshot1.jpg"
import sdf_function_manipGif from "@/public/nabla/sdf_func_manip.gif"
import path_traced_1Png from "@/public/nabla/path_traced_1.png"
import path_traced_2Png from "@/public/nabla/path_traced_2.png"
import ditt6 from "@/public/clients/ditt/ditt6.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props"

function GridImage({ src, unoptimized }: { src: string | StaticImport, unoptimized?: boolean }) {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
            <Image
                src={src}
                fill
                sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                alt="Showcase screenshot"
                className="object-cover"
                unoptimized={unoptimized}
            />
        </div>
    )
}

export default function Page() {
    return (
        <main className="site-container section-pad flex flex-col gap-16 overflow-y-auto scroll-smooth">
            <Slide>
                <Image src={devshLogo} alt="Nabla Logo" className="aspect-square w-40 sm:w-56 lg:w-80"/>
            </Slide>
            <Slide className="w-full">
                <h1 className="section-heading">Showcase</h1>
                <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <GridImage src={nablaScreenshot1} />
                    <GridImage src={fluidGif} unoptimized />
                    <GridImage src={imguiIntegrationJpg} />
                    <GridImage src={rt_screenshotJpg} />
                    <GridImage src={rt_screenshot1Jpg} />
                    <GridImage src={sdf_function_manipGif} unoptimized />
                    <GridImage src={path_traced_1Png} />
                    <GridImage src={path_traced_2Png} />
                    <GridImage src={ditt6} />
                </div>
            </Slide>
            <Slide className="mx-auto max-w-4xl">
                <h1 className="section-heading">About</h1>
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
            <Slide className="mx-auto max-w-5xl">
                <h1 className="section-heading">Main Features</h1>
                <ul className="grid list-disc gap-2 pl-5 text-sm font-light leading-relaxed text-neutral-300 sm:grid-cols-2 sm:text-base">
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
