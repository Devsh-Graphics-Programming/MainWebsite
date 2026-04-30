type ProofPoint = {
  label: string;
  title: string;
  copy: string;
};

const proofPoints: ProofPoint[] = [
  {
    label: "Embedded delivery",
    title: "Close to your engineering team",
    copy: "We work alongside client engineers, keeping renderer design, profiling and implementation connected to real product constraints.",
  },
  {
    label: "Specialized scope",
    title: "Renderer, compiler and GPU work",
    copy: "Our work spans Vulkan, SPIR-V, HLSL, OpenCL, OptiX, WebGPU, CAD visualization, mobile GPUs and real-time pipelines.",
  },
  {
    label: "Ecosystem work",
    title: "Open source and standards involvement",
    copy: "We maintain Nabla, contribute around Khronos ecosystems and present graphics work at Vulkanised and Shading Language Symposium.",
  },
];

function Card({ point }: { point: ProofPoint }) {
  return (
    <div className="surface-panel brand-hover h-full p-6 sm:p-7 lg:p-8">
      <p className="section-kicker">{point.label}</p>
      <h3 className="!mb-3 !mt-4 text-xl font-semibold leading-tight sm:text-2xl">{point.title}</h3>
      <p className="!m-0 text-sm leading-relaxed text-neutral-300 sm:text-base">{point.copy}</p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section-band py-14 sm:py-[4.5rem] lg:py-20">
      <div className="site-container">
        <div className="section-head mb-8 sm:mb-10">
          <p className="section-kicker">How we work</p>
          <h2 className="section-heading">Specialist engineering for demanding graphics systems</h2>
          <p className="section-lede">
            Direct implementation, careful profiling and renderer architecture work for teams that need senior GPU experience.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
          {proofPoints.map((point) => (
            <Card key={point.label} point={point} />
          ))}
        </div>
      </div>
    </section>
  );
}
