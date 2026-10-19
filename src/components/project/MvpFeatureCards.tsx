import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Box, Line, Pill, Ring, SketchFrame } from "./sketchKit";

/**
 * MVP features, each with a small croquis of the UI it refers to, drawn in the
 * same marker style as the HacheR low-fi wireframes (see sketchKit).
 */

// Data entry form: avatar, paired inputs (one checked) and a filled detail block
const FormSketch = (
  <>
    <Box x={18} y={10} w={164} h={98} />
    <Ring cx={38} cy={30} r={9} />
    <Line x1={54} y1={24} x2={92} y2={24} />
    <Line x1={54} y1={32} x2={80} y2={32} light />
    <Pill x={26} y={50} w={60} h={10} />
    <Pill x={26} y={68} w={60} h={10} />
    <Pill x={26} y={86} w={60} h={10} />
    <Line x1={76} y1={73} x2={79} y2={76} width={1.8} />
    <Line x1={79} y1={76} x2={84} y2={69} width={1.8} />
    <Box x={100} y={50} w={72} h={46} fill rows={3} />
    <Pill x={142} y={20} w={30} h={10} fill hatch />
  </>
);

// Table view: filled side menu, search bar, filled table with hatched header
const SearchSketch = (
  <>
    <Box x={14} y={8} w={172} h={102} />
    <Box x={22} y={18} w={28} h={84} fill />
    <Line x1={27} y1={30} x2={44} y2={30} />
    <Line x1={27} y1={40} x2={44} y2={40} />
    <Line x1={27} y1={50} x2={42} y2={50} />
    <Pill x={60} y={16} w={70} h={10} />
    <Ring cx={140} cy={21} r={4.5} width={2} />
    <Pill x={154} y={16} w={24} h={10} fill hatch />
    <Box x={60} y={34} w={118} h={9} fill hatch />
    <Box x={60} y={43} w={118} h={46} fill rows={3} cols={4} />
    <Pill x={152} y={94} w={26} h={9} fill hatch />
  </>
);

// Permissions: people rows, each with a toggle (on = filled)
const PermissionsSketch = (
  <>
    <Box x={22} y={8} w={156} h={102} />
    {[22, 52, 82].map((y, i) => {
      const on = i !== 1;
      return (
        <g key={y}>
          <Ring cx={42} cy={y + 6} r={8} />
          <Line x1={58} y1={y + 2} x2={104} y2={y + 2} />
          <Line x1={58} y1={y + 10} x2={88} y2={y + 10} light />
          <Pill x={130} y={y} w={32} h={13} fill={on} />
          <Ring cx={on ? 153 : 139} cy={y + 6.5} r={4} width={2} />
        </g>
      );
    })}
  </>
);

// Reports: axes, filled bars (one hatched) and a header line
const ReportsSketch = (
  <>
    <Box x={18} y={8} w={164} h={102} />
    <Line x1={30} y1={22} x2={78} y2={22} />
    <Line x1={30} y1={30} x2={60} y2={30} light />
    <Line x1={36} y1={98} x2={170} y2={98} />
    <Line x1={36} y1={98} x2={36} y2={40} />
    <Box x={48} y={70} w={16} h={28} fill />
    <Box x={72} y={56} w={16} h={42} fill />
    <Box x={96} y={76} w={16} h={22} fill />
    <Box x={120} y={44} w={16} h={54} fill hatch />
    <Box x={144} y={62} w={16} h={36} fill />
  </>
);

const SKETCHES: Record<string, ReactNode> = {
  "Carga de datos": FormSketch,
  "Búsqueda y Visualización": SearchSketch,
  "Gestión de Permisos": PermissionsSketch,
  Reportes: ReportsSketch,
};

export default function MvpFeatureCards({ features }: { features: string[] }) {
  return (
    <motion.ul
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {features.map((feature) => (
        <motion.li
          key={feature}
          className="flex flex-col items-center text-center px-2"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <SketchFrame className="max-w-[170px] mx-auto">{SKETCHES[feature]}</SketchFrame>
          <p className="type-h4 text-ink mt-4">{feature}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
