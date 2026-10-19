import { createContext, useContext, type ReactNode } from "react";

/**
 * Drawing kit that mimics the HacheR low-fi wireframes (src/assets/hr/wireframe-layers):
 * thick black marker strokes whose lines overshoot the corners, flat lavender fills
 * slightly out of register with the outline, diagonal hatching and double-traced
 * circles. Everything stays vector so strokes are crisp at any size.
 */

export const PURPLE = "#9483BD";
/** XCONS brand green, same flat-marker value as the HacheR lavender. */
export const XCONS_GREEN = "#8FC07C";

/** Fill colour for every filled shape below (lavender by default, per project otherwise). */
export const SketchFillContext = createContext(PURPLE);
const useFill = () => useContext(SketchFillContext);
const INK = "#1E1E1E";

/** Deterministic pseudo-random in [-1, 1] from a pair of numbers. */
const jitter = (a: number, b: number) => {
  const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
};

/** A straight marker stroke, bowed very slightly so it reads as freehand. */
const strokePath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const bow = Math.min(1.2, len * 0.025) * jitter(x1 + x2, y1 + y2);
  const mx = (x1 + x2) / 2 - (dy / len) * bow;
  const my = (y1 + y2) / 2 + (dx / len) * bow;
  return `M${x1} ${y1} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2} ${y2}`;
};

interface StrokeProps {
  light?: boolean;
  width?: number;
}

const strokeAttrs = ({ light, width = 2.4 }: StrokeProps) => ({
  fill: "none",
  stroke: INK,
  strokeOpacity: light ? 0.3 : 1,
  strokeWidth: light ? width * 0.75 : width,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function Line({ x1, y1, x2, y2, ...s }: { x1: number; y1: number; x2: number; y2: number } & StrokeProps) {
  return <path d={strokePath(x1, y1, x2, y2)} {...strokeAttrs(s)} />;
}

/** Free path (curves etc.) with marker styling. */
export function Pen({ d, color, ...s }: { d: string; color?: string } & StrokeProps) {
  return <path d={d} {...strokeAttrs(s)} stroke={color ?? INK} />;
}

/** Diagonal hatching clipped to a rectangle. */
function Hatch({ x, y, w, h, gap = 4 }: { x: number; y: number; w: number; h: number; gap?: number }) {
  const lines: string[] = [];
  for (let x0 = x - h; x0 < x + w; x0 += gap) {
    const t0 = Math.max(0, x - x0);
    const t1 = Math.min(h, x + w - x0);
    if (t1 <= t0) continue;
    lines.push(`M${x0 + t0} ${y + h - t0} L${x0 + t1} ${y + h - t1}`);
  }
  return <path d={lines.join(" ")} stroke={INK} strokeWidth={1.1} strokeLinecap="round" fill="none" />;
}

interface BoxProps extends StrokeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  fill?: boolean;
  hatch?: boolean;
  /** Horizontal rows drawn inside (table/list look). */
  rows?: number;
  /** Vertical columns drawn inside. */
  cols?: number;
  children?: ReactNode;
}

/** Rectangle drawn as four marker strokes that overshoot the corners. */
export function Box({ x, y, w, h, fill, hatch, rows = 0, cols = 0, ...s }: BoxProps) {
  const color = useFill();
  const o = (k: number) => 2 + Math.abs(jitter(x + k, y - k)) * 3;
  const r = (k: number) => jitter(x * k, y + w) * 0.8;
  const sides = [
    strokePath(x - o(1), y + r(1), x + w + o(2), y + r(2)),
    strokePath(x + w + r(3), y - o(3), x + w + r(4), y + h + o(4)),
    strokePath(x + w + o(5), y + h + r(5), x - o(6), y + h + r(6)),
    strokePath(x + r(7), y + h + o(7), x + r(8), y - o(8)),
  ];
  const inner: string[] = [];
  for (let i = 1; i <= rows; i++) {
    const yy = y + (h * i) / (rows + 1);
    inner.push(strokePath(x, yy, x + w, yy + r(10 + i)));
  }
  for (let i = 1; i <= cols; i++) {
    const xx = x + (w * i) / (cols + 1);
    inner.push(strokePath(xx, y, xx + r(20 + i), y + h));
  }
  return (
    <g>
      {fill && <rect x={x + 1.5} y={y + 1.8} width={w - 0.5} height={h - 0.6} fill={color} />}
      {hatch && <Hatch x={x} y={y} w={w} h={h} />}
      <path d={[...sides, ...inner].join(" ")} {...strokeAttrs(s)} />
    </g>
  );
}

/** Rounded pill (button / input / toggle), closed with a small overlap. */
export function Pill({ x, y, w, h, fill, hatch, ...s }: { x: number; y: number; w: number; h: number; fill?: boolean; hatch?: boolean } & StrokeProps) {
  const color = useFill();
  const r = h / 2;
  const k = r * 1.33;
  const d = [
    `M${x + r - 2} ${y + 0.4}`,
    `L${x + w - r} ${y}`,
    `C${x + w - r + k} ${y} ${x + w - r + k} ${y + h} ${x + w - r} ${y + h}`,
    `L${x + r} ${y + h + 0.3}`,
    `C${x + r - k} ${y + h} ${x + r - k} ${y} ${x + r + 4} ${y - 0.5}`,
  ].join(" ");
  return (
    <g>
      {fill && <rect x={x + 1.5} y={y + 1.5} width={w - 1} height={h - 0.5} rx={r} fill={color} />}
      {hatch && <Hatch x={x + r} y={y} w={w - 2 * r} h={h} gap={3.5} />}
      <path d={d} {...strokeAttrs(s)} />
    </g>
  );
}

/** Circle traced twice, slightly off, like the zoom circles in the wireframes. */
export function Ring({ cx, cy, r, fill, ...s }: { cx: number; cy: number; r: number; fill?: boolean } & StrokeProps) {
  const color = useFill();
  return (
    <g>
      {fill && <circle cx={cx + 1} cy={cy + 1} r={r} fill={color} />}
      <circle cx={cx} cy={cy} r={r} {...strokeAttrs(s)} />
      <circle cx={cx + 0.7} cy={cy - 0.5} r={r + 0.6} {...strokeAttrs({ ...s, width: (s.width ?? 2.4) * 0.5 })} />
    </g>
  );
}

/** Free filled shape in the project fill colour, offset like a marker fill. */
export function Blob({ d }: { d: string }) {
  return <path d={d} fill={useFill()} transform="translate(1.5 1.5)" />;
}

/** Hand-drawn arrow: curved shaft and an open head at (x2, y2). */
export function Arrow({ d, x2, y2, angle }: { d: string; x2: number; y2: number; angle: number }) {
  const a = (angle * Math.PI) / 180;
  const head = (da: number) => `M${x2} ${y2} L${(x2 - 8 * Math.cos(a + da)).toFixed(1)} ${(y2 - 8 * Math.sin(a + da)).toFixed(1)}`;
  return <path d={`${d} ${head(0.5)} ${head(-0.5)}`} {...strokeAttrs({})} />;
}

/** SVG frame shared by every croquis. */
export function SketchFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 200 118" className={`w-full h-auto block ${className}`} aria-hidden="true">
      {children}
    </svg>
  );
}
