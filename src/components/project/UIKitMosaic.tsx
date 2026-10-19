import { motion } from "framer-motion";

/**
 * Splits one tall UI-kit export into its blocks and lays them out as a compact
 * mosaic. Each tile shows a crop of the same (vector) image via background
 * positioning, and tiles in a row grow by their aspect ratio so they share height.
 */

export interface KitBlock {
  label: string;
  /** Crop in source-image px: x, y, width, height. */
  rect: [number, number, number, number];
}

/** Mobile section: a row of blocks sharing height, or Kanban-like columns of stacked blocks. */
export type MobileSection = { row: KitBlock[] } | { columns: KitBlock[][] };

interface UIKitMosaicProps {
  src: string;
  /** Source image size in px. */
  size: [number, number];
  /** Blocks grouped by row (desktop). */
  rows: KitBlock[][];
  /** Mobile arrangement; defaults to one block per row. */
  mobile?: MobileSection[];
}

function Tile({
  src, size: [W, H], block, className = "", grow = true,
}: { src: string; size: [number, number]; block: KitBlock; className?: string; grow?: boolean }) {
  const [x, y, w, h] = block.rect;
  return (
    <figure
      className={`relative rounded-2xl overflow-hidden bg-white min-w-0 ${className}`}
      style={grow ? { flex: `${w / h} 1 0%` } : undefined}
    >
      <div
        role="img"
        aria-label={block.label}
        style={{
          aspectRatio: `${w} / ${h}`,
          backgroundImage: `url("${src}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${(W / w) * 100}% auto`,
          backgroundPosition: `${(x / (W - w)) * 100}% ${(y / (H - h)) * 100}%`,
        }}
      />
    </figure>
  );
}

export default function UIKitMosaic({ src, size, rows, mobile }: UIKitMosaicProps) {
  const sections: MobileSection[] = mobile ?? rows.flat().map((b) => ({ row: [b] }));
  return (
    <>
    <div className="md:hidden space-y-2.5">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          className="flex gap-2.5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {"row" in section
            ? section.row.map((block) => <Tile key={block.label} src={src} size={size} block={block} />)
            : section.columns.map((col, c) => (
                <div key={c} className="flex-1 min-w-0 space-y-2.5">
                  {col.map((block) => (
                    <Tile key={block.label} src={src} size={size} block={block} grow={false} />
                  ))}
                </div>
              ))}
        </motion.div>
      ))}
    </div>

    <div className="hidden md:block max-w-[760px] space-y-3">
      {rows.map((row, i) => (
        <motion.div
          key={i}
          className="flex flex-row gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {row.map((block) => (
            <Tile key={block.label} src={src} size={size} block={block} />
          ))}
        </motion.div>
      ))}
    </div>
    </>
  );
}
