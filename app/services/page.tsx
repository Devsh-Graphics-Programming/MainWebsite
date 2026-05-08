"use client";

import { useState, useEffect } from "react";
import { Paragraph, Chapter } from "../components/TextUtils";

function ContactEmail() {
    const [isShown, setIsShown] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    const email = "newclients@devsh.eu";

    const handleCopy = async () => {
        if (!isShown) {
            setIsShown(true);
            return;
        }
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <div className="relative group">
            {/* Background ambient glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full blur opacity-20 transition duration-1000 ${isShown ? 'group-hover:opacity-40' : 'group-hover:opacity-60'}`}></div>
            
            <button
                onClick={handleCopy}
                className={`
                    relative inline-flex items-center justify-center 
                    px-10 py-5 text-xl sm:text-2xl font-bold 
                    rounded-full transition-all duration-500 
                    border-2 transform hover:scale-105 active:scale-95
                    ${
                        isShown
                            ? "border-teal-400 bg-zinc-900 text-teal-300 cursor-copy shadow-[0_0_30px_-5px_rgba(20,184,166,0.4)]"
                            : "border-teal-500/50 bg-zinc-900 text-white hover:border-teal-400 cursor-pointer"
                    }
                `}
            >
                {isShown ? (
                    <div className="flex items-center gap-4">
                        <span className="select-all font-mono tracking-tight">{email}</span>
                        <div className={`
                            text-xs uppercase tracking-widest px-3 py-1 rounded-full border
                            transition-all duration-300
                            ${copied 
                                ? "bg-teal-500 border-teal-400 text-white" 
                                : "bg-zinc-800 border-zinc-700 text-zinc-400 group-hover:text-teal-300"}
                        `}>
                            {copied ? "Copied!" : "Click to Copy"}
                        </div>
                    </div>
                ) : (
                    <span className="flex items-center gap-3">
                        Show Email Address
                        <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </span>
                )}
            </button>
        </div>
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