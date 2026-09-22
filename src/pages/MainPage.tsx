import { useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProjectsGrid from "../components/ProjectsGrid";
import FAQ from "../components/FAQ";
import MiProcesoSection from "../components/MiProcesoSection";
import SobreMiSection from "../components/SobreMiSection";
import { Grid12Background } from "../components/Background";
import { getFeaturedProjects } from "../data/projects";
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

// "Sobre mi" section index and extra scroll units
// 2 horizontal transitions + 1 vertical scroll phase in Experiencia
export const SOBRE_MI_IDX   = 3;
export const SOBRE_MI_EXTRA = 4;

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
function getSectionEnterStart(index: number, sectionH: number): number {
  if (index === 0) return 0; // unused (section 0 is always fixed at y=0)
  const base = (index - 1) * sectionH;
  let extra = 0;
  if (index > MI_PROCESO_IDX) extra += MI_PROCESO_EXTRA * sectionH;
  if (index > SOBRE_MI_IDX)   extra += SOBRE_MI_EXTRA   * sectionH;
  return base + extra;
}

function UnderConstructionSection({ title: _title }: { title: string }) {
  return (
    <div className="h-full flex flex-col px-4 md:pl-[440px] md:pr-[60px] md:items-center md:justify-center">
      <span className="md:hidden type-overline text-[#9A9A9A] pt-3 pb-2">Laboratorio</span>
      <Grid12Background />
      <div className="relative z-10 flex flex-col items-center text-center gap-8">
        {/* Illustration */}
        <svg style={{ width: "min(460px, 72vw)", height: "auto" }} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            {/* Glass sphere — lit from upper-left */}
            <radialGradient id="g-sphere" cx="36%" cy="27%" r="74%" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.54)"/>
              <stop offset="20%"  stopColor="rgba(250,246,240,0.18)"/>
              <stop offset="55%"  stopColor="rgba(201,188,63,0.07)"/>
              <stop offset="100%" stopColor="rgba(100,90,6,0.2)"/>
            </radialGradient>
            {/* Golden liquid */}
            <radialGradient id="g-liq" cx="44%" cy="66%" r="64%" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="rgba(252,238,72,0.9)"/>
              <stop offset="48%"  stopColor="rgba(201,188,63,0.76)"/>
              <stop offset="100%" stopColor="rgba(132,120,14,0.54)"/>
            </radialGradient>
            {/* Rim / cool backlight */}
            <radialGradient id="g-rim" cx="75%" cy="77%" r="35%" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="rgba(180,210,255,0.28)"/>
              <stop offset="100%" stopColor="rgba(180,210,255,0)"/>
            </radialGradient>
            {/* Ambient glow */}
            <radialGradient id="g-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(201,188,63,0.2)"/>
              <stop offset="55%"  stopColor="rgba(201,188,63,0.06)"/>
              <stop offset="100%" stopColor="rgba(201,188,63,0)"/>
            </radialGradient>
            {/* Ground shadow */}
            <radialGradient id="g-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(18,16,3,0.24)"/>
              <stop offset="60%"  stopColor="rgba(18,16,3,0.08)"/>
              <stop offset="100%" stopColor="rgba(18,16,3,0)"/>
            </radialGradient>
            {/* Particle — mini-sphere gradient */}
            <radialGradient id="g-p1" cx="30%" cy="25%" r="70%" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.96)"/>
              <stop offset="38%"  stopColor="rgba(230,217,60,0.92)"/>
              <stop offset="100%" stopColor="rgba(130,118,14,0.7)"/>
            </radialGradient>
            <radialGradient id="g-p2" cx="30%" cy="25%" r="70%" gradientUnits="objectBoundingBox">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.82)"/>
              <stop offset="40%"  stopColor="rgba(201,188,63,0.72)"/>
              <stop offset="100%" stopColor="rgba(120,108,12,0.52)"/>
            </radialGradient>
            {/* Sphere clip */}
            <clipPath id="c-sph">
              <circle cx="100" cy="100" r="51.5"/>
            </clipPath>
            {/* Drop shadow */}
            <filter id="f-drop" x="-25%" y="-8%" width="150%" height="148%">
              <feDropShadow dx="0" dy="11" stdDeviation="11" floodColor="#181600" floodOpacity="0.17"/>
            </filter>
            {/* Glow blur */}
            <filter id="f-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7"/>
            </filter>
            {/* Soft large highlight */}
            <filter id="f-soft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ── Ambient glow ── */}
          <circle cx="100" cy="100" r="76" fill="url(#g-glow)" filter="url(#f-glow)"/>

          {/* ── Ground shadow ── */}
          <ellipse cx="100" cy="165" rx="42" ry="7" fill="url(#g-shadow)"/>

          {/* ── Orbit rings — BACK arcs (appear behind sphere) ── */}
          <path d="M 174 100 A 74 16 0 0 0 26 100"
            stroke="rgba(201,188,63,0.22)" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
          <g transform="rotate(58, 100, 100)">
            <path d="M 174 100 A 74 16 0 0 0 26 100"
              stroke="rgba(201,188,63,0.17)" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
          </g>
          <g transform="rotate(116, 100, 100)">
            <path d="M 174 100 A 74 16 0 0 0 26 100"
              stroke="rgba(201,188,63,0.13)" strokeWidth="0.85" fill="none" strokeLinecap="round"/>
          </g>

          {/* ── Sphere ── */}
          <circle cx="100" cy="100" r="52" fill="rgba(248,244,234,0.1)" filter="url(#f-drop)"/>

          {/* Liquid — clipped & oscillating */}
          <g clipPath="url(#c-sph)">
            <g className="lab-liquid">
              <rect x="47" y="114" width="106" height="52" fill="url(#g-liq)"/>
              <ellipse cx="100" cy="115" rx="52" ry="8" fill="rgba(248,236,76,0.22)"/>
              <ellipse cx="80" cy="132" rx="15" ry="6" fill="rgba(255,255,255,0.09)" transform="rotate(-18,80,132)"/>
            </g>
            <g className="lab-liquid">
              <path d="M 49 116 Q 74 108 100 107 Q 126 108 151 116"
                stroke="rgba(248,236,76,0.52)" strokeWidth="1.1" fill="none"/>
            </g>
          </g>

          {/* Glass gradient */}
          <circle cx="100" cy="100" r="52" fill="url(#g-sphere)"/>
          {/* Rim light */}
          <circle cx="100" cy="100" r="52" fill="url(#g-rim)"/>
          {/* Edge */}
          <circle cx="100" cy="100" r="52" stroke="rgba(196,183,52,0.3)" strokeWidth="0.7" fill="none"/>

          {/* Primary highlight — large, soft */}
          <ellipse cx="80" cy="77" rx="19" ry="11.5" fill="white" opacity="0.16"
            transform="rotate(-30,80,77)" filter="url(#f-soft)"/>
          {/* Specular lobe */}
          <ellipse cx="74" cy="70" rx="7" ry="4.2" fill="white" opacity="0.52"
            transform="rotate(-28,74,70)"/>
          {/* Specular point */}
          <circle cx="71" cy="68" r="1.9" fill="white" opacity="0.88"/>

          {/* ── Orbit rings — FRONT arcs (appear in front of sphere) ── */}
          <path d="M 174 100 A 74 16 0 0 1 26 100"
            stroke="rgba(201,188,63,0.54)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
          <g transform="rotate(58, 100, 100)">
            <path d="M 174 100 A 74 16 0 0 1 26 100"
              stroke="rgba(201,188,63,0.43)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
          </g>
          <g transform="rotate(116, 100, 100)">
            <path d="M 174 100 A 74 16 0 0 1 26 100"
              stroke="rgba(201,188,63,0.34)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
          </g>

          {/* ── Orbiting particles ── */}
          {/* Group A — CW, starts right */}
          <g className="lab-spin-cw">
            <circle cx="173" cy="100" r="5.8" fill="url(#g-p1)"/>
            <circle cx="27"  cy="100" r="3.8" fill="url(#g-p2)" opacity="0.72"/>
          </g>
          {/* Group B — CCW, starts lower-right quadrant */}
          <g className="lab-spin-ccw">
            <circle cx="138" cy="163" r="4.8" fill="url(#g-p1)"/>
            <circle cx="62"  cy="37"  r="3.2" fill="url(#g-p2)" opacity="0.65"/>
          </g>
          {/* Group C — CW fast, starts lower-left */}
          <g className="lab-orbit-c">
            <circle cx="62"  cy="163" r="4.2" fill="url(#g-p2)"/>
            <circle cx="138" cy="37"  r="2.8" fill="url(#g-p2)" opacity="0.58"/>
          </g>

          {/* ── Outer decorative ring (slow CCW) ── */}
          <g className="lab-spin-ccw">
            <circle cx="12"  cy="100" r="2.1" fill="rgba(201,188,63,0.52)"/>
            <circle cx="188" cy="100" r="1.6" fill="rgba(201,188,63,0.36)"/>
            <circle cx="100" cy="12"  r="2.4" fill="rgba(201,188,63,0.3)"/>
            <circle cx="100" cy="188" r="1.7" fill="rgba(201,188,63,0.24)"/>
          </g>


          {/* Dot cluster top-left */}
          <circle cx="27" cy="36" r="2.1" fill="rgba(201,188,63,0.44)"/>
          <circle cx="34" cy="29" r="1.3" fill="rgba(201,188,63,0.28)"/>
          <circle cx="21" cy="29" r="0.9" fill="rgba(175,164,42,0.22)"/>

          {/* Square accent bottom-left */}
          <rect x="22" y="148" width="7.5" height="7.5" rx="1"
            fill="none" stroke="rgba(201,188,63,0.4)" strokeWidth="0.8"
            transform="rotate(18,25.75,151.75)"/>
        </svg>

        <div className="space-y-1">
          <p className="text-base text-[#6B6B6B]">Esta sección está siendo construida.</p>
          <p className="text-base text-[#9A9A9A]">Pronto vas a poder verla.</p>
        </div>
      </div>
    </div>
  );
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

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('figma-section');
    if (s !== null) {
      const sh = window.innerHeight - TOPBAR_H;
      setTimeout(() => window.scrollTo({ top: parseInt(s) * sh, behavior: 'instant' }), 300);
    }
  }, []);

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
  const scrollSpaceH = (N + MI_PROCESO_EXTRA + SOBRE_MI_EXTRA) * sectionH;

  // scrollY when each horizontal section has fully slid in (horizontal scroll begins)
  const sobreMiEnterScroll   = SOBRE_MI_IDX * sectionH;
  const miProcesoEnterScroll = (MI_PROCESO_IDX + SOBRE_MI_EXTRA) * sectionH;

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

    <UnderConstructionSection key="lab" title="Laboratorio" />,

    <div key="faqs" className="h-full flex flex-col overflow-hidden">
      {/* Scrollable FAQ content — scrollbar oculto */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 md:pl-[440px] md:pr-[60px] relative">
        <span className="md:hidden sticky top-0 block type-overline text-[#9A9A9A] z-10 pt-3 pb-4">FAQs</span>
        <div className="pb-52 md:py-16">
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
          enterStart={getSectionEnterStart(i, sectionH)}
          sectionH={sectionH}
          scrollY={scrollY}
        >
          {sectionContents[i]}
        </StackedSection>
      ))}
    </>
  );
}
