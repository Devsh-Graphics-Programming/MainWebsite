import CTAButton from "./CTAButton";

type Event = {
  name: string;
  fullName: string;
  location: string;
  status: string;
  href: string;
  image: string;
  description: string;
};

const events: Event[] = [
  {
    name: "GPC 2026",
    fullName: "Graphics Programming Conference",
    location: "Breda, Netherlands",
    status: "Sponsor",
    href: "https://graphicsprogrammingconference.com/",
    image: "https://graphicsprogrammingconference.com/images/gpc-og.jpg",
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
      className="community-event group"
    >
      <div className="community-event-visual" aria-hidden="true">
        <div
          className="community-event-visual-image"
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
            <span>{event.location}</span>
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
    <section id="community-support" className="community-support-section scroll-mt-24">
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
