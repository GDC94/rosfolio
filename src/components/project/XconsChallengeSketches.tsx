import type { ReactNode } from "react";
import { Arrow, Blob, Box, Line, Pen, Pill, Ring } from "./sketchKit";

/**
 * XCONS "Desafíos": one croquis per challenge, in the same marker style as the
 * pricing sketches (sketchKit). Wrap them in SketchFillContext with XCONS_GREEN.
 */

// 01 — the cart is crossed out and becomes a quote (presupuesto)
const CartToQuoteSketch = (
  <>
    {/* cart */}
    <Pen d="M14 36 L24 36 L32 74 L70 74" />
    <Blob d="M28 44 L80 44 L74 66 L32 66 Z" />
    <Pen d="M27 44 L80 44 L74 66 L32 66" />
    <Line x1={44} y1={46} x2={46} y2={64} light />
    <Line x1={58} y1={46} x2={58} y2={64} light />
    <Ring cx={38} cy={84} r={5} width={2} />
    <Ring cx={66} cy={84} r={5} width={2} />
    {/* cross-out */}
    <Pen d="M20 30 L86 92" width={2.6} />
    <Pen d="M86 30 L22 92" width={2.6} />
    <Arrow d="M94 60 Q110 46 124 58" x2={124} y2={58} angle={35} />
    {/* quote: header, item rows, total and a confirm button */}
    <Box x={132} y={16} w={54} h={84} />
    <Box x={138} y={24} w={42} h={8} fill hatch />
    <Line x1={140} y1={42} x2={170} y2={42} />
    <Line x1={140} y1={52} x2={164} y2={52} light />
    <Line x1={140} y1={62} x2={172} y2={62} light />
    <Line x1={140} y1={72} x2={160} y2={72} light />
    <Pill x={146} y={84} w={30} h={9} fill />
  </>
);

// 02 — paid today (receipt with a check) vs. three deliveries spread over time
const PaymentVsDeliverySketch = (
  <>
    <Box x={14} y={22} w={44} h={58} />
    <Line x1={22} y1={34} x2={50} y2={34} light />
    <Line x1={22} y1={44} x2={44} y2={44} light />
    <Ring cx={36} cy={62} r={9} fill />
    <Pen d="M31 62 L35 66 L42 57" width={2.2} />
    {/* timeline */}
    <Pen d="M70 92 L188 92" light />
    {[0, 1, 2].map((i) => {
      const x = 74 + i * 40;
      return (
        <g key={i}>
          <Box x={x} y={66} w={20} h={14} fill={i === 0} hatch={i === 1} />
          <Pen d={`M${x + 20} 70 L${x + 28} 70 L${x + 32} 76 L${x + 32} 80 L${x + 20} 80`} />
          <Ring cx={x + 6} cy={84} r={3} width={1.8} />
          <Ring cx={x + 26} cy={84} r={3} width={1.8} />
          <Line x1={x + 10} y1={88} x2={x + 10} y2={96} light />
        </g>
      );
    })}
    <Arrow d="M60 40 Q90 28 118 46" x2={118} y2={46} angle={30} />
  </>
);

// 03 — owner, architect and builder share one quote, each with a different role tag
const PEOPLE = [
  { cx: 34, fill: true, hatch: false },
  { cx: 100, fill: false, hatch: true },
  { cx: 166, fill: true, hatch: true },
];
const MultiPersonSketch = (
  <>
    <Box x={80} y={6} w={40} h={40} />
    <Box x={86} y={12} w={28} h={6} fill hatch />
    <Line x1={88} y1={26} x2={112} y2={26} light />
    <Line x1={88} y1={34} x2={106} y2={34} light />
    {PEOPLE.map(({ cx, fill, hatch }) => (
      <g key={cx}>
        <Pen d={`M${cx} 56 Q${(cx + 100) / 2} 50 100 48`} light />
        <Ring cx={cx} cy={66} r={7} />
        <Pen d={`M${cx - 14} 102 Q${cx - 13} 82 ${cx} 78 Q${cx + 13} 82 ${cx + 14} 102`} />
        <Pill x={cx - 13} y={106} w={26} h={8} fill={fill} hatch={hatch} />
      </g>
    ))}
  </>
);

export const XCONS_CHALLENGE_SKETCHES: ReactNode[] = [CartToQuoteSketch, PaymentVsDeliverySketch, MultiPersonSketch];
