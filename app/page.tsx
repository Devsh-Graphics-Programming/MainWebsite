import HeroHeader from "./components/HeroHeader";
import ExpertiseGrid from "./components/ExpertiseGrid";
import PartnerLogos from "./components/Partners";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import LinkedInUpdatesSection from "./components/LinkedInUpdatesSection";
import NablaSection from "./components/NablaSection";
import EcosystemSection from "./components/EcosystemSection";
import CommunitySupportSection from "./components/CommunitySupportSection";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <main className="home-shell flex flex-col">
      <HeroHeader />
      <ExpertiseGrid />
      <PartnerLogos />
      <TestimonialsSection />
      <LinkedInUpdatesSection />
      <ProjectsSection />
      <NablaSection />
      <EcosystemSection />
      <CommunitySupportSection />
      <AboutSection />
    </main>
  );
}
