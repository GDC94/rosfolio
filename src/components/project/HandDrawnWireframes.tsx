import { useEffect, useId, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import framesSrc from "../../assets/hr/wireframe-layers/frames.png";
import { usePanelSettled } from "./sectionAnchor";
import arrowsSrc from "../../assets/hr/wireframe-layers/arrows.png";
import textsSrc from "../../assets/hr/wireframe-layers/texts.png";

/**
 * HacheR low-fidelity wireframes, split into 3 layers extracted from the
 * original sketch (frames / arrows / handwritten notes). They appear in that
 * order: frames fade in, arrows draw from the UI element to its note, and the
 * notes are revealed line by line as if written by hand.
 * Coordinates are in source-image pixels (1544 × 1031).
 */

const W = 1544;
const H = 1031;

type Box = [number, number, number, number]; // x0, y0, x1, y1
type Pt = [number, number];

const FRAMES: Box[] = [
  [122, 328, 634, 746],  // 0 — employee table
  [738, 237, 956, 537],  // 1 — "crear" detail
  [738, 557, 956, 857],  // 2 — "exportar" detail
  [1029, 237, 1421, 537], // 3 — load form
  [1032, 549, 1429, 853], // 4 — personal vs work data
];

const LINES: Box[] = [
  [1017, 127, 1360, 161], [1029, 161, 1348, 202], // 0-1 formularios
  [564, 164, 920, 198],                           // 2 crear (1)
  [87, 190, 251, 224],                            // 3 menú
  [638, 199, 845, 234],                           // 4 crear (2)
  [349, 201, 539, 236],                           // 5 filtros
  [79, 799, 565, 833], [73, 833, 571, 873], [246, 873, 397, 901], // 6-8 tabla
  [1054, 879, 1428, 914],                         // 9 separar (1)
  [658, 883, 961, 922],                           // 10 exportar (1)
  [1116, 916, 1366, 952],                         // 11 separar (2)
  [658, 929, 1018, 971],                          // 12 exportar (2)
  [1090, 951, 1392, 990],                         // 13 separar (3)
];

// Shaft from the UI element to the tip, then both barbs
const ARROWS: Record<string, Pt[][]> = {
  menu:        [[[207, 415], [207, 380], [206, 340], [204, 300], [198, 262], [191, 244]], [[191, 244], [176, 283]], [[191, 244], [221, 284]]],
  filtros:     [[[467, 405], [466, 380], [465, 340], [462, 300], [456, 280], [441, 258]], [[441, 258], [424, 290]], [[441, 258], [468, 297]]],
  tabla:       [[[320, 600], [300, 640], [288, 680], [280, 710], [277, 750], [276, 788]], [[276, 788], [258, 738]], [[276, 788], [304, 757]]],
  crear:       [[[598, 410], [620, 398], [650, 376], [680, 350], [705, 322], [722, 300], [731, 289]], [[731, 289], [686, 301]], [[731, 289], [713, 340]]],
  exportar:    [[[596, 645], [620, 660], [650, 678], [680, 700], [705, 725], [722, 748], [735, 775]], [[735, 775], [691, 755]], [[735, 775], [721, 714]]],
  formularios: [[[1363, 422], [1363, 372], [1358, 326], [1351, 281], [1342, 245], [1331, 217], [1318, 203]], [[1318, 203], [1304, 251]], [[1318, 203], [1358, 248]]],
  separar:     [[[1343, 772], [1356, 814], [1363, 849], [1366, 870], [1368, 880]], [[1368, 880], [1354, 858]], [[1368, 880], [1379, 856]]],
};

interface Group {
  frames: number[];
  arrows: string[];
  /** Text notes in the same order as `arrows`; each note is a list of line indexes. */
  notes: number[][];
  viewBox: [number, number, number, number];
}

const GROUPS: Group[] = [
  { frames: [0],    arrows: ["menu", "filtros", "tabla"],  notes: [[3], [5], [6, 7, 8]], viewBox: [50, 175, 600, 740] },
  { frames: [1, 2], arrows: ["crear", "exportar"],         notes: [[2, 4], [10, 12]],    viewBox: [545, 150, 490, 835] },
  { frames: [3, 4], arrows: ["formularios", "separar"],    notes: [[0, 1], [9, 11, 13]], viewBox: [995, 112, 455, 888] },
];

const ALL: Group = {
  frames: GROUPS.flatMap((g) => g.frames),
  arrows: GROUPS.flatMap((g) => g.arrows),
  notes: GROUPS.flatMap((g) => g.notes),
  viewBox: [50, 112, 1400, 888],
};

const toPath = (strokes: Pt[][]) =>
  strokes.map((pts) => "M" + pts.map(([x, y]) => `${x} ${y}`).join(" L")).join(" ");

const EASE = [0.22, 1, 0.36, 1] as const;

function Sketch({ group, label }: { group: Group; label: string }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  // Inside a horizontal panel, wait until it has finished sliding in
  const panelSettled = usePanelSettled();
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (inView && panelSettled !== false) setStarted(true);
  }, [inView, panelSettled]);
  const play = started || !!reduce;
  const t = (s: number) => (reduce ? 0 : s);
  const dur = (s: number) => (reduce ? 0 : s);

  // Timeline: frames → arrows → notes. Steps are spread over fixed windows so
  // the whole sketch finishes within ~2s regardless of how many items it has.
  const FRAME_DUR = 0.4;
  const FRAME_STEP = 0.25 / Math.max(group.frames.length - 1, 1);
  const ARROW_DUR = 0.45;
  const arrowsStart = 0.45;
  const ARROW_STEP = 0.35 / Math.max(group.arrows.length - 1, 1);
  const LINE_DUR = 0.3;
  const notesStart = 1.1;
  const LINE_STEP = 0.55 / Math.max(group.notes.flat().length - 1, 1);
  let lineDelay = notesStart;

  return (
    <svg
      ref={ref}
      viewBox={group.viewBox.join(" ")}
      className="w-full h-auto block"
      role="img"
      aria-label={label}
    >
      <defs>
        {group.frames.map((f) => {
          const [x0, y0, x1, y1] = FRAMES[f];
          return (
            <clipPath key={f} id={`${uid}-f${f}`}>
              <rect x={x0 - 18} y={y0 - 9} width={x1 - x0 + 36} height={y1 - y0 + 18} />
            </clipPath>
          );
        })}

        <mask id={`${uid}-arrows`} maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
          {group.arrows.map((name, i) => (
            <motion.path
              key={name}
              d={toPath(ARROWS[name])}
              fill="none"
              stroke="white"
              strokeWidth={36}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={play ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { delay: t(arrowsStart + i * ARROW_STEP), duration: dur(ARROW_DUR), ease: [0.65, 0, 0.35, 1] },
                opacity: { delay: t(arrowsStart + i * ARROW_STEP), duration: dur(0.05) },
              }}
            />
          ))}
        </mask>

        {group.notes.flat().map((l) => {
          const [x0, y0, x1, y1] = LINES[l];
          const delay = lineDelay;
          lineDelay += LINE_STEP;
          return (
            <clipPath key={l} id={`${uid}-l${l}`}>
              <motion.rect
                x={x0 - 6}
                y={y0 - 4}
                width={0}
                height={y1 - y0 + 8}
                initial={{ width: 0 }}
                animate={{ width: play ? x1 - x0 + 12 : 0 }}
                transition={{ delay: t(delay), duration: dur(LINE_DUR), ease: "easeInOut" }}
              />
            </clipPath>
          );
        })}
      </defs>

      {/* 1 · Frames */}
      {group.frames.map((f, i) => (
        <motion.g
          key={f}
          initial={{ opacity: 0, y: 18 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: t(i * FRAME_STEP), duration: dur(FRAME_DUR), ease: EASE }}
        >
          <image href={framesSrc} x={0} y={0} width={W} height={H} clipPath={`url(#${uid}-f${f})`} />
        </motion.g>
      ))}

      {/* 2 · Arrows */}
      <image href={arrowsSrc} x={0} y={0} width={W} height={H} mask={`url(#${uid}-arrows)`} />

      {/* 3 · Handwritten notes */}
      {group.notes.flat().map((l) => (
        <image key={l} href={textsSrc} x={0} y={0} width={W} height={H} clipPath={`url(#${uid}-l${l})`} />
      ))}
    </svg>
  );
}

// Mobile: two stacked blocks — the employee table with its "crear"/"exportar"
// details, then the load forms — so each reads larger while staying whole.
const MOBILE_GROUPS: Group[] = [
  {
    frames: [...GROUPS[0].frames, ...GROUPS[1].frames],
    arrows: [...GROUPS[0].arrows, ...GROUPS[1].arrows],
    notes: [...GROUPS[0].notes, ...GROUPS[1].notes],
    viewBox: [50, 150, 985, 835],
  },
  GROUPS[2],
];

export default function HandDrawnWireframes() {
  const label = "Wireframes en baja fidelidad dibujados a mano de la gestión de empleados, con anotaciones";
  return (
    <>
      {/* Desktop — full sketch */}
      <div className="hidden md:block">
        <Sketch group={ALL} label={label} />
      </div>
      <div className="md:hidden space-y-8">
        {/* Width relative to the widest block; the narrow forms block is bumped up a bit */}
        {MOBILE_GROUPS.map((g, i) => (
          <div
            key={i}
            className="mx-auto"
            style={{ width: `${Math.min(100, (g.viewBox[2] / MOBILE_GROUPS[0].viewBox[2]) * 100 * (i > 0 ? 1.35 : 1))}%` }}
          >
            <Sketch group={g} label={label} />
          </div>
        ))}
      </div>
    </>
  );
}
