import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

const BackArrowIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" />
  </svg>
);

interface Section {
  id: string;
  label: string;
}

function getProjectSections(projectId: string): Section[] {
  if (projectId === "2") {
    return [
      { id: "project-brief",      label: "Resumen del Proyecto" },
      { id: "project-challenges", label: "Desafíos" },
      { id: "project-findings",   label: "Hallazgos Clave y Soluciones" },
      { id: "project-personas",   label: "Lógica y Sistemas" },
      { id: "project-results",    label: "Resumen" },
    ];
  }
  if (projectId === "3") {
    return [
      { id: "project-brief",      label: "Resumen del Proyecto" },
      { id: "project-challenges", label: "Desafíos" },
      { id: "project-findings",   label: "Análisis Comparativo" },
      { id: "project-personas",   label: "Conociendo a Nuestra Usuaria" },
      { id: "project-solution",   label: "Sistema de Diseño" },
      { id: "project-results",    label: "Resultados y Próximos Pasos" },
    ];
  }
  if (projectId === "10") {
    return [
      { id: "project-brief",    label: "Resumen del Proyecto" },
      { id: "project-findings", label: "Benchmarking" },
      { id: "project-personas", label: "Proceso UX" },
      { id: "project-solution", label: "Testing y Decisiones" },
      { id: "project-results",  label: "Diseño Final" },
    ];
  }
  return [
    { id: "project-brief",      label: "Resumen del Proyecto" },
    { id: "project-challenges", label: "Desafíos" },
    { id: "project-findings",   label: "Análisis Comparativo" },
    { id: "project-personas",   label: "Personas de Usuario" },
    { id: "project-solution",   label: "Solución y Diseño" },
    { id: "project-results",    label: "Resultados y Próximos Pasos" },
  ];
}

function ProjectSideNav() {
  const { pathname } = useLocation();
  const projectId = pathname.startsWith("/project/") ? pathname.split("/project/")[1] : "1";
  const sections = useMemo(() => getProjectSections(projectId), [projectId]);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "project-brief");

  useEffect(() => {
    const updateActive = () => {
      // Trigger point: 35% down the viewport
      const trigger = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0]?.id ?? "";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= trigger) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    // Defer first run so section elements are in the DOM after page transition
    const raf = requestAnimationFrame(updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  const handleSectionClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.aside
      className="hidden md:flex flex-col fixed left-[60px] top-[160px] z-[100] w-[360px] gap-7"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/proyectos"
        className="flex items-center gap-2 text-[#C8C4BC] hover:text-[#2D2D2D] transition-colors duration-200 w-fit"
      >
        {BackArrowIcon}
        <span className="text-sm font-medium">Proyectos</span>
      </Link>

      <nav role="navigation" aria-label="Secciones del proyecto" className="flex flex-col">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`text-left leading-[1.1] transition-all duration-200 inline-block origin-left hover:scale-[1.05] ${
                isActive
                  ? "text-[26px] font-bold text-[#1A1A1A]"
                  : "text-[24px] font-light text-[#C8C4BC] hover:text-[#2D2D2D]"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </nav>
    </motion.aside>
  );
}

export default ProjectSideNav;
