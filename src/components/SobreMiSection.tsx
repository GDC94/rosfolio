import { motion, type MotionValue, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import rosarioImage from "../assets/rosario.png";
import xConsLogo from "../assets/companys/xcons.png";
import contextoLogo from "../assets/companys/contexto.png";
import sciLogo from "../assets/companys/sci.png";
import puntoarLogo from "../assets/companys/puntoar.jpeg";
import certFundamentos from "../assets/certifications/fundamentos.png";
import certPrototipado from "../assets/certifications/prototipado.png";
import certUxAdvanced from "../assets/certifications/ux-advanced.png";
import certDisenio from "../assets/certifications/disenio.png";
import certArquitectura from "../assets/certifications/unlp.png";

const FRAME_COUNT = 3;
// Extra scroll units: 1 for frame0→1 | 1 for vertical scroll in Experiencia | 1 for frame1→2 | 1 for vertical scroll in Formación
const V_SCROLL_UNITS  = 1;
const V_SCROLL_UNITS_2 = 1;
const TOTAL_SCROLL_UNITS = (FRAME_COUNT - 1) + V_SCROLL_UNITS + V_SCROLL_UNITS_2; // = 4

// ─── Data ───────────────────────────────────────────────────────────────────

const experience = [
  {
    logo: xConsLogo,
    company: "XCONS",
    companyDetail: "Plataforma de comercio unificado B2B/B2C",
    role: "Product Designer",
    period: "Dic 2024 – Actualidad",
    current: true,
    bullets: [
      "Lideré el diseño end-to-end del ecosistema de comercio unificado para la industria de la construcción, convirtiendo un proceso de compra fragmentado en un flujo digital completo con impacto directo en el cierre de presupuestos.",
      "Diseñé los módulos core de la plataforma: presupuestos colaborativos en tiempo real, gestión de pedidos (OMS), perfil de usuario unificado (CRM) y arquitectura de precios dinámicos multi-variable.",
      "Diseñé y desarrollé el dashboard principal de la plataforma: definí las métricas clave del negocio, diseñé las visualizaciones y llevé adelante su implementación en código, siendo responsable de la experiencia end-to-end.",
      "Hoy no solo diseño: también desarrollo todas las interfaces del panel administrador, siendo responsable tanto de la experiencia como de su implementación.",
      "Me encargo del traslado de funcionalidades que aún viven en la plataforma legacy de Magento: analizo cada módulo, redefino su experiencia y lo integro al nuevo ecosistema.",
      "Incorporo nuevas funcionalidades de forma continua: autogestión de entregas, asistente conversacional con IA para venta omnicanal y mejoras iterativas sobre módulos existentes.",
      "Mantengo el design system: componentes documentados en Figma, tokens de diseño y guías de uso para el equipo de desarrollo.",
      "Dirijo QA visual y funcional, analizo reportes de atención al cliente para detectar fricciones y colaboro con el PM en la definición funcional.",
      "Flujo potenciado con IA: Figma Make y Claude Code previo al handoff. Cada feature documentada en design.md y publicada como issue en GitLab vía Open Specs.",
    ],
    skills: ["Figma", "Figma Make", "Design System", "IA", "QA", "Open Specs"],
  },
  {
    logo: contextoLogo,
    company: "Contexto / BBVA México",
    companyDetail: "",
    role: "UX/UI Designer freelance",
    period: "Sep 2024 – Actualidad",
    current: true,
    bullets: [
      "Formo parte del equipo de diseño de Contexto, trabajando en productos digitales para BBVA México, dentro del ecosistema de Educación Financiera (Edufin).",
      "Diseño experiencias digitales orientadas a distintos perfiles de usuarios y rangos etarios, abordando temáticas como seguridad financiera, ahorro, inversiones y prevención de fraudes.",
      "Adapto el lenguaje visual y la interacción según el tipo de contenido, trabajando desde propuestas más lúdicas y educativas hasta experiencias con información financiera sensible y de mayor complejidad.",
      "Diseño simuladores de inversión, calculadoras interactivas, encuestas, guías y revistas digitales, respetando los lineamientos de identidad y el sistema visual de BBVA.",
      "Trabajo en conjunto con el equipo de contenido para asegurar coherencia entre mensaje, jerarquía de información y experiencia visual.",
      "Colaboro de forma transversal con dirección de arte, desarrollo, QA y Project Management, acompañando el diseño desde la definición hasta la implementación.",
      "Participo en la revisión y validación de interfaces, cuidando consistencia, accesibilidad visual y correcta implementación de los criterios de diseño.",
      "Trabajo bajo estándares de alta precisión y rigurosidad, propios de productos digitales dentro del sector financiero.",
    ],
    skills: ["Fintech UX", "Design Systems", "Accesibilidad"],
  },
  {
    logo: puntoarLogo,
    company: "Punto.ar",
    companyDetail: "",
    role: "IA Product Designer · Co-founder",
    period: "Oct 2023 – Actualidad",
    current: true,
    bullets: [
      "En Punto.ar lidero el área de Product & Design, participando en la definición, diseño y dirección de experiencias web y productos digitales a medida.",
      "Trabajo desde las primeras etapas de cada proyecto, entendiendo las necesidades del negocio y definiendo la experiencia, hasta el diseño UX/UI, la dirección visual y el acompañamiento durante el desarrollo.",
      "Como co-founder, también participo en la estrategia del estudio, la relación con clientes y la definición de nuevas oportunidades y proyectos.",
      "Punto.ar combina Product, Design & Technology para diseñar y desarrollar websites, plataformas, web apps, MVPs y otras soluciones digitales.",
      "Es también el espacio donde puedo explorar al máximo mi creatividad y poner en práctica todos los experimentos que nacen de nuestro laboratorio de ideas.",
    ],
    skills: ["Product Strategy", "Co-founder", "Web Apps", "MVPs"],
  },
  {
    logo: sciLogo,
    company: "SCI",
    companyDetail: "SNAC · AB InBev México",
    role: "UX/UI Designer",
    period: "Sep 2024 – Actualidad",
    current: true,
    bullets: [
      "Aplicación SNAC · Sindicato de trabajadores alimenticios de México",
      "Diseñé desde cero una aplicación web y mobile de gestión sindical, acompañando el producto desde la definición inicial hasta su validación.",
      "Diseñé dashboards, agenda, planes de trabajo, gestión de equipos y flujos de carga de información para optimizar la organización interna.",
      "Definí la arquitectura de información, flujos de usuario, wireframes y UI Kit, alineando la experiencia de uso con los requerimientos funcionales y técnicos.",
      "Realicé investigación cualitativa con usuarios para detectar necesidades, validar decisiones de diseño e iterar sobre la solución.",
      "Implementé pruebas A/B de copy y elementos de interfaz para evaluar alternativas y mejorar la claridad de la experiencia.",
      "Incorporé animaciones Lottie y recursos visuales para facilitar la comprensión de acciones, estados y procesos dentro de la plataforma.",
      "Trabajé en conjunto con producto y desarrollo, logrando una adopción temprana del producto por parte de los usuarios.",
      "Plataforma de capacitación interna · AB InBev México (Supply Chain)",
      "Participación en instancias de research con usuarios mediante encuestas y entrevistas.",
      "Relevamiento de necesidades, objetivos y requerimientos junto a los Product Owners de cada área de capacitación.",
      "Definición y diseño de flujos, arquitectura de información e interfaces de la plataforma.",
      "Diseño de componentes y soluciones visuales orientadas a simplificar la experiencia de aprendizaje.",
      "Realización de testing y validaciones visuales con usuarios y stakeholders.",
      "Iteración de las propuestas de diseño a partir de feedback y hallazgos obtenidos durante las validaciones.",
      "Trabajo colaborativo con equipos de producto y negocio para transformar procesos y contenidos internos en una experiencia digital clara y usable.",
    ],
    skills: ["Enterprise UX", "Dashboard Design", "User Research", "Lottie", "A/B Testing"],
  },
  {
    logo: undefined,
    company: "Intermepro · Min. Obras Públicas · Pose SA · Choix",
    companyDetail: "",
    role: "Arquitecta · Project Manager · Líder de proyectos",
    period: "2016 – 2023",
    current: false,
    bullets: [
      "Liderazgo de equipos y gestión de proyectos de gran escala: parques solares, obra pública nacional y residencial.",
    ],
    skills: ["Project Management", "Liderazgo de equipos", "Gestión de obra"],
  },
];

const educacion = [
  { year: "2025", title: "Fundamentos del diseño gráfico", institution: "Coderhouse",                      period: "Mar – May 2025",      cert: certFundamentos, highlight: false },
  { year: "2024", title: "Prototipado en Figma",           institution: "Coderhouse",                      period: "Jul – Sep 2024",      cert: certPrototipado, highlight: false },
  { year: "2023", title: "Diseño UX/UI Avanzado",          institution: "Coderhouse",                      period: "Sep – Dic 2023",      cert: certUxAdvanced,  highlight: true  },
  { year: "2023", title: "Diseño UX/UI Inicial",           institution: "Coderhouse",                      period: "Jul – Sep 2023",      cert: certDisenio,     highlight: true  },
  { year: "2019", title: "Arquitectura", subtitle: "(Graduada)", institution: "Universidad Nacional de La Plata", period: "Abr 2010 – Dic 2019", cert: certArquitectura, highlight: false },
];


// ─── Frame 0: Intro ─────────────────────────────────────────────────────────

function FrameIntro() {
  return (
    <div className="h-full px-4 md:px-0 md:pr-[60px] flex flex-col overflow-hidden">
      {/* Photo + text */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-10 min-h-0">
        {/* Photo — mobile: thumbnail compacto arriba */}
        <div className="md:hidden flex-shrink-0 overflow-hidden" style={{ height: "160px" }}>
          <img
            src={rosarioImage}
            alt="Rosario Alzueta"
            className="w-full h-full object-cover object-[50%_10%]"
          />
        </div>
        {/* Photo — desktop: panel lateral grande */}
        <div
          className="hidden md:block flex-shrink-0 overflow-hidden"
          style={{ width: "clamp(260px, 36%, 440px)" }}
        >
          <img
            src={rosarioImage}
            alt="Rosario Alzueta"
            className="w-full h-full object-cover object-[50%_10%]"
          />
        </div>

        {/* Text — scrollable on mobile */}
        <div className="flex-1 overflow-y-auto hide-scrollbar md:overflow-visible pt-3 md:pt-10 min-w-0 pb-2">
          <h2
            className="font-light text-[#1A1A1A] tracking-tight mb-4 md:mb-6 leading-[1.05]"
            style={{ fontSize: "clamp(1.5rem, 5vw, 3.5rem)" }}
          >
            Rosario Alzueta<span className="text-[rgb(201,188,63)]">.</span>
          </h2>

          <div className="space-y-3 md:space-y-4 max-w-lg">
            <p className="text-sm text-[#8A8A8A] leading-relaxed">
              Siempre me interesaron el arte y el diseño en todas sus formas, y cómo atraviesan la vida cotidiana: un espacio, un objeto o una interfaz pueden cambiar por completo la forma en que vivimos una experiencia.
            </p>
            <p className="text-sm text-[#8A8A8A] leading-relaxed">
              Ese interés me llevó primero a la arquitectura, donde aprendí a pensar en recorridos, proporciones, estructuras, jerarquías y sistemas; a ordenar problemas complejos y convertir ideas en algo real. Con el tiempo entendí que lo que más me atraía era diseñar cómo las personas viven y usan las cosas.
            </p>
            <p className="text-sm text-[#8A8A8A] leading-relaxed">
              Hoy llevo esa mirada al diseño de productos digitales. Y cada vez me interesa más el cruce con la tecnología: la IA me permitió acercarme al front, experimentar con código, animaciones e interacciones y llevar ideas a prototipos funcionales mucho más rápido.
            </p>
            <p className="text-sm text-[#8A8A8A] leading-relaxed">
              Ese cruce entre diseño, producto y tecnología es donde más me interesa seguir creciendo.
            </p>
          </div>
        </div>
      </div>

      {/* Contact info + CTA */}
      <div className="flex flex-col gap-3 md:gap-4 pt-3 pb-6 md:py-7 flex-shrink-0">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href="mailto:rosario.alzueta@gmail.com" className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1 rounded-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            rosario.alzueta@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/rosarioalzueta" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1 rounded-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            LinkedIn
          </a>
          <span className="flex items-center gap-1.5 text-sm text-[#6B6B6B]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Tandil, Argentina
          </span>
        </div>

        <div className="flex gap-3 flex-wrap">
          <a
            href="/cv-rosario-alzueta.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#2D2D2D]/20 text-[#2D2D2D] text-sm font-medium rounded-lg hover:bg-[#2D2D2D]/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1"
          >
            Descargar CV
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="/cv-rosario-alzueta-en.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 border border-[#2D2D2D]/20 text-[#2D2D2D] text-sm font-medium rounded-lg hover:bg-[#2D2D2D]/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1"
          >
            Download CV EN
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Frame 1: Experiencia ────────────────────────────────────────────────────

function FrameExperiencia() {
  return (
    <div className="flex flex-col">
      <div className="mb-5 flex-shrink-0">
        <h2 className="text-2xl font-light text-[#2D2D2D] tracking-tight">
          Experiencia<span className="text-[rgb(201,188,63)]">.</span>
        </h2>
      </div>

      <div className="space-y-3">
        {experience.map((exp, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-white/10 p-4 hover:border-[rgb(201,188,63)]/30 transition-colors duration-200"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 mt-0.5">
                {exp.logo ? (
                  <div className="p-1.5 bg-[rgb(201,188,63)]/10 rounded">
                    <img src={exp.logo} alt={exp.company} className="w-4 h-4 object-contain opacity-70" />
                  </div>
                ) : (
                  <div className="w-7 h-7 bg-[#F5F0EB] rounded flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="2" y="7" width="20" height="14" rx="2" stroke="#9A9A9A" strokeWidth="1.5" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="#9A9A9A" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#2D2D2D] leading-snug">{exp.role}</p>
                <p className="text-xs text-[#9A9A9A] mt-0.5">
                  {exp.company}
                  {exp.companyDetail && <span className="text-[#BBBBBB]"> · {exp.companyDetail}</span>}
                </p>
                <p className="text-xs text-[#9A9A9A] mt-0.5">{exp.period}</p>
              </div>
            </div>

            <ul className="ml-3 md:ml-[28px] mb-2 space-y-0.5">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex gap-1.5 text-xs text-[#6B6B6B] leading-relaxed">
                  <span className="text-[rgb(201,188,63)] flex-shrink-0 mt-px">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Frame 2: Formación & Idiomas ────────────────────────────────────────────

const toolGroups = [
  {
    label: "Diseño y prototipado",
    tools: ["Figma", "Figma Make", "Deep Research", "Design Systems", "Marvel", "Maze", "Optimal Workshop"],
  },
  {
    label: "Desarrollo y vive coding",
    tools: ["Claude Code", "Lovable", "Cursor", "V0"],
  },
  {
    label: "Gestión de tareas y proyectos",
    tools: ["Open specs", "Odoo", "Notion", "Trello"],
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-semibold text-[#1A1A1A] tracking-[0.05em] mb-4">
      {children}
    </p>
  );
}

function FrameFormacion() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-[clamp(1.8rem,2.8vw,2.4rem)] font-light text-[#2D2D2D] tracking-tight leading-tight">
        Educación & Idiomas<span className="text-[rgb(201,188,63)]">.</span>
      </h2>

      {/* Estudios + Idiomas en fila */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Estudios */}
        <div className="w-full md:w-[35%] flex-shrink-0 min-w-0">
          <SectionLabel>Estudios</SectionLabel>
          <div>
            {educacion.map((e, i) => (
              <div key={i} className="flex items-start gap-6 py-4 border-b border-[#E0DBD6]/60 last:border-0">
                <span className="text-sm font-medium text-[rgb(201,188,63)] w-10 flex-shrink-0">{e.year}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[15px] font-medium text-[#2D2D2D] leading-snug">{e.title}</p>
                    {"subtitle" in e && e.subtitle && (
                      <span className="text-[15px] font-normal text-[#9A9A9A] leading-snug">{e.subtitle}</span>
                    )}
                    {e.highlight && (
                      <svg width="13" height="13" viewBox="0 0 24 24" className="text-[rgb(201,188,63)] flex-shrink-0" fill="rgba(201,188,63,0.3)" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-[#9A9A9A]">{e.institution} · {e.period}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Idiomas + Herramientas */}
        <div className="flex-1 flex flex-col gap-8">
          <div>
            <SectionLabel>Idiomas</SectionLabel>
            <div className="space-y-4">
              {[
                { lang: "Español", level: "Nativo" },
                { lang: "Inglés",  level: "B1 · en formación" },
              ].map(({ lang, level }) => (
                <div key={lang} className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold text-[#2D2D2D]">{lang}</span>
                  <span className="text-sm text-[#9A9A9A]">{level}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Herramientas</SectionLabel>
            <div className="space-y-5">
              {toolGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] font-semibold text-[#1A1A1A] tracking-[0.05em] mb-2.5">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((t, i) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i * 0.05, ease: "easeOut" }}
                        className="text-sm px-3 py-1.5 bg-white border border-[#C8C4BC] text-[#3A3A3A] rounded-full"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const NAV_PAD = 440;

function getEffectiveFrameW() {
  if (typeof window === "undefined") return 1000;
  return window.innerWidth >= 768 ? window.innerWidth - NAV_PAD : window.innerWidth;
}

interface Props {
  scrollY: MotionValue<number>;
  sectionH: number;
  enterScroll: number;
}

export default function SobreMiSection({ scrollY, sectionH, enterScroll }: Props) {
  const [frameW, setFrameW] = useState(getEffectiveFrameW);

  const sectionHRef    = useRef(sectionH);
  const enterScrollRef = useRef(enterScroll);
  const frameWRef      = useRef(frameW);

  // Refs for measuring Experiencia vertical overflow
  const experienciaFrameRef   = useRef<HTMLDivElement>(null);
  const experienciaContentRef = useRef<HTMLDivElement>(null);
  const maxVScrollRef         = useRef(0);

  // Refs for measuring Formación vertical overflow
  const formacionFrameRef   = useRef<HTMLDivElement>(null);
  const formacionContentRef = useRef<HTMLDivElement>(null);
  const maxVScroll2Ref      = useRef(0);

  const measureVScroll = useCallback(() => {
    const frame   = experienciaFrameRef.current;
    const content = experienciaContentRef.current;
    if (frame && content) {
      maxVScrollRef.current = Math.max(0, content.scrollHeight - frame.clientHeight);
    }
  }, []);

  const measureVScroll2 = useCallback(() => {
    const frame   = formacionFrameRef.current;
    const content = formacionContentRef.current;
    if (frame && content) {
      maxVScroll2Ref.current = Math.max(0, content.scrollHeight - frame.clientHeight);
    }
  }, []);

  useEffect(() => { sectionHRef.current = sectionH; }, [sectionH]);
  useEffect(() => { enterScrollRef.current = enterScroll; }, [enterScroll]);

  useLayoutEffect(() => { measureVScroll(); measureVScroll2(); }, [sectionH, measureVScroll, measureVScroll2]);

  useEffect(() => {
    const onResize = () => {
      const w = getEffectiveFrameW();
      setFrameW(w);
      frameWRef.current = w;
      measureVScroll();
      measureVScroll2();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureVScroll, measureVScroll2]);

  // Horizontal transform with pauses while each frame scrolls vertically.
  // raw = (scrollY - enterScroll) / sectionH
  //   0→1 : slide frame 0→1  (x: 0 → -fw)
  //   1→2 : vertical scroll in frame 1  (x stays at -fw)
  //   2→3 : slide frame 1→2  (x: -fw → -2fw)
  //   3→4 : vertical scroll in frame 2  (x stays at -2fw)
  const x = useTransform(scrollY, (s: number) => {
    const sh = sectionHRef.current;
    const es = enterScrollRef.current;
    const fw = frameWRef.current;
    if (!sh) return 0;
    const raw = (s - es) / sh;

    if (raw <= 0) return 0;
    if (raw <= 1) return -raw * fw;                                          // slide 0→1
    if (raw <= 1 + V_SCROLL_UNITS) return -fw;                               // pause frame 1
    if (raw <= 2 + V_SCROLL_UNITS) return -(1 + Math.min(raw - 1 - V_SCROLL_UNITS, 1)) * fw; // slide 1→2
    return -2 * fw;                                                           // pause frame 2
  });

  // Vertical offset for Experiencia content during its pause phase (raw 1→2).
  const yExperiencia = useTransform(scrollY, (s: number) => {
    const sh  = sectionHRef.current;
    const es  = enterScrollRef.current;
    if (!sh) return 0;
    const raw = (s - es) / sh;
    const vProgress = Math.max(0, Math.min(raw - 1, V_SCROLL_UNITS)) / V_SCROLL_UNITS;
    return -vProgress * maxVScrollRef.current;
  });

  // Vertical offset for Formación content during its pause phase (raw 3→4).
  const yFormacion = useTransform(scrollY, (s: number) => {
    const sh  = sectionHRef.current;
    const es  = enterScrollRef.current;
    if (!sh) return 0;
    const raw = (s - es) / sh;
    const phaseStart = 2 + V_SCROLL_UNITS; // = 3
    const vProgress = Math.max(0, Math.min(raw - phaseStart, V_SCROLL_UNITS_2)) / V_SCROLL_UNITS_2;
    return -vProgress * maxVScroll2Ref.current;
  });


  return (
    <div className="h-full flex flex-col md:block">
      <span className="md:hidden flex-shrink-0 type-overline text-[#9A9A9A] px-4 pt-3 pb-2">Sobre mi</span>
      <div className="flex-1 md:h-full overflow-hidden md:ml-[440px] relative">
        <motion.div className="flex h-full" style={{ x, width: `${TOTAL_SCROLL_UNITS * 100}%` }}>

          {/* Frame 0 — Intro */}
          <div className="h-full flex-shrink-0 overflow-hidden" style={{ width: `${100 / TOTAL_SCROLL_UNITS}%` }}>
            <FrameIntro />
          </div>

          {/* Frame 1 — Experiencia (vertical scroll driven by global scrollY) */}
          <div
            ref={experienciaFrameRef}
            className="h-full flex-shrink-0 overflow-hidden"
            style={{ width: `${100 / TOTAL_SCROLL_UNITS}%` }}
          >
            <motion.div
              ref={experienciaContentRef}
              className="px-4 md:px-0 md:pr-[60px] py-10"
              style={{ y: yExperiencia }}
            >
              <FrameExperiencia />
            </motion.div>
          </div>

          {/* Frame 2 — Formación (vertical scroll driven by global scrollY) */}
          <div
            ref={formacionFrameRef}
            className="h-full flex-shrink-0 overflow-hidden"
            style={{ width: `${100 / TOTAL_SCROLL_UNITS}%` }}
          >
            <motion.div
              ref={formacionContentRef}
              className="px-4 md:px-0 md:pr-[60px] py-10"
              style={{ y: yFormacion }}
            >
              <FrameFormacion />
            </motion.div>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
