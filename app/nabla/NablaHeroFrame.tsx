"use client";

import { type ReactNode, useRef } from "react";

export default function NablaHeroFrame({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const tiltX = (x - 0.5) * 4;
    const tiltY = (0.5 - y) * 3.2;

    frame.style.setProperty("--nabla-glow-x", `${x * 100}%`);
    frame.style.setProperty("--nabla-glow-y", `${y * 100}%`);
    frame.style.setProperty("--nabla-tilt-x", `${tiltX}deg`);
    frame.style.setProperty("--nabla-tilt-y", `${tiltY}deg`);
  };

  const handlePointerLeave = () => {
    const frame = frameRef.current;
    if (!frame) return;

    frame.style.setProperty("--nabla-glow-x", "52%");
    frame.style.setProperty("--nabla-glow-y", "34%");
    frame.style.setProperty("--nabla-tilt-x", "0deg");
    frame.style.setProperty("--nabla-tilt-y", "0deg");
  };

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="nabla-hero-frame relative overflow-hidden rounded-2xl border border-white/10 bg-black/70 p-2 shadow-[0_2rem_7rem_rgba(0,0,0,0.62),0_0_4rem_rgba(85,181,166,0.13),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur"
    >
      <div className="nabla-hero-frame-glow" aria-hidden="true" />
      <div className="nabla-hero-frame-sheen" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
