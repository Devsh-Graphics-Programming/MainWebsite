import Image from "next/image"
import Slide from "./slide"
import { Paragraph } from "../components/TextUtils"
import Link from "next/link"
import OptimizedLoopVideo from "../components/OptimizedLoopVideo"
import ResponsiveImage from "../components/ResponsiveImage"

type GridMediaProps = {
    src: string;
    poster?: string;
    type?: "image" | "video";
}

function GridMedia({ src, poster, type = "image" }: GridMediaProps) {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
            {type === "video" ? (
                <OptimizedLoopVideo
                    src={src}
                    poster={poster}
                    aria-label="Showcase video"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <ResponsiveImage
                    src={src}
                    sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw"
                    alt="Showcase screenshot"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}
        </div>
    )
}

export default function Page() {
    return (
        <main className="site-container section-pad flex flex-col gap-16 overflow-y-auto scroll-smooth">
            <Slide>
                <Image src="/devsh_transparent_1920.png" alt="Nabla Logo" width={320} height={320} className="aspect-square w-40 sm:w-56 lg:w-80"/>
            </Slide>
            <Slide className="w-full">
                <h1 className="section-heading">Showcase</h1>
                <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <GridMedia src="/nabla_screenshot1.jpg" />
                    <GridMedia src="/optimized/nabla/fluid.mp4" poster="/optimized/nabla/fluid-poster.webp" type="video" />
                    <GridMedia src="/nabla/imguiintegration.jpg" />
                    <GridMedia src="/nabla/rt_screenshot.jpg" />
                    <GridMedia src="/nabla/rt_screenshot1.jpg" />
                    <GridMedia src="/optimized/nabla/sdf_func_manip.mp4" poster="/optimized/nabla/sdf_func_manip-poster.webp" type="video" />
                    <GridMedia src="/nabla/path_traced_1.png" />
                    <GridMedia src="/nabla/path_traced_2.png" />
                    <GridMedia src="/clients/ditt/ditt6.png" />
                </div>
            </Slide>
            <Slide className="mx-auto max-w-4xl">
                <h1 className="section-heading">About</h1>
                <Paragraph>
                    <Link href="https://github.com/Devsh-Graphics-Programming/Nabla" className="hover:text-teal-200 transition-colors duration-300">Nabla</Link> (previously <Link href="https://github.com/buildaworldnet/IrrlichtBAW" className="hover:text-teal-200 transition-colors duration-300">IrrlichtBaW</Link>) started as a fork and renovation of the Irrlicht engine, it has since become the Ship of Theseus. Nabla is Vulkan-only thread agnostic, free of singletons and was redesigned with interoperability and headless rendering, allowing you to use it un-intrusively within other engines and share resources from them.
                    <br />
                    <br />
                    Most importantly it bridges C++ and HLSL allowing Single Source Programming and compiling most HLSL both for the CPU Host and GPU Device, giving you a CUDA-like experience with Vulkan. Furthermore it provides header only libraries for HLSL such as: unit tested BxDFs, FFTs, parts of C++ STL and much more!
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
