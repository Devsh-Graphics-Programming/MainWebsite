"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

type Testimonial = {
  name: string;
  role: string;
  profilePicture: string;
  companyIcon: string;
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Phil Langrishe",
    role: "Managing Director at Applications in Cadd",
    profilePicture: "/testimonials/phil.jpg",
    companyIcon: "/partners/appscadd.png", // <-- Add this line
    testimonial:
      "Matt, Erfan and the rest of the Devsh team have been amazing to work with.  We presented them with a very difficult challenge which was to take a large and very old, plus some what outdated C++ codebase written for a different time, and bring it up to date so that we could make use of their Vulkan based Nabla graphics engine. They broke the challenge down into manageable chunks and then over the past few years have proceeded to inject lightening fast graphics into our application.  All agreed targets have been met on time, and on budget.  I can not thank them enough for the hard work and dedication they have shown towards achieving our goals.  Their knowledge and professionalism has been second to none!",
  },
  {
    name: "Yoran Bosman",
    role: "Senior Software Architect",
    profilePicture: "/testimonials/yoran.jpg",
    companyIcon: "/partners/ditt.png", // <-- Add this line
    testimonial:
      "The DevSH team transformed our CPU render farm for architectural visualization into a scalable GPU-based system with outstanding performance and reliability. Their expertise and commitment to achieving the best results were clear throughout the project. They maintained full backward compatibility, ensuring a smooth transition with minimal disruption to our workflows.",
  }
];

export default function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -(clientWidth * 0.8) : clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="section-band py-14 sm:py-[4.5rem] lg:py-20">
      <div className="site-container relative">
        <div className="section-head mb-8 sm:mb-10">
          <h2 className="section-heading">What our partners say</h2>
        </div>

        <div className="relative group">
          {/* Left Navigation Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="hidden md:flex absolute -left-5 lg:-left-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          {/* Testimonials Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex flex-col md:flex-row gap-4 lg:gap-5 md:overflow-x-auto md:snap-x md:snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 shrink-0 md:snap-center w-full md:w-[calc(50%-8px)] lg:w-[calc(50%-10px)] max-w-[600px] h-auto md:h-[500px]"
              >
                
                {/* UPDATED PROFILE HEADER
                  - justify-between pushes the left-side info and right-side logo apart
                  - items-center keeps everything vertically aligned
                */}
                <div className="flex items-center justify-between gap-4 mb-6 shrink-0">
                  
                  {/* LEFT SIDE: Profile Pic & Text */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full shrink-0 bg-zinc-100 dark:bg-zinc-800">
                      <Image
                        src={t.profilePicture}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1 leading-none">
                        {t.name}
                      </h3>
                      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-tight">
                        {t.role}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Company Icon (Only renders if you provided one in the data) */}
                  {t.companyIcon && (
                    <div className="relative h-12 w-12 shrink-0">
                      <Image
                        src={t.companyIcon}
                        alt="Company Logo"
                        fill
                        className="object-contain opacity-70 dark:opacity-80" // object-contain ensures the logo isn't cropped
                        sizes="48px"
                      />
                    </div>
                  )}

                </div>

                {/* Testimonial Body */}
                <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-300 dark:[&::-webkit-scrollbar-thumb]:bg-zinc-600 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg text-justify">
                    &ldquo;{t.testimonial}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="hidden md:flex absolute -right-5 lg:-right-12 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
