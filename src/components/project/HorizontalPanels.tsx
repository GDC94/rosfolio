import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, type MotionValue } from "framer-motion";
import { TOPBAR_H } from "../../data/projectSections";
import { PanelSettledContext, useSectionAnchor } from "./sectionAnchor";

/**
 * Horizontal scroll driven by vertical scroll (same idea as "Mi proceso" on the
 * home page). Panels taller than the screen first scroll their own content
 * vertically, then slide to the next panel — no nested scroll areas, so it
 * behaves the same with wheel, trackpad and touch.
 */

export interface HorizontalPanel {
  key: string;
  content: ReactNode;
}

interface HorizontalPanelsProps {
  panels: HorizontalPanel[];
  /** Section header rendered above the panels (stays visible). */
  header: ReactNode;
  /** Section name shown as overline on mobile. */
  mobileLabel: string;
}

// Scroll distance (in viewport heights) spent on each horizontal slide
const SLIDE_VH = 0.9;

export default function HorizontalPanels({ panels, header, mobileLabel }: HorizontalPanelsProps) {
  const n = panels.length;
  const anchorId = useSectionAnchor();
  const { scrollY } = useScroll();

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [vh, setVh] = useState(() => (typeof window !== "undefined" ? window.innerHeight - TOPBAR_H : 800));
  const [overflows, setOverflows] = useState<number[]>(() => panels.map(() => 0));
  const [active, setActive] = useState(0);
  // Panel that is (almost) fully in place, not mid-slide; -1 while sliding
  const [settled, setSettled] = useState(0);

  const x = useMotionValue("0%");
  const ys = useRef<MotionValue<number>[]>([]);
  // One motion value per panel (panel count is static for a given page)
  const yA = useMotionValue(0), yB = useMotionValue(0), yC = useMotionValue(0), yD = useMotionValue(0);
  ys.current = [yA, yB, yC, yD].slice(0, n);

  const slide = vh * SLIDE_VH;
  const total = overflows.reduce((s, v) => s + v, 0) + slide * (n - 1);

  // ── Measure panel overflow ──────────────────────────────────────────────
  useLayoutEffect(() => {
    const measure = () => {
      setVh(window.innerHeight - TOPBAR_H);
      const panelH = viewportRef.current?.clientHeight ?? 0;
      setOverflows(contentRefs.current.map((el) => Math.max(0, (el?.offsetHeight ?? 0) - panelH)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    contentRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [n]);

  // ── Scroll → panel position ─────────────────────────────────────────────
  const getStart = useCallback(() => {
    const anchor = anchorId ? document.getElementById(anchorId) : null;
    return anchor ? anchor.getBoundingClientRect().top + window.scrollY - TOPBAR_H : 0;
  }, [anchorId]);

  const apply = useCallback(
    (s: number) => {
      let rem = Math.max(0, Math.min(s - getStart(), total));
      let pos = 0;
      for (let i = 0; i < n; i++) {
        const dv = Math.min(rem, overflows[i]);
        ys.current[i]?.set(-dv);
        rem -= dv;
        pos = i;
        if (i < n - 1 && rem > 0) {
          const dh = Math.min(rem, slide);
          pos = i + dh / slide;
          rem -= dh;
        }
        if (rem <= 0) {
          for (let j = i + 1; j < n; j++) ys.current[j]?.set(0);
          break;
        }
      }
      x.set(`${(-pos * 100) / n}%`);
      setActive(Math.round(pos));
      setSettled(Math.abs(pos - Math.round(pos)) < 0.12 ? Math.round(pos) : -1);
    },
    [getStart, total, n, overflows, slide, x]
  );

  useMotionValueEvent(scrollY, "change", apply);
  useLayoutEffect(() => apply(window.scrollY), [apply]);

  return (
    <div style={{ height: vh + total }}>
      <div className="sticky flex flex-col overflow-hidden" style={{ top: TOPBAR_H, height: vh }}>
        <div className="flex-shrink-0 px-4 md:pl-[440px] md:pr-[60px] pt-5 md:pt-14 pb-4 md:pb-6">
          <span className="md:hidden block type-overline text-ink-subtle mb-4">{mobileLabel}</span>
          {header}
        </div>

        <div ref={viewportRef} className="relative flex-1 overflow-hidden md:ml-[440px]">
          <motion.div className="absolute inset-y-0 left-0 flex" style={{ x, width: `${n * 100}%` }}>
            {panels.map((p, i) => (
              <div
                key={p.key}
                className="relative h-full overflow-hidden"
                style={{ width: `${100 / n}%` }}
                aria-hidden={active !== i}
              >
                <motion.div
                  ref={(el) => (contentRefs.current[i] = el)}
                  style={{ y: ys.current[i] }}
                  className="px-4 md:pl-0 md:pr-[60px] pt-4 pb-12 md:pb-16"
                >
                  <PanelSettledContext.Provider value={settled === i}>{p.content}</PanelSettledContext.Provider>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
