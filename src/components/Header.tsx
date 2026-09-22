import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MI_PROCESO_IDX, MI_PROCESO_EXTRA, SOBRE_MI_IDX, SOBRE_MI_EXTRA } from "../pages/MainPage";

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
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const isMainPage = location.pathname === "/";

  const updateActive = useCallback(() => {
    const sectionH = window.innerHeight - 40;
    const sy = window.scrollY;
    const sobreMiEnd   = (SOBRE_MI_IDX + SOBRE_MI_EXTRA) * sectionH;
    const miProcesoEnd = sobreMiEnd + sectionH + MI_PROCESO_EXTRA * sectionH;

    let adjustedSY: number;
    if (sy >= miProcesoEnd) {
      adjustedSY = sy - (SOBRE_MI_EXTRA + MI_PROCESO_EXTRA) * sectionH;
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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    setOpen(false);
    if (!isMainPage) return;
    e.preventDefault();
    const sectionH = window.innerHeight - 40;
    const index = navItems.findIndex((n) => n.sectionId === sectionId);
    const targetScroll =
      index > MI_PROCESO_IDX
        ? (index + SOBRE_MI_EXTRA + MI_PROCESO_EXTRA) * sectionH
        : index === MI_PROCESO_IDX
          ? (index + SOBRE_MI_EXTRA) * sectionH
          : index * sectionH;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* Hamburger — top-left, aligned with TopBar height */}
      <button
        className="fixed top-0 left-0 z-[90] h-11 px-4 flex items-center md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-inset"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        <HamburgerIcon open={open} />
      </button>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#F5F0EB] flex flex-col px-8 pt-16 pb-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col">
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
                      style={{ fontSize: "clamp(32px, 9vw, 44px)" }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Hablemos button — bottom-left */}
            <motion.div
              className="mt-auto"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
