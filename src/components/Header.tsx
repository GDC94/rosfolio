import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useLenis } from "@studio-freight/react-lenis";
import { MI_PROCESO_IDX, MI_PROCESO_EXTRA, SOBRE_MI_IDX } from "../pages/MainPage";
import { getSobreMiExtra } from "../data/homeScroll";
import { getProjectSections, getSectionAt, getSectionScrollTop } from "../data/projectSections";
import { getProjectById } from "../data/projects";

const navItems = [
  { label: "Inicio",           path: "/",                 sectionId: "inicio"           },
  { label: "Proyectos",        path: "/proyectos",        sectionId: "proyectos"        },
  { label: "Casos de estudio", path: "/casos-de-estudio", sectionId: "casos-de-estudio" },
  { label: "Sobre mi",         path: "/acerca",           sectionId: "acerca"           },
  { label: "Mi proceso",       path: "/mi-proceso",       sectionId: "mi-proceso"       },
  { label: "Laboratorio",      path: "/laboratorio",      sectionId: "laboratorio"      },
  { label: "FAQs",             path: "/faqs",             sectionId: "faqs"             },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center gap-[5px] w-5">
      <motion.span
        className="block h-[1.5px] bg-[#1A1A1A] rounded-full origin-center"
        animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.span
        className="block h-[1.5px] bg-[#1A1A1A] rounded-full"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-[1.5px] bg-[#1A1A1A] rounded-full origin-center"
        animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const isMainPage = location.pathname === "/";
  const lenis = useLenis();

  // Project pages: index of the case-study sections
  const projectId = location.pathname.startsWith("/project/") ? location.pathname.split("/project/")[1] : null;
  const projectSections = useMemo(() => (projectId ? getProjectSections(projectId) : []), [projectId]);
  const projectTitle = projectId ? getProjectById(projectId)?.title : undefined;
  const [activeProjectSection, setActiveProjectSection] = useState<string | null>(null);

  useEffect(() => {
    if (!projectSections.length) return;
    const ids = projectSections.map((s) => s.id);
    const update = () => setActiveProjectSection(getSectionAt(ids, window.innerHeight * 0.45) ?? ids[0]);
    window.addEventListener("scroll", update, { passive: true });
    const raf = requestAnimationFrame(update);
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, [projectSections]);

  const goToProjectSection = (id: string) => {
    setOpen(false);
    // Wait for the menu to release the body scroll lock
    setTimeout(() => {
      const top = getSectionScrollTop(id);
      if (top === null) return;
      if (lenis) lenis.scrollTo(top, { duration: 1.2 });
      else window.scrollTo({ top, behavior: "smooth" });
    }, 60);
  };

  const updateActive = useCallback(() => {
    const sectionH = window.innerHeight - 40;
    const sy = window.scrollY;
    const sobreMiEnd   = (SOBRE_MI_IDX + getSobreMiExtra()) * sectionH;
    const miProcesoEnd = sobreMiEnd + sectionH + MI_PROCESO_EXTRA * sectionH;

    let adjustedSY: number;
    if (sy >= miProcesoEnd) {
      adjustedSY = sy - (getSobreMiExtra() + MI_PROCESO_EXTRA) * sectionH;
    } else if (sy >= sobreMiEnd) {
      adjustedSY = MI_PROCESO_IDX * sectionH;
    } else if (sy >= SOBRE_MI_IDX * sectionH) {
      adjustedSY = SOBRE_MI_IDX * sectionH;
    } else {
      adjustedSY = sy;
    }

    const index = Math.min(Math.round(adjustedSY / sectionH), navItems.length - 1);
    setActiveSection(navItems[index].sectionId);
  }, []);

  useEffect(() => {
    if (!isMainPage) return;
    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => window.removeEventListener("scroll", updateActive);
  }, [isMainPage, updateActive]);

  // Lock page scroll (native + Lenis) while the menu is open
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      lenis?.stop();
    }
    return () => {
      root.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis]);

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    setOpen(false);
    if (!isMainPage) {
      e.preventDefault();
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }
    e.preventDefault();
    const sectionH = window.innerHeight - 40;
    const index = navItems.findIndex((n) => n.sectionId === sectionId);
    const targetScroll =
      index > MI_PROCESO_IDX
        ? (index + getSobreMiExtra() + MI_PROCESO_EXTRA) * sectionH
        : index === MI_PROCESO_IDX
          ? (index + getSobreMiExtra()) * sectionH
          : index * sectionH;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // Portaled to <body> so no page container (transforms, stacking contexts) can clip it
  return createPortal(
    <>
      {/* Hamburger — top-left, aligned with TopBar height */}
      <button
        className="fixed top-0 left-0 z-[110] h-11 px-4 flex items-center md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-inset"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        <HamburgerIcon open={open} />
      </button>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          // Large-viewport height so it also covers the area behind mobile browser toolbars;
          // the inner list scrolls within the visible (dynamic) height.
          <motion.div
            className="fixed top-0 left-0 w-full h-lvh z-[105] bg-[#F5F0EB] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
          >
          <div className="h-dvh overflow-y-auto overscroll-contain flex flex-col px-8 pt-16 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
            {projectSections.length > 0 && (
              <div className="mb-10">
                <Link
                  to="/"
                  state={{ scrollTo: "proyectos" }}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 type-caption text-[#9A9A9A] hover:text-[#2D2D2D] mb-5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" />
                  </svg>
                  Proyectos
                </Link>
                {projectTitle && (
                  <span className="block type-overline uppercase text-[#9A9A9A] mb-3">{projectTitle}</span>
                )}
                <nav aria-label="Secciones del proyecto" className="flex flex-col gap-1.5">
                  {projectSections.map((section, i) => {
                    const isActive = activeProjectSection === section.id;
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        onClick={() => goToProjectSection(section.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`text-left leading-[1.05] transition-colors duration-200 ${
                          isActive ? "text-[#1A1A1A] font-bold" : "text-[#C8C4BC] font-light hover:text-[#2D2D2D]"
                        }`}
                        style={{ fontSize: "clamp(24px, 7vw, 30px)" }}
                      >
                        {section.label}
                      </motion.button>
                    );
                  })}
                </nav>
                <div className="h-px bg-[#E0DBD6] mt-8" aria-hidden="true" />
              </div>
            )}

            <nav className={`flex flex-col ${projectSections.length > 0 ? "gap-2" : ""}`}>
              {navItems.map((item, i) => {
                const isActive = isMainPage
                  ? activeSection === item.sectionId
                  : item.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.path);

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.path}
                      onClick={(e) => handleClick(e, item.sectionId)}
                      className={`block leading-[0.9] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2 rounded-sm ${
                        isActive
                          ? "text-[#1A1A1A] font-bold"
                          : "text-[#C8C4BC] font-light hover:text-[#2D2D2D]"
                      }`}
                      style={{ fontSize: projectSections.length > 0 ? "18px" : "clamp(32px, 9vw, 44px)" }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Hablemos button — bottom-left */}
            <motion.div
              className="mt-auto pt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.04 + 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href="mailto:rosario.alzueta@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-sm font-medium rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2"
              >
                Hablemos
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}

export default Header;
