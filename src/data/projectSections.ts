// Stacked sections of each case study, in scroll order.
// Shared by the project page, the desktop side nav and the mobile menu.

export type SectionTheme = "beige" | "dark" | "white";

export interface ProjectSection {
  id: string;
  label: string;
}

const THEME_SEQUENCE: SectionTheme[] = ["beige", "dark", "white"];

export const themeForIndex = (index: number): SectionTheme =>
  THEME_SEQUENCE[index % THEME_SEQUENCE.length];

export function getProjectSections(projectId: string): ProjectSection[] {
  if (projectId === "2") {
    return [
      { id: "project-brief",    label: "Resumen del Proyecto" },
      { id: "project-findings", label: "Hallazgos Clave y Soluciones" },
      { id: "project-personas", label: "Lógica y Sistemas" },
      { id: "project-results",  label: "Resumen" },
    ];
  }
  if (projectId === "3") {
    return [
      { id: "project-brief",    label: "Resumen del Proyecto" },
      { id: "project-findings", label: "Análisis Comparativo" },
      { id: "project-personas", label: "Usuarios" },
      { id: "project-solution", label: "Sistema de Diseño" },
      { id: "project-results",  label: "Resultados y Próximos Pasos" },
    ];
  }
  if (projectId === "10") {
    return [
      { id: "project-brief",    label: "Resumen del Proyecto" },
      { id: "project-findings", label: "Benchmarking" },
      { id: "project-personas", label: "Proceso UX" },
      { id: "project-solution", label: "Testing y Decisiones" },
      { id: "project-results",  label: "Diseño Final" },
    ];
  }
  return [
    { id: "project-brief",    label: "Resumen del Proyecto" },
    { id: "project-findings", label: "Análisis Comparativo" },
    { id: "project-personas", label: "Usuarios" },
    { id: "project-solution", label: "Solución y Diseño" },
    { id: "project-results",  label: "Resultados y Próximos Pasos" },
  ];
}

export const TOPBAR_H = 40;

/** Absolute scroll position where a section's anchor reaches the top bar. */
export function getSectionScrollTop(id: string): number | null {
  const anchor = document.getElementById(id);
  if (!anchor) return null;
  return anchor.getBoundingClientRect().top + window.scrollY - TOPBAR_H;
}

/**
 * Section currently covering viewport line `y` (px from top). Anchors sit in
 * normal flow right before each sticky section, so the last anchor above the
 * line is the topmost visible layer there.
 */
export function getSectionAt(ids: string[], y: number): string | null {
  let current: string | null = null;
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= y) current = id;
  }
  return current;
}
