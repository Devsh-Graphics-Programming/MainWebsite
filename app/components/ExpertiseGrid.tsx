"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const items: { title: string; images: string[]; href: string }[] = [
  { 
    title: "Real-Time Graphics & Engine Optimization", 
    images: ["/clients/baw/baw4.jpg"], 
    href: "#projects" 
  },
  { 
    title: "Path Tracing and Physically-Based Rendering", 
    images: [
      "/nabla/rt_screenshot_both.jpg",
      "/clients/ditt/ditt4.png", 
      "/clients/ditt/ditt5.jpg",
      "/clients/ditt/ditt2.jpg"
    ], 
    href: "#project-ditt" 
  },
  { 
    title: "CAD & Scientific Visualization", 
    images: ["/clients/apps_in_cadd/scene1_cropped.png"], 
    href: "#project-appscadd" 
  },
  { 
    title: "VR & Mobile GPU Development", 
    images: ["/clients/wild/wild3.jpg"], 
    href: "#project-wild" 
  },
  { 
    title: "Computational Geometry", 
    images: ["/clients/apps_in_cadd/offset_curve.gif"], 
    href: "#project-appscadd" 
  },
  { 
    title: "High-Performance Compute & Optimization", 
    images: ["/nabla/nsc.png"], 
    href: "#projects" 
  },
  { 
    title: "Photogrammetry and Differentiable Rendering", 
    images: ["/clients/baw/volume_reconstruct.png"], 
    href: "#project-buildaworld" 
  },
];

function PlaceholderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function Card({ title, images, href }: { title: string; images: string[]; href: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <a
      href={href}
      aria-label={`Jump to ${title}`}
      className="media-hover group relative block aspect-[4/3] max-w-[22rem] flex-[1_1_15rem] overflow-hidden rounded-lg border border-white/10 bg-[var(--surface-soft)] sm:max-w-[19rem]"
    >
      {images.length > 0 ? (
        // Keep slides stacked so opacity transitions do not flash to black.
        images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`${title} - image ${index + 1}`}
            fill
            sizes="(min-width: 64rem) 25vw, (min-width: 40rem) 50vw, 100vw"
            loading={index === 0 ? "eager" : "lazy"}
            className={`object-cover transition-all duration-[1500ms] ease-in-out group-hover:scale-105 ${
              index === currentIndex ? "opacity-100 blur-0" : "opacity-0 blur-md"
            }`}
          />
        ))
      ) : (
        <>
          <div className="absolute inset-0 bg-[#111]" />
          <div className="absolute inset-0 flex items-center justify-center text-white/10">
            <PlaceholderIcon />
          </div>
        </>
      )}

      <div className="absolute inset-0 pointer-events-none rounded-lg ring-2 ring-inset ring-transparent transition-all duration-700 group-hover:ring-[var(--brand-accent)]/70 z-20" />

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-2 sm:h-16 sm:px-4 sm:py-0 bg-black/40 backdrop-blur-md border-t border-white/10 z-20">
        <p className="!m-0 text-center text-xs font-medium leading-tight text-white drop-shadow transition-colors duration-500 group-hover:text-[var(--brand-accent-bright)] sm:text-base sm:leading-snug">
          {title}
        </p>
      </div>
    </a>
  );
}

export default function ExpertiseGrid() {
  return (
    <section className="w-full pb-9 pt-3 sm:pb-11 sm:pt-4 lg:pb-12">
      <div className="site-container">
        <div className="section-head mb-7 sm:mb-8">
          <h2 className="section-heading">Our Expertise</h2>
        </div>
        {/* Two-column mobile grid, then a wrapped centered row on wider screens. */}
        <div className="grid w-full grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center">
          {items.map((it) => (
            <Card key={it.title} title={it.title} images={it.images} href={it.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
