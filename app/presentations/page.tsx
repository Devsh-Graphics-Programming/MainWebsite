import { YouTubeEmbed } from "@next/third-parties/google";
import vulkanisedData from "@/app/data/vulkanised.json";

function VideoGrid({ videos }: { videos: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {videos.map((ytId) => (
        <div key={ytId} className="media-hover group aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-black">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.02]">
            <YouTubeEmbed videoid={ytId} params="wmode=transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PresentationsPage() {
  return (
    <main className="site-container section-pad flex flex-col gap-14 sm:gap-20">
      <div className="section-head">
        <h1 className="section-heading">Our Presentations</h1>
        <p className="section-lede text-neutral-400">
          Talks and presentations by DevSH at Vulkanised, SIGGRAPH, GDC, and
          Khronos workshops — sharing our research with the graphics community.
        </p>
      </div>

      <div className="flex flex-col gap-12 sm:gap-16">
        {vulkanisedData.map((event) => (
          <section key={event.title}>
            <div className="mb-6 text-center">
              {event.url ? (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <h2 className="!m-0" style={{ color: "var(--brand-accent-bright)" }}>
                    {event.title}
                  </h2>
                </a>
              ) : (
                <h2 className="!m-0" style={{ color: "var(--brand-accent-bright)" }}>
                  {event.title}
                </h2>
              )}
            </div>
            <VideoGrid videos={event.videos} />
          </section>
        ))}
      </div>
    </main>
  );
}
