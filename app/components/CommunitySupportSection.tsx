import CTAButton from "./CTAButton";

type Event = {
  name: string;
  fullName: string;
  location: string;
  dates?: string;
  status: string;
  href: string;
  image: string;
  imageClassName: string;
  description: string;
  featured?: boolean;
};

const events: Event[] = [
  {
    name: "Vulkanised 2027",
    fullName: "The Vulkan Developer Conference",
    location: "Kortrijk, Belgium",
    dates: "8-10 February 2027",
    status: "Sponsor",
    href: "https://vulkan.org/events/vulkanised-2027",
    image: "/events/vulkanised-2027.webp",
    imageClassName: "community-event-visual-image--vulkanised",
    description:
      "Supporting the Vulkan community as developers and implementers share practical insights into GPU programming and the Vulkan ecosystem.",
    featured: true,
  },
  {
    name: "Real-Time Shading 2027",
    fullName: "Real-Time Shading Symposium",
    location: "Kortrijk, Belgium",
    dates: "11-12 February 2027",
    status: "Sponsor",
    href: "https://www.khronos.org/events/real-time-shading-symposium-2027",
    image: "/events/real-time-shading-2027.webp",
    imageClassName: "community-event-visual-image--shading",
    description:
      "Supporting the shader community as it explores shading languages, production workflows, and the future of real-time rendering.",
    featured: true,
  },
  {
    name: "GPC 2026",
    fullName: "Graphics Programming Conference",
    location: "Breda, Netherlands",
    status: "Sponsor",
    href: "https://graphicsprogrammingconference.com/",
    image: "https://graphicsprogrammingconference.com/images/gpc-og.jpg",
    imageClassName: "community-event-visual-image--gpc",
    description:
      "Supporting one of the most focused gatherings for real-time and interactive graphics programming.",
  },
  {
    name: "SGP 2026",
    fullName: "Eurographics Symposium on Geometry Processing",
    location: "Bern, Switzerland",
    status: "Software Award Sponsor",
    href: "https://sgp26.org/",
    image: "https://sgp26.org/images/banner.jpg",
    imageClassName: "community-event-visual-image--sgp",
    description:
      "Supporting research and engineering around geometry processing, modeling, and computational design.",
  },
];

function ExternalArrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M7 5h8v8" />
      <path d="M15 5 6 14" />
    </svg>
  );
}

function EventPanel({ event }: { event: Event }) {
  return (
    <a
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`community-event group${event.featured ? " community-event--featured" : ""}`}
    >
      <div className="community-event-visual" aria-hidden="true">
        <div
          className={`community-event-visual-image ${event.imageClassName}`}
          style={{ backgroundImage: `url(${event.image})` }}
        />
        <div className="community-event-visual-shade" />
      </div>

      <div className="community-event-copy">
        <div>
          <p className="community-event-status">{event.status}</p>
          <h3>{event.name}</h3>
          <p className="community-event-name">{event.fullName}</p>
        </div>

        <div className="community-event-bottom">
          <p>{event.description}</p>
          <div className="community-event-meta">
            <span className="community-event-details">
              {event.dates && <span className="community-event-date">{event.dates}</span>}
              <span>{event.location}</span>
            </span>
            <span className="community-event-link">
              Event site
              <ExternalArrow />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function CommunitySupportSection() {
  return (
    <section id="sponsorship" className="community-support-section scroll-mt-24">
      <div className="site-container">
        <div className="section-head community-support-head">
          <p className="section-kicker">Community support</p>
          <h2 className="section-heading">Supporting the Graphics Community</h2>
          <p className="section-lede text-neutral-200">
            We support focused technical events where rendering, GPU systems, geometry processing, and real-time graphics move forward.
          </p>
        </div>

        <div className="community-events">
          {events.map((event) => (
            <EventPanel key={event.name} event={event} />
          ))}
        </div>

        <div className="community-collaboration">
          <div>
            <p className="section-kicker">Event collaboration</p>
            <h3>Organizing a technical event?</h3>
            <p>
              If your conference, workshop, or research event aligns with low-level graphics, rendering, GPU systems, geometry processing, or open-source engineering, we are open to thoughtful sponsorship and collaboration opportunities.
            </p>
          </div>
          <CTAButton href="mailto:devsh@devsh.eu?subject=Event%20collaboration" label="Propose a collaboration" size="md" />
        </div>
      </div>
    </section>
  );
}
