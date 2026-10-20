import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Arrow, Blob, Box, Line, Pen, Pill, Ring, SketchFillContext, SketchFrame, XCONS_GREEN } from "./sketchKit";

/**
 * XCONS dynamic pricing: the layers that shape the final price, each drawn as a
 * croquis in the same marker style as the HacheR wireframes (green fills for XCONS).
 */

// Small closed checkbox (corner overshoot reads as "#" at this size)
const checkbox = (x: number, y: number) =>
  `M${x + 1.5} ${y} L${x + 8.5} ${y} Q${x + 10} ${y} ${x + 10} ${y + 1.5} L${x + 10} ${y + 8.5} Q${x + 10} ${y + 10} ${x + 8.5} ${y + 10} L${x + 1.5} ${y + 10} Q${x} ${y + 10} ${x} ${y + 8.5} L${x} ${y + 1.5} Q${x} ${y} ${x + 1.5} ${y} Z`;

// Seller rules — the seller's rule sheet (checked conditions) setting a base price tag
const SellerSketch = (
  <>
    <Box x={34} y={16} w={80} h={92} />
    <Pill x={58} y={10} w={32} h={11} fill hatch />
    <Pen d={checkbox(44, 34)} width={2} />
    <Pen d="M46 38 L49 42 L56 31" width={2.2} />
    <Line x1={62} y1={39} x2={104} y2={39} />
    <Pen d={checkbox(44, 56)} width={2} />
    <Pen d="M46 60 L49 64 L56 53" width={2.2} />
    <Line x1={62} y1={61} x2={98} y2={61} />
    <Pen d={checkbox(44, 78)} width={1.6} light />
    <Line x1={62} y1={83} x2={100} y2={83} light />
    <Blob d="M128 44 L168 44 L184 63 L168 82 L128 82 Z" />
    <Pen d="M128 44 L168 44 L184 63 L168 82 L128 82 Z" />
    <Ring cx={137} cy={63} r={3.5} width={1.8} />
    <Pen d="M163 55 Q155 51 151 56 Q150 61 157 62 Q164 63 163 69 Q160 74 151 70 M157 50 L157 76" width={2} />
  </>
);

// Store context — a map with streets and a filled pin
const StoreSketch = (
  <>
    <Box x={30} y={20} w={140} h={84} />
    <Line x1={30} y1={50} x2={170} y2={46} light />
    <Line x1={30} y1={80} x2={170} y2={84} light />
    <Line x1={72} y1={20} x2={76} y2={104} light />
    <Line x1={126} y1={20} x2={122} y2={104} light />
    <Box x={84} y={58} w={30} h={18} fill hatch />
    <Blob d="M100 64 C84 46 86 24 100 22 C114 24 116 46 100 64 Z" />
    <Pen d="M100 64 C84 46 86 24 100 22 C114 24 116 46 100 64 Z" />
    <Ring cx={100} cy={36} r={5} width={2} />
  </>
);

// Customer profile — an ID card with avatar and a filled role badge
const ProfileSketch = (
  <>
    <Box x={34} y={22} w={132} h={78} />
    <Box x={34} y={22} w={132} h={12} fill hatch />
    <Ring cx={64} cy={62} r={14} />
    <Pen d="M54 92 Q56 80 64 78 Q72 80 74 92" />
    <Line x1={92} y1={50} x2={150} y2={50} />
    <Line x1={92} y1={60} x2={136} y2={60} light />
    <Pill x={92} y={72} w={50} h={12} fill />
  </>
);

// Final price — a receipt with line items and a filled, hatched total
const PriceSketch = (
  <>
    <Pen d="M62 14 L138 14 L138 106 L130 100 L122 106 L114 100 L106 106 L98 100 L90 106 L82 100 L74 106 L66 100 L62 106 Z" />
    <Line x1={74} y1={30} x2={110} y2={30} />
    <Line x1={74} y1={42} x2={126} y2={42} light />
    <Line x1={74} y1={52} x2={120} y2={52} light />
    <Line x1={74} y1={62} x2={124} y2={62} light />
    <Pill x={72} y={74} w={56} h={14} fill hatch />
    <Ring cx={162} cy={40} r={16} fill />
    <Pen d="M166 32 Q158 28 156 34 Q156 39 162 40 Q168 41 168 46 Q166 52 157 48 M162 26 L162 54" width={2} />
  </>
);

const LAYERS: { name: string; description: string; sketch: ReactNode }[] = [
  { name: "Reglas del Seller", description: "Precio base del proveedor", sketch: SellerSketch },
  { name: "Contexto del Store", description: "Ofertas geográficas y promociones de tienda", sketch: StoreSketch },
  { name: "Perfil del Cliente", description: "¿Es profesional, una empresa o un consumidor final?", sketch: ProfileSketch },
  { name: "Precio Final", description: "Calculado dinámicamente", sketch: PriceSketch },
];

const FlowArrow = (
  <svg viewBox="0 0 48 24" className="w-10 h-auto" aria-hidden="true">
    <Arrow d="M4 14 Q22 4 42 12" x2={42} y2={12} angle={20} />
  </svg>
);

export default function PricingFlowSketches() {
  return (
    <SketchFillContext.Provider value={XCONS_GREEN}>
      <ol className="grid grid-cols-2 gap-x-4 gap-y-10 md:flex md:items-start md:gap-0">
        {LAYERS.map((layer, i) => (
          <Fragment key={layer.name}>
            <motion.li
              className="flex flex-col items-center text-center md:flex-1 md:min-w-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              <SketchFrame className="max-w-[180px] mb-4">{layer.sketch}</SketchFrame>
              <h4 className="text-[17px] md:text-[18px] font-semibold leading-snug text-ink mb-1">{layer.name}</h4>
              <p className="type-body-s text-ink-muted">{layer.description}</p>
            </motion.li>
            {i < LAYERS.length - 1 && (
              <motion.li
                className="hidden md:flex flex-shrink-0 items-center pt-12 px-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: i * 0.14 + 0.2 }}
                aria-hidden="true"
              >
                {FlowArrow}
              </motion.li>
            )}
          </Fragment>
        ))}
      </ol>
    </SketchFillContext.Provider>
  );
}
