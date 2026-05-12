import Image from "next/image";
import React from "react";

export type Partner = {
  name: string;
  initials: string;
  logo: string | null;
  url: string | null;
  logoTone?: "normal" | "invert";
};

const partners: Partner[] = [
  { name: "Applications in CADD", initials: "AC", logo: "/partners/appscadd.png", url: "https://appsincadd.co.uk/" },
  { name: "Synera", initials: "SY", logo: "/partners/synera.png", url: "https://www.synera.io/", logoTone: "invert" },
  { name: "Ditt Officemakers", initials: "DT", logo: "/partners/ditt.png", url: "https://www.ditt.nl/" },
  { name: "Imverse", initials: "IM", logo: "/partners/imverse.png", url: "https://www.imverse.com/" },
  { name: "Wild Software Inc", initials: "WI", logo: "/partners/wild.jpg", url: "https://factionsvr.com/" },
  { name: "RELEX Solutions", initials: "RX", logo: null, url: "https://relexsolutions.com/" },
];

function LogoMark({ partner }: { partner: Partner }) {
  if (partner.logo) {
    return (
      <span className="relative block h-14 w-14 sm:h-16 sm:w-16">
        <Image
          src={partner.logo}
          alt={partner.name}
          fill
          sizes="7rem"
          loading="eager"
          className={`object-contain opacity-90 transition duration-200 group-hover:scale-105 group-hover:opacity-100 ${
            partner.logoTone === "invert" ? "invert" : ""
          }`}
        />
      </span>
    );
  }

  // Returns a single rectangle with the name centered inside
  return (
    <div className="flex h-10 items-center justify-center whitespace-nowrap rounded border border-white/20 px-4 text-sm font-medium text-neutral-300 sm:h-12 sm:text-base">
      {partner.name}
    </div>
  );
}

function LogoTile({ partner }: { partner: Partner }) {
  const className =
    "group flex h-16 shrink-0 items-center justify-center px-2 transition duration-200 hover:-translate-y-1 sm:h-24";

  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer" title={partner.name} className={className}>
        <LogoMark partner={partner} />
      </a>
    );
  }

  return (
    <div title={partner.name} className={className}>
      <LogoMark partner={partner} />
    </div>
  );
}

export default function PartnerLogos() {
  // Duplicate logos keep the mobile marquee continuous.
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="mb-6 overflow-hidden py-3 sm:mb-7 sm:py-4 lg:mb-8">
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Auto-scroll only runs on mobile; desktop uses a centered static row. */
        @media (max-width: 768px) {
          .animate-infinite-scroll {
            animation: infinite-scroll 35s linear infinite;
          }
          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        }
      `}</style>

      <div className="mx-auto flex flex-col items-center gap-8 text-center sm:gap-10">
        <div className="max-w-3xl px-4">
          <h3 className="!mb-0 !mt-3 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
            Trusted By
          </h3>
        </div>

        <div className="relative flex w-full max-w-[100vw] overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent md:hidden"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent md:hidden"></div>

          <div className="animate-infinite-scroll flex w-max items-center gap-3 pr-3 md:w-full md:justify-center md:pr-0">
            {duplicatedPartners.map((p, idx) => {
              const isDuplicate = idx >= partners.length;

              return (
                <div
                  key={`${p.name}-${idx}`}
                  className={isDuplicate ? "shrink-0 md:hidden" : "shrink-0"}
                >
                  <LogoTile partner={p} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
