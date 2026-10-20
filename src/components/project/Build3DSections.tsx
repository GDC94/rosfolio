import { motion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { build3dImages as img } from "../../data/projects";

/**
 * BUILD.3D case study — sections built from the brand book (colours, type,
 * logo, tone of voice) plus captures of build3d.ar. Brand fonts are loaded
 * only when this case study is open.
 */

const B3D = {
  red: "#C8302A",
  blue: "#1E3878",
  yellow: "#E8C018",
  black: "#000000",
  white: "#FFFFFF",
};

const SYNE: CSSProperties = { fontFamily: "'Syne', sans-serif", fontWeight: 800 };
const MONO: CSSProperties = { fontFamily: "'IBM Plex Mono', ui-monospace, monospace" };
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500&display=swap";

function useBrandFonts() {
  useEffect(() => {
    if (document.querySelector("link[data-b3d-fonts]")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    link.dataset.b3dFonts = "";
    document.head.appendChild(link);
  }, []);
}

// ─── Shared building blocks ─────────────────────────────────────────────────

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`block type-overline uppercase text-ink-subtle ${className}`}>{children}</span>;
}

/** Official isotype: isometric cube with the B drawn by translucent white panels. */
export function Mark({ className = "", mono = false, style }: { className?: string; mono?: boolean; style?: CSSProperties }) {
  const [front, side, top] = mono ? ["#000000", "#444444", "#888888"] : [B3D.red, B3D.blue, B3D.yellow];
  return (
    <svg viewBox="0 0 80 90" className={className} style={style} role="img" aria-label="Símbolo de BUILD.3D">
      <g transform="rotate(180 40 51)">
        <polygon points="8,28 40,10 40,74 8,92" fill={front} />
        <polygon points="40,10 72,28 72,92 40,74" fill={side} />
        <polygon points="8,28 40,10 72,28 40,46" fill={top} />
        <polygon points="14,34 32,24 32,42 14,52" fill="#FFFFFF" opacity="0.95" />
        <polygon points="14,54 34,44 34,62 14,72" fill="#FFFFFF" opacity="0.85" />
        <polygon points="32,24 44,30 44,42 32,42" fill="#FFFFFF" opacity="0.45" />
        <polygon points="34,44 48,51 48,62 34,62" fill="#FFFFFF" opacity="0.35" />
      </g>
    </svg>
  );
}

function Wordmark({ className = "", color = B3D.black }: { className?: string; color?: string }) {
  return (
    <span className={`uppercase leading-none whitespace-nowrap ${className}`} style={{ ...SYNE, color }}>
      BUILD<span style={{ color: B3D.red }}>.</span>3D
    </span>
  );
}

function Tick({ ok }: { ok: boolean }) {
  return (
    <span
      className="inline-flex items-center justify-center w-5 h-5 text-[11px] text-white flex-shrink-0"
      style={{ background: ok ? "#1F7A3A" : B3D.red }}
      aria-hidden="true"
    >
      {ok ? "✓" : "✕"}
    </span>
  );
}

// ─── 02 · Identidad de Marca ────────────────────────────────────────────────

const ABOUT = [
  { num: "A1", title: "Posicionamiento", text: "Impresión 3D especializada en repuestos, personalización y prototipos. Soluciones a medida cuando la pieza no se fabrica más o nunca existió." },
  { num: "A2", title: "Territorio", text: "Laboratorio de diseño, no taller industrial. Lenguaje de estudio: minimalista, preciso y con geometría, color primario y tensión compositiva." },
  { num: "A3", title: "Diferencial", text: "Cada pieza se piensa antes de imprimirse. Diseño primero, fabricación después. Resultado replicable, terminado y confiable." },
];

const FACES = [
  { color: B3D.red, name: "Cara frontal · Rojo", text: "La cara que mira al lector." },
  { color: B3D.blue, name: "Cara lateral · Azul", text: "Da profundidad y volumen." },
  { color: B3D.yellow, name: "Cara superior · Amarillo", text: "La luz que cae sobre el cubo." },
  { color: B3D.white, name: "La B · Blanco translúcido", text: "Cuatro paneles dibujan la B sobre las caras y dejan ver el color del cubo." },
];

export function Build3DIdentitySection() {
  useBrandFonts();

  const variants = [
    { caption: "Símbolo", art: <Mark className="w-12 md:w-14" /> },
    {
      caption: "Horizontal",
      art: (
        <span className="flex items-center gap-2">
          <Mark className="w-6 md:w-7" />
          <Wordmark className="text-base md:text-lg" />
        </span>
      ),
    },
    {
      caption: "Vertical",
      art: (
        <span className="flex flex-col items-center gap-2">
          <Mark className="w-8 md:w-10" />
          <Wordmark className="text-sm md:text-base" />
        </span>
      ),
    },
    { caption: "Solo texto", art: <Wordmark className="text-xl md:text-2xl" /> },
  ];

  const allowed = [
    { caption: "Fondo claro", bg: B3D.white, art: <Mark className="w-10" /> },
    { caption: "Fondo negro", bg: B3D.black, art: <Mark className="w-10" /> },
    { caption: "Monocromático", bg: B3D.white, art: <Mark className="w-10" mono /> },
  ];
  const forbidden = [
    { caption: "No deformar", bg: B3D.white, art: <Mark className="w-10" style={{ transform: "scaleX(1.6)" }} /> },
    { caption: "No rotar", bg: B3D.white, art: <Mark className="w-10" style={{ transform: "rotate(28deg)" }} /> },
    { caption: "No recolorear", bg: B3D.white, art: <Mark className="w-10" style={{ filter: "hue-rotate(140deg)" }} /> },
  ];

  return (
    <div>
      <Title>Identidad de Marca</Title>

      <FadeUp>
        <p className="text-[clamp(28px,6vw,56px)] leading-[1.02] tracking-[-0.02em] text-ink" style={SYNE}>
          Lo que no <span style={{ color: B3D.red }}>existe</span> se diseña. Lo que se diseña se{" "}
          <span style={{ color: B3D.red }}>construye</span>.
        </p>
        <p className="type-body-l text-ink-muted mt-6 md:mt-8">
          El punto de partida fue definir un territorio: BUILD.3D no es una fábrica, es un laboratorio de diseño
          donde la impresión 3D resuelve lo que no se consigue. Toda la identidad parte de esa idea.
        </p>
      </FadeUp>

      {/* Sobre la marca */}
      <FadeUp className="mt-12 md:mt-16">
        <ul className="grid grid-cols-1 md:grid-cols-3 border border-line rounded-xl overflow-hidden">
          {ABOUT.map((a, i) => (
            <li key={a.num} className={`p-5 md:p-7 ${i > 0 ? "border-t md:border-t-0 md:border-l border-line" : ""}`}>
              <span className="block text-xs mb-3" style={{ ...MONO, color: B3D.red }}>{a.num}</span>
              <h4 className="type-h4 text-ink mb-2">{a.title}</h4>
              <p className="type-body-s text-ink-muted">{a.text}</p>
            </li>
          ))}
        </ul>
      </FadeUp>

      {/* Logo */}
      <FadeUp className="mt-16 md:mt-24">
        <Subtitle>Logo</Subtitle>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 md:gap-10 items-stretch">
          <div className="bg-white rounded-xl flex items-center justify-center py-12 md:py-16">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mark className="w-32 md:w-48" />
            </motion.div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="type-body text-ink-muted mb-6">
              El símbolo es un cubo isométrico: tres caras en los primarios Bauhaus y la B insinuada con paneles
              blancos translúcidos. Su forma, con el vértice hacia abajo, simula la punta de la impresora 3D que
              deposita el material capa por capa.
            </p>
            <ul className="space-y-4">
              {FACES.map((f) => (
                <li key={f.name} className="flex items-start gap-3">
                  <span className="w-4 h-4 mt-1 flex-shrink-0 border border-line" style={{ background: f.color }} aria-hidden="true" />
                  <p className="type-body-s text-ink-muted">
                    <span className="text-ink font-medium">{f.name}.</span> {f.text}
                  </p>
                </li>
              ))}
            </ul>
            <p className="type-body-s text-ink-muted mt-6 pt-6 border-t border-line">
              En la escritura, el punto de BUILD<span style={{ color: B3D.red }}>.</span>3D es rojo: no es puntuación, es marca.
            </p>
          </div>
        </div>
      </FadeUp>

      {/* Variantes */}
      <FadeUp className="mt-12 md:mt-16">
        <Label className="mb-4">Variantes</Label>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {variants.map((v) => (
            <li key={v.caption}>
              <div className="bg-white rounded-xl h-28 md:h-40 flex items-center justify-center px-3">{v.art}</div>
              <span className="block type-caption text-ink-subtle mt-2">{v.caption}</span>
            </li>
          ))}
        </ul>
      </FadeUp>

      {/* Usos */}
      <FadeUp className="mt-12 md:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
          {[
            { title: "Permitido", ok: true, items: allowed },
            { title: "Prohibido", ok: false, items: forbidden },
          ].map((group) => (
            <div key={group.title}>
              <h4 className="flex items-center gap-2 type-overline uppercase text-ink mb-4">
                <Tick ok={group.ok} /> {group.title}
              </h4>
              <ul className="grid grid-cols-3 gap-3">
                {group.items.map((u) => (
                  <li key={u.caption}>
                    <div
                      className="rounded-xl h-20 md:h-24 flex items-center justify-center overflow-hidden border border-line"
                      style={{ background: u.bg }}
                    >
                      {u.art}
                    </div>
                    <span className="block type-caption text-ink-subtle mt-2">{u.caption}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}

// ─── 03 · Sistema Visual ────────────────────────────────────────────────────

const SWATCHES = [
  { name: "Blanco", hex: "#FFFFFF", rgb: "255 255 255", use: "Fondo principal. Siempre. El blanco es el aire del estudio." },
  { name: "Negro", hex: "#000000", rgb: "0 0 0", use: "Tipografía, líneas, bordes y botones. Fondo solo en bloques de CTA." },
  { name: "Rojo", hex: B3D.red, rgb: "200 48 42", use: "Cara frontal del símbolo y el punto de BUILD.3D." },
  { name: "Azul", hex: B3D.blue, rgb: "30 56 120", use: "Cara lateral del símbolo. Da profundidad." },
  { name: "Amarillo", hex: B3D.yellow, rgb: "232 192 24", use: "Cara superior del símbolo. La luz del bloque." },
];

const COMBOS_OK: [string, string][] = [
  ["#FFFFFF", "#000000"], ["#000000", "#FFFFFF"], ["#FFFFFF", B3D.red],
  [B3D.red, "#FFFFFF"], [B3D.blue, "#FFFFFF"], [B3D.yellow, "#000000"],
];
const COMBOS_NO: [string, string][] = [
  [B3D.yellow, "#FFFFFF"], [B3D.red, B3D.blue], [B3D.blue, B3D.red],
  [B3D.yellow, B3D.blue], [B3D.red, B3D.yellow], [B3D.blue, B3D.yellow],
];

const TYPE_SCALE: { tag: string; spec: string; sample: string; style: CSSProperties; className: string }[] = [
  { tag: "Display", spec: "Syne 800 · 96px", sample: "Construido", style: { ...SYNE, letterSpacing: "-0.02em" }, className: "text-[clamp(30px,8vw,80px)] leading-none whitespace-nowrap" },
  { tag: "H1", spec: "Syne 800 · 48px", sample: "Repuestos a medida", style: SYNE, className: "text-[clamp(28px,6vw,48px)] leading-[0.95]" },
  { tag: "H2", spec: "Syne 800 · 28px · mayúsculas", sample: "Prototipos y series cortas", style: SYNE, className: "text-[clamp(20px,4vw,28px)] uppercase leading-tight" },
  { tag: "Body", spec: "IBM Plex Mono 400 · 15px", sample: "Cada pieza se diseña antes de imprimirse. El resultado es replicable, terminado y confiable.", style: MONO, className: "text-[15px] leading-[1.6]" },
  { tag: "Label", spec: "IBM Plex Mono 500 · 12px · tracking 22%", sample: "Impresión 3D · Argentina", style: { ...MONO, fontWeight: 500, letterSpacing: "0.22em" }, className: "text-xs uppercase" },
];

const VOICE = [
  { n: "01", title: "Español puro", text: "Sin anglicismos ni jerga técnica innecesaria. Las palabras de oficio se usan solo cuando aportan precisión." },
  { n: "02", title: "Trato neutro", text: "Frases impersonales y directas. El foco está en la acción, no en quién la recibe." },
  { n: "03", title: "Directa y precisa", text: "Frases cortas. Una idea por oración. Lo concreto antes que lo abstracto." },
  { n: "04", title: "Habla de la marca", text: "Los textos describen lo que BUILD.3D hace y cómo lo hace, no lo que el cliente siente." },
];

const VOICE_OK = [
  { q: "Diseñamos la pieza que no se fabrica más.", why: "Directo. Habla de la marca." },
  { q: "Impresión 3D con tolerancia de ±0,2 mm.", why: "Preciso. Dato concreto." },
  { q: "Si no existe, lo construimos.", why: "Confiable. Sin adornos." },
];
const VOICE_NO = [
  { q: "¡Hacemos realidad tus sueños en 3D!", why: "Vago, emocional, habla del cliente." },
  { q: "La mejor calidad premium del mercado.", why: "Superlativo vacío, sin dato." },
  { q: "Workflow full custom para tu proyecto.", why: "Anglicismos, jerga innecesaria." },
];

const TICKER = ["Si no existe, lo construimos", "Repuestos", "Personalización", "Prototipos"];

/** Isometric objects, same face mapping as the logo: red front, blue side, yellow top. */
const ISO_OBJECTS: { caption: string; viewBox: string; faces: [string, string][] }[] = [
  {
    caption: "Cubo — unidad base",
    viewBox: "0 0 100 100",
    faces: [["side", "M50,50 L98,26 L98,74 L50,98Z"], ["front", "M2,26 L50,50 L50,98 L2,74Z"], ["top", "M50,2 L98,26 L50,50 L2,26Z"]],
  },
  {
    caption: "Placa — superficie",
    viewBox: "0 0 100 100",
    faces: [["side", "M50,64 L98,40 L98,60 L50,84Z"], ["front", "M2,40 L50,64 L50,84 L2,60Z"], ["top", "M50,16 L98,40 L50,64 L2,40Z"]],
  },
  {
    caption: "Torre — volumen",
    viewBox: "0 0 100 120",
    faces: [
      ["side", "M49,73 L84,55.5 L84,90.5 L49,108Z"], ["front", "M14,55.5 L49,73 L49,108 L14,90.5Z"], ["top", "M49,38 L84,55.5 L49,73 L14,55.5Z"],
      ["side", "M49,38 L84,20.5 L84,55.5 L49,73Z"], ["front", "M14,20.5 L49,38 L49,73 L14,55.5Z"], ["top", "M49,3 L84,20.5 L49,38 L14,20.5Z"],
    ],
  },
];
const FACE_FILL: Record<string, string> = { front: B3D.red, side: B3D.blue, top: B3D.yellow };

export function Build3DSystemSection() {
  useBrandFonts();

  return (
    <div>
      <Title>Sistema Visual</Title>
      <FadeUp>
        <p className="type-body-l text-ink-muted">
          Blanco y negro estructuran. Los tres primarios Bauhaus construyen. Sin grises decorativos, sin degradados,
          sin sombras ni esquinas redondeadas: un sistema corto, fácil de aplicar en cualquier pieza.
        </p>
      </FadeUp>

      {/* Color */}
      <FadeUp className="mt-12 md:mt-16">
        <Subtitle>Color</Subtitle>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {SWATCHES.map((s) => (
            <li key={s.name} className="border border-line rounded-xl overflow-hidden bg-[var(--pj-bg)]">
              <div className="h-20 md:h-28 border-b border-line" style={{ background: s.hex }} />
              <div className="p-3 md:p-4">
                <h4 className="type-h4 text-ink">{s.name}</h4>
                <p className="text-xs text-ink-muted mt-1 tabular-nums" style={MONO}>{s.hex}</p>
                <p className="text-xs text-ink-subtle tabular-nums" style={MONO}>RGB {s.rgb}</p>
                <p className="type-caption text-ink-muted mt-3">{s.use}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 mt-10">
          {[
            { title: "Combinaciones permitidas", ok: true, combos: COMBOS_OK },
            { title: "Combinaciones prohibidas", ok: false, combos: COMBOS_NO },
          ].map((g) => (
            <div key={g.title}>
              <h4 className="flex items-center gap-2 type-overline uppercase text-ink mb-4">
                <Tick ok={g.ok} /> {g.title}
              </h4>
              <ul className="grid grid-cols-6 gap-2">
                {g.combos.map(([bg, fg]) => (
                  <li
                    key={bg + fg}
                    className="aspect-square flex items-center justify-center text-lg md:text-xl border border-line"
                    style={{ ...SYNE, background: bg, color: fg }}
                    aria-label={`Texto ${fg} sobre fondo ${bg}`}
                  >
                    Aa
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="type-caption text-ink-subtle mt-4">
          Los primarios no se mezclan entre sí en texto: funcionan como bloques de color plenos.
        </p>
      </FadeUp>

      {/* Tipografía */}
      <FadeUp className="mt-16 md:mt-24">
        <Subtitle>Tipografía</Subtitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {[
            { name: "Syne — 800 Extrabold", roles: ["Display", "Títulos", "Hero", "Nombre de marca"], style: SYNE, dark: true },
            { name: "IBM Plex Mono — 400 / 500", roles: ["Body", "UI", "Botones", "Etiquetas"], style: MONO, dark: false },
          ].map((f) => (
            <div
              key={f.name}
              className={`rounded-xl p-5 md:p-8 ${f.dark ? "bg-black text-white" : "border border-line text-ink bg-[var(--pj-bg)]"}`}
            >
              <span className="block text-[88px] md:text-[120px] leading-none" style={f.style}>Aa</span>
              <p className="type-h4 mt-4">{f.name}</p>
              <ul className="flex flex-wrap gap-1.5 mt-3">
                {f.roles.map((r) => (
                  <li key={r} className={`text-[11px] uppercase tracking-[0.12em] px-2 py-1 border ${f.dark ? "border-white/30" : "border-line"}`} style={MONO}>
                    {r}
                  </li>
                ))}
              </ul>
              <p className={`text-xs mt-5 break-words ${f.dark ? "text-white/60" : "text-ink-subtle"}`} style={f.style}>
                ABCDEFGHIJKLMNÑOPQRSTUVWXYZ 0123456789
              </p>
            </div>
          ))}
        </div>

        <Label className="mt-10 mb-4">Jerarquía</Label>
        <ul className="border-t border-line">
          {TYPE_SCALE.map((t) => (
            <li key={t.tag} className="grid grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] gap-2 md:gap-8 py-5 border-b border-line md:items-center">
              <div>
                <span className="type-h4 text-ink">{t.tag}</span>
                <span className="block text-[11px] text-ink-subtle mt-0.5" style={MONO}>{t.spec}</span>
              </div>
              <p className={`text-ink ${t.className}`} style={t.style}>{t.sample}</p>
            </li>
          ))}
        </ul>
      </FadeUp>

      {/* Elementos */}
      <FadeUp className="mt-16 md:mt-24">
        <Subtitle>Elementos gráficos</Subtitle>
        <Label className="mb-4">Objetos isométricos</Label>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ISO_OBJECTS.map((o) => (
            <li key={o.caption}>
              <div className="border border-line rounded-xl h-32 md:h-40 flex items-center justify-center bg-[var(--pj-bg)]">
                <svg viewBox={o.viewBox} className="h-20 md:h-24 w-auto" aria-hidden="true">
                  {o.faces.map(([face, d], i) => <path key={i} d={d} fill={FACE_FILL[face]} />)}
                </svg>
              </div>
              <span className="block type-caption text-ink-subtle mt-2">{o.caption}</span>
            </li>
          ))}
          <li>
            <div className="border border-line rounded-xl h-32 md:h-40 flex items-center justify-center bg-[var(--pj-bg)]">
              <Mark className="h-20 md:h-24 w-auto" />
            </div>
            <span className="block type-caption text-ink-subtle mt-2">Símbolo — la marca</span>
          </li>
        </ul>
        <p className="type-caption text-ink-subtle mt-4">
          Siempre en proyección isométrica 2:1, con la misma asignación de caras que el logo.
        </p>

        <Label className="mt-10 mb-4">Ticker</Label>
        <div className="bg-black overflow-hidden py-4 md:py-5" aria-label={TICKER.join(" · ")}>
          <div className="flex w-max animate-[marquee_28s_linear_infinite] motion-reduce:animate-none" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center">
                {[...TICKER, ...TICKER].map((t, i) => (
                  <span key={i} className="flex items-center text-white uppercase text-base md:text-xl whitespace-nowrap" style={SYNE}>
                    <span className="px-5 md:px-7">{t}</span>
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5" style={{ background: B3D.red }} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Label className="mt-10 mb-4">Líneas y bordes</Label>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { name: "Hairline · 1px", lines: [["1px", "#000"], ["1px", "#000"], ["1px", "#000"]] },
            { name: "Estructural · 1.5px", lines: [["1.5px", "#000"], ["1.5px", "#000"], ["1.5px", "#000"]] },
            { name: "Énfasis · 4px / rojo", lines: [["4px", "#000"], ["4px", B3D.red], ["4px", "#000"]] },
          ].map((l) => (
            <li key={l.name}>
              <span className="block text-[11px] uppercase tracking-[0.12em] text-ink-subtle mb-3" style={MONO}>{l.name}</span>
              <div className="space-y-3">
                {l.lines.map(([h, c], i) => <div key={i} style={{ height: h, background: c }} />)}
              </div>
            </li>
          ))}
        </ul>
      </FadeUp>

      {/* Tono de voz */}
      <FadeUp className="mt-16 md:mt-24">
        <Subtitle>Tono de voz</Subtitle>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {VOICE.map((v) => (
            <li key={v.n} className="border border-line rounded-xl p-5 bg-[var(--pj-bg)]">
              <span className="block text-xs mb-3" style={{ ...MONO, color: B3D.red }}>{v.n}</span>
              <h4 className="type-h4 text-ink mb-2">{v.title}</h4>
              <p className="type-body-s text-ink-muted">{v.text}</p>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-10">
          {[
            { title: "Así suena", ok: true, items: VOICE_OK },
            { title: "Así no", ok: false, items: VOICE_NO },
          ].map((g) => (
            <div key={g.title}>
              <h4 className="flex items-center gap-2 type-overline uppercase text-ink mb-2">
                <Tick ok={g.ok} /> {g.title}
              </h4>
              <ul>
                {g.items.map((e) => (
                  <li key={e.q} className="py-4 border-b border-line">
                    <p
                      className={`text-lg md:text-xl leading-tight ${g.ok ? "text-ink" : "text-ink-subtle line-through decoration-1"}`}
                      style={SYNE}
                    >
                      {e.q}
                    </p>
                    <p className="text-xs text-ink-subtle mt-1.5" style={MONO}>— {e.why}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}

// ─── 04 · Del Manual a la Web ───────────────────────────────────────────────

const COMPARISONS = [
  {
    title: "Navegación",
    note: "Misma estructura: símbolo + nombre a la izquierda, navegación en mono mayúsculas y un único CTA negro. En el sitio, las secciones se ordenaron según cómo busca el cliente: catálogo, servicios y nosotros.",
    manual: img.manualNavbar,
    web: img.webHeader,
    // Thin strips read better full width, one above the other
    stacked: true,
  },
  {
    title: "Hero",
    note: "El manual define la jerarquía: etiqueta, título en Syne, bajada en mono y dos botones. En el sitio se sumó la impresora en isométrico y datos concretos —500+ piezas, 48 hs, 100% local—, siguiendo la regla de tono: el dato antes que el adjetivo.",
    manual: img.manualHero,
    web: img.webHero,
  },
  {
    title: "Formulario de presupuesto",
    note: "El formulario de cotización se transformó en un flujo de 5 pasos que arranca por el tipo de usuario (particular, taller mecánico, empresa o diseñador), con WhatsApp como alternativa siempre visible.",
    manual: img.manualForm,
    web: img.pagePresupuesto,
  },
];

const PAGES = [
  { label: "Inicio", path: "", images: [img.webHero, img.webServicios, img.webComoFunciona, img.webCatalogo, img.webCtaFooter] },
  { label: "Catálogo", path: "catalogo", images: [img.pageCatalogo] },
  { label: "Servicios", path: "servicios", images: [img.pageServicios] },
  { label: "Nosotros", path: "nosotros", images: [img.pageNosotros] },
  { label: "Presupuesto", path: "presupuesto", images: [img.pagePresupuesto] },
];

const PHONES = [
  { label: "Inicio", src: img.mobileHero },
  { label: "Servicios", src: img.mobileServicios },
  { label: "¿Cómo funciona?", src: img.mobileComoFunciona },
  { label: "Catálogo", src: img.mobileCatalogo },
  { label: "Servicios en detalle", src: img.mobileServiciosPage },
];

function Frame({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <figure>
      <figcaption className="mb-2">
        <span className="inline-block text-[11px] uppercase tracking-[0.14em] text-ink-subtle" style={MONO}>{label}</span>
      </figcaption>
      <img src={src} alt={alt} loading="lazy" className="block w-full h-auto" />
    </figure>
  );
}

const GOLD = "rgb(201,188,63)";

function BrowserFrame({ page, className = "" }: { page: (typeof PAGES)[number]; className?: string }) {
  return (
    <div className={`rounded-xl border border-line overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] ${className}`}>
      <div className="flex items-center gap-3 px-3 md:px-4 py-2.5 border-b border-[#E5E5E5] bg-[#F4F4F4]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E0443E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#DEA123]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#1AAB29]" />
        </div>
        <span className="flex-1 min-w-0 truncate text-center text-xs text-[#666] bg-white rounded-md py-1 px-3">
          build3d.ar/{page.path}
        </span>
      </div>
      <div className="max-h-[60vh] md:max-h-[72vh] overflow-y-auto overscroll-contain" tabIndex={0} aria-label={`Página ${page.label}`}>
        {page.images.map((src, i) => (
          <img key={i} src={src} alt={`Sitio de BUILD.3D — ${page.label}`} loading="lazy" className="block w-full h-auto" />
        ))}
      </div>
    </div>
  );
}

/** Gold dash for the active item, small dots for the rest (same as the home "Mi proceso" frames). */
function PageDots({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center justify-center gap-[6px]">
      {PAGES.map((p, i) => (
        <button
          key={p.label}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Ir a ${p.label}`}
          className="py-2"
        >
          <span
            className={`block rounded-full transition-all duration-500 ${i === active ? "w-5 h-[1.5px]" : "w-[3px] h-[3px] bg-ink/25"}`}
            style={i === active ? { background: GOLD } : undefined}
          />
        </button>
      ))}
    </div>
  );
}

function BrowserGallery() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mobile: keep the active page in sync with the swipe position
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(Math.max(0, Math.min(PAGES.length - 1, i)));
  };
  const goTo = (i: number) => {
    setActive(i);
    const el = trackRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div>
      {/* Desktop — typographic tabs, like the portfolio's section nav */}
      <div className="hidden md:block">
        <div className="flex items-baseline gap-8 mb-6" role="tablist" aria-label="Páginas del sitio">
          {PAGES.map((p, i) => (
            <button
              key={p.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`relative leading-[1.1] transition-all duration-300 origin-left hover:scale-[1.05] ${
                i === active ? "text-[26px] font-bold text-ink" : "text-[24px] font-light text-ink-subtle hover:text-ink"
              }`}
            >
              {p.label}
              {i === active && (
                <span className="absolute left-0 -bottom-2 w-5 h-[1.5px] rounded-full" style={{ background: GOLD }} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
        <BrowserFrame page={PAGES[active]} />
        <p className="type-caption text-ink-subtle mt-3">Scrolleá dentro de la ventana para recorrer la página.</p>
      </div>

      {/* Mobile — swipe between pages */}
      <div className="md:hidden">
        <div className="flex items-baseline justify-between mb-4" aria-live="polite">
          <span className="text-[26px] font-bold leading-[1.1] text-ink">{PAGES[active].label}</span>
          <span className="type-caption tabular-nums text-ink-subtle">{active + 1} / {PAGES.length}</span>
        </div>
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory -mx-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Páginas del sitio"
        >
          {PAGES.map((p) => (
            <div key={p.label} className="w-full flex-shrink-0 snap-center px-4">
              <BrowserFrame page={p} />
            </div>
          ))}
        </div>
        <div className="mt-3">
          <PageDots active={active} onSelect={goTo} />
        </div>
        <p className="type-caption text-ink-subtle mt-1 text-center">Deslizá para cambiar de página · scrolleá dentro de la ventana</p>
      </div>
    </div>
  );
}

export function Build3DWebSection() {
  useBrandFonts();

  return (
    <div>
      <Title>Del Manual a la Web</Title>
      <FadeUp>
        <p className="type-body-l text-ink-muted">
          El manual no terminó en un PDF. Sumé una sección de aplicaciones —navbar, botones, hero y formulario—
          pensada como punto de partida del sitio, y colaboré con el desarrollo para que cada componente llegara a
          producción respetando el sistema.
        </p>
      </FadeUp>

      <div className="mt-12 md:mt-16 space-y-14 md:space-y-20">
        {COMPARISONS.map((c) => (
          <FadeUp key={c.title}>
            <article>
              <div className="h-px bg-line mb-6" aria-hidden="true" />
              <h3 className="type-h2 text-ink mb-3">{c.title}</h3>
              <p className="type-body text-ink-muted mb-6">{c.note}</p>
              <div className={`grid grid-cols-1 gap-5 md:gap-6 items-start ${"stacked" in c ? "" : "md:grid-cols-2"}`}>
                <Frame label="Manual de marca" src={c.manual} alt={`${c.title} en el manual de marca`} />
                <Frame label="Sitio web" src={c.web} alt={`${c.title} en build3d.ar`} />
              </div>
            </article>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-16 md:mt-24">
        <Subtitle>Animaciones</Subtitle>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 md:gap-10 items-center">
          <div>
            <h4 className="type-h3 text-ink mb-3">La impresora del hero</h4>
            <p className="type-body text-ink-muted">
              El hero muestra una impresora 3D en isométrico, con los primarios de la marca en el filamento y los
              carretes. La pieza se imprime capa por capa y el ciclo vuelve a empezar: el servicio explicado sin
              palabras en el primer pantallazo.
            </p>
          </div>
          <LoopVideo
            src={img.printerVideo}
            poster={img.printerPoster}
            label="Impresora 3D del hero de build3d.ar imprimiendo una pieza amarilla capa por capa"
            className="w-full max-w-[460px] mx-auto"
          />
        </div>
        <h4 className="type-h3 text-ink mt-12 md:mt-16 mb-3">El footer</h4>
        <p className="type-body text-ink-muted mb-6">
          El cierre del sitio usa el mismo vocabulario de la marca: las piezas isométricas caen y se apilan sobre el
          footer, y la palabra "pieza" va cambiando entre los tres primarios.
        </p>
        <LoopVideo
          src={img.footerVideo}
          poster={img.footerPoster}
          label="Footer de build3d.ar: piezas isométricas que caen y se apilan, y la palabra pieza cambiando de color"
        />
      </FadeUp>

      <FadeUp className="mt-16 md:mt-24">
        <Subtitle>El sitio</Subtitle>
        <BrowserGallery />
      </FadeUp>

      <FadeUp className="mt-16 md:mt-24">
        <Subtitle>Versión mobile</Subtitle>
        <ul className="flex md:grid md:grid-cols-5 gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-2">
          {PHONES.map((p) => (
            <li key={p.label} className="snap-center flex-shrink-0 w-[58vw] max-w-[240px] md:w-auto md:max-w-none">
              <div className="rounded-2xl border border-line overflow-hidden bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                <img src={p.src} alt={`Sitio de BUILD.3D en mobile — ${p.label}`} loading="lazy" className="block w-full h-auto" />
              </div>
              <span className="block type-caption text-ink-subtle mt-3 text-center">{p.label}</span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </div>
  );
}

/** Animation recorded from build3d.ar as a short loop (poster only with reduced motion). */
function LoopVideo({ src, poster, label, className = "" }: { src: string; poster: string; label: string; className?: string }) {
  const [reduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  return (
    <video
      src={src}
      poster={poster}
      autoPlay={!reduced}
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
      className={`block w-full h-auto ${className}`}
    />
  );
}

// ─── UI Kit ─────────────────────────────────────────────────────────────────
// Components of build3d.ar rebuilt with the site's own styles (IBM Plex Mono,
// Syne, #0a0a0a ink, square corners), so they stay crisp and interactive.

const INK = "#0a0a0a";
const SITE_BLUE = "#1b3fab";
const btnBase =
  "inline-block text-center text-xs uppercase tracking-widest transition-transform duration-150 hover:scale-[0.97] cursor-pointer";

function Tile({ label, children, dark = false, className = "" }: { label: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <figure className={`flex flex-col ${className}`}>
      {/* Only components that live on black in the site keep a backdrop */}
      <div
        className={`flex-1 flex items-center ${dark ? "p-5 md:p-7" : "py-2"}`}
        style={dark ? { background: INK } : undefined}
      >
        {/* The global `* { font-family }` rule blocks inheritance, so re-enable it inside the tile */}
        <div className="w-full [&_*]:[font-family:inherit]" style={{ ...MONO, color: dark ? "#fff" : INK }}>{children}</div>
      </div>
      <figcaption className="type-caption text-ink-subtle mt-2">{label}</figcaption>
    </figure>
  );
}

function SiteField({ label, value, placeholder, state }: { label: string; value?: string; placeholder: string; state?: "focus" }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(10,10,10,.5)" }}>{label}</span>
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="border px-4 py-3 text-sm outline-none bg-white w-full transition-colors duration-150 focus:!border-[#c8302a]"
        style={{ ...MONO, borderColor: state === "focus" ? B3D.red : INK, color: INK }}
      />
    </label>
  );
}

const USER_TYPES = ["Particular", "Taller mecánico", "Empresa", "Diseñador"];
const FILTERS = [["Todos", 12], ["Autopartes", 5], ["Industrial", 4], ["Personalizado", 2], ["Prototipos", 1]] as const;
const MATERIAL_CHIPS: [string, string][] = [["PLA", B3D.blue], ["ABS", B3D.yellow], ["PETG", B3D.red], ["ASA", B3D.blue], ["TPU", B3D.yellow], ["Nylon", B3D.red]];

export function Build3DUIKitSection() {
  useBrandFonts();
  const [userType, setUserType] = useState(1);
  const [filter, setFilter] = useState(0);

  return (
    <div>
      <Title>UI Kit</Title>
      <FadeUp>
        <p className="type-body-l text-ink-muted">
          Los componentes del sitio salen directo del manual: esquinas rectas, bordes negros de 1px, IBM Plex Mono en
          mayúsculas para la interfaz y Syne para los títulos. El rojo marca el foco y el azul el filtro activo.
          Probá los chips, los filtros y el campo de texto.
        </p>
      </FadeUp>

      {/* Botones */}
      <FadeUp className="mt-12 md:mt-16">
        <Subtitle>Botones y links</Subtitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Tile label="Primario · Secundario">
            <div className="flex flex-wrap gap-3">
              <span className={`${btnBase} px-6 py-3.5 text-white`} style={{ background: INK }}>Pedir presupuesto</span>
              <span className={`${btnBase} px-6 py-3.5 border bg-white`} style={{ borderColor: INK }}>Ver catálogo</span>
            </div>
          </Tile>
          <Tile label="CTA sobre negro" dark>
            <span className={`${btnBase} px-8 py-4 bg-white`} style={{ color: INK }}>Pedir presupuesto →</span>
          </Tile>
          <Tile label="Deshabilitado · Habilitado">
            <div className="flex flex-col gap-3">
              <span className="block text-center px-6 py-3 text-xs uppercase tracking-widest text-white opacity-30 cursor-not-allowed" style={{ background: INK }}>Siguiente →</span>
              <span className={`${btnBase} block px-6 py-3 text-white`} style={{ background: INK }}>Siguiente →</span>
            </div>
          </Tile>
          <Tile label="Link de card">
            <span className="text-[10px] uppercase tracking-widest border-b pb-0.5 cursor-pointer" style={{ borderColor: INK }}>Pedir esta pieza</span>
          </Tile>
          <Tile label="Link de sección">
            <span className="text-lg cursor-pointer transition-colors duration-200 hover:text-[#c8302a]" style={SYNE}>Ver catálogo completo →</span>
          </Tile>
          <Tile label="Contacto directo">
            <span className={`${btnBase} block w-full px-5 py-3 border`} style={{ borderColor: INK }}>WhatsApp →</span>
          </Tile>
        </div>
      </FadeUp>

      {/* Formularios */}
      <FadeUp className="mt-12 md:mt-16">
        <Subtitle>Formulario de presupuesto</Subtitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          <Tile label="Progreso · Campos (default, foco y completo)">
            <div className="flex mb-6" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-1 h-[3px]" style={{ background: i === 0 ? INK : "#e5e5e5" }} />
              ))}
            </div>
            <p className="text-xl mb-5" style={{ ...SYNE, color: INK, letterSpacing: "-0.02em" }}>Tus datos</p>
            <div className="flex flex-col gap-4">
              <SiteField label="Nombre" placeholder="Tu nombre completo" />
              <SiteField label="WhatsApp" placeholder="+54 9 291 506-0651" state="focus" />
              <SiteField label="Email" placeholder="tu@email.com" value="martin@taller.com" />
            </div>
          </Tile>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            <Tile label="Tipo de usuario · selección única">
              <span className="block text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(10,10,10,.5)" }}>Tipo de usuario</span>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tipo de usuario">
                {USER_TYPES.map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={userType === i}
                    onClick={() => setUserType(i)}
                    className="px-4 py-3 min-h-[44px] border text-[11px] uppercase tracking-widest transition-colors duration-150"
                    style={{ ...MONO, borderColor: INK, background: userType === i ? INK : "transparent", color: userType === i ? "#fff" : INK }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Tile>
            <Tile label="Bloque de confianza">
              <p className="text-base mb-4" style={{ ...SYNE, color: INK }}>¿Por qué elegirnos?</p>
              <ul className="space-y-2.5">
                {["Respuesta en menos de 24hs", "Sin compromiso de compra", "Fabricación 100% local", "Envíos a todo el país"].map((t) => (
                  <li key={t} className="flex gap-3 text-xs" style={{ color: "rgba(10,10,10,.7)" }}>
                    <span style={{ color: B3D.red }}>—</span>{t}
                  </li>
                ))}
              </ul>
            </Tile>
          </div>
        </div>
      </FadeUp>

      {/* Catálogo */}
      <FadeUp className="mt-12 md:mt-16">
        <Subtitle>Catálogo</Subtitle>
        <div className="flex flex-col gap-3 md:gap-4">
          <Tile label="Filtros por categoría · activo en azul">
            <div className="overflow-x-auto -mx-1 px-1">
              <div className="flex border-t border-l min-w-[600px]" style={{ borderColor: INK }} role="tablist" aria-label="Categorías">
                {FILTERS.map(([name, count], i) => (
                  <button
                    key={name}
                    type="button"
                    role="tab"
                    aria-selected={filter === i}
                    onClick={() => setFilter(i)}
                    className="grow basis-0 min-h-[44px] px-3 border-r border-b text-[10px] uppercase tracking-widest whitespace-nowrap transition-colors duration-150"
                    style={{ ...MONO, borderColor: INK, background: filter === i ? SITE_BLUE : "transparent", color: filter === i ? "#fff" : "rgba(10,10,10,.6)" }}
                  >
                    {name} <span style={{ color: filter === i ? "rgba(255,255,255,.6)" : "rgba(10,10,10,.4)" }}>{count}</span>
                  </button>
                ))}
              </div>
            </div>
          </Tile>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-3 md:gap-4">
            <div className="flex flex-col gap-3 md:gap-4">
              <Tile label="Etiqueta de ubicación" className="flex-1">
                <span className="inline-block text-[9px] uppercase tracking-[0.15em] whitespace-nowrap border px-3 py-1.5" style={{ borderColor: "rgba(10,10,10,.2)" }}>
                  Impresión 3D · Bahía Blanca · 48hs
                </span>
              </Tile>
              <Tile label="Chips de material" className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {MATERIAL_CHIPS.map(([m, c]) => (
                    <span key={m} className="text-[10px] uppercase tracking-widest px-3 py-1.5 border text-white" style={{ background: c, borderColor: INK }}>{m}</span>
                  ))}
                </div>
              </Tile>
            </div>
            <Tile label="Card de producto">
              <div className="max-w-[240px] mx-auto border-x" style={{ borderColor: INK }}>
                <img src={img.uiProductCard} alt="Card de producto del catálogo de BUILD.3D: soporte motor Toyota" loading="lazy" className="block w-full h-auto" />
              </div>
            </Tile>
          </div>
        </div>
      </FadeUp>

      {/* Contenido */}
      <FadeUp className="mt-12 md:mt-16">
        <Subtitle>Contenido</Subtitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Tile label="Datos destacados" className="sm:col-span-2">
            <div className="grid grid-cols-3 gap-4">
              {[["500+", "Piezas fabricadas"], ["48hs", "Entrega express"], ["100%", "Fabricado en Argentina"]].map(([n, l]) => (
                <div key={l}>
                  <p className="text-xl sm:text-2xl leading-none mb-1" style={{ ...SYNE, color: INK }}>{n}</p>
                  <p className="text-[10px] uppercase tracking-widest leading-tight" style={{ color: "rgba(10,10,10,.5)" }}>{l}</p>
                </div>
              ))}
            </div>
          </Tile>
          <Tile label="Material">
            <p className="text-sm mb-1.5" style={{ ...SYNE, color: INK }}>PETG</p>
            <p className="text-[11px] leading-relaxed" style={{ color: "rgba(10,10,10,.6)" }}>Resistencia mecánica · uso general</p>
          </Tile>
          <Tile label="Botón flotante de WhatsApp · el ícono diseñado como si fuera una pieza impresa en 3D, con las capas de filamento a la vista">
            <img src={img.uiWhatsapp} alt="Botón flotante de WhatsApp diseñado como una pieza impresa en 3D, con líneas de capa" loading="lazy" className="block w-32 h-auto mx-auto" />
          </Tile>
          <Tile label="Paso del proceso" className="sm:col-span-2">
            <p className="text-[64px] leading-none mb-3" style={{ ...SYNE, color: "rgba(10,10,10,.08)", letterSpacing: "-0.04em" }}>01</p>
            <p className="text-xl mb-2 leading-tight" style={{ ...SYNE, color: INK }}>Mandá la consulta</p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(10,10,10,.7)" }}>
              Completá el formulario o escribinos por WhatsApp con foto, medidas, marca/modelo y uso previsto de la pieza.
            </p>
          </Tile>
          <Tile label="Título de cierre" dark className="sm:col-span-2">
            <p className="text-[clamp(26px,4vw,40px)] leading-[1.05] uppercase text-center" style={SYNE}>
              ¿Necesitás una <span style={{ color: B3D.yellow }}>pieza</span>?
            </p>
          </Tile>
        </div>
      </FadeUp>
    </div>
  );
}
