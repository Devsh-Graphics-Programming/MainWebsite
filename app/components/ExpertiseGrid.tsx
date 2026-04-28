import type { ReactNode } from "react";

function Card({
  title,
  visual,
}: {
  title: string;
  visual: ReactNode;
}) {
  return (
    <div className="group relative flex flex-col rounded-lg border border-[#181818] bg-[#0a0a0a] overflow-hidden transition-all duration-150 hover:border-[var(--brand-accent)] hover:-translate-y-1 hover:shadow-[0_8px_30px_var(--brand-accent-glow)]">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
        {visual}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
      </div>
      <div className="p-5 sm:p-6">
        <h4 className="!my-0 text-lg sm:text-xl font-medium leading-snug transition-colors duration-150 group-hover:text-[var(--brand-accent-bright)]">
          {title}
        </h4>
      </div>
    </div>
  );
}

function FlameGraphVisual() {
  const bars = [
    { y: 14, w: 95 },
    { y: 28, w: 78 },
    { y: 42, w: 60 },
    { y: 56, w: 38 },
    { y: 70, w: 18 },
  ];
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flameGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--brand-accent-bright)" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {bars.map((b, i) => (
        <rect
          key={i}
          x="6"
          y={b.y - 6}
          width={(b.w / 100) * 148}
          height="9"
          rx="1.5"
          fill="url(#flameGrad)"
          opacity={1 - i * 0.08}
        />
      ))}
      <line x1="6" y1="92" x2="154" y2="92" stroke="#222" strokeWidth="0.5" />
    </svg>
  );
}

function PathTracingVisual() {
  const dots = Array.from({ length: 70 }).map((_, i) => ({
    cx: (i * 37) % 80,
    cy: (i * 53) % 100,
    r: ((i * 17) % 10) / 10 + 0.4,
  }));
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cleanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-accent-bright)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0.15" />
        </linearGradient>
        <clipPath id="leftHalf">
          <polygon points="0,0 78,0 70,100 0,100" />
        </clipPath>
        <clipPath id="rightHalf">
          <polygon points="78,0 160,0 160,100 70,100" />
        </clipPath>
      </defs>
      {/* Noisy left side */}
      <g clipPath="url(#leftHalf)">
        <rect x="0" y="0" width="80" height="100" fill="#0a0a0a" />
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={d.r}
            fill="#888"
            opacity={((i * 13) % 10) / 12 + 0.2}
          />
        ))}
      </g>
      {/* Clean right side */}
      <g clipPath="url(#rightHalf)">
        <rect x="0" y="0" width="160" height="100" fill="url(#cleanGrad)" />
        <circle cx="115" cy="50" r="22" fill="var(--brand-accent-bright)" opacity="0.35" />
        <circle cx="115" cy="50" r="14" fill="var(--brand-accent-bright)" opacity="0.6" />
      </g>
      {/* Divider */}
      <line x1="78" y1="0" x2="70" y2="100" stroke="var(--brand-accent-bright)" strokeWidth="0.6" opacity="0.9" />
    </svg>
  );
}

function CADVisual() {
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cadShade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0.15" />
        </linearGradient>
        <clipPath id="cadRight">
          <rect x="80" y="0" width="80" height="100" />
        </clipPath>
      </defs>
      {/* Iso cube vertices */}
      {/* top: (80,18) (118,32) (80,46) (42,32) */}
      {/* bottom: (80,54) (118,68) (80,82) (42,68) */}
      {/* Wireframe (left half visible) */}
      <g stroke="var(--brand-accent-bright)" strokeWidth="0.7" fill="none" opacity="0.9">
        <polygon points="80,18 118,32 80,46 42,32" />
        <polygon points="80,54 118,68 80,82 42,68" />
        <line x1="80" y1="18" x2="80" y2="54" />
        <line x1="118" y1="32" x2="118" y2="68" />
        <line x1="42" y1="32" x2="42" y2="68" />
        {/* internal structural lines */}
        <line x1="80" y1="46" x2="80" y2="82" opacity="0.45" />
        <line x1="42" y1="32" x2="80" y2="46" opacity="0.45" />
        <line x1="118" y1="32" x2="80" y2="46" opacity="0.45" />
      </g>
      {/* Shaded faces on right half */}
      <g clipPath="url(#cadRight)">
        <polygon points="80,18 118,32 80,46 42,32" fill="url(#cadShade)" opacity="0.9" />
        <polygon points="118,32 118,68 80,82 80,46" fill="var(--brand-accent)" opacity="0.55" />
        <polygon points="80,46 80,82 42,68 42,32" fill="var(--brand-accent)" opacity="0.25" />
      </g>
      {/* Divider */}
      <line x1="80" y1="0" x2="80" y2="100" stroke="#222" strokeDasharray="2,2" strokeWidth="0.4" />
    </svg>
  );
}

function FpsGraphVisual() {
  // x: 0..160, y inverted (low is high fps). Path: low flat then sharp spike.
  const path =
    "M 6 75 L 26 73 L 46 76 L 66 72 L 80 70 L 92 45 L 104 28 L 118 18 L 134 14 L 154 12";
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fpsArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-accent-bright)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid */}
      <g stroke="#1a1a1a" strokeWidth="0.4">
        <line x1="6" y1="20" x2="154" y2="20" />
        <line x1="6" y1="45" x2="154" y2="45" />
        <line x1="6" y1="70" x2="154" y2="70" />
      </g>
      {/* area under curve */}
      <path d={`${path} L 154 92 L 6 92 Z`} fill="url(#fpsArea)" />
      {/* line */}
      <path d={path} stroke="var(--brand-accent-bright)" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* end-of-line marker */}
      <circle cx="154" cy="12" r="2.4" fill="var(--brand-accent-bright)" />
      <circle cx="154" cy="12" r="5" fill="var(--brand-accent-bright)" opacity="0.25" />
      {/* baseline */}
      <line x1="6" y1="92" x2="154" y2="92" stroke="#222" strokeWidth="0.5" />
    </svg>
  );
}

function VRVisual() {
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="lensGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--brand-accent-bright)" stopOpacity="0.95" />
          <stop offset="55%" stopColor="var(--brand-accent)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Headset chassis */}
      <rect
        x="22"
        y="28"
        width="116"
        height="48"
        rx="14"
        fill="none"
        stroke="var(--brand-accent-bright)"
        strokeWidth="0.8"
        opacity="0.85"
      />
      {/* strap hints */}
      <line x1="22" y1="52" x2="6" y2="48" stroke="var(--brand-accent-bright)" strokeWidth="0.6" opacity="0.5" />
      <line x1="138" y1="52" x2="154" y2="48" stroke="var(--brand-accent-bright)" strokeWidth="0.6" opacity="0.5" />
      {/* Left lens */}
      <ellipse cx="58" cy="52" rx="22" ry="16" fill="url(#lensGlow)" />
      <ellipse cx="58" cy="52" rx="22" ry="16" fill="none" stroke="var(--brand-accent-bright)" strokeWidth="0.7" />
      {/* Right lens */}
      <ellipse cx="102" cy="52" rx="22" ry="16" fill="url(#lensGlow)" />
      <ellipse cx="102" cy="52" rx="22" ry="16" fill="none" stroke="var(--brand-accent-bright)" strokeWidth="0.7" />
      {/* Latency badge */}
      <g>
        <rect x="116" y="6" width="38" height="14" rx="2" fill="#0a0a0a" stroke="var(--brand-accent-bright)" strokeWidth="0.6" />
        <text
          x="135"
          y="16"
          textAnchor="middle"
          fontSize="8"
          fontFamily="monospace"
          fill="var(--brand-accent-bright)"
        >
          1ms
        </text>
      </g>
    </svg>
  );
}

const items: { title: string; visual: ReactNode }[] = [
  { title: "High-Performance Compute & Optimization", visual: <FlameGraphVisual /> },
  { title: "Advanced Rendering & Path Tracing", visual: <PathTracingVisual /> },
  { title: "CAD Visualization & Geometry Processing", visual: <CADVisual /> },
  { title: "Real-Time Graphics & Engine Optimization", visual: <FpsGraphVisual /> },
  { title: "VR/AR Optimization", visual: <VRVisual /> },
];

export default function ExpertiseGrid() {
  return (
    <section className="w-full pb-8 sm:pb-16">
      <h2 className="text-center !mt-0">Our Expertise</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {items.map((it) => (
          <Card key={it.title} title={it.title} visual={it.visual} />
        ))}
      </div>
    </section>
  );
}
