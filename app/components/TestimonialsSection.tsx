// ─── Edit testimonials here ─────────────────────────────────────────────────
// `avatar`: path under /public or full URL. Leave null for a placeholder
//           initials avatar.
type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string | null;
};

const testimonials: Testimonial[] = [
  {
    name: "Dr. Sarah Chen",
    role: "CTO, RenderTech Systems",
    quote:
      "DevSH transformed our rendering pipeline. Their expertise in GPU optimization and Vulkan brought our real-time ray tracing from concept to production in record time.",
    avatar: null,
  },
  {
    name: "Marcus Weber",
    role: "Lead Graphics Engineer, SimViz Corp",
    quote:
      "Working with DevSH was a game-changer. Their deep understanding of compute shaders and performance optimization helped us achieve what we thought was impossible on mobile GPUs.",
    avatar: null,
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Director of Engineering, VizLab",
    quote:
      "The team at DevSH integrated seamlessly with our developers. Their contributions to our scientific visualization platform exceeded all expectations in both quality and performance.",
    avatar: null,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function initialsOf(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("");
}

function Avatar({ avatar, name }: { avatar: string | null; name: string }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold text-white/80 flex-shrink-0"
      style={{ backgroundColor: "var(--brand-deep-soft)" }}
      aria-hidden="true"
    >
      {initialsOf(name)}
    </div>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <div
      className="rounded-xl p-6 sm:p-7 border border-white/5 transition-all duration-150 hover:border-[var(--brand-accent)]/40"
      style={{ backgroundColor: "var(--brand-deep-soft)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Avatar avatar={t.avatar} name={t.name} />
        <div className="min-w-0">
          <p className="text-white font-semibold text-base sm:text-lg leading-tight !m-0">
            {t.name}
          </p>
          <p className="text-neutral-400 text-xs sm:text-sm leading-tight !m-0 mt-0.5">
            {t.role}
          </p>
        </div>
      </div>
      <p className="text-neutral-200 italic text-sm sm:text-[0.95rem] leading-relaxed !m-0">
        &ldquo;{t.quote}&rdquo;
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="-mx-4 px-4 py-16 sm:py-24"
      style={{ backgroundColor: "var(--brand-deep)" }}
    >
      <div className="container mx-auto">
        <h2 className="text-center !mt-0 !mb-12 text-3xl sm:text-4xl lg:text-5xl">
          What Our Partners Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
