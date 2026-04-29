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
        {vulkanisedData.map((yearData) => (
          <section key={yearData.year}>
            <h2 className="!mt-0 !mb-6 text-center" style={{ color: "var(--brand-accent-bright)" }}>
              Vulkanised {yearData.year}
            </h2>
            <VideoGrid videos={yearData.videos} />
          </section>
        ))}
      </div>
    </main>
  );
}
