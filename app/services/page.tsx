"use client";

import { type ReactNode, useState } from "react";
import NablaShaderBackdrop from "../nabla/NablaShaderBackdrop";

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
    <button
      type="button"
      onClick={handleCopy}
      className={`premium-cta brand-button group inline-flex w-full max-w-full items-center justify-center gap-3 rounded-lg border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 sm:w-auto sm:px-6 sm:py-3.5 sm:text-base ${
        isShown
          ? "premium-cta--revealed text-white"
          : "text-white"
      }`}
    >
      {isShown ? (
        <>
          <span className="min-w-0 break-all font-mono tracking-tight text-white">{email}</span>
          <span
            className={`shrink-0 rounded border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider transition-colors ${
              copied ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-black" : "border-[var(--brand-accent)]/40 bg-[var(--brand-accent)]/15 text-[var(--brand-accent-bright)] group-hover:border-[var(--brand-accent)]/70"
            }`}
          >
            {copied ? "Copied!" : "Click to Copy"}
          </span>
        </>
      ) : (
        <>
          <span>Show Email Address</span>
          <svg className="h-5 w-5 text-[var(--brand-accent-bright)] transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </>
      )}
    </button>
  );
}

function ServiceStory({ title, children, className = "" }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <section className={`service-story ${className}`}>
      <div className="service-story-heading">
        <h2 className="!m-0 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">{title}</h2>
      </div>
      <div className="service-story-content">{children}</div>
    </section>
  );
}

function Paragraph({ children }: { children?: ReactNode }) {
  return <p className="!m-0 text-base leading-relaxed text-neutral-300 sm:text-lg">{children}</p>;
}

export default function Page() {
  return (
    <main className="services-shell min-h-screen overflow-hidden">
      <section className="service-hero flex flex-col items-center justify-center py-16 sm:py-20 lg:py-24">
        <div aria-hidden="true" className="service-hero-cloud">
          <div className="service-hero-cloud-base" />
          <NablaShaderBackdrop />
          <div className="service-hero-cloud-vignette" />
        </div>
        <div className="site-container relative z-10 flex flex-col items-center gap-8 text-center">
          <h1 className="!m-0 max-w-5xl bg-[linear-gradient(135deg,#fff_18%,#f4fffb_58%,var(--brand-accent-bright)_100%)] bg-clip-text text-5xl font-semibold leading-[0.96] tracking-tight text-transparent drop-shadow-[0_0_1.8rem_rgba(0,0,0,0.55)] sm:text-6xl lg:text-7xl">
            Discuss Your Project with Us
          </h1>
          <ContactEmail />
        </div>
      </section>

      <div className="site-container pb-12 sm:pb-16 lg:pb-20">
        <div className="services-editorial mx-auto max-w-6xl">
          <ServiceStory title="The Power of the Collective" className="service-story--lead">
            <Paragraph>
              When you partner with DevSH, you aren&apos;t just hiring isolated consultants. You gain the collective expertise of our entire team. Our engineers constantly share insights and experience, ensuring that every solution we deliver is battle-tested and a step above what isolated developers can achieve. Whether you bring on a single dedicated developer or a specialized task force, we constantly share knowledge, research, and invent new algorithms together.
            </Paragraph>
          </ServiceStory>

          <ServiceStory title="Proven Track Record">
            <Paragraph>
              We build long-term technical partnerships, stepping in to solve complex architectural challenges and rendering bottlenecks that require deep, highly specialized focus.
            </Paragraph>
            <ul className="service-rich-list">
              <li>Long-Term R&amp;D &amp; Co-Development: Trusted by industry innovators including Imverse S.A., Ditt B.V., and Applications In CADD to architect and maintain critical rendering infrastructure.</li>
              <li>Performance Appraisals &amp; Outsourced R&amp;D: Delivered comprehensive graphics performance diagnostics, providing actionable short-term performance wins and long-term architectural roadmaps for RELEX Solutions and Synera GmbH. </li>
            </ul>
          </ServiceStory>

          <ServiceStory title="Driving the Industry Forward">
            <Paragraph>
              We don&apos;t just use modern graphics APIs. We help shape the ecosystem. We are active contributors to the graphics programming community.
            </Paragraph>
            <ul className="service-rich-list">
              <li><strong>Open Source Contributions:</strong> You can find our GitHub profiles highly active within the Khronos ecosystem. Our direct contributions span the Vulkan and SPIR-V specifications, SPIR-V Tools, Vulkan Validation Layers, CMake, Mesa, and LLVM.</li>
              <li><strong>Compiler Hardening:</strong> We stress-test shader compilers to the absolute extreme, submitting hundreds of bug reports and test cases across the DirectX Shader Compiler, Slang, and the SPIR-V specification.</li>
              <li><strong>8-Time Speakers:</strong> Vulkanised Conference (2023, 2024, 2026)</li>
              <li><strong>2-Time Speakers:</strong> Shading Language Symposium</li>
              <li><strong>Platinum Sponsors:</strong> Vulkanised 2026</li>
            </ul>
          </ServiceStory>

          <ServiceStory title="Our Technical Arsenal" className="service-story--wide">
            <Paragraph>
              We utilize a bleeding-edge, highly optimized stack to deliver scalable, cross-platform results.
            </Paragraph>
            <ul className="service-rich-list service-rich-list--columns">
              <li><strong>Graphics &amp; Compute APIs:</strong> Vulkan, DirectX 12, DirectX 11, CUDA, OpenCL, WebGPU, OpenGL (including ES &amp; WebGL), NVN, SYCL.</li>
              <li><strong>Shading &amp; Architecture:</strong> SPIR-V, HLSL 202x, Slang, GLSL and WGSL.</li>
              <li><strong>Build Systems:</strong> CMake, Conan, Python, SWIG, MCJIT, ORCJIT, Clang Customizations, LLVM Toolchains.</li>
              <li><strong>Infrastructure, CI/CD &amp; Tooling:</strong> Docker, Jenkins, Kubernetes, Terraform, AWS, Proxmox, vGPUs, virGL, venus, virtIO, QEMU.</li>
              <li><strong>Delivering Web Experiences:</strong> WASM, Emscripten, TypeScript, .NET 7, Venus-Protocol, ChromeOS native APK development.</li>
              <li><strong>Delivering AR/XR/VR Experiences:</strong> OpenXR, HorizonOS development.</li>
              <li><strong>GPU Driver &amp; Layer Development:</strong> Turnip, llvmpipe, virtIO, Venus, virGL, Zink, MoltenVK, KosmicKrisp.</li>
            </ul>
          </ServiceStory>

          <ServiceStory title="Shared Boilerplate Incentive" className="service-story--closing">
            <Paragraph>
              When two or more of our clients use the same FOSS project and wish to extend it with the same features (e.g., SPIR-V Tools or the Nabla HLSL Standard Template Library), we facilitate cost-sharing. This results in massive <strong>30-75% discounts</strong> on our billed hourly rates, significantly reducing your development overhead while advancing the core tools your project relies on.
            </Paragraph>
          </ServiceStory>
        </div>
      </div>
    </main>
  );
}
