import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { getProjectSections, getSectionAt, getSectionScrollTop } from "../data/projectSections";

const BackArrowIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" />
  </svg>
);

// Viewport line that decides which section is "active" (labels)
const ACTIVE_LINE = 0.45;
// Vertical position of the nav itself — decides its color (light/dark background behind it)
const NAV_LINE = 220;

function ProjectSideNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const projectId = pathname.startsWith("/project/") ? pathname.split("/project/")[1] : "1";
  const sections = useMemo(() => getProjectSections(projectId), [projectId]);
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "project-brief");
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const update = () => {
      setActiveSection(getSectionAt(ids, window.innerHeight * ACTIVE_LINE) ?? ids[0]);
      const behind = getSectionAt(ids, NAV_LINE);
      setOnDark(!!behind && document.getElementById(behind)?.dataset.sectionTheme === "dark");
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // Defer first run so section elements are in the DOM after page transition
    const raf = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  const handleSectionClick = (id: string) => {
    const top = getSectionScrollTop(id);
    if (top === null) return;
    if (lenis) lenis.scrollTo(top, { duration: 1.2 });
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const idle = onDark ? "text-white/35 hover:text-white/80" : "text-[#C8C4BC] hover:text-[#2D2D2D]";
  const current = onDark ? "text-white" : "text-[#1A1A1A]";

  return (
    <motion.aside
      className="hidden md:flex flex-col fixed left-[60px] top-[160px] z-[100] w-[360px] gap-7"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        onClick={() => navigate("/", { state: { scrollTo: "proyectos" } })}
        className={`flex items-center gap-2 transition-colors duration-300 w-fit ${idle}`}
      >
        {BackArrowIcon}
        <span className="text-sm font-medium">Proyectos</span>
      </button>

      <nav role="navigation" aria-label="Secciones del proyecto" className="flex flex-col">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              aria-current={isActive ? "true" : undefined}
              className={`text-left leading-[1.1] transition-all duration-300 inline-block origin-left hover:scale-[1.05] ${
                isActive ? `text-[26px] font-bold ${current}` : `text-[24px] font-light ${idle}`
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
