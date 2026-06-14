import { YouTubeEmbed } from "@next/third-parties/google";
import vulkanisedData from "@/app/data/vulkanised.json";
import NablaShaderBackdrop from "../nabla/NablaShaderBackdrop";

function VideoGrid({ videos }: { videos: string[] }) {
  return (
    <div className="presentation-video-grid">
      {videos.map((ytId) => (
        <div key={ytId} className="presentation-video-shell group">
          <div className="presentation-video-frame">
            <YouTubeEmbed videoid={ytId} params="wmode=transparent" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PresentationsPage() {
  return (
    <main className="presentations-page">
      <section className="presentations-hero">
        <div aria-hidden="true" className="presentations-cloud-field">
          <div className="home-hero-cloud-base" />
          <NablaShaderBackdrop />
          <div className="home-hero-cloud-vignette" />
        </div>

        <div className="site-container relative z-10">
          <div className="presentations-hero-copy">
            <h1 className="section-heading">Our Presentations</h1>
            <p className="cloud-lead">
              Talks and presentations by DevSH at Vulkanised, SIGGRAPH, GDC, and
              Khronos workshops, sharing our research with the graphics community.
            </p>
          </div>
        </div>
      </section>

      <div className="site-container presentations-events">
        {vulkanisedData.map((event) => (
          <section key={event.title} className="presentation-event">
            <div className="presentation-event-heading">
              {event.url ? (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="presentation-event-link"
                >
                  <h2 className="presentation-event-title">
                    {event.title}
                  </h2>
                </a>
              ) : (
                <h2 className="presentation-event-title">
                  {event.title}
                </h2>
              )}
              <p className="presentation-event-count">
                {event.videos.length} {event.videos.length === 1 ? "talk" : "talks"}
              </p>
            </div>

            <VideoGrid videos={event.videos} />
          </section>
        ))}
      </div>
    </main>
  );
}
