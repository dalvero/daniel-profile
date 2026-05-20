import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsShowcase from "@/components/projects/ProjectsShowcase";
import ProjectsMarquee from "@/components/projects/ProjectsMarquee";
import ProjectsCTA from "@/components/projects/ProjectsCTA";
import Footer from "@/components/common/Footer";

export const metadata = {
  title: "Projects — Daniel Alfero",
  description:
    "Koleksi proyek web, mobile, Java, IoT, dan UI experiment oleh Daniel Alfero.",
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsShowcase />
      <ProjectsMarquee />
      <ProjectsCTA />
    </main>
  );
}
