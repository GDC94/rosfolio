import Header from "../components/Header";
import ProjectsGrid from "../components/ProjectsGrid";
import ProjectsList from "../components/ProjectsList";
import Footer from "../components/Footer";
import { getFeaturedProjects } from "../data/projects";

function Proyectos() {
  const featuredProjects = getFeaturedProjects(4);

  return (
    <div className="min-h-screen">
      <Header />

      <main
        id="main-content"
        className="max-w-7xl mx-auto"
        role="main"
        aria-label="Proyectos"
      >
        <ProjectsGrid projects={featuredProjects} />
        <ProjectsList />
      </main>

      <Footer />
    </div>
  );
}

export default Proyectos;
