"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Testimonial = {
  name: string;
  role: string;
  profileUrl: string;
  profilePicture: string;
  companyIcon: string;
  companyIconTone?: "normal" | "invert";
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Phil Langrishe",
    role: "Managing Director at Applications in Cadd",
    profileUrl: "https://www.linkedin.com/in/aic-phil/",
    profilePicture: "/testimonials/phil.jpg",
    companyIcon: "/partners/appscadd.png",
    testimonial:
      "Matt, Erfan and the rest of the Devsh team have been amazing to work with.  We presented them with a very difficult challenge which was to take a large and very old, plus some what outdated C++ codebase written for a different time, and bring it up to date so that we could make use of their Vulkan based Nabla graphics engine. They broke the challenge down into manageable chunks and then over the past few years have proceeded to inject lightening fast graphics into our application.  All agreed targets have been met on time, and on budget.  I can not thank them enough for the hard work and dedication they have shown towards achieving our goals.  Their knowledge and professionalism has been second to none!",
  },
  {
    name: "Yoran Bosman",
    role: "Partner & Software Architect",
    profileUrl: "https://www.linkedin.com/in/yoranbosman/",
    profilePicture: "/testimonials/yoran.jpg",
    companyIcon: "/partners/ditt.png",
    testimonial:
      "The DevSH team transformed our CPU render farm for architectural visualization into a scalable GPU-based system with outstanding performance and reliability. Their expertise and commitment to achieving the best results were clear throughout the project. They maintained full backward compatibility, ensuring a smooth transition with minimal disruption to our workflows.",
  },
  {
    name: "Sven Seele",
    role: "Techlead at Synera",
    profileUrl: "https://www.linkedin.com/in/sven-seele-09433a41/",
    profilePicture: "/testimonials/sven.jpg",
    companyIcon: "/partners/synera.png",
    companyIconTone: "invert",
    testimonial:
      "We were looking for performance improvements for our integrated viewer technology and DevSH brought exactly the expertise we needed. They worked independently, asked the right questions, and delivered a report that was thorough and easy to follow, with the required performance analysis and concrete improvement strategies. They also gave us sound technical guidance on rendering strategy that helped align our team internally. We'd definitely work with them again.",
  },
];

// Continuous drift of the desktop carousel, in pixels per second.
const DRIFT_SPEED = 16;
// How sharply an arrow press is eased into the drift; higher settles faster.
const NUDGE_DAMPING = 6;
// Halt the drift while the pointer is anywhere over the carousel, so a quote
// can be read without it sliding away. The arrow controls pause regardless of
// this flag; see the note on them below.
const PAUSE_ON_HOVER = true;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function TestimonialCard({
  testimonial,
  clone,
}: {
  testimonial: Testimonial;
  clone?: boolean;
}) {
  return (
    <article
      className={`testimonial-quote group/testimonial${
        clone ? " testimonial-quote--clone" : ""
      }`}
      aria-hidden={clone ? true : undefined}
    >
      <div className="testimonial-author">
        <div className="flex min-w-0 items-center gap-4">
          <div className="testimonial-avatar">
            <Image
              src={testimonial.profilePicture}
              alt={clone ? "" : testimonial.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>

          <div className="min-w-0">
            <a
              href={testimonial.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${testimonial.name} on LinkedIn`}
              className="testimonial-profile-link"
              tabIndex={clone ? -1 : undefined}
            >
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <span className="testimonial-link-badge" aria-hidden="true">
                in
              </span>
            </a>
            <p className="testimonial-role">{testimonial.role}</p>
          </div>
        </div>

        <div className="testimonial-company">
          <Image
            src={testimonial.companyIcon}
            alt=""
            fill
            className={`object-contain ${
              testimonial.companyIconTone === "invert" ? "invert" : ""
            }`}
            sizes="(min-width: 64rem) 4.5rem, 3.25rem"
          />
        </div>
      </div>

      <p className="testimonial-text">
        &ldquo;{testimonial.testimonial}&rdquo;
      </p>
    </article>
  );
}

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  // Current scroll position of the track, and any pending arrow movement
  // still being eased in. Both live in refs so the rAF loop can drive the
  // transform directly instead of re-rendering every frame.
  const offsetRef = useRef(0);
  const nudgeRef = useRef(0);
  const cycleRef = useRef(0);
  const centredRef = useRef(false);
  const [paused, setPaused] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const trackGap = useCallback((track: HTMLDivElement) => {
    return parseFloat(getComputedStyle(track).columnGap || "0") || 0;
  }, []);

  // The track renders the list twice, so one full cycle is half its width.
  // scrollWidth omits the trailing gap, hence the correction.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cycle = (track.scrollWidth + trackGap(track)) / 2;
    cycleRef.current = cycle;

    // Open with the first quote centred rather than flush against the left
    // edge. Done once per activation so a resize does not yank the track back
    // to the start mid-drift.
    if (centredRef.current || cycle <= 0) return;

    const viewport = viewportRef.current;
    const card = track.querySelector<HTMLElement>(".testimonial-quote");
    if (!viewport || !card) return;

    const start = card.offsetWidth / 2 - viewport.clientWidth / 2;
    offsetRef.current = ((start % cycle) + cycle) % cycle;
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    centredRef.current = true;
  }, [trackGap]);

  useEffect(() => {
    if (!isDesktop) {
      // Leaving desktop: drop the inline transform so the stacked layout is
      // clean, and re-centre if the carousel comes back.
      offsetRef.current = 0;
      nudgeRef.current = 0;
      centredRef.current = false;
      if (trackRef.current) trackRef.current.style.transform = "";
      return;
    }

    measure();
    const track = trackRef.current;
    const observer = new ResizeObserver(measure);
    if (track) observer.observe(track);

    return () => observer.disconnect();
  }, [isDesktop, measure]);

  useEffect(() => {
    if (!isDesktop) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // Clamp dt so a backgrounded tab does not jump the track on return.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      const cycle = cycleRef.current;
      if (cycle > 0) {
        const drift = paused || reducedMotion ? 0 : DRIFT_SPEED * dt;

        // Exponential easing approaches zero without reaching it, so close the
        // final sub-pixel outright and let the card settle exactly centred.
        let catchUp = nudgeRef.current * (1 - Math.exp(-dt * NUDGE_DAMPING));
        if (Math.abs(nudgeRef.current - catchUp) < 0.5) {
          catchUp = nudgeRef.current;
        }
        nudgeRef.current -= catchUp;

        const next = offsetRef.current + drift + catchUp;
        offsetRef.current = ((next % cycle) + cycle) % cycle;

        const track = trackRef.current;
        if (track) {
          track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isDesktop, paused, reducedMotion]);

  // Move to the adjacent card and land it dead centre in the viewport, rather
  // than shifting by a fixed amount and inheriting whatever fractional
  // position the drift happened to leave behind.
  const goTo = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const card = track?.querySelector<HTMLElement>(".testimonial-quote");
      if (!track || !viewport || !card) return;

      const stride = card.offsetWidth + trackGap(track);
      if (stride <= 0) return;

      // Offset at which card `index` is centred.
      const centreFor = (index: number) =>
        index * stride + card.offsetWidth / 2 - viewport.clientWidth / 2;

      // Include any movement still easing in, so rapid presses queue up
      // instead of fighting each other.
      const pending = offsetRef.current + nudgeRef.current;
      const current = (pending - centreFor(0)) / stride;

      // Land on the first card boundary strictly past the current position, so
      // a press never skips a card mid-drift and never stalls when one is
      // already centred. The epsilon is well under a pixel of stride.
      const target =
        direction === 1
          ? Math.floor(current + 1e-3) + 1
          : Math.ceil(current - 1e-3) - 1;

      nudgeRef.current += centreFor(target) - pending;
    },
    [trackGap],
  );

  return (
    <section className="testimonials-section">
      <div className="site-container relative">
        <div className="section-head mb-[var(--testimonial-heading-gap)]">
          <h2 className="section-heading">What our partners say</h2>
        </div>

        <div
          className="testimonial-carousel"
          onMouseEnter={PAUSE_ON_HOVER ? () => setPaused(true) : undefined}
          onMouseLeave={PAUSE_ON_HOVER ? () => setPaused(false) : undefined}
        >
          <div className="testimonial-viewport" ref={viewportRef}>
            <div className="testimonial-track" ref={trackRef}>
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                />
              ))}
              {/* The second set only exists to close the desktop loop. It is
                  rendered after mount so mobile never ships a duplicate copy,
                  and so the server and first client render agree. */}
              {isDesktop &&
                testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={`${testimonial.name}-clone`}
                    testimonial={testimonial}
                    clone
                  />
                ))}
            </div>
          </div>

          {/* The controls pause regardless of PAUSE_ON_HOVER: stepping is
              pointless if the drift immediately carries the card away. Hover
              is covered as well as focus because Safari does not focus a
              button on click. */}
          <div
            className="testimonial-controls"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <button
              type="button"
              className="testimonial-arrow"
              aria-label="Show previous testimonials"
              onClick={() => goTo(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M15 5 8 12l7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="testimonial-arrow"
              aria-label="Show next testimonials"
              onClick={() => goTo(1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="m9 5 7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
