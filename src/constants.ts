/** Shared id for the injected base stylesheet (single `<style>` per document). */
export const BASE_STYLE_ID = "adaptive-caret-base-styles";

/** Default visual and behaviour values (see README). */
export const DEFAULT_ADAPTIVE_CARET = {
  cursorSize: 28,
  interactiveSize: 42,
  caretWidth: 4,
  caretMinHeight: 22,
  caretMaxHeight: 64,
  transitionDuration: "0.28s" as string | number,
  transitionEasing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  transformTransition: "0.2s ease-out",
  cursorColor: "#0f0f0f",
  caretColor: "#2563eb",
  cursorShadow: "0 2px 10px rgba(0,0,0,0.12)",
  caretShadow: "0 0 14px rgba(37, 99, 235, 0.65)",
  interactiveShadow: "0 4px 16px rgba(0,0,0,0.22)",
  textSelector: "[data-adaptive-caret-text], .text-hover",
  interactiveSelector: 'button, a, [role="button"]',
  zIndex: 99999,
} as const;
