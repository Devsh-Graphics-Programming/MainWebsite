type Size = "md" | "lg";

export default function CTAButton({
  href = "mailto:newclients@devsh.eu",
  label = "Talk to our experts",
  size = "lg",
}: {
  href?: string;
  label?: string;
  size?: Size;
}) {
  const sizing =
    size === "lg"
      ? "w-full max-w-64 sm:w-auto sm:min-w-56 px-4 py-2.5 text-sm sm:px-5 sm:text-base"
      : "px-4 py-2.5 text-sm sm:px-5 sm:text-base";

  return (
    <a
      href={href}
      className={`brand-button group relative inline-flex items-center justify-center gap-3 ${sizing} rounded-md border border-[var(--brand-accent)]/70 bg-black/45 font-semibold text-[var(--brand-accent-bright)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--brand-accent-bright)] active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-bright)] focus:ring-offset-2 focus:ring-offset-black`}
      style={{ background: "linear-gradient(180deg, rgba(125, 205, 185, 0.16), rgba(85, 181, 166, 0.08))" }}
    >
      <span>{label}</span>
      <span className="flex h-7 w-7 items-center justify-center rounded border border-[var(--brand-accent)]/70 bg-[var(--brand-accent)] text-[#031111] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:bg-[var(--brand-accent-bright)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}
