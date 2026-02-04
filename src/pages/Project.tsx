import { useParams, Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProjectById, xconsImages, jodifyImages } from "../data/projects";
import BenchmarkTable from "../components/BenchmarkTable";
import JodifyBenchmarkTable from "../components/JodifyBenchmarkTable";
import UserPersonas from "../components/UserPersonas";

// Hoisted SVG icons - prevents recreation on each render
const NextArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HomeIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const LocationIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UserIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const FlowArrowIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PriceIcon = (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjectById(projectId || "1");
  const mainRef = useRef<HTMLElement>(null);

  const getNextProjectId = (): string => {
    // Only cycle through navigable projects: HR (1), XCONS (2), Jodify (3)
    const navigableProjects = 3;
    const currentId = parseInt(projectId || "1", 10);
    const nextId = currentId >= navigableProjects ? 1 : currentId + 1;
    return String(nextId);
  };

  const getNextProject = () => {
    return getProjectById(getNextProjectId());
  };

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  // Check if this project has case study content
  const hasCaseStudy = project?.challenges && project?.images?.cover;

  // Check if this is the XCONS project
  const isXCONS = project?.id === "2";

  // Check if this is the Jodify project
  const isJodify = project?.id === "3";

  // Scroll-based background color for XCONS
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to background color
  // Verde muy claro: #f0f7f0 o #f5faf5
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isXCONS 
      ? ["#ffffff", "#f5faf5", "#f0f7f0"]
      : ["#ffffff", "#ffffff", "#ffffff"]
  );

  // If no case study, render simple version
  if (!hasCaseStudy) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24">
          <section className="w-full h-[50vh] relative overflow-hidden">
            <img
              src={project?.image}
              alt={project?.title}
              width={1200}
              height={600}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#2D2D2D] mb-4">
              {project?.title}
            </h1>
            <p className="text-base sm:text-lg text-[#6B6B6B]">{project?.description}</p>
            <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-[#9A9A9A]">{project?.company}</span>
              <span className="text-xs sm:text-sm text-[#9A9A9A]">{project?.year}</span>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8">
            <Link
              to={`/project/${getNextProjectId()}`}
              className="inline-flex items-center gap-2 text-[rgb(201,188,63)] hover:underline"
            >
              Ver siguiente proyecto
              {NextArrowIcon}
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen relative"
      {...(isXCONS && { style: { backgroundColor } })}
    >
      <Header />
      <main ref={mainRef} className="pt-20 relative z-10">
        {/* Hero Section */}
        <HeroSection project={project} />

        {/* 01 Project Brief */}
        <ProjectBriefSection project={project} fadeIn={fadeIn} staggerContainer={staggerContainer} isXCONS={isXCONS} isJodify={isJodify} />

        {/* 02 Challenges */}
        <ChallengesSection project={project} fadeIn={fadeIn} staggerContainer={staggerContainer} isXCONS={isXCONS} isJodify={isJodify} />

        {/* 03 Key Findings / Solutions */}
        {isXCONS ? (
          <XCONSKeyFindingsSection fadeIn={fadeIn} />
        ) : isJodify ? (
          <JodifyBenchmarkSection fadeIn={fadeIn} />
        ) : (
          <KeyFindingsSection project={project} fadeIn={fadeIn} />
        )}

        {/* 04 User Personas / Logic & Systems (for XCONS) / Empathy Map (for Jodify) */}
        {isXCONS ? (
          <XCONSLogicSection fadeIn={fadeIn} />
        ) : isJodify ? (
          <JodifyPersonaSection fadeIn={fadeIn} />
        ) : (
          <UserPersonasSection project={project} fadeIn={fadeIn} />
        )}

        {/* 05 Solution (only for HR) / UI Kit (for Jodify) */}
        {isJodify ? (
          <JodifyUIKitSection fadeIn={fadeIn} />
        ) : !isXCONS && (
          <SolutionSection project={project} fadeIn={fadeIn} staggerContainer={staggerContainer} />
        )}

        {/* 06 Results */}
        <ResultsSection project={project} fadeIn={fadeIn} staggerContainer={staggerContainer} isXCONS={isXCONS} />

        {/* Next Project */}
        <NextProjectSection
          nextProject={getNextProject()}
          nextProjectId={getNextProjectId()}
          fadeIn={fadeIn}
        />
      </main>
      <Footer />
    </motion.div>
  );
}

// Helper function to highlight key phrases in text
function renderHighlightedText(text: string | undefined, highlights: string[]) {
  if (!text) return null;

  let result = text;
  highlights.forEach(phrase => {
    const regex = new RegExp(`(${phrase})`, "gi");
    result = result.replace(regex, "|||$1|||");
  });

  const parts = result.split("|||");

  return parts.map((part, index) => {
    const isHighlight = highlights.some(h => h.toLowerCase() === part.toLowerCase());
    if (isHighlight) {
      return (
        <span
          key={index}
          className="text-[#2D2D2D] font-medium"
        >
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

// Reusable Section Header Component with refined styling
interface SectionHeaderProps {
  number: string;
  title: string;
  fadeIn: Variants;
  accentColor?: string;
}

function SectionHeader({ number, title, fadeIn, accentColor = "rgb(201,188,63)" }: SectionHeaderProps) {
  return (
    <motion.div variants={fadeIn} className="mb-5">
      <div className="flex items-center gap-4 mb-2">
        <span 
          className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight"
          style={{ color: accentColor }}
        >
          {number}
        </span>
        <div 
          className="h-px w-8" 
          style={{ backgroundColor: `${accentColor}66` }}
          aria-hidden="true" 
        />
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#2D2D2D]">
        {title}
      </h2>
    </motion.div>
  );
}

// Hero Section - Compact elegant design with metadata
function HeroSection({ project }: { project: NonNullable<ReturnType<typeof getProjectById>> }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section ref={ref} className="pt-16 sm:pt-20 pb-6 sm:pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Header info row */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[rgb(201,188,63)] rotate-45" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] font-medium">
              {project.category}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-[#2D2D2D] leading-[1.1] tracking-tight mb-4 sm:mb-6 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {project.projectName || project.title}
        </motion.h1>

        {/* Metadata Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 py-4 md:py-6 border-t border-b border-[#E0DBD6] mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] mb-1 font-medium">
              Cronograma
            </h3>
            <p className="text-sm sm:text-base text-[#2D2D2D] font-normal">{project.timeline}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] mb-1 font-medium">
              Tipo de Proyecto
            </h3>
            <p className="text-sm sm:text-base text-[#2D2D2D] font-normal">{project.projectType}</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] mb-1 font-medium">
              Rol
            </h3>
            <p className="text-sm sm:text-base text-[#2D2D2D] font-normal">Diseñadora UX/UI</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] mb-1 font-medium">
              Contribución
            </h3>
            <p className="text-xs sm:text-sm text-[#2D2D2D] font-normal">{project.contribution?.join(", ")}</p>
          </div>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="aspect-[16/9] sm:aspect-video overflow-hidden"
            style={{ y: imageY }}
          >
            <img
              src={project.images?.cover}
              alt={project.title}
              width={1200}
              height={675}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Section Components
interface SectionProps {
  project: NonNullable<ReturnType<typeof getProjectById>>;
  fadeIn: Variants;
  staggerContainer?: Variants;
  isXCONS?: boolean;
}

function ProjectBriefSection({ project, fadeIn, staggerContainer, isXCONS, isJodify }: SectionProps & { isJodify?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const accentColor = isJodify ? "#7C16F5" : "rgb(201,188,63)";

  const briefHighlights = isXCONS ? [
    "Comercio Consultivo",
    "industria de la construcción",
    "experiencia de compra de materiales",
    "flujo digital unificado",
    "negociación",
    "acopio",
    "múltiples entregas"
  ] : [
    "solución digital",
    "Recursos Humanos",
    "herramienta de gestión",
    "potencia de funciones avanzadas",
    "simplicidad de uso",
    "gestionar empleados",
    "permisos y reportes",
    "eficiente y sin frustraciones"
  ];

  return (
    <section ref={ref} className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionHeader number="01" title="Resumen del Proyecto" fadeIn={fadeIn} accentColor={accentColor} />

          {/* XCONS: Text and image side by side */}
          {isXCONS ? (
            <motion.div
              variants={fadeIn}
              className="flex flex-col md:flex-row items-start gap-6"
            >
              <p className="text-base md:text-lg text-[#5A5A5A] leading-relaxed md:flex-1 pt-1">
                {renderHighlightedText(project.conceptSummary, briefHighlights)}
              </p>
              <div className="w-full md:w-[360px] flex-shrink-0 pt-1">
                <img
                  src={xconsImages.flujoCompra}
                  alt="Flujo de compra - XCONS"
                  width={360}
                  height={220}
                  loading="lazy"
                  className="w-full rounded-lg"
                />
              </div>
            </motion.div>
          ) : (
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-[#6B6B6B] leading-[1.8] font-light"
            >
              {renderHighlightedText(project.conceptSummary, briefHighlights)}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ChallengesSection({ project, fadeIn, staggerContainer, isXCONS, isJodify }: SectionProps & { isJodify?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // XCONS specific challenge data with solutions
  const xconsChallenges = [
    {
      number: "01",
      title: "\"El Carrito está Roto\"",
      problem: "En la construcción, el paradigma tradicional de e-commerce (\"Agregar al carrito > Pagar\") falla. Las ventas son largas y requieren asesoramiento técnico.",
      challenge: "¿Cómo diseñamos un flujo que priorice la negociación y el asesoramiento sobre la transacción inmediata?",
      solution: "Reemplazar el \"Carrito\" por un sistema de Presupuestos Colaborativos."
    },
    {
      number: "02",
      title: "Logística vs. Facturación",
      problem: "Un usuario puede pagar todo hoy, pero necesitar los materiales en 3 meses (Acopio), o recibir facturas parciales.",
      challenge: "Diseñar una interfaz de Pedido que no colapse cuando el \"Estado del Pago\" y el \"Estado de la Entrega\" no coinciden.",
      solution: "Una UI de Estados Independientes (Transacciones vs. Entregas)."
    },
    {
      number: "03",
      title: "Permisos Multi-Persona",
      problem: "En una obra interactúan el Dueño (paga), el Arquitecto (elige) y el Constructor (recibe).",
      challenge: "¿Cómo evitamos crear múltiples cuentas y contraseñas?",
      solution: "Diseñar un sistema de Roles Dinámicos donde un mismo usuario cambia de permisos según el contexto del presupuesto."
    }
  ];

  // Color accent based on project
  const accentColor = isJodify ? "#7C16F5" : "rgb(201,188,63)";

  return (
    <section ref={ref} className={`py-8 ${isJodify ? "bg-[#F2F1EF]" : "bg-white/80"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionHeader number="02" title="Desafíos" fadeIn={fadeIn} accentColor={accentColor} />

          {/* XCONS Challenge Cards */}
          {isXCONS ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {xconsChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-[#FAFAF8] border border-[#E0DBD6]/50 rounded-xl p-4 sm:p-5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 rounded-full bg-[rgb(201,188,63)]" aria-hidden="true" />
                    <span className="text-2xl font-extralight tracking-tight text-[rgb(201,188,63)]">
                      {challenge.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-[#2D2D2D] mb-4">
                    {challenge.title}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <span className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] font-medium">
                        El Problema
                      </span>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed mt-1">
                        {challenge.problem}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-[0.15em] text-[rgb(201,188,63)] font-medium">
                        El Reto
                      </span>
                      <p className="text-sm text-[#2D2D2D] font-medium leading-relaxed mt-1">
                        {challenge.challenge}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs uppercase tracking-[0.15em] text-[rgb(111,141,181)] font-medium">
                        La Solución
                      </span>
                      <p className="text-sm text-[#2D2D2D] leading-relaxed mt-1">
                        {challenge.solution}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* HR/Jodify Challenge Cards - Compact horizontal layout */
            <div className="flex flex-wrap justify-between gap-3 sm:gap-4">
              {project.challenges?.map((challenge, index) => (
                <motion.div
                  key={challenge.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border w-full sm:w-fit ${
                    isJodify 
                      ? "border-[#1B1C20]/10 bg-white" 
                      : "border-[#E0DBD6]/60 bg-[#FAFAF8]/50"
                  }`}
                  style={{ borderLeftWidth: 3, borderLeftColor: accentColor }}
                >
                  <span 
                    className="text-base sm:text-lg font-light flex-shrink-0"
                    style={{ color: accentColor }}
                  >
                    {challenge.number}
                  </span>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isJodify ? "text-[#1B1C20]" : "text-[#2D2D2D]"}`}>
                    {challenge.question}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function KeyFindingsSection({ project, fadeIn }: Omit<SectionProps, "staggerContainer">) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <SectionHeader number="03" title="Análisis Comparativo" fadeIn={fadeIn} />

          {/* Benchmark Table Component */}
          {project.images?.benchmark && (
            <motion.div variants={fadeIn} className="mb-8">
              <BenchmarkTable />
            </motion.div>
          )}

          {/* Competitors - Compact inline layout */}
          <motion.div variants={fadeIn} className="mb-8">
            <h4 className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] mb-4 font-medium">
              Competidores Analizados
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.keyFindings?.competitors?.map((competitor, index) => (
                <motion.div
                  key={competitor.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="px-4 py-2 bg-[#FAFAF8] rounded-lg border border-[#E8E4DF] hover:border-[rgb(201,188,63)]/40 transition-all duration-300 cursor-default">
                    <span className="text-sm font-medium text-[#2D2D2D]">{competitor.name}</span>
                  </div>
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#2D2D2D] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap max-w-[200px] text-center z-10">
                    {competitor.insight}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#2D2D2D]" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Insights - Two columns without background card */}
          <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-[#E8E4DF]">
            <motion.div variants={fadeIn}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-[rgb(201,188,63)] rotate-45" aria-hidden="true" />
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] font-medium">
                  Necesidad del Usuario
                </h4>
              </div>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                {renderHighlightedText(project.keyFindings?.userNeed, [
                  "personalización de flujos",
                  "claridad visual",
                  "cantidad de funciones"
                ])}
              </p>
            </motion.div>
            <motion.div variants={fadeIn}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 bg-[rgb(201,188,63)] rotate-45" aria-hidden="true" />
                <h4 className="text-xs uppercase tracking-[0.15em] text-[#9A9A9A] font-medium">
                  Tendencia
                </h4>
              </div>
              <p className="text-sm text-[#5A5A5A] leading-relaxed">
                {renderHighlightedText(project.keyFindings?.trend, [
                  "IA",
                  "digitalización",
                  "futuro",
                  "accesibilidad",
                  "presente necesario"
                ])}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// XCONS Key Findings Section - Design Solutions
function XCONSKeyFindingsSection({ fadeIn }: Omit<SectionProps, "staggerContainer" | "project">) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const designSolutions = [
    {
      number: "03-01",
      title: "La Interfaz \"Presupuesto Primero\"",
      subtitle: "Diseñamos un sistema donde el Presupuesto es el rey.",
      features: [
        {
          name: "Vista Kanban",
          description: "Para que el vendedor gestione oportunidades visualmente (Seguimiento, Visto por cliente, Cerrado)."
        },
        {
          name: "Colaboración",
          description: "El cliente y el vendedor editan el mismo documento en tiempo real. Si el vendedor aplica un descuento manual, el sistema recalcula y elimina promociones automáticas para evitar conflictos."
        }
      ],
      imageNote: "Tablero Kanban de presupuestos"
    },
    {
      number: "03-02",
      title: "Panel de Gestión de Pedidos (OMS)",
      subtitle: "El diseño del detalle del pedido es la pieza central de la UI.",
      features: [
        {
          name: "Bloque Financiero",
          description: "¿Cuánto se pagó? ¿Cuánto falta? (Barras de progreso verdes)."
        },
        {
          name: "Bloque Logístico",
          description: "¿Qué está en \"Acopio\"? ¿Qué está \"En Camino\"?"
        },
        {
          name: "Retroalimentación Visual",
          description: "Uso de barras de progreso y tarjetas separadas para que el usuario entienda el estado de su obra de un vistazo."
        }
      ],
      imageNote: "Detalle del Pedido #2000005566"
    },
    {
      number: "03-03",
      title: "Perfil de Usuario Unificado (CRM)",
      subtitle: "Diseñamos una \"Single Source of Truth\" para el usuario.",
      features: [
        {
          name: "Identidad Multi-Tienda",
          description: "Un diseño de perfil que unifica la actividad del usuario a través de múltiples tiendas y roles (Cliente en una, Vendedor en otra)."
        },
        {
          name: "Feed de Actividad",
          description: "Un historial visual de todas las interacciones (WhatsApp, cambios de estado, notas)."
        }
      ],
      imageNote: "Historial del Contacto y embudo de ventas"
    }
  ];

  // Animation config respecting reduced motion
  const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const getAnimationProps = (index: number) => {
    if (prefersReducedMotion) {
      return {
        initial: { opacity: 1, y: 0 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0 },
        viewport: { once: true }
      };
    }
    return {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: index * 0.1, ease: smoothEase },
      viewport: { once: true, margin: "-50px" }
    };
  };

  return (
    <section ref={ref} aria-labelledby="key-findings-heading" className="bg-white/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <SectionHeader number="03" title="Hallazgos Clave y Soluciones" fadeIn={fadeIn} />

          {/* Design Solutions - Cards stacked with image on side */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16" role="list" aria-label="Soluciones de diseño">
            {designSolutions.map((solution, solutionIndex) => {
              const imageSrc = solutionIndex === 0
                ? xconsImages.detail3
                : solutionIndex === 1
                  ? xconsImages.detail322
                  : xconsImages.contacto;

              return (
                <motion.article
                  key={solution.number}
                  role="listitem"
                  {...getAnimationProps(solutionIndex)}
                  className="scroll-mt-24"
                >
                  {/* Solution Header */}
                  <header className="flex items-center gap-3 mb-5">
                    <span
                      className="text-xl font-extralight tracking-tight text-[rgb(201,188,63)] tabular-nums"
                      aria-hidden="true"
                    >
                      {solution.number}
                    </span>
                    <div className="h-px flex-1 bg-[rgb(201,188,63)]/30" aria-hidden="true" />
                  </header>

                  {/* Side by side: Content left, Image right */}
                  <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
                    {/* Left: Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg sm:text-xl font-medium text-[#2D2D2D] mb-2"
                        style={{ textWrap: "balance" } as React.CSSProperties}
                      >
                        {solution.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#5A5A5A] mb-4 sm:mb-6 leading-relaxed">
                        {solution.subtitle}
                      </p>

                      {/* Features stacked - no cards, clean layout */}
                      <div className="space-y-4 sm:space-y-5">
                        {solution.features.map((feature) => (
                          <div
                            key={feature.name}
                            className="border-l-2 border-[rgb(201,188,63)]/40 pl-3 sm:pl-4"
                          >
                            <h4 className="text-xs sm:text-sm font-semibold text-[rgb(161,148,23)] mb-1 uppercase tracking-wider">
                              {feature.name}
                            </h4>
                            <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Image */}
                    <figure className="w-full md:w-[500px] flex-shrink-0">
                      <div className="rounded-xl overflow-hidden shadow-lg border border-[#E8E4DF]">
                        <img
                          src={imageSrc}
                          alt=""
                          width={500}
                          height={350}
                          loading="lazy"
                          className="w-full h-auto"
                        />
                      </div>
                      <figcaption className="mt-3 text-xs text-[#9A9A9A] text-center">
                        {solution.imageNote}
                      </figcaption>
                    </figure>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// XCONS Logic & Systems Section
function XCONSLogicSection({ fadeIn }: Omit<SectionProps, "staggerContainer" | "project">) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const pricingLayers = [
    {
      name: "Reglas del Seller",
      description: "Precio base del proveedor",
      icon: HomeIcon
    },
    {
      name: "Contexto del Store",
      description: "Ofertas geográficas y promociones de tienda",
      icon: LocationIcon
    },
    {
      name: "Perfil del Cliente",
      description: "¿Es arquitecto? ¿Es empresa? Descuentos especiales",
      icon: UserIcon
    }
  ];

  return (
    <section ref={ref} className="bg-white/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <SectionHeader number="04" title="Lógica y Sistemas" fadeIn={fadeIn} />

          <motion.div variants={fadeIn} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-0">
            {/* Section subtitle with diamond */}
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 bg-[rgb(201,188,63)] rotate-45" aria-hidden="true" />
                <h3 className="text-xs sm:text-sm uppercase tracking-[0.15em] text-[#2D2D2D] font-medium">
                  Arquitectura de Precios Dinámicos
                </h3>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-[#4A4A4A] mb-6 sm:mb-8 leading-relaxed max-w-3xl font-light">
                Como diseñador, tuve que estructurar cómo se le presenta el precio al usuario.
                <span className="hidden sm:inline"><br /></span> No es un número estático; es una variable que cambia según múltiples factores:
              </p>
            </div>

            {/* Pricing Flow Visualization */}
            <div className="w-full lg:w-fit lg:pl-8 mx-auto">
              {/* Desktop layout */}
              <div className="hidden md:flex items-start justify-center">
                {/* Layer 1 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center w-full sm:w-[140px]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[rgb(201,188,63)]/10 flex items-center justify-center border border-[rgb(201,188,63)]/30 text-[rgb(201,188,63)]">
                    {pricingLayers[0].icon}
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <h4 className="text-xs sm:text-sm font-medium text-[#2D2D2D] mb-1">{pricingLayers[0].name}</h4>
                    <p className="text-xs text-[#6B6B6B]">{pricingLayers[0].description}</p>
                  </div>
                </motion.div>

                {/* Arrow 1 - positioned at icon center (32px from top) */}
                <motion.div
                  className="flex items-start pt-[22px] justify-center w-8 text-[rgb(201,188,63)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {FlowArrowIcon}
                </motion.div>

                {/* Layer 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center w-full sm:w-[140px]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[rgb(201,188,63)]/10 flex items-center justify-center border border-[rgb(201,188,63)]/30 text-[rgb(201,188,63)]">
                    {pricingLayers[1].icon}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-[#2D2D2D] mb-1">{pricingLayers[1].name}</h4>
                    <p className="text-xs text-[#6B6B6B]">{pricingLayers[1].description}</p>
                  </div>
                </motion.div>

                {/* Arrow 2 - positioned at icon center (32px from top) */}
                <motion.div
                  className="flex items-start pt-[22px] justify-center w-8 text-[rgb(201,188,63)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {FlowArrowIcon}
                </motion.div>

                {/* Layer 3 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center w-full sm:w-[140px]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[rgb(201,188,63)]/10 flex items-center justify-center border border-[rgb(201,188,63)]/30 text-[rgb(201,188,63)]">
                    {pricingLayers[2].icon}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-[#2D2D2D] mb-1">{pricingLayers[2].name}</h4>
                    <p className="text-xs text-[#6B6B6B]">{pricingLayers[2].description}</p>
                  </div>
                </motion.div>

                {/* Arrow 3 - positioned at icon center (32px from top) */}
                <motion.div
                  className="flex items-start pt-[22px] justify-center w-8 text-[rgb(201,188,63)]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  {FlowArrowIcon}
                </motion.div>

                {/* Final Price */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center w-full sm:w-[140px]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[rgb(201,188,63)]/20 flex items-center justify-center border-2 border-[rgb(201,188,63)]/50 text-[rgb(201,188,63)]">
                    {PriceIcon}
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <h4 className="text-xs sm:text-sm font-medium text-[#2D2D2D] mb-1">Precio Final</h4>
                    <p className="text-xs text-[#6B6B6B]">Calculado dinámicamente</p>
                  </div>
                </motion.div>
              </div>

              {/* Mobile layout */}
              <div className="flex md:hidden flex-col items-center gap-4 sm:gap-6">
                {pricingLayers.map((layer, index) => (
                  <motion.div
                    key={layer.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center w-full sm:w-[140px]"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[rgb(201,188,63)]/10 flex items-center justify-center border border-[rgb(201,188,63)]/30 text-[rgb(201,188,63)]">
                      {layer.icon}
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-[#2D2D2D] mb-1">{layer.name}</h4>
                      <p className="text-xs text-[#6B6B6B]">{layer.description}</p>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center w-full sm:w-[140px]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[rgb(201,188,63)]/20 flex items-center justify-center border-2 border-[rgb(201,188,63)]/50 text-[rgb(201,188,63)]">
                    {PriceIcon}
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <h4 className="text-xs sm:text-sm font-medium text-[#2D2D2D] mb-1">Precio Final</h4>
                    <p className="text-xs text-[#6B6B6B]">Calculado dinámicamente</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function UserPersonasSection({ project, fadeIn }: Omit<SectionProps, "staggerContainer">) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[rgb(228,219,205)]/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <SectionHeader number="04" title="Personas de Usuario" fadeIn={fadeIn} />

          {project.images?.personas && (
            <motion.div variants={fadeIn}>
              <UserPersonas />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Screens Carousel Component
interface Screen {
  url: string;
  title: string;
}

const CarouselArrowLeft = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const CarouselArrowRight = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function ScreensCarousel({ screens }: { screens: Screen[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalScreens = screens.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalScreens);
  }, [totalScreens]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalScreens) % totalScreens);
  }, [totalScreens]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Main carousel container */}
      <div className="relative overflow-hidden rounded-xl bg-[#FAFAF8] border border-[#E8E4DF]">
        {/* Slides */}
        <div className="relative aspect-[16/9]">
          {screens.map((screen, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                scale: index === currentIndex ? 1 : 0.95,
                zIndex: index === currentIndex ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={screen.url}
                alt={screen.title}
                className="w-full h-full object-contain p-2"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-[#E0DBD6] flex items-center justify-center text-[#6B6B6B] hover:text-[#2D2D2D] hover:border-[rgb(201,188,63)] hover:bg-white transition-all duration-200 shadow-sm z-10"
          aria-label="Anterior"
        >
          {CarouselArrowLeft}
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-[#E0DBD6] flex items-center justify-center text-[#6B6B6B] hover:text-[#2D2D2D] hover:border-[rgb(201,188,63)] hover:bg-white transition-all duration-200 shadow-sm z-10"
          aria-label="Siguiente"
        >
          {CarouselArrowRight}
        </button>

        {/* Current slide info */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 rounded-md border border-[#E0DBD6] shadow-sm">
            <span className="text-xs font-medium text-[rgb(201,188,63)]">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-[#9A9A9A]">/</span>
            <span className="text-xs text-[#9A9A9A]">
              {String(totalScreens).padStart(2, "0")}
            </span>
            <span className="text-xs text-[#2D2D2D] ml-1 font-medium">
              {screens[currentIndex].title}
            </span>
          </div>
        </div>
      </div>

      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {screens.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-5 h-1.5 bg-[rgb(201,188,63)] rounded-full"
                : "w-1.5 h-1.5 bg-[#E0DBD6] rounded-full hover:bg-[rgb(201,188,63)]/50"
            }`}
            aria-label={`Ir a pantalla ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnails strip - centered */}
      <div className="flex gap-2 mt-4 justify-center">
        {screens.map((screen, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-16 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${
              index === currentIndex
                ? "border-[rgb(201,188,63)] shadow-md"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <img
              src={screen.url}
              alt={screen.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function SolutionSection({ project, fadeIn, staggerContainer }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionHeader number="05" title="Solución y Diseño" fadeIn={fadeIn} />

          {/* Approach */}
          <motion.div variants={fadeIn} className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.1em] text-[rgb(201,188,63)] mb-3 font-medium">
              Enfoque de Diseño
            </h3>
            <p className="text-base text-[#6B6B6B] leading-relaxed">
              {renderHighlightedText(project.solution?.approach, [
                "claridad",
                "jerarquías visuales claras",
                "espacios en blanco",
                "lenguaje sencillo"
              ])}
            </p>
          </motion.div>

          {/* MVP Features */}
          <motion.div variants={fadeIn} className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.1em] text-[rgb(201,188,63)] mb-3 font-medium">
              Funcionalidades MVP
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.solution?.mvpFeatures?.map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 bg-white rounded-full text-[#2D2D2D] border border-[#E0DBD6] text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Wireframes */}
          {project.images?.wireframes && (
            <motion.div variants={fadeIn} className="mb-10">
              <h3 className="text-xs uppercase tracking-[0.1em] text-[rgb(201,188,63)] mb-3 font-medium">
                Wireframes
              </h3>
              <div className="rounded-xl overflow-hidden">
                <img
                  src={project.images.wireframes}
                  alt="Bocetos"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </motion.div>
          )}

          {/* UI Kit */}
          {project.images?.uiKit && (
            <motion.div variants={fadeIn} className="mb-10">
              <h3 className="text-xs uppercase tracking-[0.1em] text-[rgb(201,188,63)] mb-3 font-medium">
                Sistema de Diseño
              </h3>
              <div className="rounded-xl overflow-hidden">
                <img
                  src={project.images.uiKit}
                  alt="Sistema de Diseño"
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </motion.div>
          )}

          {/* Final Screens - Carousel */}
          {project.images?.screens && project.images.screens.length > 0 && (
            <motion.div variants={fadeIn} >
              <h3 className="text-xs uppercase tracking-[0.1em] text-[rgb(201,188,63)] mb-4 font-medium text-center w-full">
                Pantallas Finales
              </h3>
              <ScreensCarousel screens={project.images.screens} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function ResultsSection({ project, fadeIn, staggerContainer, isXCONS }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // XCONS specific highlights for next steps
  const xconsHighlights = [
    "modelo mental de la construcción",
    "Presupuesto > Carrito",
    "sistemas complejos",
    "Roles y Permisos",
    "UI para simplificar datos densos"
  ];

  const hrHighlights = [
    "iteraciones",
    "resultados",
    "HacheR",
    "solución",
    "usuarios realmente quieran usar"
  ];

  return (
    <section ref={ref} className="bg-white/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionHeader number={isXCONS ? "05" : "06"} title={isXCONS ? "Resumen" : "Resultados y Próximos Pasos"} fadeIn={fadeIn} />

          {/* Two column layout for Validation Plan and Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Validation Plan */}
            <motion.div variants={fadeIn}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 bg-[rgb(201,188,63)] rotate-45" aria-hidden="true" />
                <h3 className="text-sm uppercase tracking-[0.15em] text-[#2D2D2D] font-medium">
                  Plan de Validación
                </h3>
              </div>
              <ul className="space-y-4">
                {project.results?.validationPlan?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-baseline gap-4 group"
                  >
                    <span className="text-2xl font-extralight text-[rgb(201,188,63)] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#4A4A4A] leading-relaxed border-b border-transparent group-hover:border-[rgb(201,188,63)]/30 transition-colors pb-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Metrics */}
            <motion.div variants={fadeIn} className="text-right">
              <div className="flex items-center gap-3 mb-6 justify-end">
                <h3 className="text-sm uppercase tracking-[0.15em] text-[#2D2D2D] font-medium">
                  Métricas a Evaluar
                </h3>
                <div className="w-1.5 h-1.5 bg-[rgb(201,188,63)] rotate-45" aria-hidden="true" />
              </div>
              <ul className="space-y-4 inline-block">
                {project.results?.metrics?.map((metric, index) => (
                  <li
                    key={index}
                    className="flex items-baseline gap-4 group"
                  >
                    <span className="text-2xl font-extralight text-[rgb(201,188,63)] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[#4A4A4A] leading-relaxed border-b border-transparent group-hover:border-[rgb(201,188,63)]/30 transition-colors pb-1 text-right w-full">
                      {metric}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Next Steps - elegant quote style */}
          {project.results?.nextSteps && (
            <motion.div
              variants={fadeIn}
              className="mt-12 pt-8 border-t border-[#E8E4DF] py-4"
            >
              <p className="text-lg md:text-xl text-[#5A5A5A] leading-relaxed text-center max-w-3xl mx-auto font-light">
                "{renderHighlightedText(project.results.nextSteps, isXCONS ? xconsHighlights : hrHighlights)}"
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

interface NextProjectSectionProps {
  nextProject: ReturnType<typeof getProjectById>;
  nextProjectId: string;
  fadeIn: Variants;
}

// Get accent color for each project
function getProjectAccentColor(projectId: string): string {
  switch (projectId) {
    case "1": return "rgb(201,188,63)"; // HR - dorado
    case "2": return "rgb(111,141,181)"; // XCONS - azul
    case "3": return "#7C16F5"; // Jodify - violeta
    default: return "rgb(201,188,63)";
  }
}

function NextProjectSection({ nextProject, nextProjectId, fadeIn }: NextProjectSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const accentColor = getProjectAccentColor(nextProjectId);

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 border-t border-[#E8E4DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {/* Title */}
          <motion.h3
            variants={fadeIn}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#2D2D2D] text-center mb-6 sm:mb-8 md:mb-10"
          >
            Siguiente proyecto
          </motion.h3>

          {/* Project Link - Horizontal layout */}
          <motion.div variants={fadeIn}>
            <Link
              to={`/project/${nextProjectId}`}
              className="group flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-10 p-4 sm:p-6 rounded-2xl bg-white/90 border border-[#E8E4DF] hover:shadow-lg transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-32 h-40 sm:h-20 md:w-40 md:h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={nextProject?.homeImage || nextProject?.image}
                  alt=""
                  width={160}
                  height={96}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 w-full text-center md:text-left">
                <p 
                  className="text-xs uppercase tracking-[0.15em] font-medium mb-1 sm:mb-2"
                  style={{ color: accentColor }}
                >
                  {nextProject?.company}
                </p>
                <h4 className="text-lg sm:text-xl md:text-2xl font-medium text-[#2D2D2D] transition-colors duration-300">
                  {nextProject?.title}
                </h4>
                {nextProject?.year && (
                  <p className="text-xs sm:text-sm text-[#9A9A9A] mt-1">{nextProject.year}</p>
                )}
              </div>

              {/* Arrow */}
              <motion.div 
                className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0"
                style={{ borderColor: accentColor, color: accentColor }}
                whileHover={{ backgroundColor: accentColor, color: "#ffffff" }}
              >
                {NextArrowIcon}
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// JODIFY SPECIFIC SECTIONS
// ============================================

function JodifyBenchmarkSection({ fadeIn }: Omit<SectionProps, "staggerContainer" | "project">) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-8 bg-[#F2F1EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          {/* Section Header */}
          <div className="mb-5">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-[#7C16F5]">
                03
              </span>
              <div className="h-px w-8 bg-[#7C16F5]/40" aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#0C0C0C]">
              Análisis Comparativo
            </h2>
          </div>

          {/* Benchmark Table Component */}
          <motion.div variants={fadeIn}>
            <JodifyBenchmarkTable />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function JodifyPersonaSection({ fadeIn }: Omit<SectionProps, "staggerContainer" | "project">) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const empathyMap = {
    piensaSiente: [
      "Le encanta descubrir nuevos eventos y artistas en la escena de la música electrónica.",
      "Desea vivir experiencias únicas y vibrantes en cada evento.",
    ],
    frustra: [
      "No encontrar los eventos de música electrónica que se ajusten a sus preferencias.",
      "Preocupación por costos ocultos y falta de transparencia en el proceso de compra.",
    ],
    motiva: [
      "Descubrir eventos emocionantes y participar en experiencias únicas.",
      "Recibir recomendaciones personalizadas que reflejen sus gustos musicales.",
      "Conectar con una comunidad que comparte su pasión por la música electrónica.",
    ],
    diceHace: [
      "Comparte activamente eventos en sus redes sociales.",
      "Compra entradas, buscando plataformas que ofrezcan una gran cantidad de eventos.",
    ],
  };

  return (
    <section ref={sectionRef} className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          {/* Section Header */}
          <div className="mb-5">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-[#7C16F5]">
                04
              </span>
              <div className="h-px w-8 bg-[#7C16F5]/40" aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#0C0C0C]">
              Conociendo a Nuestra Usuaria
            </h2>
          </div>

          {/* User Persona Card - Mobile */}
          <motion.div
            className="md:hidden bg-white rounded-2xl border border-[#1B1C20]/10 overflow-hidden mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Photo Header */}
            <div className="bg-gradient-to-b from-[#7C16F5]/15 to-[#7C16F5]/5 p-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={jodifyImages.persona}
                  alt="Martina Rodríguez"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                  loading="lazy"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#7C16F5] text-white text-xs font-medium rounded-full whitespace-nowrap">
                  28 años
                </div>
              </div>
              <h3 className="text-lg font-medium text-[#0C0C0C]">Martina Rodríguez</h3>
              <p className="text-sm text-[#7C16F5] font-medium">Diseñadora Gráfica</p>
            </div>

            {/* Quick Info Pills */}
            <div className="px-5 py-4 border-b border-[#1B1C20]/5 flex flex-wrap justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2F1EF] rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C16F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-xs text-[#1B1C20]">La Plata, Argentina</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2F1EF] rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C16F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span className="text-xs text-[#1B1C20]">iPhone, Macbook</span>
              </div>
            </div>

            {/* Bio */}
            <div className="px-5 py-4">
              <p className="text-sm text-[#1B1C20] leading-relaxed text-center">
                Enérgica amante de la música electrónica, Martina disfruta de eventos como festivales de techno y fiestas underground. Busca experiencias vibrantes y vanguardistas en la escena de música electrónica local e internacional.
              </p>
            </div>

            {/* Interests, Needs, Frustrations - Stacked */}
            <div className="px-5 pb-5 space-y-3">
              <div className="p-4 bg-[#7C16F5]/5 rounded-xl border border-[#7C16F5]/10">
                <h4 className="text-xs font-semibold text-[#7C16F5] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C16F5]" />
                  Intereses
                </h4>
                <p className="text-xs text-[#1B1C20] leading-relaxed">Creativa, con un enfoque moderno y contemporáneo. Le gusta la estética minimalista y busca plataformas que resalten la innovación.</p>
              </div>
              <div className="p-4 bg-[#7C16F5]/5 rounded-xl border border-[#7C16F5]/10">
                <h4 className="text-xs font-semibold text-[#7C16F5] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C16F5]" />
                  Necesidades
                </h4>
                <p className="text-xs text-[#1B1C20] leading-relaxed">Amplia oferta de eventos, desde festivales masivos hasta fiestas underground. Recomendaciones personalizadas basadas en preferencias.</p>
              </div>
              <div className="p-4 bg-[#1B1C20]/5 rounded-xl border border-[#1B1C20]/10">
                <h4 className="text-xs font-semibold text-[#1B1C20] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B1C20]" />
                  Frustraciones
                </h4>
                <p className="text-xs text-[#1B1C20] leading-relaxed">No encontrar eventos de su interés. Preocupación por costos ocultos o falta de claridad en el proceso de compra.</p>
              </div>
            </div>
          </motion.div>

          {/* User Persona Card - Desktop */}
          <motion.div
            className="hidden md:block bg-white rounded-2xl border border-[#1B1C20]/10 overflow-hidden mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="grid md:grid-cols-3 gap-0">
              {/* Photo */}
              <div className="md:col-span-1 bg-[#7C16F5]/10 p-6 sm:p-8 flex items-center justify-center">
                <div className="relative">
                  <img
                    src={jodifyImages.persona}
                    alt="Martina Rodríguez"
                    className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-white shadow-lg"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-2 -right-2 px-3 py-1.5 bg-[#7C16F5] text-white text-xs font-medium rounded-full">
                    28 años
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="md:col-span-2 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-medium text-[#0C0C0C] mb-1">Martina Rodríguez</h3>
                <p className="text-sm text-[#7C16F5] font-medium mb-4">Diseñadora Gráfica</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C16F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#1B1C20]">La Plata, Argentina</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C16F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#1B1C20]">iPhone, Macbook</span>
                  </div>
                </div>

                <p className="text-sm text-[#1B1C20] leading-relaxed mb-6">
                  Enérgica amante de la música electrónica, Martina disfruta de eventos como festivales de techno y fiestas underground. Busca experiencias vibrantes y vanguardistas en la escena de música electrónica local e internacional.
                </p>

                {/* Interests, Needs, Frustrations */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-[#7C16F5]/5 rounded-xl border border-[#7C16F5]/10">
                    <h4 className="text-xs font-medium text-[#7C16F5] uppercase tracking-wider mb-2">Intereses</h4>
                    <p className="text-xs text-[#1B1C20]">Creativa, con un enfoque moderno y contemporáneo. Le gusta la estética minimalista y busca plataformas que resalten la innovación.</p>
                  </div>
                  <div className="p-3 bg-[#7C16F5]/5 rounded-xl border border-[#7C16F5]/10">
                    <h4 className="text-xs font-medium text-[#7C16F5] uppercase tracking-wider mb-2">Necesidades</h4>
                    <p className="text-xs text-[#1B1C20]">Amplia oferta de eventos, desde festivales masivos hasta fiestas underground. Recomendaciones personalizadas basadas en preferencias.</p>
                  </div>
                  <div className="p-3 bg-[#1B1C20]/5 rounded-xl border border-[#1B1C20]/10">
                    <h4 className="text-xs font-medium text-[#1B1C20] uppercase tracking-wider mb-2">Frustraciones</h4>
                    <p className="text-xs text-[#1B1C20]">No encontrar eventos de su interés. Preocupación por costos ocultos o falta de claridad en el proceso de compra.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Empathy Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg sm:text-xl font-medium text-[#0C0C0C] mb-6">Mapa de Empatía</h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Piensa y Siente */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#1B1C20]/10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C16F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-[#0C0C0C]">¿Qué piensa y siente?</h4>
                </div>
                <ul className="space-y-2">
                  {empathyMap.piensaSiente.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#1B1C20] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C16F5] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Frustra */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#1B1C20]/10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C16F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-[#0C0C0C]">¿Qué la frustra?</h4>
                </div>
                <ul className="space-y-2">
                  {empathyMap.frustra.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#1B1C20] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C16F5] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Motiva */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#1B1C20]/10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C16F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-[#0C0C0C]">¿Qué la motiva?</h4>
                </div>
                <ul className="space-y-2">
                  {empathyMap.motiva.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#1B1C20] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C16F5] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dice y Hace */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#1B1C20]/10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C16F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-medium text-[#0C0C0C]">¿Qué dice y hace?</h4>
                </div>
                <ul className="space-y-2">
                  {empathyMap.diceHace.map((item, i) => (
                    <li key={i} className="text-xs sm:text-sm text-[#1B1C20] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C16F5] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* POV Statement */}
          <motion.div
            className="mt-10 sm:mt-12 p-6 sm:p-8 bg-[#7C16F5]/10 rounded-2xl border border-[#7C16F5]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-medium text-[#7C16F5] uppercase tracking-wider mb-3">Point of View</h4>
            <p className="text-sm sm:text-base text-[#0C0C0C] leading-relaxed">
              <strong>Martina Rodríguez</strong> necesita una plataforma que no solo simplifique la compra de entradas para eventos de música electrónica, sino que también le ofrezca <strong>recomendaciones personalizadas</strong> basadas en sus gustos. Además, busca conectar con una <strong>comunidad</strong> que comparta su pasión musical. Una interfaz intuitiva, descubrimiento de eventos personalizado y la posibilidad de participar activamente en una comunidad son esenciales para una experiencia completa y satisfactoria.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function JodifyUIKitSection({ fadeIn }: Omit<SectionProps, "staggerContainer" | "project">) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-8 bg-[#F2F1EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          {/* Section Header */}
          <div className="mb-5">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight text-[#7C16F5]">
                05
              </span>
              <div className="h-px w-8 bg-[#7C16F5]/40" aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#0C0C0C]">
              Sistema de Diseño
            </h2>
          </div>

          {/* UI Kit Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={jodifyImages.uiKit} 
              alt="Jodify UI Kit" 
              className="w-full h-auto"
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Project;
