import Link from "next/link"
import Image from "next/image"
import { Paragraph, Chapter } from "../components/TextUtils"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
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
import wild3 from "@/public/clients/wild/wild3.jpg";
import wild4 from "@/public/clients/wild/wild4.jpg";
import wildGif1 from "@/public/clients/wild/wild_gif1.gif";
import wildGif2 from "@/public/clients/wild/wild_gif2.gif";

type PastProjectProps =
{
    company: string,
    companyWebsite?: string,
    images?: StaticImport[] | string[],
    videos?: string[],
    projects: React.ReactNode[]
}

function PastProject({company, companyWebsite, images, videos, projects}: PastProjectProps) {
    return (
        <div>
            <h3>
                For {companyWebsite ? 
                    <Link href={companyWebsite} target="_blank" rel="noopener noreferer" className="devsh-link">{company}</Link>
                    : <>{company}</>
                }
            </h3>
            <ul className="list-disc list-inside pl-4 font-thin text-[#d1d5db] sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                {projects.map((project, index) => <li key={index}>{project}</li>)}
            </ul>
            {(images || videos) && 
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 justify-center">
                    {images && images.map((image, index) => 
                        <div key={index} className="relative w-[500px] aspect-video overflow-hidden rounded-md bg-neutral-900/70 ring-1 ring-white/5">
                            <Image
                                src={image}
                                alt=""
                                aria-hidden="true"
                                fill
                                sizes="500px"
                                className="object-cover blur-lg scale-105 opacity-60"
                            />
                            <Image
                                src={image}
                                alt={`${company} showcase ${index+1}`}
                                fill
                                sizes="500px"
                                className="object-contain"
                            />
                        </div>
                    )}
                    {videos && videos.map((video, index) => 
                        <div key={index} className="relative w-[500px] aspect-video overflow-hidden rounded-md bg-neutral-900/70 ring-1 ring-white/5">
                            <OptimizedLoopVideo
                                src={video}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default function Page() {
    return (
        <main className="container mx-auto flex flex-col items-center">
            <div>
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
                    <div className="flex flex-col gap-8">
                        <PastProject 
                            company="Ditt"
                            companyWebsite="https://ditt.nl"
                            images={[nablaScreenshot1, ditt1, ditt2, ditt3, ditt4, ditt5]}
                            projects={[
                                <>Interactive GPU Path Tracer (OpenCL and OptiX) ingesting existing Mitsuba scenes</>,
                                <>Maintenance of in-house interior design tool</>,
                                <>Integration of new Real-Time rendering techniques for rapid previews in the design tool</>,
                                <>Denoisers (AI, RWMC, etc.) and Image Processing (e.g. FFT Convolution Bloom)</>,
                                <>Consulting w.r.t. existing Mitsuba render farm</>,
                                <>Ongoing Vulkan Real-Time Path Tracer development</>
                            ]}
                        />
                        <PastProject
                            company="Build A World Aps."
                            images={[volumeReconstruct, baw1, baw2, baw3, baw4, baw5, baw6, baw7]}
                            projects={[
                                <>Photogrammetry (generating point clouds from drone flythroughs)</>,
                                <>LiDAR Point Cloud Processing and Volume Reconstruction (3D game worlds from aerial scans)</>,
                                <>Maintaining and Extending the existing OpenGL engine</>,
                                <>GLSL Shader Development (ocean simulation, particle simulation)</>,
                                <>Distributed Networked Fluid Simulation</>,
                                <>Physics Engine Development (high performance voxel connectivity for destruction)</>
                            ]}
                        />
                        <PastProject
                            company="Applications in CADD"
                            companyWebsite="https://appsincadd.co.uk"
                            images={[n4ce_1]}
                            videos={["/clients/apps_in_cadd/n4ce_showcase.mp4"]}
                            projects={[
                                <>Development of a tailor-made, GPU-driven graphics engine for n4ce v5.0 using the Nabla platform</>,
                                <>Engineered for extremely large point cloud datasets and modern large-scale civil engineering projects</>,
                                <>Significant performance improvements over the legacy n4ce renderer, designed to remain scalable for the next years</>,
                                <>Close collaboration to integrate the new renderer seamlessly into the n4ce v5.0 product</>,
                                <>Design and implementation of a modern build system, including shader preprocessing & embedded SPIR-V tooling</>,
                                <>Ongoing optimisation and support during the lead-up to the public BETA release</>
                            ]}
                        />
                        <PastProject
                            company="Wild Inc. / Factions"
                            images={[wildGif1, wildGif2, wild1, wild2, wild3, wild4]}
                            projects={[
                                <>Solving Vulkan synchronization issues</>,
                                <>Implementing bindless rendering</>,
                                <>Work around DXC and Adreno 600 limitations to allow the usage of Buffer Device Address</>,
                                <>Implementation gpu driven rendering</>,
                                <>Occlusion culling with a novel algorithm specifically designed for mobile TBDR GPUs (see our Vulkanised 2026 talk)</>,
                                <>And much more</>
                            ]}
                        />
                        <PastProject
                            company="Imverse"
                            companyWebsite="https://www.imverse.ch/"
                            images={[imverse1]}
                            projects={[
                                <>GPGPU Consulting and Contracting to solve Computer Vision problems</>,
                                <>GPU Accelerated Silhouette Carving from RGB+D real-time video inputs</>
                            ]}
                        />
                        <PastProject
                            company="RELEX Solutions"
                            companyWebsite="http://relexsolutions.com"
                            projects={[
                                <>Investigation of the new .Net 6 WASM and Blazor SDKs <Link className="devsh-link" href="http://github.com/Devsh-Graphics-Programming/JS-WASM-interop-benchmark">(example issues reported to Microsoft)</Link></>,
                                <>Feasibility studies of TypeScript and C# interoperation and Unified Web & Native Renderer</>
                            ]}
                        />
                        <PastProject
                            company="Synera"
                            companyWebsite="http://synera.io/"
                            projects={[
                                <>Deep performance analysis identifying Rendering bottlenecks on complex scenes</>,
                                <>Plan of action and initial design for a new Renderer</>
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
