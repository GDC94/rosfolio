import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import Header from "../components/Header";
import { getProjectById, xconsImages, jodifyImages, puertaPuertaImages } from "../data/projects";
import { getProjectSections, themeForIndex } from "../data/projectSections";
import BenchmarkTable from "../components/BenchmarkTable";
import JodifyBenchmarkTable from "../components/JodifyBenchmarkTable";
import UserPersonas from "../components/UserPersonas";
import StackSection from "../components/project/StackSection";
import HorizontalPanels from "../components/project/HorizontalPanels";
import HandDrawnWireframes from "../components/project/HandDrawnWireframes";
import MvpFeatureCards from "../components/project/MvpFeatureCards";
import ChallengeSketches from "../components/project/ChallengeSketches";
import PricingFlowSketches from "../components/project/PricingFlowSketches";
import { JODIFY_CHALLENGE_SKETCHES, JODIFY_SKETCH_FILL } from "../components/project/JodifySketches";
import UIKitMosaic, { type KitBlock, type MobileSection } from "../components/project/UIKitMosaic";
import NextProjectCard from "../components/project/NextProjectCard";

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

const GOLD = "rgb(201,188,63)";
const JODIFY = "#7C16F5";

type ProjectInfo = NonNullable<ReturnType<typeof getProjectById>>;

function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjectById(projectId || "1");

  const getNextProjectId = (): string => {
    // Only cycle through navigable projects: HR (1), XCONS (2), Jodify (3)
    const navigableProjects = 3;
    const currentId = parseInt(projectId || "1", 10);
    const nextId = currentId >= navigableProjects ? 1 : currentId + 1;
    return String(nextId);
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

  // If no case study, render simple version
  if (!project || !hasCaseStudy) {
    return (
      <div className="min-h-screen pj-theme-beige bg-[var(--pj-bg)] text-ink">
        <Header />
        <main className="pt-14 px-4 md:pl-[440px] md:pr-[60px] pb-20">
          <section className="w-full h-[50vh] relative overflow-hidden rounded-2xl">
            <img
              src={project?.image}
              alt={project?.title}
              width={1200}
              height={600}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </section>

          <section className="py-8">
            <h1 className="type-h1 text-ink mb-4">{project?.title}</h1>
            <p className="type-body-l text-ink-muted">{project?.description}</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <span className="type-caption text-ink-subtle">{project?.company}</span>
              <span className="type-caption text-ink-subtle">{project?.year}</span>
            </div>
          </section>

          <Link
            to={`/project/${getNextProjectId()}`}
            className="inline-flex items-center gap-2 type-body text-[rgb(201,188,63)] hover:underline"
          >
            Ver siguiente proyecto
            {NextArrowIcon}
          </Link>
        </main>
      </div>
    );
  }

  const isXCONS = project.id === "2";
  const isJodify = project.id === "3";
  const isPuertaPuerta = project.id === "10";
  const isHR = !isXCONS && !isJodify && !isPuertaPuerta;
  const accent = isJodify ? JODIFY : GOLD;

  const sections = getProjectSections(project.id);
  const num = (i: number) => String(i + 1).padStart(2, "0");
  const shared = { fadeIn, staggerContainer };

  const renderSection = (id: string, i: number): ReactNode => {
    const n = num(i);
    switch (id) {
      case "project-brief":
        return (
          <>
            <HeroSection project={project} />
            {isPuertaPuerta ? (
              <PuertaPuertaBriefSection n={n} {...shared} />
            ) : (
              <ProjectBriefSection project={project} n={n} {...shared} isXCONS={isXCONS} accent={accent} />
            )}
          </>
        );
      case "project-findings":
        if (isXCONS) return <XCONSKeyFindingsSection n={n} {...shared} />;
        if (isJodify) return <JodifyBenchmarkSection n={n} {...shared} />;
        if (isPuertaPuerta) return <PuertaPuertaBenchmarkSection n={n} {...shared} />;
        return <KeyFindingsSection project={project} n={n} {...shared} />;
      case "project-personas":
        if (isXCONS) return <XCONSLogicSection n={n} {...shared} />;
        if (isJodify) return <JodifyPersonaSection n={n} {...shared} />;
        if (isPuertaPuerta) return <PuertaPuertaProcesoSection n={n} {...shared} />;
        return <UserPersonasSection project={project} n={n} {...shared} />;
      case "project-solution":
        if (isJodify) return <JodifyUIKitSection n={n} {...shared} />;
        if (isPuertaPuerta) return <PuertaPuertaTestingSection n={n} {...shared} />;
        return <SolutionSection project={project} n={n} label={sections[i].label} />;
      case "project-results":
        return isPuertaPuerta ? (
          <PuertaPuertaDisenoSection n={n} {...shared} />
        ) : (
          <ResultsSection project={project} n={n} {...shared} isXCONS={isXCONS} isHR={isHR} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      <Header />
      <main>
        {sections.map((s, i) => (
          <StackSection
            key={s.id}
            id={s.id}
            index={i}
            label={s.label}
            theme={themeForIndex(i)}
            bare={isHR && s.id === "project-solution"}
          >
            {renderSection(s.id, i)}
            {i === sections.length - 1 && <NextProjectCard projectId={getNextProjectId()} />}
          </StackSection>
        ))}
      </main>
    </div>
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
        <span key={index} className="text-ink font-medium">
          {part}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

// ─── Shared building blocks ─────────────────────────────────────────────────

interface SectionHeaderProps {
  number: string;
  title: string;
  fadeIn?: Variants;
  accentColor?: string;
}

function SectionHeader({ title, fadeIn }: SectionHeaderProps) {
  return (
    <motion.div variants={fadeIn} className="mb-5 md:mb-14">
      <h2 className="type-h1 text-ink">{title}</h2>
    </motion.div>
  );
}

/** Small uppercase label used for sub-blocks inside a section. */
function Eyebrow({ children, color, className = "" }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <h3
      className={`type-overline uppercase ${color ? "" : "text-ink-subtle"} ${className}`}
      style={color ? { color } : undefined}
    >
      {children}
    </h3>
  );
}

/** Small sub-block title. */
function DiamondLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`type-h4 text-ink ${className}`}>{children}</h3>;
}

/** Animates its children in when scrolled into view. */
function Reveal({ children, stagger }: { children: ReactNode; stagger?: Variants }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

interface SectionProps {
  n: string;
  fadeIn: Variants;
  staggerContainer?: Variants;
}

// ─── Hero (inside the first section) ────────────────────────────────────────

function HeroSection({ project }: { project: ProjectInfo }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const meta = [
    { label: "Año", value: project.timeline },
    { label: "Tipo de Proyecto", value: project.projectType },
    { label: "Rol", value: project.role ?? "Diseñadora UX/UI" },
  ];

  return (
    <div ref={ref} className="relative mb-10 md:mb-24">
      <motion.h1
        className="type-h1 text-ink mb-6 md:mb-8 max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {project.projectName || project.title}
      </motion.h1>

      <motion.dl
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 py-4 md:py-6 border-t border-b border-line mb-6 md:mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="type-overline uppercase text-ink-subtle mb-1.5">{m.label}</dt>
            <dd className="type-body-s text-ink">{m.value}</dd>
          </div>
        ))}
      </motion.dl>

      <motion.div
        className="rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Short, full-width crop so the cover doesn't dominate the screen */}
        <motion.div className="aspect-[2/1] sm:aspect-[3/1] overflow-hidden" style={{ y: imageY }}>
          <img
            src={project.images?.cover}
            alt={project.title}
            width={1200}
            height={675}
            loading="eager"
            className="w-full h-full object-cover"
            style={{ objectPosition: project.coverPosition ?? "center 20%" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── 01 · Resumen del Proyecto (+ Desafíos) ─────────────────────────────────

// XCONS challenges with problem / challenge / solution
const XCONS_CHALLENGES = [
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

function ProjectBriefSection({
  project, n, fadeIn, staggerContainer, isXCONS, accent,
}: SectionProps & { project: ProjectInfo; isXCONS: boolean; accent: string }) {
  const briefHighlights = isXCONS ? [
    "ecosistema e-commerce",
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
    <Reveal stagger={staggerContainer}>
      <SectionHeader number={n} title="Resumen del Proyecto" fadeIn={fadeIn} accentColor={accent} />

      {isXCONS ? (
        <motion.div variants={fadeIn} className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
          <p className="type-body-l text-ink-muted max-w-xl">
            {renderHighlightedText(project.conceptSummary, briefHighlights)}
          </p>
          <div className="w-full max-w-[280px] mx-auto md:mx-0 md:w-[260px] md:ml-auto flex-shrink-0">
            <img
              src={xconsImages.flujoCompra}
              alt="Flujo de compra - XCONS"
              width={260}
              height={159}
              loading="lazy"
              className="w-full rounded-lg"
            />
          </div>
        </motion.div>
      ) : (
        <motion.p variants={fadeIn} className="type-body-l text-ink-muted">
          {renderHighlightedText(project.conceptSummary, briefHighlights)}
        </motion.p>
      )}

      {/* Desafíos — subtitle inside the summary */}
      <motion.div variants={fadeIn} className="mt-14 md:mt-20">
        <h3 className="type-subtitle text-ink mb-6 md:mb-8">Desafíos</h3>

        {isXCONS ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {XCONS_CHALLENGES.map((challenge, index) => (
              <motion.div
                key={challenge.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-card border border-line rounded-xl p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full bg-[rgb(201,188,63)]" aria-hidden="true" />
                  <span className="type-h3 tabular-nums text-[rgb(201,188,63)]">{challenge.number}</span>
                </div>

                <h4 className="type-h3 text-ink mb-5">{challenge.title}</h4>

                <div className="space-y-4">
                  <div>
                    <span className="type-overline uppercase text-ink-subtle">El Problema</span>
                    <p className="type-body-s text-ink-muted mt-1.5">{challenge.problem}</p>
                  </div>
                  <div>
                    <span className="type-overline uppercase text-[rgb(201,188,63)]">El Reto</span>
                    <p className="type-body-s text-ink font-medium mt-1.5">{challenge.challenge}</p>
                  </div>
                  <div>
                    <span className="type-overline uppercase text-[rgb(111,141,181)]">La Solución</span>
                    <p className="type-body-s text-ink mt-1.5">{challenge.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          project.id === "1" ? (
            <ChallengeSketches challenges={project.challenges ?? []} />
          ) : project.id === "3" ? (
            <ChallengeSketches
              challenges={project.challenges ?? []}
              sketches={JODIFY_CHALLENGE_SKETCHES}
              circleColor={JODIFY}
              fill={JODIFY_SKETCH_FILL}
            />
          ) : (
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {project.challenges?.map((challenge, i) => (
                <motion.li
                  key={challenge.number}
                  className="flex flex-col gap-6 p-6 rounded-3xl bg-card border border-line"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-[44px] font-bold leading-none tracking-[-0.02em]" style={{ color: accent }}>
                    {challenge.number}
                  </span>
                  <p className="type-body-l font-medium text-ink">{challenge.question}</p>
                </motion.li>
              ))}
            </ol>
          )
        )}
      </motion.div>
    </Reveal>
  );
}

// ─── HR · Análisis Comparativo ──────────────────────────────────────────────

function KeyFindingsSection({ project, n, fadeIn }: SectionProps & { project: ProjectInfo }) {
  return (
    <Reveal>
      <SectionHeader number={n} title="Análisis Comparativo" fadeIn={fadeIn} />

      {project.images?.benchmark && (
        <motion.div variants={fadeIn} className="mb-12">
          <BenchmarkTable />
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 pt-8 border-t border-line">
        <motion.div variants={fadeIn}>
          <h3 className="type-h4 text-ink mb-3">Necesidad del Usuario</h3>
          <p className="type-body text-ink-muted">
            {renderHighlightedText(project.keyFindings?.userNeed, [
              "personalización de flujos",
              "claridad visual",
              "cantidad de funciones"
            ])}
          </p>
        </motion.div>
        <motion.div variants={fadeIn}>
          <h3 className="type-h4 text-ink mb-3">Tendencia</h3>
          <p className="type-body text-ink-muted">
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
    </Reveal>
  );
}

// ─── XCONS · Hallazgos Clave y Soluciones ───────────────────────────────────

function XCONSKeyFindingsSection({ n, fadeIn }: SectionProps) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const designSolutions = [
    {
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
      image: xconsImages.detail3,
      imageNote: "Tablero Kanban de presupuestos"
    },
    {
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
      image: xconsImages.detail322,
      imageNote: "Detalle del Pedido #2000005566"
    },
    {
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
      image: xconsImages.contacto,
      imageNote: "Historial del Contacto y embudo de ventas"
    }
  ];

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
    <Reveal>
      <SectionHeader number={n} title="Hallazgos Clave y Soluciones" fadeIn={fadeIn} />

      <div className="space-y-12 md:space-y-20" role="list" aria-label="Soluciones de diseño">
        {designSolutions.map((solution, solutionIndex) => (
          <motion.article key={solution.title} role="listitem" {...getAnimationProps(solutionIndex)}>
            <header className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-[rgb(201,188,63)]/30" aria-hidden="true" />
            </header>

            <div className="flex flex-col md:flex-row gap-6 sm:gap-10 items-start">
              <div className="flex-1 min-w-0">
                <h3 className="type-h2 text-ink mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
                  {solution.title}
                </h3>
                <p className="type-body text-ink-muted mb-6">{solution.subtitle}</p>

                <div className="space-y-5">
                  {solution.features.map((feature) => (
                    <div key={feature.name} className="border-l-2 border-[rgb(201,188,63)]/40 pl-4">
                      <h4 className="type-overline uppercase text-[rgb(201,188,63)] mb-1.5">{feature.name}</h4>
                      <p className="type-body-s text-ink-muted">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <figure className="w-full md:w-[460px] flex-shrink-0">
                <div className="rounded-xl overflow-hidden shadow-lg border border-line">
                  <img
                    src={solution.image}
                    alt=""
                    width={500}
                    height={350}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-3 type-caption text-ink-subtle text-center">
                  {solution.imageNote}
                </figcaption>
              </figure>
            </div>
          </motion.article>
        ))}
      </div>
    </Reveal>
  );
}

// ─── XCONS · Lógica y Sistemas ──────────────────────────────────────────────

function XCONSLogicSection({ n, fadeIn }: SectionProps) {
  return (
    <Reveal>
      <SectionHeader number={n} title="Lógica y Sistemas" fadeIn={fadeIn} />

      <motion.div variants={fadeIn} className="flex flex-col gap-10">
        <div>
          <h3 className="type-subtitle text-ink mb-4">Arquitectura de Precios Dinámicos</h3>
          <p className="type-body-l text-ink-muted max-w-3xl">
            Como diseñador, tuve que estructurar cómo se le presenta el precio al usuario.
            <span className="hidden sm:inline"><br /></span> No es un número estático; es una variable que cambia según múltiples factores:
          </p>
        </div>

        <PricingFlowSketches />
      </motion.div>
    </Reveal>
  );
}

// ─── HR · Personas de Usuario ───────────────────────────────────────────────

function UserPersonasSection({ project, n, fadeIn }: SectionProps & { project: ProjectInfo }) {
  return (
    <Reveal>
      <SectionHeader number={n} title="Usuarios" fadeIn={fadeIn} />
      {project.images?.personas && (
        <motion.div variants={fadeIn}>
          <UserPersonas />
        </motion.div>
      )}
    </Reveal>
  );
}

// ─── HR · Solución y Diseño (horizontal) ────────────────────────────────────

function SolutionSection({ project, n, label }: { project: ProjectInfo; n: string; label: string }) {
  const panels = [
    {
      key: "approach",
      content: (
        <div className="space-y-12 md:pt-6">
          <div>
            <h3 className="type-subtitle text-ink mb-4">Enfoque de Diseño</h3>
            <p className="type-body-l text-ink-muted">
              {renderHighlightedText(project.solution?.approach, [
                "claridad",
                "jerarquías visuales claras",
                "espacios en blanco",
                "lenguaje sencillo"
              ])}
            </p>
          </div>
          <div>
            <h3 className="type-subtitle text-ink mb-5">Funcionalidades MVP</h3>
            <MvpFeatureCards features={project.solution?.mvpFeatures ?? []} />
          </div>
        </div>
      ),
    },
    {
      key: "wireframes",
      content: (
        <div className="space-y-14">
          {project.images?.wireframes && (
            <div>
              <h3 className="type-subtitle text-ink mb-6">Wireframes en baja fidelidad</h3>
              <div className="max-w-3xl mx-auto md:px-6">
                <HandDrawnWireframes />
              </div>
            </div>
          )}
          {project.images?.uiKit && (
            <div>
              <h3 className="type-subtitle text-ink mb-3">Sistema de Diseño</h3>
              {project.solution?.designSystem && (
                <p className="type-body text-ink-muted mb-6">{project.solution.designSystem}</p>
              )}
              <motion.img
                src={project.images.uiKit}
                alt="Sistema de diseño de HacheR: tipografía, colores, botones, íconos y componentes"
                width={1819}
                height={1321}
                loading="lazy"
                className="w-full h-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          )}
        </div>
      ),
    },
    {
      key: "screens",
      content: (
        <div className="space-y-12 md:space-y-16">
          {project.images?.screens?.map((screen) => (
            <motion.figure
              key={screen.url}
              className="w-fit max-w-full mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <figcaption className="type-h4 text-ink mb-4">{screen.title}</figcaption>
              {/* Capped to the panel height so each screen is seen whole */}
              <img
                src={screen.url}
                alt={screen.title}
                loading="lazy"
                className="block w-auto max-w-full h-auto max-h-[58vh] [filter:drop-shadow(0_10px_24px_rgba(0,0,0,0.10))]"
              />
            </motion.figure>
          ))}
        </div>
      ),
    },
  ];

  return (
    <HorizontalPanels
      mobileLabel={label}
      header={<SectionHeaderCompact number={n} title="Solución y Diseño" />}
      panels={panels}
    />
  );
}

/** Header variant for the pinned horizontal section (less vertical space). */
function SectionHeaderCompact({ title }: { number: string; title: string }) {
  return (
    <div>
      <h2 className="type-h1 text-ink">{title}</h2>
    </div>
  );
}

// ─── Resultados y Próximos Pasos ────────────────────────────────────────────

function NumberedList({ items }: { items: string[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((item, index) => (
        <li key={index} className="py-4 border-b border-line">
          <span className="type-body text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Arrow that draws itself from question to decision when scrolled into view. */
function DecisionArrow({ delay = 0 }: { delay?: number }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };
  return (
    <motion.svg
      viewBox="0 0 64 24"
      fill="none"
      className="w-10 md:w-16 h-auto text-[rgb(201,188,63)] rotate-90 md:rotate-0 flex-shrink-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      aria-hidden="true"
    >
      <motion.path
        d="M2 12h58"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={draw}
        transition={{ duration: 0.5, delay: delay + 0.15, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.path
        d="M50 4l10 8-10 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={draw}
        transition={{ duration: 0.25, delay: delay + 0.6, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

function ResultsSection({
  project, n, fadeIn, staggerContainer, isXCONS, isHR,
}: SectionProps & { project: ProjectInfo; isXCONS: boolean; isHR: boolean }) {
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

  const decisions = isHR ? project.results?.challengeDecisions : undefined;
  const tasks = isHR ? project.results?.testTasks : undefined;

  return (
    <Reveal stagger={staggerContainer}>
      <SectionHeader number={n} title={isXCONS ? "Resumen" : "Resultados y Próximos Pasos"} fadeIn={fadeIn} />

      {/* Del desafío a la decisión */}
      {decisions && decisions.length > 0 && (
        <motion.div variants={fadeIn} className="mb-16 md:mb-20">
          <h3 className="type-subtitle text-ink mb-2">Del desafío a la decisión</h3>
          <p className="type-body text-ink-muted mb-8 max-w-2xl">
            Cada pregunta del inicio tuvo una respuesta concreta en el diseño.
          </p>
          <ol className="border-t border-line">
            {decisions.map((d, i) => (
              <motion.li
                key={d.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_auto_minmax(0,7fr)] gap-3 md:gap-8 py-6 border-b border-line md:items-start"
              >
                <p className="type-h3 text-ink">{d.question}</p>
                <div className="md:pt-1">
                  <DecisionArrow delay={i * 0.08} />
                </div>
                <p className="type-body text-ink-muted">{d.decision}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <motion.div variants={fadeIn}>
          <h3 className="type-h4 text-ink mb-4">Plan de Validación</h3>
          <NumberedList items={project.results?.validationPlan ?? []} />
        </motion.div>
        <motion.div variants={fadeIn}>
          <h3 className="type-h4 text-ink mb-4">Métricas a Evaluar</h3>
          <NumberedList items={project.results?.metrics ?? []} />
        </motion.div>
      </div>

      {/* Tareas a testear y criterios de éxito */}
      {tasks && tasks.length > 0 && (
        <motion.div variants={fadeIn} className="mt-16 md:mt-20">
          <h3 className="type-subtitle text-ink mb-2">Tareas a testear y criterios de éxito</h3>
          <p className="type-body text-ink-muted mb-8 max-w-2xl">
            Lo que se le pedirá a cada participante, cómo se mide y cuándo la consideramos superada.
          </p>

          <div className="hidden md:grid grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,3fr)] gap-6 pb-3 border-b border-line">
            <span className="type-overline uppercase text-ink-muted">Tarea</span>
            <span className="type-overline uppercase text-ink-muted">Métrica</span>
            <span className="type-overline uppercase text-ink-muted">Criterio de éxito</span>
          </div>
          <ul>
            {tasks.map((t, i) => (
              <motion.li
                key={t.task}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,4fr)_minmax(0,3fr)_minmax(0,3fr)] gap-2 md:gap-6 py-5 border-b border-line"
              >
                <span className="type-h4 text-ink">{t.task}</span>
                <p className="type-body text-ink-muted">
                  <span className="md:hidden text-ink-subtle">Métrica: </span>{t.metric}
                </p>
                <p className="type-body text-ink">
                  <span className="md:hidden text-ink-subtle">Criterio: </span>{t.criterion}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {project.results?.nextSteps && (
        <motion.div variants={fadeIn} className={`mt-16 pt-10 ${tasks?.length ? "" : "border-t border-line"}`}>
          <p className="type-body-l text-ink-muted text-center max-w-3xl mx-auto">
            "{renderHighlightedText(project.results.nextSteps, isXCONS ? xconsHighlights : hrHighlights)}"
          </p>
        </motion.div>
      )}
    </Reveal>
  );
}

// ============================================
// JODIFY SPECIFIC SECTIONS
// ============================================

function JodifyBenchmarkSection({ n, fadeIn }: SectionProps) {
  return (
    <Reveal>
      <SectionHeader number={n} title="Análisis Comparativo" fadeIn={fadeIn} accentColor={JODIFY} />
      <motion.div variants={fadeIn}>
        <JodifyBenchmarkTable />
      </motion.div>
    </Reveal>
  );
}

const PinIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={JODIFY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const DeviceIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={JODIFY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

function JodifyPersonaSection({ n, fadeIn }: SectionProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const traits = [
    { title: "Intereses", accent: true, text: "Creativa, con un enfoque moderno y contemporáneo. Le gusta la estética minimalista y busca plataformas que resalten la innovación." },
    { title: "Necesidades", accent: true, text: "Amplia oferta de eventos, desde festivales masivos hasta fiestas underground. Recomendaciones personalizadas basadas en preferencias." },
    { title: "Frustraciones", accent: false, text: "No encontrar eventos de su interés. Preocupación por costos ocultos o falta de claridad en el proceso de compra." },
  ];

  const empathyMap = [
    {
      title: "¿Qué piensa y siente?",
      icon: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
      items: [
        "Le encanta descubrir nuevos eventos y artistas en la escena de la música electrónica.",
        "Desea vivir experiencias únicas y vibrantes en cada evento.",
      ],
    },
    {
      title: "¿Qué la frustra?",
      icon: <><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>,
      items: [
        "No encontrar los eventos de música electrónica que se ajusten a sus preferencias.",
        "Preocupación por costos ocultos y falta de transparencia en el proceso de compra.",
      ],
    },
    {
      title: "¿Qué la motiva?",
      icon: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
      items: [
        "Descubrir eventos emocionantes y participar en experiencias únicas.",
        "Recibir recomendaciones personalizadas que reflejen sus gustos musicales.",
        "Conectar con una comunidad que comparte su pasión por la música electrónica.",
      ],
    },
    {
      title: "¿Qué dice y hace?",
      icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
      items: [
        "Comparte activamente eventos en sus redes sociales.",
        "Compra entradas, buscando plataformas que ofrezcan una gran cantidad de eventos.",
      ],
    },
  ];

  const bio = "Enérgica amante de la música electrónica, Martina disfruta de eventos como festivales de techno y fiestas underground. Busca experiencias vibrantes y vanguardistas en la escena de música electrónica local e internacional.";

  const traitClass = (accent: boolean) =>
    accent ? "bg-[#7C16F5]/5 border-[#7C16F5]/15" : "bg-ink/5 border-line";

  return (
    <div ref={sectionRef}>
      <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeIn}>
        <SectionHeader number={n} title="Usuarios" accentColor={JODIFY} />

        {/* User Persona Card - Mobile */}
        <motion.div
          className="md:hidden bg-card rounded-2xl border border-line overflow-hidden mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="bg-gradient-to-b from-[#7C16F5]/15 to-[#7C16F5]/5 p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                src={jodifyImages.persona}
                alt="Martina Rodríguez"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                loading="lazy"
              />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#7C16F5] text-white type-caption rounded-full whitespace-nowrap">
                28 años
              </div>
            </div>
            <h3 className="type-h3 text-ink">Martina Rodríguez</h3>
            <p className="type-body-s text-[#7C16F5]">Diseñadora Gráfica</p>
          </div>

          <div className="px-5 py-4 border-b border-line flex flex-wrap justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink/5 rounded-full">
              {PinIcon}
              <span className="type-caption text-ink">La Plata, Argentina</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink/5 rounded-full">
              {DeviceIcon}
              <span className="type-caption text-ink">iPhone, Macbook</span>
            </div>
          </div>

          <div className="px-5 py-4">
            <p className="type-body-s text-ink-muted text-center">{bio}</p>
          </div>

          <div className="px-5 pb-5 space-y-3">
            {traits.map((t) => (
              <div key={t.title} className={`p-4 rounded-xl border ${traitClass(t.accent)}`}>
                <h4 className={`type-overline uppercase mb-2 flex items-center gap-2 ${t.accent ? "text-[#7C16F5]" : "text-ink"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${t.accent ? "bg-[#7C16F5]" : "bg-ink"}`} />
                  {t.title}
                </h4>
                <p className="type-body-s text-ink-muted">{t.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Persona Card - Desktop */}
        <motion.div
          className="hidden md:block bg-card rounded-2xl border border-line overflow-hidden mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-3 gap-0">
            <div className="md:col-span-1 bg-[#7C16F5]/10 p-8 flex items-center justify-center">
              <div className="relative">
                <img
                  src={jodifyImages.persona}
                  alt="Martina Rodríguez"
                  className="w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-white shadow-lg"
                  loading="lazy"
                />
                <div className="absolute -bottom-2 -right-2 px-3 py-1.5 bg-[#7C16F5] text-white type-caption rounded-full">
                  28 años
                </div>
              </div>
            </div>

            <div className="md:col-span-2 p-8">
              <h3 className="type-h2 text-ink mb-1">Martina Rodríguez</h3>
              <p className="type-body-s text-[#7C16F5] mb-5">Diseñadora Gráfica</p>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">{PinIcon}</div>
                  <span className="type-body-s text-ink">La Plata, Argentina</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">{DeviceIcon}</div>
                  <span className="type-body-s text-ink">iPhone, Macbook</span>
                </div>
              </div>

              <p className="type-body text-ink-muted mb-6">{bio}</p>

              <div className="grid sm:grid-cols-3 gap-4">
                {traits.map((t) => (
                  <div key={t.title} className={`p-4 rounded-xl border ${traitClass(t.accent)}`}>
                    <h4 className={`type-overline uppercase mb-2 ${t.accent ? "text-[#7C16F5]" : "text-ink"}`}>{t.title}</h4>
                    <p className="type-body-s text-ink-muted">{t.text}</p>
                  </div>
                ))}
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
          <h3 className="type-h2 text-ink mb-6">Mapa de Empatía</h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {empathyMap.map((block) => (
              <div key={block.title} className="bg-card p-5 sm:p-6 rounded-2xl border border-line">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#7C16F5]/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={JODIFY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {block.icon}
                    </svg>
                  </div>
                  <h4 className="type-h4 text-ink">{block.title}</h4>
                </div>
                <ul className="space-y-2">
                  {block.items.map((item, i) => (
                    <li key={i} className="type-body-s text-ink-muted flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7C16F5] mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* POV Statement */}
        <motion.div
          className="mt-12 p-6 sm:p-8 bg-[#7C16F5]/10 rounded-2xl border border-[#7C16F5]/20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="type-overline uppercase text-[#7C16F5] mb-3">Point of View</h4>
          <p className="type-body text-ink">
            <strong>Martina Rodríguez</strong> necesita una plataforma que no solo simplifique la compra de entradas para eventos de música electrónica, sino que también le ofrezca <strong>recomendaciones personalizadas</strong> basadas en sus gustos. Además, busca conectar con una <strong>comunidad</strong> que comparta su pasión musical. Una interfaz intuitiva, descubrimiento de eventos personalizado y la posibilidad de participar activamente en una comunidad son esenciales para una experiencia completa y satisfactoria.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Blocks of the Jodify UI-kit export (src/assets/jodify/UI-kit.svg), grouped into rows
const JODIFY_KIT_ROWS: KitBlock[][] = [
  [
    { label: "Tipografía", rect: [59, 107, 1613, 925] },
    { label: "Dropdown", rect: [1229, 1071, 444, 643] },
  ],
  [
    { label: "Colores", rect: [59, 1073, 800, 325] },
    { label: "Logo", rect: [927, 1073, 234, 328] },
  ],
  [
    { label: "Íconos", rect: [59, 1526, 540, 188] },
    { label: "Botones", rect: [669, 1477, 377, 291] },
  ],
  [{ label: "Cards", rect: [54, 1790, 1619, 956] }],
];

// Mobile: typography full width, colours + logo side by side, a two-column
// board for the small components, cards at the bottom
const [[KIT_TYPE, KIT_DROPDOWN], [KIT_COLORS, KIT_LOGO], [KIT_ICONS, KIT_BUTTONS], [KIT_CARDS]] = JODIFY_KIT_ROWS;
const JODIFY_KIT_MOBILE: MobileSection[] = [
  { row: [KIT_TYPE] },
  { row: [KIT_COLORS, KIT_LOGO] },
  { columns: [[KIT_DROPDOWN], [KIT_ICONS, KIT_BUTTONS]] },
  { row: [KIT_CARDS] },
];

function JodifyUIKitSection({ n, fadeIn }: SectionProps) {
  return (
    <Reveal>
      <SectionHeader number={n} title="Sistema de Diseño" fadeIn={fadeIn} accentColor={JODIFY} />
      <motion.div variants={fadeIn}>
        <UIKitMosaic src={jodifyImages.uiKit} size={[1727, 2852]} rows={JODIFY_KIT_ROWS} mobile={JODIFY_KIT_MOBILE} />
      </motion.div>
    </Reveal>
  );
}

// ============================================
// PUERTA A PUERTA SPECIFIC SECTIONS
// ============================================

/** Card used across the Puerta a Puerta sections. */
const ppCard = "bg-card border border-line rounded-xl";

function PuertaPuertaBriefSection({ n, fadeIn, staggerContainer }: SectionProps) {
  const mvpSteps = [
    { number: "01", title: "Selección del servicio", description: "Interfaz sencilla para elegir entre envío de paquetes, envío de muebles y mudanza completa." },
    { number: "02", title: "Elección del vehículo", description: "Opciones claras y visuales para seleccionar el tamaño del vehículo adecuado según la cantidad o tipo de carga." },
    { number: "03", title: "Programación del servicio", description: "Funcionalidad para seleccionar la fecha y hora del servicio." },
    { number: "04", title: "Reserva y pago", description: "Sistema seguro y fácil de usar con integración de opciones de pago (tarjeta de crédito, débito)." },
    { number: "05", title: "Contacto con el prestador", description: "Chat directo con el prestador para coordinar detalles adicionales o resolver dudas." },
  ];

  return (
    <Reveal stagger={staggerContainer}>
      <SectionHeader number={n} title="Resumen del Proyecto" fadeIn={fadeIn} />

      <motion.div variants={fadeIn} className="mb-10">
        <Eyebrow className="mb-3">Problema</Eyebrow>
        <p className="type-body-l text-ink-muted">
          Las personas tienen dificultades para encontrar servicios de fletes y mudanzas confiables, ya que no existe una plataforma centralizada que ofrezca todas las opciones de manera clara y transparente. Esto genera{" "}
          <span className="text-ink font-medium">incertidumbre sobre los costos, la calidad del servicio y la seguridad de sus pertenencias</span>, obligándolos a depender de recomendaciones informales o búsquedas en Google.
        </p>
      </motion.div>

      <motion.div variants={fadeIn} className="mb-12">
        <Eyebrow className="mb-3">Objetivo</Eyebrow>
        <p className="type-body-l text-ink-muted">
          Crear una solución que{" "}
          <span className="text-ink font-medium">centralice los servicios de fletes y mudanzas</span>, ofreciendo a los usuarios una plataforma donde puedan comparar opciones, obtener cotizaciones inmediatas y programar mudanzas o envíos con confianza.
        </p>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Eyebrow className="mb-4">MVP — 5 pasos clave</Eyebrow>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {mvpSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`${ppCard} p-4 border-l-[3px] border-l-[rgb(201,188,63)]`}
            >
              <span className="type-h3 tabular-nums text-[rgb(201,188,63)] block mb-2">{step.number}</span>
              <h4 className="type-h4 text-ink mb-2">{step.title}</h4>
              <p className="type-body-s text-ink-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

function PuertaPuertaBenchmarkSection({ n, fadeIn }: SectionProps) {
  const competitors = [
    {
      name: "Fletalo",
      focus: "Especializado en fletes y mudanzas",
      searchSteps: 3,
      reserveSteps: 4,
      vocabulary: "Claro y específico",
      strength: "Especialización y rapidez en la reserva",
      weakness: "Menor reconocimiento de marca. Posible confusión con términos técnicos",
    },
    {
      name: "PedidosYa",
      focus: "Delivery + envíos",
      searchSteps: 4,
      reserveSteps: 4,
      vocabulary: "Accesible y sencillo",
      strength: "Variedad de servicios e interfaz atractiva",
      weakness: "Puede ser confuso por la variedad de servicios. Riesgo de saturación",
    },
    {
      name: "MercadoLibre",
      focus: "E-commerce + envíos",
      searchSteps: 4,
      reserveSteps: 4,
      vocabulary: "Claro pero orientado al e-commerce",
      strength: "Amplia base de usuarios y confianza de marca",
      weakness: "Interfaz compleja. Enfoque principal en e-commerce, no en mudanzas",
    },
  ];

  return (
    <Reveal>
      <SectionHeader number={n} title="Benchmarking" fadeIn={fadeIn} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10">
        {competitors.map((comp, index) => (
          <motion.div
            key={comp.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className={`${ppCard} p-5`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 rounded-full bg-[rgb(201,188,63)]" aria-hidden="true" />
              <h3 className="type-h3 text-ink">{comp.name}</h3>
            </div>
            <p className="type-caption text-ink-subtle mb-4">{comp.focus}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-line">
                <span className="type-body-s text-ink-muted">Pasos para buscar</span>
                <span className="type-h4 text-[rgb(201,188,63)]">{comp.searchSteps}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-line">
                <span className="type-body-s text-ink-muted">Pasos para reservar</span>
                <span className="type-h4 text-[rgb(201,188,63)]">{comp.reserveSteps}</span>
              </div>
              <div className="py-2 border-b border-line">
                <span className="type-overline uppercase text-ink-subtle block mb-1">Vocabulario</span>
                <p className="type-body-s text-ink">{comp.vocabulary}</p>
              </div>
              <div>
                <span className="type-overline uppercase text-[rgb(201,188,63)] block mb-1">Fortaleza</span>
                <p className="type-body-s text-ink-muted">{comp.strength}</p>
              </div>
              <div>
                <span className="type-overline uppercase text-ink-subtle block mb-1">Debilidad</span>
                <p className="type-body-s text-ink-muted">{comp.weakness}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeIn} className="bg-card border border-[rgb(201,188,63)]/30 rounded-xl p-5 sm:p-6">
        <DiamondLabel className="mb-3">Conclusión</DiamondLabel>
        <p className="type-body text-ink-muted">
          Para diseñar un producto que centralice servicios de mudanza y envíos, es fundamental{" "}
          <span className="text-ink font-medium">priorizar la simplicidad y especialización</span> en la interfaz: diseñar de manera intuitiva que minimice los pasos para buscar y reservar servicios, con información clara sobre precios, disponibilidad y características.
        </p>
      </motion.div>
    </Reveal>
  );
}

function PuertaPuertaProcesoSection({ n, fadeIn, staggerContainer }: SectionProps) {
  const processSteps = [
    { name: "Empatizar", description: "Investigación del problema. Entrevistas para entender las frustraciones al contratar mudanzas." },
    { name: "Definir", description: "POV de Martín + identificación del problema central: falta de plataforma centralizada y transparente." },
    { name: "Idear", description: "Storyboard, Task Flow y User Flow. Definición del MVP con 5 funcionalidades clave." },
    { name: "Prototipar", description: "Wireframes en baja fidelidad y Wire Flow para validar la arquitectura de la información." },
    { name: "Testear", description: "Testing en Marvel con 5 usuarios y pruebas A/B en Maze para optimizar el flujo de reserva." },
  ];

  return (
    <Reveal stagger={staggerContainer}>
      <SectionHeader number={n} title="Proceso UX" fadeIn={fadeIn} />

      <motion.div variants={fadeIn} className="mb-12">
        <Eyebrow className="mb-4">Punto de Vista (POV)</Eyebrow>
        <div className={`${ppCard} p-5 sm:p-6`}>
          <p className="type-overline uppercase text-ink-subtle mb-3">Martín</p>
          <p className="type-body-l text-ink-muted">
            <span className="font-medium text-ink">necesita</span> mudarse o enviar objetos grandes y necesita una manera confiable y sencilla de encontrar, comparar y contratar servicios de fletes o mudanzas{" "}
            <span className="font-medium text-ink">porque</span> actualmente no tiene acceso a una plataforma que le ofrezca transparencia en precios, disponibilidad y garantías de seguridad para sus pertenencias.
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Eyebrow className="mb-4">Metodología de Diseño</Eyebrow>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`${ppCard} flex flex-row sm:flex-col items-start gap-3 sm:gap-0 p-4 sm:p-5`}
            >
              <div>
                <h4 className="type-h4 text-ink mb-1 sm:mb-2">{step.name}</h4>
                <p className="type-body-s text-ink-muted">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

function PuertaPuertaTestingSection({ n, fadeIn, staggerContainer }: SectionProps) {
  const marvelTasks = [
    "Seleccionar el tipo de servicio",
    "Seleccionar el tipo de transporte",
    "Seleccionar fecha, hora, lugar de retiro y destino",
    "Reservar el servicio",
  ];

  const marvelUsers = [
    { name: "Martin Jaimot", age: 37, type: "Presencial" },
    { name: "German Derbes", age: 29, type: "Remoto" },
    { name: "Eva Alzueta", age: 43, type: "Remoto" },
    { name: "Mariana Erdocia", age: 33, type: "Remoto" },
    { name: "Paz Segade", age: 37, type: "Remoto" },
  ];

  const abTests = [
    {
      name: "Prueba A",
      participants: 9,
      flow: "Flujo: Día y horario → Origen y destino",
      stats: [
        { label: "Tiempo promedio", value: "1:34 min", tone: "text-ink" },
        { label: "Tasa de abandono", value: "15%", tone: "text-[#C47C5A]" },
      ],
      note: "Los usuarios no tenían clara la ubicación antes de definir el horario. Mayor confusión y mayor tasa de abandono.",
      winner: false,
    },
    {
      name: "Prueba B",
      participants: 7,
      flow: "Flujo: Origen y destino → Día y horario",
      stats: [
        { label: "Tiempo promedio", value: "1:05 min", tone: "text-ink" },
        { label: "Tasa de completado", value: "98%", tone: "text-[rgb(201,188,63)]" },
      ],
      note: "La secuencia fue más fluida: elegir la ubicación primero proporcionó contexto y facilitó la selección del horario.",
      winner: true,
    },
  ];

  return (
    <Reveal stagger={staggerContainer}>
      <SectionHeader number={n} title="Testing y Decisiones" fadeIn={fadeIn} />

      <motion.div variants={fadeIn} className="mb-14">
        <Eyebrow className="mb-5">Testeo en Marvel — Wireframes en Baja</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`${ppCard} p-5`}>
            <h4 className="type-h4 text-ink mb-4">Tareas evaluadas — 100% conversión</h4>
            <div className="space-y-3">
              {marvelTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="type-body-s text-ink-muted">{task}</span>
                  </div>
                  <span className="type-h4 text-[rgb(201,188,63)] flex-shrink-0">100%</span>
                </div>
              ))}
            </div>
            <p className="mt-5 type-body-s text-ink-subtle border-t border-line pt-4">
              Todos los usuarios lograron completar las tareas propuestas. Se recomienda implementar un onboarding para usuarios sin experiencia previa en mudanzas.
            </p>
          </div>

          <div className={`${ppCard} p-5`}>
            <h4 className="type-h4 text-ink mb-4">Participantes</h4>
            <div className="space-y-2">
              {marvelUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                  <span className="type-body-s text-ink-muted">{user.name}, {user.age} años</span>
                  <span className="type-caption text-ink-subtle bg-ink/5 px-2 py-0.5 rounded-full">{user.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeIn} className="mb-14">
        <Eyebrow className="mb-3">Wireframes en media fidelidad — versión A y B</Eyebrow>
        <img
          src={puertaPuertaImages.wireframes}
          alt="Wireframes en media fidelidad — versión A y B para prueba A/B"
          loading="lazy"
          className="w-full h-auto"
        />
      </motion.div>

      <motion.div variants={fadeIn}>
        <Eyebrow className="mb-5">Pruebas A/B en Maze — Pantalla de direcciones y fecha</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {abTests.map((test) => (
            <div key={test.name} className={`bg-card border rounded-xl p-5 ${test.winner ? "border-[rgb(201,188,63)]/40" : "border-line"}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-1 h-6 rounded-full ${test.winner ? "bg-[rgb(201,188,63)]" : "bg-[#C8C4BC]"}`} aria-hidden="true" />
                <h4 className="type-h3 text-ink">{test.name}</h4>
                <span className="type-caption text-ink-subtle ml-auto">{test.participants} participantes</span>
              </div>
              <p className="type-body-s text-ink-muted mb-4">{test.flow}</p>
              <div className="space-y-3">
                {test.stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="type-body-s text-ink-subtle">{s.label}</span>
                    <span className={`type-h4 ${s.tone}`}>{s.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 type-body-s text-ink-muted">{test.note}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-[rgb(201,188,63)]/30 rounded-xl p-5">
          <DiamondLabel className="mb-3">Decisión de diseño</DiamondLabel>
          <p className="type-body text-ink-muted">
            El flujo de la Prueba B es más eficiente. La combinación de menor tiempo promedio, mayor tasa de éxito y menos confusión confirma que es preferible{" "}
            <span className="text-ink font-medium">guiar al usuario a seleccionar origen y destino antes de establecer el día y hora</span>, alineando los pasos con la forma en que los usuarios conceptualizan la organización de una mudanza.
          </p>
        </div>
      </motion.div>
    </Reveal>
  );
}

const PP_SCREENS = [
  { step: "01", label: "Autenticación", title: "Login",               note: "Onboarding mínimo: solo email y contraseña. Sin fricción en la primera entrada al servicio.", img: puertaPuertaImages.screenLogin },
  { step: "02", label: "Home",          title: "Seleccionar servicio", note: "Los 3 servicios jerarquizados con cards visuales. El tipo de carga define todo el flujo siguiente.", img: puertaPuertaImages.screenInicio },
  { step: "03", label: "Vehículo",      title: "Tipo de transporte",  note: "Cards comparativas con capacidad visible. El usuario elige según el tamaño de su carga, no por nombre técnico.", img: puertaPuertaImages.screenTipoTransporte },
  { step: "04", label: "Detalle",       title: "Detalle del vehículo",note: "Capacidad exacta, dimensiones y precio estimado antes de avanzar. Transparencia antes del compromiso.", img: puertaPuertaImages.screenCamioneta },
  { step: "05", label: "Direcciones",   title: "Origen y destino",    note: "Ambos puntos en una sola pantalla. Autocompletado para reducir errores de ingreso.", img: puertaPuertaImages.screenDirecciones },
  { step: "06", label: "Agenda",        title: "Fecha y franja horaria", note: "Franja horaria en vez de hora exacta: decisión de testing. Reduce la fricción y ajusta la expectativa.", img: puertaPuertaImages.screenFechaHora },
  { step: "07", label: "Revisión",      title: "Resumen de reserva",  note: "Punto de revisión crítico: vehículo, ruta, fecha y precio total visibles juntos antes del pago.", img: puertaPuertaImages.screenResumen },
  { step: "08", label: "Éxito",         title: "Reservado con éxito", note: "Estado de confirmación con acceso directo al chat con el prestador para coordinar detalles.", img: puertaPuertaImages.screenReservado },
];

function PPScreenCarousel() {
  const [current, setCurrent] = useState(0);
  const total = PP_SCREENS.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);
  const screen = PP_SCREENS[current];
  const arrowBtn = "w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-subtle hover:text-ink hover:border-[rgb(201,188,63)] transition-all duration-200";

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
      <div className="relative flex items-center gap-4 shrink-0">
        <button onClick={prev} className={arrowBtn} aria-label="Anterior">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        <div className="relative w-[clamp(140px,42vw,185px)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={screen.img}
              alt={screen.title}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-auto rounded-[18px]"
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        <button onClick={next} className={arrowBtn} aria-label="Siguiente">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="type-caption tabular-nums text-ink-subtle block mb-1">{screen.step} / {String(total).padStart(2, "0")}</span>
            <span className="type-overline uppercase text-[rgb(201,188,63)] block mb-2">{screen.label}</span>
            <h4 className="type-h2 text-ink mb-3">{screen.title}</h4>
            <p className="type-body text-ink-muted">{screen.note}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-1.5 mt-6">
          {PP_SCREENS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? "w-5 h-1.5 bg-[rgb(201,188,63)]" : "w-1.5 h-1.5 bg-line hover:bg-[rgb(201,188,63)]/50"
              }`}
              aria-label={`Pantalla ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PuertaPuertaDisenoSection({ n, fadeIn, staggerContainer }: SectionProps) {
  const iosPatterns = [
    { title: "NavBar", description: "Para contener las 4 funciones principales de la app." },
    { title: "Separación", description: "22px entre secciones relacionadas, 33px entre secciones no relacionadas." },
    { title: "Jerarquía tipográfica", description: "Dos tamaños de títulos para diferenciar secciones y subsecciones." },
    { title: "Cards", description: "El tamaño se define según la importancia de la función que contiene." },
    { title: "Iconos", description: "Tamaño estandarizado de 22px." },
  ];

  return (
    <Reveal stagger={staggerContainer}>
      <SectionHeader number={n} title="Diseño Final" fadeIn={fadeIn} />

      <motion.div variants={fadeIn} className="mb-14">
        <Eyebrow className="mb-4">Patrones iOS</Eyebrow>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {iosPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`${ppCard} p-4`}
            >
              <h4 className="type-h4 text-[rgb(201,188,63)] mb-2">{pattern.title}</h4>
              <p className="type-body-s text-ink-muted">{pattern.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Eyebrow className="mb-8">Pantallas finales</Eyebrow>
        <PPScreenCarousel />
      </motion.div>
    </Reveal>
  );
}

export default Project;
