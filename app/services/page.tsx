import Link from "next/link"
import Image, { type StaticImageData } from "next/image"
import { Paragraph, Chapter } from "../components/TextUtils"
import OptimizedLoopVideo from "../components/OptimizedLoopVideo"

// baw
import volumeReconstruct from "@/public/clients/baw/volume_reconstruct.png";
import baw1 from "@/public/clients/baw/baw1.jpg";
import baw2 from "@/public/clients/baw/baw2.jpg";
import baw3 from "@/public/clients/baw/baw3.jpg";
import baw4 from "@/public/clients/baw/baw4.jpg";
import baw5 from "@/public/clients/baw/baw5.jpg";
import baw6 from "@/public/clients/baw/baw6.jpg";
import baw7 from "@/public/clients/baw/baw7.jpg";

// n4ce
import n4ce_1 from "@/public/clients/apps_in_cadd/n4ce_1.jpg";

// ditt
import nablaScreenshot1 from "@/public/nabla_screenshot1.jpg";
import ditt1 from "@/public/clients/ditt/ditt1.jpg";
import ditt2 from "@/public/clients/ditt/ditt2.jpg";
import ditt3 from "@/public/clients/ditt/ditt3.jpg";
import ditt4 from "@/public/clients/ditt/ditt4.png";
import ditt5 from "@/public/clients/ditt/ditt5.jpg";

// imverse
import imverse1 from "@/public/clients/imverse/imverse1.webp";

// wild
import wild1 from "@/public/clients/wild/wild1.jpg";
import wild2 from "@/public/clients/wild/wild2.jpg";
import wild3 from "@/public/clients/wild/wild3_v2.jpg";
import wild4 from "@/public/clients/wild/wild4.jpg";
import wildGif1 from "@/public/clients/wild/wild_gif1.gif";
import wildGif2 from "@/public/clients/wild/wild_gif2.gif";

type PastProjectProps =
{
    company: string,
    companyWebsite?: string,
    images?: StaticImageData[] | string[],
    videos?: string[],
    projects: React.ReactNode[]
}

function PastProject({company, companyWebsite, images, videos, projects}: PastProjectProps) {
    return (
        <article className="border-t border-white/10 pt-8">
            <h3 className="!mb-4 !mt-0 text-2xl font-semibold leading-tight sm:text-3xl">
                For {companyWebsite ? 
                    <Link href={companyWebsite} target="_blank" rel="noopener noreferrer" className="devsh-link">{company}</Link>
                    : <>{company}</>
                }
            </h3>
            <ul className="!m-0 flex list-none flex-col gap-3 p-0">
                {projects.map((project, index) => <li key={index}>{project}</li>)}
            </ul>
            {(images || videos) && 
                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {images && images.map((image, index) => {
                        const blur = typeof image !== "string" && image.blurDataURL ? "blur" : "empty";
                        return (
                            <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-900/70 ring-1 ring-white/10">
                                <Image
                                    src={image}
                                    alt=""
                                    aria-hidden="true"
                                    fill
                                    sizes="(min-width: 64rem) 50vw, 100vw"
                                    placeholder={blur}
                                    loading="eager"
                                    className="object-cover blur-lg scale-105 opacity-60"
                                />
                                <Image
                                    src={image}
                                    alt={`${company} showcase ${index+1}`}
                                    fill
                                    sizes="(min-width: 64rem) 50vw, 100vw"
                                    placeholder={blur}
                                    loading="eager"
                                    className="object-contain"
                                />
                            </div>
                        );
                    })}
                    {videos && videos.map((video, index) => 
                        <div key={index} className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-900/70 ring-1 ring-white/10">
                            <OptimizedLoopVideo
                                src={video}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>
            }
        </article>
    )
}

function ProjectBullet({ children }: { children: React.ReactNode }) {
    return (
        <span className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-accent)]" aria-hidden="true" />
            <span>{children}</span>
        </span>
    )
}

export default function Page() {
    return (
        <main className="section-pad">
            <div className="site-container flex flex-col gap-14">
                <Chapter title="Experience and Offer">
                    <Paragraph>
                        We have worked on several long-term projects for companies such as Build A World Aps., Imverse S.A., S Ditt B.V., and Applications In CADD.
                        <br />
                        <br />
                        Also we have conducted Graphics Performance Appraisals and outsourced R&amp;D for RELEX Solutions and Synera GmbH. Most of our work is in the CAD space, with occasional game development in between.
                        <br />
                        <br />
                        You may find our GitHub profiles within the Khronos adjacent ecosystem, with contributions to Validation Layers, SPIR-V Cross, and over 100 bug reports and test cases for the DirectX Shader Compiler.
                        <br />
                        <br />
                        We are 8 time Vulkanised and 2 time Shading Language Symposium conference speakers in the 2023, 2024 and 2026 years.
                        <br />
                        For the 2026 edition we were the Platinum Sponsors.
                        <br />
                        <br />
                        Collectively we’re experienced in Vulkan, SPIR-V, OpenGL (ES and WebGL included), DirectX12 and 11, CUDA, OpenCL, WebGPU, and NVN for GPU APIs as well as CMake, Docker, Jenkins, Python, SWIG, .Net7 and WASM, Emscripten, Typescript, CI/CD, Kubernetes, Terraform, AWS, Proxmox and Language Engineering.
                        <br />
                        <br />
                        Finally, many of us have Mathematics Degrees.
                    </Paragraph>
                </Chapter>
                <Chapter title="Past Projects">
                    <div className="flex flex-col gap-10">
                        <PastProject 
                            company="Ditt"
                            companyWebsite="https://ditt.nl"
                            images={[nablaScreenshot1, ditt1, ditt2, ditt3, ditt4, ditt5]}
                            projects={[
                                <ProjectBullet key="ditt-1">Interactive GPU Path Tracer (OpenCL and OptiX) ingesting existing Mitsuba scenes</ProjectBullet>,
                                <ProjectBullet key="ditt-2">Maintenance of in-house interior design tool</ProjectBullet>,
                                <ProjectBullet key="ditt-3">Integration of new Real-Time rendering techniques for rapid previews in the design tool</ProjectBullet>,
                                <ProjectBullet key="ditt-4">Denoisers and Image Processing including FFT Convolution Bloom</ProjectBullet>,
                                <ProjectBullet key="ditt-5">Consulting w.r.t. existing Mitsuba render farm</ProjectBullet>,
                                <ProjectBullet key="ditt-6">Ongoing Vulkan Real-Time Path Tracer development</ProjectBullet>
                            ]}
                        />
                        <PastProject
                            company="Build A World Aps."
                            images={[volumeReconstruct, baw1, baw2, baw3, baw4, baw5, baw6, baw7]}
                            projects={[
                                <ProjectBullet key="baw-1">Photogrammetry generating point clouds from drone flythroughs</ProjectBullet>,
                                <ProjectBullet key="baw-2">LiDAR Point Cloud Processing and Volume Reconstruction</ProjectBullet>,
                                <ProjectBullet key="baw-3">Maintaining and Extending the existing OpenGL engine</ProjectBullet>,
                                <ProjectBullet key="baw-4">GLSL Shader Development for ocean and particle simulation</ProjectBullet>,
                                <ProjectBullet key="baw-5">Distributed Networked Fluid Simulation</ProjectBullet>,
                                <ProjectBullet key="baw-6">Physics Engine Development for high performance voxel connectivity</ProjectBullet>
                            ]}
                        />
                        <PastProject
                            company="Applications in CADD"
                            companyWebsite="https://appsincadd.co.uk"
                            images={[n4ce_1]}
                            videos={["/clients/apps_in_cadd/n4ce_showcase.mp4"]}
                            projects={[
                                <ProjectBullet key="cadd-1">Tailor-made GPU-driven graphics engine for n4ce v5.0 using Nabla</ProjectBullet>,
                                <ProjectBullet key="cadd-2">Extremely large point cloud datasets and civil engineering projects</ProjectBullet>,
                                <ProjectBullet key="cadd-3">Performance improvements over the legacy n4ce renderer</ProjectBullet>,
                                <ProjectBullet key="cadd-4">Close integration with the n4ce v5.0 product</ProjectBullet>,
                                <ProjectBullet key="cadd-5">Modern build system with shader preprocessing and embedded SPIR-V tooling</ProjectBullet>,
                                <ProjectBullet key="cadd-6">Ongoing optimisation during public beta work</ProjectBullet>
                            ]}
                        />
                        <PastProject
                            company="Wild Inc. / Factions"
                            images={[wildGif1, wildGif2, wild1, wild2, wild3, wild4]}
                            projects={[
                                <ProjectBullet key="wild-1">Solving Vulkan synchronization issues</ProjectBullet>,
                                <ProjectBullet key="wild-2">Implementing bindless rendering</ProjectBullet>,
                                <ProjectBullet key="wild-3">DXC and Adreno 600 workarounds for Buffer Device Address usage</ProjectBullet>,
                                <ProjectBullet key="wild-4">GPU-driven rendering implementation</ProjectBullet>,
                                <ProjectBullet key="wild-5">Occlusion culling designed for mobile tile-based deferred rendering GPUs</ProjectBullet>
                            ]}
                        />
                        <PastProject
                            company="Imverse"
                            companyWebsite="https://www.imverse.ch/"
                            images={[imverse1]}
                            projects={[
                                <ProjectBullet key="imverse-1">GPGPU Consulting and Contracting to solve Computer Vision problems</ProjectBullet>,
                                <ProjectBullet key="imverse-2">GPU Accelerated Silhouette Carving from RGB+D real-time video inputs</ProjectBullet>
                            ]}
                        />
                        <PastProject
                            company="RELEX Solutions"
                            companyWebsite="https://relexsolutions.com"
                            projects={[
                                <ProjectBullet key="relex-1">Investigation of .NET 6 WASM and Blazor SDKs <Link className="devsh-link" href="https://github.com/Devsh-Graphics-Programming/JS-WASM-interop-benchmark">(example issues reported to Microsoft)</Link></ProjectBullet>,
                                <ProjectBullet key="relex-2">Feasibility studies of TypeScript and C# interoperation and Unified Web & Native Renderer</ProjectBullet>
                            ]}
                        />
                        <PastProject
                            company="Synera"
                            companyWebsite="https://www.synera.io/"
                            projects={[
                                <ProjectBullet key="synera-1">Deep performance analysis identifying rendering bottlenecks on complex scenes</ProjectBullet>,
                                <ProjectBullet key="synera-2">Plan of action and initial design for a new renderer</ProjectBullet>
                            ]}
                        />
                    </div>
                </Chapter>
                <Chapter title="Conclusion">
                    <Paragraph>
                        We provide an unbeatable offering with consultants dedicated to your project while also benefitting 
                        from heavy 50%+ discounts on co-development and maintenance of Vulkan Utilities used in
                        your project similar to those present in the CUDA space such as CUB.
                        Finally our Consultants constantly benefit from each other’s experience and insights delivering
                        solutions a step above those devisable in solitude, even if a project has a singular Consultant.
                    </Paragraph>
                </Chapter>
            </div>
        </main>
    )
}
