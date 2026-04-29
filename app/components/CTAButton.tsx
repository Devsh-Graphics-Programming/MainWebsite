type Size = "md" | "lg";

export default function CTAButton({
  href = "mailto:newclients@devsh.eu",
  label = "Talk With Our Experts",
  size = "lg",
}: {
  href?: string;
  label?: string;
  size?: Size;
}) {
  const sizing =
    size === "lg"
      ? "min-w-[280px] sm:min-w-[340px] px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg"
      : "px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base";

  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-3 ${sizing} font-semibold text-black rounded-md transition-all duration-150 hover:scale-[1.03] hover:shadow-[0_0_40px_var(--brand-accent-glow)] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black`}
      style={{ backgroundColor: "var(--brand-accent)" }}
    >
      <span>{label}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-1"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </a>
  );
}
