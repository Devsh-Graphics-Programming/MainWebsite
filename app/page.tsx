import HeroHeader from "./components/HeroHeader";
import ExpertiseGrid from "./components/ExpertiseGrid";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import NablaSection from "./components/NablaSection";
import EcosystemSection from "./components/EcosystemSection";
import AboutSection from "./components/AboutSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroHeader />
      <ExpertiseGrid />
      <ProjectsSection />
      <TestimonialsSection />
      <NablaSection />
      <EcosystemSection />
      <AboutSection />
    </main>
  );
}
