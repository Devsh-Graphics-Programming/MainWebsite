"use client";

import { useState, useEffect } from "react";
import { Paragraph, Chapter } from "../components/TextUtils";
import Image from "next/image";

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
                    
                    <Chapter title="The Power of the Collective">
                        <Paragraph>
                            When you partner with DevSH, you aren’t just hiring isolated consultants—you gain the collective expertise of our entire team. Our engineers constantly share insights and experience, ensuring that every solution we deliver is battle-tested and a step above what isolated developers can achieve. Whether you bring on a single dedicated developer or a specialized task force, we constantly share knowledge, research, and invent new algorithms together.
                        </Paragraph>
                    </Chapter>

                    <Chapter title="Proven Track Record">
                        <Paragraph>
                            We build long-term technical partnerships, stepping in to solve complex architectural challenges and rendering bottlenecks that require deep, highly specialized focus.
                        </Paragraph>
                        <ul className="list-disc pl-5 mt-4 flex flex-col gap-2">
                            <li>Long-Term R&amp;D &amp; Co-Development: Trusted by industry innovators including Imverse S.A., Ditt B.V., and Applications In CADD to architect and maintain critical rendering infrastructure.</li>
                            <li>Performance Appraisals &amp; Outsourced R&amp;D: Delivered comprehensive graphics performance diagnostics, providing actionable short-term performance wins and long-term architectural roadmaps for RELEX Solutions and Synera GmbH. </li>
                        </ul>
                    </Chapter>

                    <Chapter title="Driving the Industry Forward">
                        <Paragraph>
                            We don't just use modern graphics APIs; we help shape the ecosystem. We are active contributors to the graphics programming community.
                        </Paragraph>
                        <ul className="list-disc pl-5 mt-4 flex flex-col gap-2">
                            <li><strong>Open Source Contributions:</strong> You can find our GitHub profiles highly active within the Khronos ecosystem. Our direct contributions span the Vulkan and SPIR-V specifications, SPIR-V Tools, Vulkan Validation Layers, CMake, Mesa, and LLVM.</li>
                            <li><strong>Compiler Hardening:</strong> We stress-test shader compilers to the absolute extreme, submitting hundreds of bug reports and test cases across the DirectX Shader Compiler, Slang, and the SPIR-V specification.</li>
                            <li><strong>8-Time Speakers:</strong> Vulkanised Conference (2023, 2024, 2026)</li>
                            <li><strong>2-Time Speakers:</strong> Shading Language Symposium</li>
                            <li><strong>Platinum Sponsors:</strong> Vulkanised 2026</li>
                        </ul>
                    </Chapter>

                    <Chapter title="Our Technical Arsenal">
                        <Paragraph>
                            We utilize a bleeding-edge, highly optimized stack to deliver scalable, cross-platform results.
                        </Paragraph>
                        <ul className="list-disc pl-5 mt-4 flex flex-col gap-2">
                            <li><strong>Graphics &amp; Compute APIs:</strong> Vulkan, DirectX 12, DirectX 11, CUDA, OpenCL, WebGPU, OpenGL (including ES &amp; WebGL), NVN, SYCL.</li>
                            <li><strong>Shading &amp; Architecture:</strong> SPIR-V, HLSL 202x, Slang, GLSL and WHSL.</li>
                            <li><strong>Build Systems:</strong> CMake, Conan, Python, SWIG, MCJIT, ORCJIT, Clang Customizations, LLVM Toolchains.</li>
                            <li><strong>Infrastructure, CI/CD &amp; Tooling:</strong> Docker, Jenkins, Kubernetes, Terraform, AWS, Proxmox, vGPUs, virGL, venus, virtIO, QEMU.</li>
                            <li><strong>Delivering Web Experiences:</strong> WASM, Emscripten, TypeScript, .NET 7, Venus-Protocol, ChromeOS native APK development.</li>
                            <li><strong>Delivering AR/XR/VR Experiences:</strong> OpenXR, HorizonOS development.</li>
                            <li><strong>GPU Driver &amp; Layer Development:</strong> Turnip, llvmpipe, virtIO, Venus, virGL, Zink, MoltenVK, KosmicKrisp.</li>
                        </ul>
                    </Chapter>

                    <Chapter title="Shared Boilerplate Incentive">
                        <Paragraph>
                            When two or more of our clients use the same FOSS project and wish to extend it with the same features (e.g., SPIR-V Tools or the Nabla HLSL Standard Template Library), we facilitate cost-sharing. This results in massive <strong>30-75% discounts</strong> on our billed hourly rates, significantly reducing your development overhead while advancing the core tools your project relies on.
                        </Paragraph>
                    </Chapter>

                </div>
            </div>
        </main>
    );
}