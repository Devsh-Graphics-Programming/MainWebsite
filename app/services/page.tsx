"use client";

import { useState, useEffect } from "react";
import { Paragraph, Chapter } from "../components/TextUtils";

// The interactive email revealer component
function ContactEmail() {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    useEffect(() => {
        setEmail(isShown ? "newclients@devsh.eu" : "");
    }, [isShown]);

    return (
        <button
            onClick={() => setIsShown(true)}
            className={`inline-flex items-center justify-center px-6 py-3 text-lg font-medium border ${
                isShown
                    ? "border-teal-500/50 bg-teal-500/10 text-teal-400 select-all cursor-text"
                    : "border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-teal-500/50 hover:bg-zinc-800 cursor-pointer"
            } rounded-full transition-all duration-300 shadow-lg`}
        >
            {isShown ? (
                <a href={`mailto:${email}`} className="hover:underline">
                    {email}
                </a>
            ) : (
                "Show Email Address"
            )}
        </button>
    );
}

export default function Page() {
    return (
        <main className="section-pad min-h-screen">
            <div className="site-container max-w-4xl mx-auto flex flex-col">
                
                {/* Centered Hero Call-to-Action */}
                <div className="flex flex-col items-center justify-center text-center gap-8 py-16 sm:py-24 border-b border-white/10 mb-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                        Discuss your project with Us
                    </h1>
                    <ContactEmail />
                </div>

                {/* Unified & Upgraded Sales Copy */}
                <div className="flex flex-col gap-16">
                    <Chapter title="An Unbeatable Collaborative Offering">
                        <Paragraph>
                            When you partner with us, you don't just get a dedicated consultant—you gain the collective expertise of our entire team. Our engineers constantly share insights and experience, ensuring that every solution we deliver is battle-tested, highly optimized, and a step above what isolated developers can achieve. 
                            <br /><br />
                            Furthermore, our clients enjoy massive <strong>50%+ discounts</strong> on the co-development and maintenance of core Vulkan Utilities required for their projects (comparable to CUB in the CUDA ecosystem).
                        </Paragraph>
                    </Chapter>
                    
                    <Chapter title="Proven Track Record">
                        <Paragraph>
                            Our portfolio spans long-term, high-impact engagements with industry innovators including Build A World Aps., Imverse S.A., S Ditt B.V., and Applications In CADD. 
                            <br /><br />
                            Beyond direct development, we are trusted to conduct deep Graphics Performance Appraisals and outsourced R&amp;D for companies like RELEX Solutions and Synera GmbH. While our core specialty lies in the demanding CAD and architectural spaces, we frequently leverage our engine expertise for game development applications.
                        </Paragraph>
                    </Chapter>

                    <Chapter title="Industry Leaders & Open Source Pioneers">
                        <Paragraph>
                            We don't just use the tools; we build and refine them. Our team is deeply embedded within the Khronos ecosystem, boasting major contributions to Validation Layers, SPIR-V Cross, and over 100 distinct bug reports and test cases for the DirectX Shader Compiler. 
                            <br /><br />
                            We are recognized thought leaders in the rendering space, having been selected as 8-time speakers at Vulkanised and 2-time speakers at the Shading Language Symposium across 2023, 2024, and 2026. For the 2026 edition, we proudly served as Platinum Sponsors.
                        </Paragraph>
                    </Chapter>

                    <Chapter title="Uncompromising Technical Breadth">
                        <Paragraph>
                            Backed by advanced degrees in Mathematics, our collective technical mastery spans the entire modern compute and graphics pipeline:
                            <br /><br />
                            <strong>Graphics &amp; Compute APIs:</strong> Vulkan, SPIR-V, OpenGL (including ES &amp; WebGL), DirectX 11 &amp; 12, CUDA, OpenCL, WebGPU, and NVN.
                            <br /><br />
                            <strong>Infrastructure &amp; Tooling:</strong> CMake, Docker, Jenkins, CI/CD, Kubernetes, Terraform, AWS, and Proxmox.
                            <br /><br />
                            <strong>Languages &amp; Runtimes:</strong> Python, SWIG, .NET 7, WASM, Emscripten, TypeScript, and core Language Engineering.
                        </Paragraph>
                    </Chapter>
                </div>

            </div>
        </main>
    );
}