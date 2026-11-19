import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useScroll, useTransform, motion } from "framer-motion";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import FAQ from "../components/FAQ";
import MiProcesoSection from "../components/MiProcesoSection";
import SobreMiSection from "../components/SobreMiSection";
import LabSection from "../components/lab/LabSection";
import { getFeaturedProjects } from "../data/projects";
import { getSobreMiExtra, useSobreMiExtra } from "../data/homeScroll";
import { behanceProjects } from "../components/ProjectsList";

export const SECTION_IDS = [
  "inicio",
  "proyectos",
  "casos-de-estudio",
  "acerca",
  "mi-proceso",
  "laboratorio",
  "faqs",
];

const TOPBAR_H = 40;

// "Sobre mi" section index; its extra scroll length is measured (see data/homeScroll)
export const SOBRE_MI_IDX   = 3;

// "Mi proceso" section index and extra scroll units (horizontal frames - 1)
export const MI_PROCESO_IDX   = 4;
export const MI_PROCESO_EXTRA = 2;

export const SECTION_META = [
  { id: "inicio",           bg: "#F5F0EB", radius: false },
  { id: "proyectos",        bg: "#0A0A0A", radius: false },
  { id: "casos-de-estudio", bg: "#EEE9E4", radius: false },
  { id: "acerca",           bg: "#F5F0EB", radius: false },
  { id: "mi-proceso",       bg: "#0A0A0A", radius: false },
  { id: "laboratorio",      bg: "#F5F0EB", radius: false },
  { id: "faqs",             bg: "#FAFAF8", radius: false },
];

// When does section `index` start sliding in from below?
// Sections after a horizontal zone are delayed by that zone's extra frames.
function getSectionEnterStart(index: number, sectionH: number, sobreMiExtra: number): number {
  if (index === 0) return 0; // unused (section 0 is always fixed at y=0)
  const base = (index - 1) * sectionH;
  let extra = 0;
  if (index > MI_PROCESO_IDX) extra += MI_PROCESO_EXTRA * sectionH;
  if (index > SOBRE_MI_IDX)   extra += sobreMiExtra     * sectionH;
  return base + extra;
}

function StackedSection({
  index,
  enterStart,
  sectionH,
  scrollY,
  children,
}: {
  index: number;
  enterStart: number;
  sectionH: number;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
  children: React.ReactNode;
}) {
  const meta = SECTION_META[index];

  // Section 0: always at y=0. Others: slide from sectionH→0 during [enterStart, enterStart+sectionH].
  const y = useTransform(
    scrollY,
    index === 0 ? [0, 1] : [enterStart, enterStart + sectionH],
    index === 0 ? [0, 0] : [sectionH, 0]
  );

  return (
    <motion.section
      id={meta.id}
      style={{
        y,
        position: "fixed",
        top: TOPBAR_H,
        left: 0,
        right: 0,
        height: sectionH,
        zIndex: 10 + index * 10,
        backgroundColor: meta.bg,
        borderRadius: meta.radius ? "20px 20px 0 0" : 0,
        boxShadow: meta.radius ? "0 -8px 40px rgba(0,0,0,0.08)" : "none",
        overflow: "hidden",
        paddingBottom: index === 0 || index === SECTION_META.length - 1 ? 0 : 24,
      }}
    >
      {children}
    </motion.section>
  );
}

export default function MainPage() {
  const projects = getFeaturedProjects(4);
  const { scrollY } = useScroll();
  const location = useLocation();
  const sobreMiExtra = useSobreMiExtra();

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('figma-section');
    if (s !== null) {
      const sh = window.innerHeight - TOPBAR_H;
      setTimeout(() => window.scrollTo({ top: parseInt(s) * sh, behavior: 'instant' }), 300);
    }
  }, []);

  // Scroll to section when navigating from another page (e.g. from a project page)
  useEffect(() => {
    const sectionId = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!sectionId) return;
    const index = SECTION_IDS.indexOf(sectionId);
    if (index < 0) return;
    const sh = window.innerHeight - TOPBAR_H;
    // Read when firing: Sobre mi measures its length after mounting
    setTimeout(() => {
      const extra = getSobreMiExtra();
      const targetScroll =
        index > MI_PROCESO_IDX
          ? (index + extra + MI_PROCESO_EXTRA) * sh
          : index === MI_PROCESO_IDX
            ? (index + extra) * sh
            : index * sh;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }, 300);
  }, [location.state]);

  const [sectionH, setSectionH] = useState(
    () => (typeof window !== "undefined" ? window.innerHeight - TOPBAR_H : 760)
  );

  useEffect(() => {
    const onResize = () => setSectionH(window.innerHeight - TOPBAR_H);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const N = SECTION_META.length;

  // Total scroll space: N sections + both horizontal extra zones
  const scrollSpaceH = (N + MI_PROCESO_EXTRA + sobreMiExtra) * sectionH;

  // scrollY when each horizontal section has fully slid in (horizontal scroll begins)
  const sobreMiEnterScroll   = SOBRE_MI_IDX * sectionH;
  const miProcesoEnterScroll = (MI_PROCESO_IDX + sobreMiExtra) * sectionH;

  const sectionContents = [
    <Hero key="inicio" />,

    <div key="proyectos" className="h-full px-4 md:pl-[440px] md:pr-[60px] flex flex-col md:justify-center pb-6 md:pb-0">
      <span className="md:hidden type-overline text-white/50 pt-3 pb-4">Proyectos</span>
      <ProjectsGrid projects={projects} />
    </div>,

    <div key="casos" className="h-full px-4 md:pl-[440px] md:pr-[60px] flex flex-col md:justify-center overflow-y-auto pb-6 md:pb-0">
      <span className="md:hidden type-overline text-[#9A9A9A] pt-3 pb-4">Casos de estudio</span>
      <ProjectsGrid
        projects={behanceProjects.slice(0, 5).map(p => ({
          id: p.id,
          title: p.title,
          company: p.company,
          year: p.year,
          image: p.image,
          externalUrl: p.behanceUrl,
        }))}
        showComingSoon={false}
      />
    </div>,

    // "Sobre mi" — full-width container so each horizontal frame can be 100vw.
    <SobreMiSection
      key="acerca"
      scrollY={scrollY}
      sectionH={sectionH}
      enterScroll={sobreMiEnterScroll}
    />,

    // "Mi proceso" — full-width horizontal scroll, same pattern as Sobre Mi.
    <MiProcesoSection
      key="mi-proceso"
      scrollY={scrollY}
      sectionH={sectionH}
      enterScroll={miProcesoEnterScroll}
    />,

    <LabSection key="lab" />,

    <div key="faqs" className="h-full flex flex-col overflow-hidden">
      {/* Scrollable FAQ content — scrollbar oculto */}
      <div className="flex-1 overflow-y-scroll hide-scrollbar px-4 md:pl-[440px] md:pr-[60px] relative" style={{ touchAction: "pan-y" }}>
        <span className="md:hidden sticky top-0 block type-overline text-[#9A9A9A] z-10 pt-3 pb-4 bg-[#FAFAF8]">FAQs</span>
        <div className="pb-8 md:py-16">
          <FAQ />
        </div>
      </div>
      {/* Mini footer negro — siempre visible */}
      <div className="flex-shrink-0 bg-[#1A1A1A] px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <span className="text-xs text-white/80 flex items-center gap-1.5">
          Rosario Alzueta
          <span className="text-[10px] text-white/35">®</span>
        </span>

        {/* Links */}
        <div className="flex items-center gap-5 text-white/50">
          <a href="mailto:rosario.alzueta@gmail.com" aria-label="Enviar email" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden md:inline text-xs">rosario.alzueta@gmail.com</span>
          </a>
          <a href="https://www.linkedin.com/in/rosarioalzueta" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            <span className="hidden md:inline text-xs">LinkedIn</span>
          </a>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
        >
          Volver al inicio
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>,

  ];

  return (
    <>
      <Header />

      {/* Scroll spacer — fixed sections don't contribute to document height */}
      <div style={{ height: scrollSpaceH }} aria-hidden="true" />

      {SECTION_META.map((_, i) => (
        <StackedSection
          key={SECTION_META[i].id}
          index={i}
          enterStart={getSectionEnterStart(i, sectionH, sobreMiExtra)}
          sectionH={sectionH}
          scrollY={scrollY}
        >
          {sectionContents[i]}
        </StackedSection>
      ))}
    </>
  );
}
