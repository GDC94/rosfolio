import type { ReactNode } from "react";
import { Arrow, Blob, Box, Line, Pen, Pill, Ring } from "./sketchKit";

/** BUILD.3D red, lightened to the same flat-marker value as the HacheR lavender. */
export const BUILD3D_SKETCH_FILL = "#E58A80";

/** Isometric cube outline (top, left and right faces) with the left face filled. */
const isoCube = (cx: number, cy: number, s: number) => {
  const h = s / 2;
  const top = `M${cx} ${cy - s} L${cx + s} ${cy - h} L${cx} ${cy} L${cx - s} ${cy - h} Z`;
  const left = `M${cx - s} ${cy - h} L${cx} ${cy} L${cx} ${cy + s} L${cx - s} ${cy + h} Z`;
  const right = `M${cx} ${cy} L${cx + s} ${cy - h} L${cx + s} ${cy + h} L${cx} ${cy + s}`;
  return (
    <>
      <Blob d={left} />
      <Pen d={top} />
      <Pen d={left} />
      <Pen d={right} />
    </>
  );
};

// 01 — a generic factory (faded) turning into a design-studio cube
const StudioSketch = (
  <>
    <Pen d="M12 98 L12 56 L30 44 L30 56 L48 44 L48 56 L66 44 L66 98" light />
    <Line x1={6} y1={98} x2={74} y2={98} light />
    <Box x={18} y={24} w={8} h={26} light />
    <Box x={22} y={70} w={10} h={10} light />
    <Box x={44} y={70} w={10} h={10} light />
    <Arrow d="M80 64 Q94 52 108 60" x2={108} y2={60} angle={30} />
    {isoCube(150, 60, 30)}
    <Line x1={150} y1={36} x2={150} y2={46} light />
    <Line x1={186} y1={26} x2={194} y2={18} />
    <Line x1={190} y1={40} x2={198} y2={40} />
    <Line x1={110} y1={22} x2={116} y2={30} />
  </>
);

// 02 — the same mark landing on a business card and on a web screen
const SystemSketch = (
  <>
    {isoCube(42, 36, 20)}
    <Arrow d="M68 30 Q88 18 106 28" x2={106} y2={28} angle={30} />
    <Arrow d="M30 62 Q24 68 30 74" x2={30} y2={74} angle={60} />
    <Box x={112} y={14} w={76} h={54} />
    <Box x={112} y={14} w={76} h={10} fill hatch />
    <Line x1={122} y1={36} x2={160} y2={36} />
    <Line x1={122} y1={46} x2={174} y2={46} light />
    <Pill x={122} y={54} w={30} h={8} fill />
    <Line x1={150} y1={69} x2={150} y2={82} />
    <Line x1={136} y1={84} x2={164} y2={84} />
    <Box x={14} y={80} w={66} h={32} />
    <Box x={20} y={86} w={12} h={12} fill />
    <Line x1={40} y1={90} x2={70} y2={90} />
    <Line x1={40} y1={100} x2={62} y2={100} light />
  </>
);

// Gear teeth around (cx, cy), drawn as short radial marker strokes
const gearTeeth = (cx: number, cy: number, r: number, n: number) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return (
      <Line
        key={i}
        x1={+(cx + Math.cos(a) * r).toFixed(1)}
        y1={+(cy + Math.sin(a) * r).toFixed(1)}
        x2={+(cx + Math.cos(a) * (r + 7)).toFixed(1)}
        y2={+(cy + Math.sin(a) * (r + 7)).toFixed(1)}
        width={3.2}
      />
    );
  });

// 03 — a technical spec sheet with dimensions turned into a finished part, checked
const PartSketch = (
  <>
    <Box x={14} y={16} w={64} h={86} />
    <Box x={24} y={30} w={30} h={22} light />
    <Line x1={24} y1={60} x2={54} y2={60} />
    <Line x1={24} y1={56} x2={24} y2={64} />
    <Line x1={54} y1={56} x2={54} y2={64} />
    <Line x1={62} y1={30} x2={62} y2={52} />
    <Line x1={58} y1={30} x2={66} y2={30} />
    <Line x1={58} y1={52} x2={66} y2={52} />
    <Line x1={24} y1={74} x2={66} y2={74} light />
    <Line x1={24} y1={84} x2={58} y2={84} light />
    <Line x1={24} y1={92} x2={62} y2={92} light />
    <Arrow d="M86 60 Q100 48 114 58" x2={114} y2={58} angle={30} />
    {gearTeeth(150, 56, 20, 10)}
    <Ring cx={150} cy={56} r={20} fill />
    <Ring cx={150} cy={56} r={6} />
    <Ring cx={182} cy={94} r={11} />
    <Pen d="M176 94 L180 99 L189 88" width={2.8} />
  </>
);

export const BUILD3D_CHALLENGE_SKETCHES: ReactNode[] = [StudioSketch, SystemSketch, PartSketch];
