type Size = "md" | "lg";

export default function CTAButton({
  href = "#",
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
      className={`premium-cta brand-button group relative inline-flex items-center justify-center gap-3 ${sizing} rounded-lg border font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent-bright)] focus:ring-offset-2 focus:ring-offset-black`}
    >
      <span>{label}</span>
      <span className="premium-cta-icon flex h-7 w-7 items-center justify-center rounded border transition-all duration-200 group-hover:translate-x-0.5">
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
