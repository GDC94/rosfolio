import type { ReactNode } from "react";
import { Arrow, Blob, Box, Line, Pen, Pill, Ring } from "./sketchKit";

/** Jodify violet, lightened to the same flat-marker value as the HacheR lavender. */
export const JODIFY_SKETCH_FILL = "#B391F2";

// 01 — discovering events that match your taste: a magnifier over a phone with genre chips
const DiscoverSketch = (
  <>
    <Box x={78} y={6} w={64} h={106} />
    <Pill x={86} y={15} w={48} h={9} />
    <Pill x={86} y={29} w={20} h={9} fill hatch />
    <Pill x={110} y={29} w={24} h={9} />
    <Box x={86} y={44} w={48} h={20} />
    <Box x={89} y={47} w={14} h={14} fill />
    <Line x1={108} y1={50} x2={130} y2={50} />
    <Line x1={108} y1={58} x2={122} y2={58} light />
    <Box x={86} y={70} w={48} h={20} />
    <Box x={89} y={73} w={14} h={14} fill />
    <Line x1={108} y1={76} x2={130} y2={76} />
    <Line x1={108} y1={84} x2={120} y2={84} light />
    <Line x1={88} y1={100} x2={132} y2={100} light />
    <Ring cx={44} cy={44} r={17} />
    <Line x1={56} y1={57} x2={70} y2={72} width={3} />
    <Pen d="M160 70 L160 40 L176 36 L176 64" />
    <Ring cx={155} cy={71} r={5} fill width={2} />
    <Ring cx={171} cy={65} r={5} fill width={2} />
  </>
);

// 02 — transparent checkout: an itemised ticket with a clear total, checked
const TransparencySketch = (
  <>
    <Box x={34} y={14} w={92} h={90} />
    <Box x={34} y={14} w={92} h={12} fill hatch />
    <Line x1={44} y1={38} x2={86} y2={38} />
    <Line x1={100} y1={38} x2={116} y2={38} />
    <Line x1={44} y1={50} x2={80} y2={50} light />
    <Line x1={100} y1={50} x2={116} y2={50} light />
    <Line x1={44} y1={62} x2={84} y2={62} light />
    <Line x1={100} y1={62} x2={116} y2={62} light />
    <Line x1={44} y1={74} x2={116} y2={74} />
    <Pill x={44} y={82} w={72} h={13} fill />
    <Ring cx={160} cy={60} r={20} />
    <Pen d="M150 60 L157 68 L171 50" width={3} />
  </>
);

// 03 — recommendations from your taste: headphones feeding a stack of suggested events
const RecommendSketch = (
  <>
    <Pen d="M20 72 Q20 28 56 28 Q92 28 92 72" />
    <Box x={14} y={64} w={14} h={26} fill />
    <Box x={84} y={64} w={14} h={26} fill />
    <Arrow d="M104 58 Q116 50 128 58" x2={128} y2={58} angle={30} />
    <Box x={136} y={10} w={52} h={30} fill hatch />
    <Box x={136} y={46} w={52} h={30} />
    <Line x1={144} y1={56} x2={168} y2={56} />
    <Line x1={144} y1={66} x2={160} y2={66} light />
    <Blob d="M178 70 C172 64 170 60 174 57 C177 56 178 58 178 60 C178 58 180 56 182 57 C186 60 184 64 178 70 Z" />
    <Pen d="M178 70 C172 64 170 60 174 57 C177 56 178 58 178 60 C178 58 180 56 182 57 C186 60 184 64 178 70 Z" width={1.8} />
    <Box x={136} y={82} w={52} h={26} light />
  </>
);

export const JODIFY_CHALLENGE_SKETCHES: ReactNode[] = [DiscoverSketch, TransparencySketch, RecommendSketch];
