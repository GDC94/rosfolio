import { createContext, useContext } from "react";

/** Id of the zero-height anchor placed before the current stacked section (its flow position). */
export const AnchorContext = createContext<string | null>(null);

export const useSectionAnchor = () => useContext(AnchorContext);

/**
 * Inside a horizontal panel: true once the panel has fully slid into view
 * (null outside horizontal panels). Lets entry animations wait for the slide.
 */
export const PanelSettledContext = createContext<boolean | null>(null);

export const usePanelSettled = () => useContext(PanelSettledContext);
