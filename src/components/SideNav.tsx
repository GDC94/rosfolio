import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { MI_PROCESO_IDX, MI_PROCESO_EXTRA, SOBRE_MI_IDX, SOBRE_MI_EXTRA, SECTION_META } from "../pages/MainPage";

function isDarkBg(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

const navItems = [
  { label: "Inicio",            path: "/",                 sectionId: "inicio"          },
  { label: "Proyectos",         path: "/proyectos",        sectionId: "proyectos"       },
  { label: "Casos de estudio",  path: "/casos-de-estudio", sectionId: "casos-de-estudio"},
  { label: "Sobre mi",          path: "/acerca",           sectionId: "acerca"          },
  { label: "Mi proceso",        path: "/mi-proceso",       sectionId: "mi-proceso"      },
  { label: "Laboratorio",       path: "/laboratorio",      sectionId: "laboratorio"     },
  { label: "FAQs",              path: "/faqs",             sectionId: "faqs"            },
];

function SideNav() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";
  const [activeSection, setActiveSection] = useState("inicio");

  const updateActive = useCallback(() => {
    const sectionH = window.innerHeight - 40;
    const sy = window.scrollY;

    // Sobre Mi is fully visible at SOBRE_MI_IDX*sH, horizontal zone ends at +SOBRE_MI_EXTRA*sH
    const sobreMiEnd    = (SOBRE_MI_IDX + SOBRE_MI_EXTRA) * sectionH;   // 6*sH
    // Mi Proceso enters right after, fully visible 1*sH later, horizontal zone ends at +MI_PROCESO_EXTRA*sH
    const miProcesoEnd  = sobreMiEnd + sectionH + MI_PROCESO_EXTRA * sectionH; // 9*sH

    let adjustedSY: number;
    if (sy >= miProcesoEnd) {
      // Past both horizontal zones
      adjustedSY = sy - (SOBRE_MI_EXTRA + MI_PROCESO_EXTRA) * sectionH;
    } else if (sy >= sobreMiEnd) {
      // Mi Proceso entering or scrolling horizontally
      adjustedSY = MI_PROCESO_IDX * sectionH;
    } else if (sy >= SOBRE_MI_IDX * sectionH) {
      // Sobre Mi horizontal zone
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

  const handleClick = (e: React.MouseEvent, sectionId: string) => {
    if (!isMainPage) return;
    e.preventDefault();
    const sectionH = window.innerHeight - 40;
    const index = navItems.findIndex((n) => n.sectionId === sectionId);

    // Sections after a horizontal zone are offset by its extra scroll units
    const targetScroll =
      index > MI_PROCESO_IDX
        ? (index + SOBRE_MI_EXTRA + MI_PROCESO_EXTRA) * sectionH
        : index === MI_PROCESO_IDX
          ? (index + SOBRE_MI_EXTRA) * sectionH
          : index * sectionH;

    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeMeta = SECTION_META.find((s) => s.id === activeSection);
  const darkBg = isMainPage && activeMeta ? isDarkBg(activeMeta.bg) : false;

  return (
    <aside className="hidden md:flex flex-col fixed left-[60px] top-[160px] z-[100] w-[360px]">
      <nav role="navigation" aria-label="Navegación principal" className="flex flex-col">
        {navItems.map((item) => {
          const isActive = isMainPage
            ? activeSection === item.sectionId
            : item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => handleClick(e, item.sectionId)}
              className={`leading-[0.88] whitespace-nowrap transition-all duration-200 inline-block origin-left hover:scale-[1.15] ${
                isActive
                  ? `text-[40px] font-bold ${darkBg ? "text-[#F5F0EB]" : "text-[#1A1A1A]"}`
                  : `text-[38px] font-light ${darkBg ? "text-[#F5F0EB]/40 hover:text-[#F5F0EB]" : "text-[#C8C4BC] hover:text-[#2D2D2D]"}`
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default SideNav;
