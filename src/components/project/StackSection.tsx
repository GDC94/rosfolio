import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { TOPBAR_H, type SectionTheme } from "../../data/projectSections";
import { AnchorContext } from "./sectionAnchor";

/**
 * One layer of a case study. Sections scroll normally until their bottom edge
 * reaches the bottom of the viewport; then they pin (sticky with a negative
 * top) and the next section slides up over them — same feel as the home page,
 * but sections can be taller than the screen.
 */

interface StackSectionProps {
  id: string;
  index: number;
  label: string;
  theme: SectionTheme;
  children: ReactNode;
  /** Skip the default padding / min-height (for custom layouts like horizontal panels). */
  bare?: boolean;
}

export default function StackSection({ id, index, label, theme, children, bare = false }: StackSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(TOPBAR_H);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setTop(Math.min(TOPBAR_H, window.innerHeight - el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnchorContext.Provider value={id}>
      <div id={id} data-section-theme={theme} aria-hidden="true" className="h-0" />
      <section
        ref={ref}
        aria-label={label}
        className={`pj-theme-${theme} bg-[var(--pj-bg)] text-ink ${
          bare ? "" : "min-h-[calc(100svh-40px)] px-4 md:pl-[440px] md:pr-[60px] pt-5 pb-20 md:pt-24 md:pb-28"
        }`}
        style={{ position: "sticky", top, zIndex: 10 + index }}
      >
        {/* Mobile section name (the first section opens with the hero instead) */}
        {!bare && index > 0 && (
          <span className="md:hidden block type-overline text-ink-subtle mb-6">{label}</span>
        )}
        {children}
      </section>
    </AnchorContext.Provider>
  );
}
