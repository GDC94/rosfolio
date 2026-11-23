import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@studio-freight/react-lenis";
import { adminShots as shot } from "../../data/xconsAdmin";
import PricingFlowSketches from "./PricingFlowSketches";
import { SketchFillContext, SketchFrame, XCONS_GREEN } from "./sketchKit";
import { XCONS_CHALLENGE_SKETCHES } from "./XconsChallengeSketches";

/**
 * XCONS Admin case study — the B2B back office for selling building materials.
 * Story: how I design (Figma, lately Figma Make / Claude Design) and, in recent months, build the front, following the life of one sale.
 * All captures use fictional people and companies (see data/xconsAdmin.ts).
 */

const GOLD = "rgb(201,188,63)";
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared building blocks ─────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <FadeUp className="mb-5 md:mb-14">
      <h2 className="type-h1 text-ink">{children}</h2>
    </FadeUp>
  );
}

function Subtitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`type-subtitle text-ink mb-5 md:mb-8 ${className}`}>{children}</h3>;
}

function Label({ children, className = "", color }: { children: ReactNode; className?: string; color?: string }) {
  return (
    <span className={`block type-overline uppercase ${color ? "" : "text-ink-subtle"} ${className}`} style={color ? { color } : undefined}>
      {children}
    </span>
  );
}

function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="border-l-2 pl-4 md:pl-6 type-body-l text-ink italic" style={{ borderColor: GOLD }}>
      {children}
    </blockquote>
  );
}

// ─── Screenshots: framed, tap to open full size ─────────────────────────────

interface ShotProps {
  src: string;
  alt: string;
  caption?: string;
  /** Long full-page capture: shows the top and fades out; the lightbox shows it whole. */
  tall?: boolean;
  className?: string;
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const lenis = useLenis();

  // Freeze the page behind the modal: Lenis drives the scroll, so overflow alone doesn't stop it.
  useEffect(() => {
    lenis?.stop();
    const html = document.documentElement;
    const prev = { html: html.style.overflow, body: document.body.style.overflow };
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev.html;
      document.body.style.overflow = prev.body;
      lenis?.start();
    };
  }, [lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <motion.div
        className="relative w-full max-w-[1200px] max-h-[92vh] flex flex-col rounded-2xl overflow-hidden bg-white border border-black/10 shadow-2xl"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.3, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10 bg-white flex-shrink-0">
          <p className="type-body-s text-black flex-1 min-w-0 truncate">{alt}</p>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex-shrink-0 rounded-full border border-black/15 text-black text-xl leading-none hover:bg-black/5"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain" data-lenis-prevent>
          <img src={src} alt={alt} className="w-full h-auto block" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Shot({ src, alt, caption, tall = false, className = "" }: ShotProps) {
  const [open, setOpen] = useState(false);
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left rounded-xl overflow-hidden border border-line bg-card shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)]"
        aria-label={`Ampliar: ${alt}`}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 type-caption text-ink-subtle truncate">admin.XCONS · desarrollo</span>
        </div>
        <div className={`relative ${tall ? "max-h-[340px] md:max-h-[620px] overflow-hidden" : ""}`}>
          <img src={src} alt={alt} loading="lazy" className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]" />
          {tall && (
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
              <span className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-medium">Ver pantalla completa</span>
            </div>
          )}
        </div>
      </button>
      {caption && <figcaption className="type-caption text-ink-subtle mt-2.5">{caption}</figcaption>}
      {createPortal(
        <AnimatePresence>{open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}</AnimatePresence>,
        document.body,
      )}
    </figure>
  );
}

/**
 * Live counter: starts at the real figure and keeps adding one while it is on screen,
 * at its own pace, with an arrow that nudges up on every tick to show it keeps growing.
 */
function LiveCount({ value, every }: { value: string; every: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(() => Number(value.replace(/\./g, "")));
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setN((v) => v + 1), every);
    return () => window.clearInterval(id);
  }, [inView, reduce, every]);
  return (
    <span ref={ref} className="inline-flex items-start gap-1.5">
      <span>{n.toLocaleString("es-AR")}</span>
      <motion.svg
        key={n}
        viewBox="0 0 16 16"
        className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0"
        fill="none"
        aria-hidden="true"
        initial={reduce ? false : { y: 6, opacity: 0.2 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease }}
      >
        <path d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </span>
  );
}

/**
 * Several screenshots. Mobile: swipeable row where the next one peeks in, with dots
 * and a small arrow so it reads as "there's more" without any instructions.
 * Desktop: two-column grid.
 */
function ShotGroup({ shots, className = "" }: { shots: ShotProps[]; className?: string }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  if (shots.length === 1) return <Shot {...shots[0]} className={className} />;

  const itemAt = (i: number) => rowRef.current?.children[i] as HTMLElement | undefined;
  const onScroll = () => {
    const row = rowRef.current;
    if (!row) return;
    const center = row.scrollLeft + row.clientWidth / 2;
    let best = 0;
    for (let i = 0; i < shots.length; i++) {
      const el = itemAt(i);
      if (el && Math.abs(el.offsetLeft + el.offsetWidth / 2 - center) < Math.abs((itemAt(best)?.offsetLeft ?? 0) + (itemAt(best)?.offsetWidth ?? 0) / 2 - center)) best = i;
    }
    setActive(best);
  };
  const goTo = (i: number) => {
    const row = rowRef.current, el = itemAt(i);
    if (row && el) row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  };
  const last = active >= shots.length - 1;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={rowRef}
        onScroll={onScroll}
        className="-mx-4 px-4 flex gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:items-start"
        style={{ touchAction: "pan-x pan-y" }}
      >
        {shots.map((sh) => (
          <Shot key={sh.alt} {...sh} className="snap-center flex-shrink-0 w-[80%] md:w-auto" />
        ))}
      </div>

      {/* Mobile only: next arrow + dots */}
      <button
        type="button"
        onClick={() => goTo(last ? 0 : active + 1)}
        className="md:hidden absolute right-0 top-[38%] -translate-y-1/2 w-9 h-9 rounded-full bg-[#1A1A1A] text-white ring-1 ring-white/20 flex items-center justify-center shadow-lg"
        aria-label={last ? "Volver a la primera imagen" : "Ver la siguiente imagen"}
      >
        <svg viewBox="0 0 16 16" className={`w-4 h-4 transition-transform ${last ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="md:hidden flex justify-center gap-1.5 mt-4" aria-hidden="true">
        {shots.map((sh, i) => (
          <span
            key={sh.alt}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5" : "w-1.5 bg-ink/20"}`}
            style={i === active ? { background: GOLD } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function Decisions({ items }: { items: { title: string; why: string }[] }) {
  return (
    <ul className="space-y-5">
      {items.map((d) => (
        <li key={d.title} className="flex gap-3">
          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} aria-hidden="true" />
          <div>
            <p className="type-body text-ink font-medium">{d.title}</p>
            <p className="type-body-s text-ink-muted mt-1">{d.why}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ─── 01 · Resumen ───────────────────────────────────────────────────────────

// `every`: ms between ticks, so each counter grows at its own pace
const SCALE = [
  { n: "49.700", label: "productos en el catálogo", every: 1300 },
  { n: "57.000", label: "presupuestos", every: 900 },
  { n: "5.400", label: "pedidos", every: 2200 },
  { n: "3.000", label: "contactos en un solo store", every: 1700 },
];

const MY_ROLE = [
  { title: "Investigación y diseño", body: "entiendo cómo vende cada equipo, defino flujos y diseño la UI de cada módulo en Figma." },
  { title: "Documentación", body: "escribo las specs y los criterios generales que usa todo el equipo." },
  { title: "Front-end (últimos meses)", body: "exploro las nuevas funcionalidades con Figma Make o Claude Design y después las llevo a código en React." },
  { title: "QA y capacitación", body: "pruebo cada estado y hago los videotutoriales con los que aprenden los equipos." },
];

const CHALLENGES = [
  {
    n: "01",
    title: "\"El carrito está roto\"",
    problem: "En la construcción, el paradigma tradicional de e-commerce (\"Agregar al carrito > Pagar\") falla. Las ventas son largas y requieren asesoramiento técnico.",
    challenge: "¿Cómo diseñamos un flujo que priorice la negociación y el asesoramiento sobre la transacción inmediata?",
    solution: "Reemplazar el \"Carrito\" por un sistema de Presupuestos Colaborativos.",
  },
  {
    n: "02",
    title: "Logística vs. Facturación",
    problem: "Un usuario puede pagar todo hoy, pero necesitar los materiales en 3 meses (Acopio), o recibir facturas parciales.",
    challenge: "Diseñar una interfaz de Pedido que no colapse cuando el \"Estado del Pago\" y el \"Estado de la Entrega\" no coinciden.",
    solution: "Una UI de Estados Independientes (Transacciones vs. Entregas).",
  },
  {
    n: "03",
    title: "Permisos Multi-Persona",
    problem: "En una obra interactúan el Dueño (paga), el Arquitecto (elige) y el Constructor (recibe).",
    challenge: "¿Cómo evitamos crear múltiples cuentas y contraseñas?",
    solution: "Diseñar un sistema de Roles Dinámicos donde un mismo usuario cambia de permisos según el contexto del presupuesto.",
  },
];

export function XconsBriefSection() {
  return (
    <div>
      <Title>Resumen del Proyecto</Title>

      <FadeUp>
        <p className="type-h2 text-ink">En construcción nadie compra con un carrito.</p>
        <p className="type-body-l text-ink-muted mt-5">
          Una obra se cotiza, se negocia por WhatsApp, se paga en partes y llega en varios camiones durante semanas. Diseñé de punta a punta
          el <span className="text-ink font-medium">admin de XCONS</span>: el backoffice B2B con el que los vendedores de corralones y
          distribuidoras llevan todo ese recorrido, del primer "hola" a la última entrega.
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-10 md:mt-14">
        <Shot src={shot.chat} alt="Conversación de WhatsApp en el admin: el cliente manda una lista escrita a mano y el asistente de IA la carga en el presupuesto" caption="Un cliente manda la foto de una lista escrita a mano y el asistente de IA la carga en el presupuesto, dentro del mismo chat. Todos los datos son ficticios." />
      </FadeUp>

      {/* Mi rol + La escala side by side on desktop, stacked on mobile. */}
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mt-14 md:mt-20">
        <FadeUp>
          <Subtitle>Mi rol</Subtitle>
          <p className="type-body text-ink-muted">
            Product Designer del admin desde 2024. Trabajo con el PM y el equipo de desarrollo, y llevo cada módulo de la idea a producción:
          </p>
          <ul className="space-y-3 mt-5">
            {MY_ROLE.map((r) => (
              <li key={r.title} className="flex gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: GOLD }} aria-hidden="true" />
                <p className="type-body-s text-ink-muted">
                  <span className="text-ink font-medium">{r.title}:</span> {r.body}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Subtitle>La escala</Subtitle>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-6">
            {SCALE.map((s) => (
              <div key={s.label}>
                <dt className="text-[36px] md:text-[44px] font-bold leading-none tracking-[-0.02em] tabular-nums" style={{ color: GOLD }}><LiveCount value={s.n} every={s.every} /></dt>
                <dd className="type-body-s text-ink-muted mt-2">{s.label}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      </div>

      <FadeUp className="mt-14 md:mt-20">
        <Subtitle>Desafíos</Subtitle>
        <SketchFillContext.Provider value={XCONS_GREEN}>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CHALLENGES.map((c, i) => (
            <li key={c.n} className="rounded-2xl border border-line bg-card p-5 md:p-6">
              <SketchFrame className="max-w-[200px] mx-auto mb-5 md:mb-6">{XCONS_CHALLENGE_SKETCHES[i]}</SketchFrame>
              <div className="flex items-baseline gap-3 md:block">
                <span className="text-[32px] md:text-[40px] font-bold leading-none" style={{ color: GOLD }}>{c.n}</span>
                <p className="type-h4 text-ink md:mt-4">{c.title}</p>
              </div>
              <div className="h-4 md:h-5" />
              <div className="space-y-3 md:space-y-4">
                <div>
                  <Label>El problema</Label>
                  <p className="type-body-s text-ink-muted mt-1.5">{c.problem}</p>
                </div>
                <div>
                  <Label color={GOLD}>El reto</Label>
                  <p className="type-body-s text-ink font-medium mt-1.5">{c.challenge}</p>
                </div>
                <div>
                  <Label color="rgb(111,141,181)">La solución</Label>
                  <p className="type-body-s text-ink mt-1.5">{c.solution}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        </SketchFillContext.Provider>
      </FadeUp>
    </div>
  );
}

// ─── 02 · Cómo trabajo ──────────────────────────────────────────────────────

const PIPELINE = [
  {
    step: "Entender",
    me: "Defino el problema con el PM y los devs, y decido qué preguntas hay que responder.",
    ai: "Me ayuda a encontrar decisiones previas en la documentación y a analizar datos reales.",
  },
  {
    step: "Explorar",
    me: "Elijo la dirección y el criterio. Durante la mayor parte del proyecto diseñé en Figma.",
    ai: "Hoy exploro variantes y prototipos con Figma Make o Claude Design antes de pasar a código.",
  },
  {
    step: "Especificar",
    me: "Escribo el comportamiento y, sobre todo, el porqué de cada decisión.",
    ai: "Ordena la spec y propone criterios de aceptación.",
  },
  {
    step: "Construir",
    me: "En las últimas funcionalidades hago yo el front, reviso cada cambio y pruebo en desarrollo.",
    ai: "Implementa conmigo en React + Ant Design, siguiendo las reglas de la documentación.",
  },
  {
    step: "Verificar",
    me: "QA con ojo de diseño: estados, textos, permisos, mobile.",
    ai: "Recorre el admin y saca capturas de cada estado para compararlas con la spec.",
  },
  {
    step: "Capacitar",
    me: "Hago los videotutoriales con los que cada equipo aprende el admin.",
    ai: "Graba el admin con datos de prueba y arma capítulos, zooms, subtítulos y voz.",
  },
];

export function XconsAISection() {
  return (
    <div>
      <Title>Cómo trabajo</Title>

      <FadeUp className="mb-8 md:mb-10">
        <p className="type-body-l text-ink-muted">
          De la definición del problema a la capacitación del equipo. La IA es una herramienta más en cada paso; el criterio es mío.
        </p>
      </FadeUp>

      <FadeUp>
        <ol className="space-y-3">
          {PIPELINE.map((p, i) => (
            <li key={p.step} className="rounded-2xl border border-line bg-card p-4 md:p-6 grid md:grid-cols-[180px_1fr_1fr] gap-3 md:gap-8">
              <div className="flex md:block items-baseline gap-3">
                <span className="type-caption tabular-nums text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
                <p className="type-h3 text-ink md:mt-1">{p.step}</p>
              </div>
              <div>
                <Label>Yo</Label>
                <p className="type-body-s text-ink mt-1.5">{p.me}</p>
              </div>
              <div>
                <Label color={GOLD}>La IA</Label>
                <p className="type-body-s text-ink-muted mt-1.5">{p.ai}</p>
              </div>
            </li>
          ))}
        </ol>
      </FadeUp>
    </div>
  );
}

const slug = (t: string) => "etapa-" + t.toLowerCase().normalize("NFD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function StagePanel({ stage: s, n }: { stage: Stage; n: number }) {
  return (
    <FadeUp>
      <article id={slug(s.tab)} className="pt-10 md:pt-16 border-t border-line scroll-mt-24">
        <div className="flex items-baseline gap-3">
          <span className="type-caption tabular-nums" style={{ color: GOLD }}>{String(n).padStart(2, "0")}</span>
          <Label>{s.tab}</Label>
        </div>
        <p className="type-h2 text-ink mt-3">{s.hook}</p>
        <p className="type-body text-ink-muted mt-4">{s.problem}</p>
        {/* Mobile: light list with a gold rule · Desktop: three cards */}
        {s.decisions.length > 0 && <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-3 mt-6 md:mt-8">
          {s.decisions.map((d) => (
            <li key={d.title} className="border-l-2 border-l-[rgb(201,188,63)] pl-3 md:border md:border-line md:rounded-xl md:bg-card md:p-5">
              <p className="type-body text-ink font-medium">{d.title}</p>
              <p className="type-body-s text-ink-muted mt-1 md:mt-2">{d.why}</p>
            </li>
          ))}
        </ul>}
        <ShotGroup shots={s.shots} className="mt-8 md:mt-10" />
      </article>
    </FadeUp>
  );
}

/** Index of the stages: chips that jump to each one (scrolls sideways on mobile). */
function StageIndex({ items }: { items: Stage[] }) {
  // Sections are stacked while scrolling, so the first jump can land short: correct it once it settles.
  const go = (id: string) => {
    const jump = (smooth: boolean) => {
      const el = document.getElementById(id);
      if (el) window.scrollBy({ top: el.getBoundingClientRect().top - 96, behavior: smooth ? "smooth" : "auto" });
    };
    jump(true);
    window.setTimeout(() => jump(true), 900);
  };
  return (
    <nav aria-label="Etapas" className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto hide-scrollbar">
      <ol className="flex md:flex-wrap gap-2 w-max md:w-auto">
        {items.map((st, i) => (
          <li key={st.tab}>
            <button
              type="button"
              onClick={() => go(slug(st.tab))}
              className="px-3.5 py-2 rounded-full border border-line bg-card text-sm text-ink-muted hover:text-ink hover:border-ink/30 transition-colors whitespace-nowrap"
            >
              <span className="tabular-nums mr-1.5" style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
              {st.tab}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Stages({ items }: { items: Stage[] }) {
  return (
    <>
      <FadeUp className="mt-8 md:mt-10">
        <StageIndex items={items} />
      </FadeUp>
      <div className="mt-10 md:mt-14 space-y-12 md:space-y-16">
        {items.map((st, i) => (
          <StagePanel key={st.tab} stage={st} n={i + 1} />
        ))}
      </div>
    </>
  );
}

// ─── 03 · La vida de una venta ──────────────────────────────────────────────

interface Stage {
  tab: string;
  hook: string;
  problem: string;
  decisions: { title: string; why: string }[];
  shots: ShotProps[];
}

const STAGES: Stage[] = [
  {
    tab: "Panel de control",
    hook: "Las métricas de venta y las tareas pendientes del vendedor, en una pantalla.",
    problem: "El vendedor necesita saber en segundos qué tiene que hacer hoy y cómo viene el negocio. Lo definí así: \"No es un panel de BI. Es una superficie operativa.\"",
    decisions: [],
    shots: [{ src: shot.panelCompleto, alt: "Panel de control con métricas de presupuestos, pedidos, conversión, pipeline y tareas pendientes", tall: true }],
  },
  {
    tab: "Conversaciones",
    hook: "Todos los chats con clientes en una bandeja que comparte el equipo.",
    problem: "Los vendedores hablaban por WhatsApp personal, el de la empresa, email y Messenger. No quedaba registro, no se podía pasar una charla a un compañero y para ver un presupuesto había que salir del chat.",
    decisions: [
      { title: "La conversación es del canal, no del vendedor", why: "Cualquiera con permiso la puede tomar: el equipo trabaja en conjunto sin perder el hilo." },
      { title: "Las notas internas viven dentro del chat, en amarillo", why: "Antes ese contexto se resolvía por email o por WhatsApp personal, y se perdía." },
      { title: "La regla de las 24 h de WhatsApp se ve antes de que falle", why: "Debajo de la caja dice cuánto tiempo queda para responder. Cuando vence, ofrece mandar una plantilla." },
    ],
    shots: [
      { src: shot.chatAsistente, alt: "La bandeja de entrada y una conversación: notas internas, un mensaje programado, una tarea programada del asistente y el campo para responder" },
      { src: shot.notificaciones, alt: "Centro de notificaciones con menciones agrupadas por día" },
    ],
  },
  {
    tab: "Contactos",
    hook: "La ficha de cada cliente: quién es, qué cotizó, qué compró y qué se habló.",
    problem: "Es el CRM del equipo comercial. El problema era que la información de un cliente estaba repartida entre presupuestos, pedidos y chats, y cada vendedor tenía que reconstruirla antes de responder. Definí qué tiene que estar a la vista: cómo contactarlo (email y WhatsApp), los datos que cambian cómo se le vende (rubro, obra actual, condición de IVA y cómo llegó), sus presupuestos agrupados por etapa, sus pedidos y el historial de todo lo que se habló. Así, cualquier vendedor que abre la ficha sabe en qué está ese cliente antes de escribirle.",
    decisions: [],
    shots: [
      { src: shot.contactoFicha, alt: "Ficha de contacto con embudo de presupuestos, pedidos, historial y relaciones", tall: true },
      { src: shot.contactos, alt: "Tabla de contactos" },
    ],
  },
  {
    tab: "Presupuestos",
    hook: "Un presupuesto que se arma por entregas.",
    problem: "En materiales de construcción una compra casi nunca llega junta: una parte va a la obra esta semana, otra cuando avanza y otra se retira del depósito. Y no todo viaja igual: una placa de yeso, un balde de 32 kg y un perfil de 2,60 m tienen pesos y medidas distintos, y la distancia a la obra cambia qué envíos se pueden ofrecer y cuánto cuestan. El presupuesto tenía que resolver eso antes de la compra, tanto en el mostrador como cuando el vendedor retoma online un presupuesto que empezó el cliente.",
    decisions: [
      { title: "Las entregas se arman dentro del presupuesto", why: "Cada entrega agrupa sus productos y su método de envío, así el cliente aprueba el precio y la logística al mismo tiempo." },
      { title: "Los productos se pasan de una entrega a otra", why: "Si cambian los tiempos de la obra, se reorganiza sin volver a cargar nada. Un interruptor marca a qué entrega van los productos nuevos." },
      { title: "El envío depende de lo que lleva cada entrega", why: "El peso, las medidas y la distancia definen qué opciones aparecen (camión, retiro en depósito) y cuánto cuestan." },
    ],
    shots: [
      { src: shot.kanban, alt: "Vista Kanban de presupuestos por estado" },
      { src: shot.presupuestoDetalle, alt: "Detalle de un presupuesto con 37 productos, entrega y pago", tall: true },
    ],
  },
  {
    tab: "Pedidos y entregas",
    hook: "El seguimiento del pago, la factura y cada entrega después de la compra.",
    problem: "Con la compra confirmada hay que coordinar pago, factura, entregas con distintas logísticas y cancelaciones parciales, con trazabilidad para responder cualquier reclamo.",
    decisions: [],
    shots: [
      { src: shot.pedidoDetalle, alt: "Un pedido completo: productos, pago con Mercado Pago, factura y dos entregas (una entregada con remito y conformidad, otra en camino)", tall: true },
      { src: shot.pedidos, alt: "Listado de pedidos con estado, total y balance" },
    ],
  },
  {
    tab: "Historial",
    hook: "Todo lo que pasó en un contacto, presupuesto o pedido, en orden.",
    problem: "La venta es larga y pasan varios vendedores. Cuando alguien toma un caso ajeno, la pregunta es siempre \"¿qué pasó hasta acá?\". El historial está en contactos, presupuestos, pedidos y conversaciones, con notas, menciones y respuestas.",
    decisions: [],
    shots: [{ src: shot.historial, alt: "Historial de un pedido: cambios de estado de cada entrega, factura, notas con menciones y una nota fijada" }],
  },
];

export function XconsJourneySection() {
  return (
    <div>
      <Title>La vida de una venta</Title>

      <FadeUp>
        <p className="type-body-l text-ink-muted">
          Un vendedor abre el admin a la mañana. Le escribe una arquitecta por WhatsApp con una lista hecha a mano. Ve su historia, le arma el
          presupuesto repartido en dos camiones, el cliente paga y la mercadería sale. Cada etapa es una sección del producto.
        </p>
      </FadeUp>

      <Stages items={STAGES} />

    </div>
  );
}

// ─── 04 · Un producto con IA: el Asistente ──────────────────────────────────

const ASSISTANT_DECISIONS = [
  { title: "Primero copiloto, después automático", why: "Para medir la calidad con vendedores reales antes de exponerlo a un cliente." },
  { title: "Nunca toca descuentos, estados ni ventas", why: "Lo que involucra plata lo decide una persona." },
  { title: "Cita un precio recién después de cargarlo en el presupuesto", why: "Evita el \"me dijiste X y el presupuesto dice Y\"." },
  { title: "Lo que no puede hacer se lo niegan los permisos, no las instrucciones", why: "Igual que a cualquier vendedor. Un prompt se puede saltear; un permiso, no." },
  { title: "Se presenta como asistente de la tienda", why: "Y siempre ofrece pasar con una persona." },
];

export function XconsAssistantSection() {
  return (
    <div>
      <Title>Un producto con IA: el Asistente</Title>

      <FadeUp>
        <p className="type-h2 text-ink">La IA no reemplaza al vendedor: se sienta en la misma conversación y espera que la llamen.</p>
        <p className="type-body-l text-ink-muted mt-5">
          Gran parte de lo que piden los clientes por WhatsApp es repetitivo: "¿tienen X?", "¿a cuánto?", "armame un presupuesto". Diseñé el
          asistente como <span className="text-ink font-medium">un operador más del store</span>: tiene su ficha, sus permisos y aparece en el
          @ como cualquier compañero.
        </p>
      </FadeUp>

      <FadeUp className="grid md:grid-cols-2 gap-4 mt-10 md:mt-14">
        <div className="rounded-2xl border border-line bg-card p-5 md:p-6">
          <Label color={GOLD}>Modo copiloto</Label>
          <p className="type-body text-ink mt-2">El vendedor escribe en una nota "@Asistente creale un presupuesto con lo que pidió". El asistente lee la conversación, también fotos y PDF, arma el presupuesto y contesta con el link.</p>
        </div>
        <div className="rounded-2xl border border-line bg-card p-5 md:p-6">
          <Label color={GOLD}>Modo automático (opcional)</Label>
          <p className="type-body text-ink mt-2">Responde solo dentro de la ventana de 24 h. Si un humano escribe en esa conversación, se pausa.</p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 [&>*]:min-w-0 2xl:grid-cols-[1fr_1.1fr] gap-8 2xl:gap-12 mt-12 md:mt-16 items-start">
        <FadeUp>
          <Label className="mb-4">Decisiones y su porqué</Label>
          <Decisions items={ASSISTANT_DECISIONS} />
          <div className="mt-8">
            <Quote>La IA entra como un compañero más, con los mismos permisos que una persona. Ése fue el criterio que hizo que encaje sin romper el modelo.</Quote>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <ShotGroup
            shots={[
              { src: shot.asistente, alt: "Ficha del asistente de IA: proveedor, modelo, límites, conocimiento del store y próximas actividades", caption: "La ficha del asistente: modelo, límites de uso, el conocimiento que el store le enseña y sus actividades.", tall: true },
              { src: shot.operadores, alt: "Equipo del store con el asistente de IA listado como un operador más", caption: "En el equipo del store, el asistente es un operador más." },
            ]}
            className="md:[&>div:first-child]:grid-cols-1"
          />
        </FadeUp>
      </div>

    </div>
  );
}

// ─── 05 · Detrás del mostrador ──────────────────────────────────────────────

const BACKOFFICE: Stage[] = [
  {
    tab: "Asociador de productos",
    hook: "Vincular los productos de cada seller con el catálogo único.",
    problem: "Cada seller carga sus productos con sus propios códigos y nombres, por Excel o desde su ERP. Para venderse, cada uno tiene que quedar asociado a su ficha única del catálogo. Un seller grande tiene miles.",
    decisions: [
      { title: "Sugerencias con % de compatibilidad y un semáforo", why: "Cerca de un corte, el porcentaje muestra un decimal \"para que el número no contradiga al color\" (79,5% en amarillo)." },
      { title: "El umbral queda fijo en 80% y nada se asocia sin confirmación", why: "\"Encontramos N productos con 80% o más\" → Asociar. Lo demás se revisa de a uno." },
      { title: "El % se guarda por producto", why: "Así la fila coincide con el filtro. Calcularlo en vivo llevaría unos 6 minutos para un seller grande." },
    ],
    shots: [
      { src: shot.asociadorVista, alt: "Cada producto del seller con su sugerencia y el % de compatibilidad; el ojo abre una vista previa sin salir de la lista" },
      { src: shot.asociadorExcel, alt: "Importar desde Excel: el historial avisa \"Encontramos 214 productos con 80% de match\" → Asociar" },
      { src: shot.asociadorErp, alt: "Integrar tu ERP: estado de la sincronización e historial" },
      { src: shot.asociadorUno, alt: "Asociar de a uno: el producto del seller a la izquierda y el catálogo a la derecha" },
    ],
  },
  {
    tab: "Catálogo (PIM)",
    hook: "Alta y edición de productos, con revisión antes de publicar.",
    problem: "El alta de productos vivía en Magento, donde \"cualquiera edita cualquier producto\", no quedaba rastro y \"todo sale publicado al instante\". Con 49.000 productos, un error se multiplica.",
    decisions: [
      { title: "Lo publicado no cambia mientras se edita", why: "\"Un activo se sigue vendiendo como estaba\": editarlo crea una versión que pasa por revisión." },
      { title: "Un borrador se guarda con campos vacíos", why: "Así se puede \"dejar a medias y seguir otro día\"." },
      { title: "Importar no publica nada", why: "\"Exportar mil, cambiar tres… deja tres versiones, no mil.\"" },
    ],
    shots: [
      { src: shot.catalogo, alt: "Catálogo con 49.762 productos" },
      { src: shot.producto, alt: "Ficha de producto con el flujo de publicación", tall: true },
    ],
  },
  {
    tab: "Canales",
    hook: "Conectar los WhatsApp de la tienda y definir quién puede usarlos.",
    problem: "El administrador del store conecta los WhatsApp reales, decide quién puede usarlos (No, Lector o Editor) y crea las plantillas que Meta tiene que aprobar.",
    decisions: [
      { title: "\"Restringido\" es un estado propio", why: "Se arregla distinto que \"desconectado\": un día se gastaron tres dispositivos vinculados en trece minutos reintentando." },
      { title: "Se muestra la categoría de Meta, no un precio", why: "Meta no expone el precio y lo cambia. Si es Marketing, la más cara, aparece un aviso." },
      { title: "Los errores de Meta se traducen", why: "En \"qué pasó\" y \"qué hacer\", nunca en códigos." },
    ],
    shots: [
      { src: shot.canalDetalle, alt: "Detalle de un canal de WhatsApp Business con plantillas y permisos", tall: true },
      { src: shot.canales, alt: "Lista de canales del store" },
    ],
  },
  {
    tab: "Stores y categorías",
    hook: "Alta de tiendas y sellers, equipos, permisos y categorías.",
    problem: "Desde acá se dan de alta stores y sellers, se vinculan entre sí, se arman los equipos con sus permisos y se ordena el menú de cada tienda.",
    decisions: [
      { title: "El acceso depende de la relación con cada registro", why: "\"La participación es la condición de visibilidad\", como en Google Docs. Ver no genera relación; editar, sí." },
      { title: "Las categorías se ordenan sólo arrastrando", why: "\"No hay botones de flecha\". Renombrar no cambia la URL y dos hermanas no pueden llamarse igual." },
      { title: "Sin permiso, un mensaje y no un formulario vacío", why: "\"Un form en blanco con el botón Guardar habilitado es pérdida de datos esperando pasar.\"" },
    ],
    shots: [
      { src: shot.stores, alt: "Listado de stores" },
    ],
  },
];


export function XconsBackofficeSection() {
  return (
    <div>
      <Title>Detrás del mostrador</Title>
      <FadeUp>
        <p className="type-body-l text-ink-muted">
          Para que un vendedor pueda cotizar, alguien tuvo que cargar 49.000 productos, conectarlos con el ERP de cada seller y decidir quién
          habla en nombre de la tienda.
        </p>
      </FadeUp>

      <Stages items={BACKOFFICE} />

    </div>
  );
}

// ─── 06 · El sistema ────────────────────────────────────────────────────────

const PRINCIPLES = [
  { title: "Cuatro estados, siempre", body: "Con datos, vacío, error y sin permiso. Ninguno queda librado al azar." },
  { title: "Lo que no se puede, se ve en gris y dice por qué", body: "Nunca se esconde sin explicación." },
  { title: "Sin banners informativos", body: "Si algo necesita un cartel para entenderse, hay que rediseñarlo." },
  { title: "Avisos que dicen la regla y cómo cumplirla", body: "\"1200 mm se carga como 1.2 m.\"" },
  { title: "Buscar antes de crear", body: "Para no duplicar contactos ni valores: \"¿Quisiste decir…?\"." },
  { title: "El orden se cambia arrastrando", body: "Imágenes, categorías, dueños, widgets y columnas." },
  { title: "Un mismo modelo de permisos", body: "Admin, Editor, Lector y Por participación, en todos los módulos." },
  { title: "Confirmaciones de una sola pregunta", body: "Con un verbo en el botón: \"¿Pausar…?\" → \"Sí, pausar\"." },
];

export function XconsSystemSection() {
  return (
    <div>
      <Title>El sistema detrás de todo</Title>
      <FadeUp>
        <p className="type-body-l text-ink-muted">
          El admin tiene un documento canónico de definiciones generales: cada vez que una decisión vale para toda la app, se suma ahí. Estos
          son los criterios que se repiten en todas las pantallas.
        </p>
      </FadeUp>
      <FadeUp className="mt-10 md:mt-14">
        <Subtitle>Arquitectura de precios dinámicos</Subtitle>
        <p className="type-body-l text-ink-muted mb-8 md:mb-10">
          Como diseñador, tuve que estructurar cómo se le presenta el precio al usuario. No es un número estático; es una variable que cambia según múltiples factores:
        </p>
        <PricingFlowSketches />
      </FadeUp>

      <FadeUp className="mt-16 md:mt-24">
        <Subtitle className="!mb-0">Criterios que se repiten</Subtitle>
      </FadeUp>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 mt-3 md:mt-8">
        {PRINCIPLES.map((p, i) => (
          <FadeUp key={p.title} delay={(i % 4) * 0.05} className="grid grid-cols-[28px_1fr] sm:block py-3 border-b border-line sm:rounded-2xl sm:border sm:bg-card sm:p-5">
            <span className="type-caption tabular-nums pt-1 sm:pt-0" style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <p className="type-h4 text-ink sm:mt-3">{p.title}</p>
              <p className="type-body-s text-ink-muted mt-1 sm:mt-2">{p.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
      <FadeUp className="mt-12 md:mt-16">
        <p className="type-caption text-ink-subtle">
          Las capturas son del ambiente de desarrollo. Todas las personas, teléfonos, emails, empresas y tiendas que aparecen son ficticios:
          los datos se reemplazaron en el navegador antes de mostrarse, sin tocar la base real.
        </p>
      </FadeUp>
    </div>
  );
}
