import { motion, type MotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const FRAME_COUNT = 3;
const NAV_PAD = 440;
const FRAME_LABELS = ["Discovery", "Exploración", "Entrega"];

function getEffectiveFrameW() {
  if (typeof window === "undefined") return 1000;
  return window.innerWidth >= 768 ? window.innerWidth - NAV_PAD : window.innerWidth;
}

type Anim = "hidden" | "visible";

const up = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const ghostNum = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.03, transition: { duration: 1.2 } },
};

// ─── Shared sub-components ───────────────────────────────────────────────────

function LeftCol({
  anim, title, titleLine2, body,
}: {
  anim: Anim;
  title: string;
  titleLine2: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <motion.h2
        animate={anim} variants={up(0)}
        className="type-h1 text-[#F5F0EB] leading-[0.95]"
      >
        {title}<br />{titleLine2}<span className="text-[rgb(201,188,63)]">.</span>
      </motion.h2>

      <motion.p
        animate={anim} variants={up(0.1)}
        className="text-[13px] text-[#525252] leading-[1.7] max-w-[220px]"
      >
        {body}
      </motion.p>
    </div>
  );
}

function ItemList({
  anim,
  rows,
  baseDelay = 0.1,
}: {
  anim: Anim;
  rows: { n: string; label: string; body: string }[];
  baseDelay?: number;
}) {
  return (
    <div className="space-y-5">
      {rows.map((row, i) => (
        <motion.div
          key={i}
          animate={anim}
          variants={up(baseDelay + i * 0.09)}
        >
          <p className="text-[13px] font-medium text-[#DEDAD4] leading-snug mb-1.5">
            {row.label}
          </p>
          <p className="text-[13px] text-[#525252] leading-[1.7]">
            {row.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Frame 0 — Discovery ─────────────────────────────────────────────────────

function FrameDiscovery({ anim }: { anim: Anim }) {
  return (
    <div className="h-full flex flex-col md:justify-center relative overflow-hidden">
      <motion.span
        aria-hidden="true" animate={anim} variants={ghostNum}
        className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 font-bold text-white select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(380px, 45vw, 650px)" }}
      >01</motion.span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
        <LeftCol
          anim={anim}
          title="El papel"
          titleLine2="primero"
          body="Antes de abrir Figma, abro el cuaderno. La mayoría de los problemas mal resueltos se deben a preguntas que nadie hizo."
        />

        <ItemList
          anim={anim}
          baseDelay={0.12}
          rows={[
            { n: "01", label: "Cuaderno abierto, pantalla a un costado", body: "Contexto del negocio, restricciones, suposiciones y preguntas sin resolver. Sin juicios, sin soluciones todavía." },
            { n: "02", label: "La pregunta detrás del pedido", body: "Stakeholders, usuarios, flujos existentes. La mayoría de los problemas mal resueltos empiezan con la pregunta incorrecta." },
            { n: "03", label: "Flujos a mano o en digital", body: "Navegación y estructura a mano antes de abrir cualquier herramienta. Necesito ver cómo conecta todo primero." },
            { n: "04", label: "Bajada de ideas", body: "Listas, frases, referencias, capturas... recordatorios de qué investigar o mirar de referencia. Todo lo que se me cruza por la cabeza registrado para no olvidar nada, a veces las soluciones surgen de un apartado escrito en algún lado." },
          ]}
        />
      </div>
    </div>
  );
}

// ─── Frame 1 — Exploración ───────────────────────────────────────────────────

function FrameExploracion({ anim }: { anim: Anim }) {
  return (
    <div className="h-full flex flex-col md:justify-center relative overflow-hidden">
      <motion.span
        aria-hidden="true" animate={anim} variants={ghostNum}
        className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 font-bold text-white select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(380px, 45vw, 650px)" }}
      >02</motion.span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
        <LeftCol
          anim={anim}
          title="Explorar"
          titleLine2="y validar"
          body="Con el problema claro, me muevo rápido sin saltear pasos. La IA amplifica el criterio, no lo reemplaza."
        />

        <ItemList
          anim={anim}
          baseDelay={0.12}
          rows={[
            { n: "01", label: "Wireframes que piensan", body: "Flujos y pantallas en baja fidelidad. Velocidad sobre precisión, primero la estructura, después lo visual." },
            { n: "02", label: "IA para sintetizar y decidir", body: "Claude analiza tickets, sintetiza research y cuestiona decisiones de UX en voz alta. Amplifica el criterio, no lo reemplaza." },
            { n: "03", label: "Prototipado rápido", body: `Variantes de interfaz rápidas con Figma Make o Claude design, aunque a veces prefiero hacerlo directo a "mano" en Figma dependiendo el caso. Explorar direcciones sin perder tiempo en pixel-pushing.` },
            { n: "04", label: "Test con personas reales", body: "Aunque sean 5. Itero hasta que la solución funciona de verdad. El contacto real no se reemplaza." },
          ]}
        />
      </div>
    </div>
  );
}

// ─── Frame 2 — Entrega ───────────────────────────────────────────────────────

function FrameEntrega({ anim }: { anim: Anim }) {
  return (
    <div className="h-full flex flex-col md:justify-center relative overflow-hidden">
      <motion.span
        aria-hidden="true" animate={anim} variants={ghostNum}
        className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 font-bold text-white select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(380px, 45vw, 650px)" }}
      >03</motion.span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
        <LeftCol
          anim={anim}
          title="Construir"
          titleLine2="y Handoff"
          body="El diseño no termina en el archivo. Termina cuando está en producción y funciona."
        />

        <div className="flex flex-col gap-0">
          <ItemList
            anim={anim}
            baseDelay={0.12}
            rows={[
              { n: "01", label: "UI en alta fidelidad con sistema", body: "Componentes, tokens, estados, responsividad. Un design system vivo que escala — no pantallas estáticas aisladas." },
              { n: "02", label: "Handoff sin ambigüedades", body: "Open Specs en GitLab, anotaciones en Figma, Notion. Dev construye sin adivinar intenciones de diseño." },
            ]}
          />

          {/* Diferencial */}
          <motion.div animate={anim} variants={up(0.34)} className="pt-5 mt-5 border-t border-white/[0.05]">
            <p className="text-[9px] tracking-[0.28em] text-[rgb(201,188,63)] mb-3">
              Diferencial
            </p>
            <p className="text-[15px] font-medium text-[#F5F0EB] leading-snug mb-3">
              Cuando el proyecto lo pide, yo misma implemento el front.
            </p>
            <p className="text-[13px] text-[#525252] leading-[1.7]">
              Con Claude Code paso de Figma a React + TypeScript sin depender de un dev. La brecha entre diseño y producción desaparece.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface Props {
  scrollY: MotionValue<number>;
  sectionH: number;
  enterScroll: number;
}

export default function MiProcesoSection({ scrollY, sectionH, enterScroll }: Props) {
  const [frameW, setFrameW] = useState(getEffectiveFrameW);
  const [activeFrame, setActiveFrame] = useState(0);

  const sectionHRef    = useRef(sectionH);
  const enterScrollRef = useRef(enterScroll);
  const frameWRef      = useRef(frameW);

  useEffect(() => { sectionHRef.current = sectionH; }, [sectionH]);
  useEffect(() => { enterScrollRef.current = enterScroll; }, [enterScroll]);
  useEffect(() => {
    const onResize = () => {
      const w = getEffectiveFrameW();
      setFrameW(w);
      frameWRef.current = w;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const x = useTransform(scrollY, (s: number) => {
    const sh = sectionHRef.current;
    const es = enterScrollRef.current;
    const fw = frameWRef.current;
    if (!sh) return 0;
    const frame = (s - es) / sh;
    return -Math.max(0, Math.min(frame, FRAME_COUNT - 1)) * fw;
  });

  useMotionValueEvent(x, "change", (v: number) => {
    const fw = frameWRef.current;
    if (!fw) return;
    setActiveFrame(Math.max(0, Math.min(Math.round(-v / fw), FRAME_COUNT - 1)));
  });

  const nextLabel = activeFrame < FRAME_COUNT - 1 ? FRAME_LABELS[activeFrame + 1] : null;

  return (
    <div className="h-full flex flex-col md:block relative">
      <span className="md:hidden flex-shrink-0 type-overline text-white/50 px-4 pt-3 pb-2">Mi proceso</span>
      <div className="flex-1 md:h-full overflow-hidden md:ml-[440px]">
        <motion.div className="flex h-full" style={{ x, width: "300%" }}>
          <div className="h-full flex-shrink-0 w-1/3 px-4 md:px-0 md:pr-[60px] py-14 overflow-y-auto">
            <FrameDiscovery anim={activeFrame === 0 ? "visible" : "hidden"} />
          </div>
          <div className="h-full flex-shrink-0 w-1/3 px-4 md:px-0 md:pr-[60px] py-14 overflow-y-auto">
            <FrameExploracion anim={activeFrame === 1 ? "visible" : "hidden"} />
          </div>
          <div className="h-full flex-shrink-0 w-1/3 px-4 md:px-0 md:pr-[60px] py-14 overflow-y-auto">
            <FrameEntrega anim={activeFrame === 2 ? "visible" : "hidden"} />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-0 right-0 flex items-center justify-center gap-4 pointer-events-none">
        <div className="flex items-center gap-[6px]">
          {Array.from({ length: FRAME_COUNT }).map((_, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                i === activeFrame
                  ? "w-5 h-[1.5px] bg-[rgb(201,188,63)] rounded-full"
                  : "w-[3px] h-[3px] rounded-full bg-white/15"
              }`}
            />
          ))}
        </div>
        {nextLabel && (
          <span className="text-[11px] tracking-[0.12em] text-white/35">
            {nextLabel}
          </span>
        )}
      </div>
    </div>
  );
}
