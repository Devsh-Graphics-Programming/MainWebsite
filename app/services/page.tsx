import Link from "next/link"

type PastProjectProps =
{
    company: string,
    companyWebsite?: string,
    projects: React.ReactNode[]
}

function PastProject({company, companyWebsite, projects}: PastProjectProps) {
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
        </div>
    )
}

function TextBlock({children}: { children?: React.ReactNode }) {
    return <div className="prose sm:prose-sm md:prose-md lg:prose-lg xl:prose-xl 2xl:prose-2xl prose-invert font-thin px-2">{children}</div>
}

function Chapter({title, children}: {title: string, children?: React.ReactNode}) {
    return (
        <div className="flex flex-col gap-4">
            <h1>{title}</h1>
            <div className="pl-2">
                {children}
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <div className="container mx-auto p-4 flex flex-col gap-4 sm:gap-8 h-full items-center">
            <div className="flex flex-col gap-4 md:gap-8">
                <Chapter title="Experience and Offer">
                    <TextBlock>
                        We have worked on several long-term projects for companies such as Build A World Aps., Imverse
                        S.A., Ditt B.V., and Applications In CADD. We have also done Graphics Performance Appraisals and
                        outsourced R&D for RELEX Solutions and Synera GmbH. Most of our work is in the CAD space,
                        with occasional gamedev in between.
                        We have also been active in the Khronos adjacent ecosystem, with contributions to Validation
                        Layers, SPIR-V Cross, and over 100 bug reports and test cases for the DirectX Shader Compiler.
                        We are 6 time Vulkanised conference speakers in the 2023 and 2024 years.
                        Collectively we’re experienced in Vulkan, OpenGL (ES and WebGL included), DirectX12 and 11,
                        CUDA, OpenCL, WebGPU, and NVN for GPU APIs as well as CMake, Docker, Jenkins, Python, SWIG,
                        .Net7 and WASM, Emscripten, Typescript for build systems, CI/CD and language bindings.
                    </TextBlock>
                </Chapter>
                <Chapter title="Past Projects">
                    <div className="flex flex-col gap-8">
                        <PastProject 
                            company="Ditt"
                            companyWebsite="https://ditt.nl"
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
                        <PastProject
                            company="Imverse S.A."
                            projects={[
                                <>GPGPU Consulting and Contracting to solve Computer Vision problems</>,
                                <>GPU Accelerated Silhouette Carving from RGB+D real-time video inputs</>
                            ]}
                        />
                        <PastProject
                            company="Build A World Aps."
                            projects={[
                                <>Photogrammetry (generating point clouds from drone flythroughs)</>,
                                <>LiDAR Point Cloud Processing and Volume Reconstruction (3D game worlds from aerial scans)</>,
                                <>Maintaining and Extending the existing OpenGL engine</>,
                                <>GLSL Shader Development (ocean simulation, particle simulation)</>,
                                <>Distributed Networked Fluid Simulation</>,
                                <>Physics Engine Development (high performance voxel connectivity for destruction)</>
                            ]}
                        />
                    </div>
                </Chapter>
                <Chapter title="Conclusion">
                    <TextBlock>
                        We provide an unbeatable offering with consultants dedicated to your project while also benefit-
                        ting from heavy 50%+ discounts on co-development and maintenance of Vulkan Utilities used in
                        your project similar to those present in the CUDA space such as CUB.
                        Finally our Consultants constantly benefit from each other’s experience and insights delivering
                        solutions a step above those devisable in solitude, even if a project has a singular Consultant.
                    </TextBlock>
                </Chapter>
            </div>
        </div>
    )
}