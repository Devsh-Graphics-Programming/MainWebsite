import { YouTubeEmbed } from "@next/third-parties/google";
import vulkanisedData from "@/app/data/vulkanised.json";

function VideoGrid({ videos }: { videos: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos.map((ytId) => (
        <div key={ytId} className="w-full aspect-video overflow-hidden rounded-lg">
          <YouTubeEmbed videoid={ytId} params="wmode=transparent" />
        </div>
      ))}
    </div>
  );
}

export default function PresentationsPage() {
  return (
    <main className="container mx-auto py-10 sm:py-16 flex flex-col gap-14 sm:gap-20">
      <div className="text-center">
        <h1 className="!mt-0 !mb-3">Our Presentations</h1>
        <p className="!m-0 text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto">
          Talks and presentations by DevSH at Vulkanised, SIGGRAPH, GDC, and
          Khronos workshops — sharing our research with the graphics community.
        </p>
      </div>

      <div className="flex flex-col gap-12 sm:gap-16">
        {vulkanisedData.map((event) => (
          <section key={event.title}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <h2
                className="!m-0 text-center"
                style={{ color: "var(--brand-accent-bright)" }}
              >
                {event.title}
              </h2>
              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${event.title} event page`}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium px-2.5 py-1 rounded border transition-colors duration-200 hover:bg-white/5 flex-shrink-0"
                  style={{
                    borderColor: "var(--brand-accent)",
                    color: "var(--brand-accent)",
                  }}
                >
                  Event page
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
            <VideoGrid videos={event.videos} />
          </section>
        ))}
      </div>
    </main>
  );
}
