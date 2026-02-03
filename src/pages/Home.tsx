import Header from "../components/Header";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import ProjectsList from "../components/ProjectsList";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { getFeaturedProjects } from "../data/projects";

function Home() {
  const featuredProjects = getFeaturedProjects(4);

  return (
    <div className="min-h-screen">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[rgb(201,188,63)] focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(201,188,63)]"
      >
        Saltar al contenido principal
      </a>

      <Header />
      <Hero />

      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        role="main"
        aria-label="Contenido principal del portfolio"
      >
        {/* Espaciado uniforme entre secciones: py-16 sm:py-20 md:py-24 */}
        <ProjectsGrid projects={featuredProjects} />
        <ProjectsList />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
