import { useSyncExternalStore } from "react";

/**
 * Scroll length (in section heights) of the "Sobre mi" zone on the home page.
 * It depends on how much content its frames have at the current screen size —
 * SobreMiSection measures it so that content moves 1:1 with the finger — and is
 * shared with the home layout and both navs, which place later sections after it.
 */
let sobreMiExtra = 4;
const listeners = new Set<() => void>();

export const getSobreMiExtra = () => sobreMiExtra;

export function setSobreMiExtra(value: number) {
  if (Math.abs(value - sobreMiExtra) < 0.001) return;
  sobreMiExtra = value;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const useSobreMiExtra = () => useSyncExternalStore(subscribe, getSobreMiExtra, getSobreMiExtra);
