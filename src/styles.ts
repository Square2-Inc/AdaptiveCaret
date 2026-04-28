import { BASE_STYLE_ID, DEFAULT_ADAPTIVE_CARET } from "./constants";
import type { AdaptiveCaretOptions } from "./types";

export function sizeToCss(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}

export function durationToCss(value: string | number): string {
  if (typeof value === "number") return `${value}ms`;
  return value;
}

export type ResolvedAdaptiveCaretOptions = {
  container: HTMLElement;
  hideNativeCursor: boolean | HTMLElement;
  cursorSize: string;
  interactiveSize: string;
  caretWidth: string;
  caretMinHeight: number;
  caretMaxHeight: number;
  morphDuration: string;
  morphEasing: string;
  transformTransition: string;
  cursorColor: string;
  caretColor: string;
  cursorShadow: string;
  caretShadow: string;
  interactiveShadow: string;
  selectionBackground?: string;
  selectionColor?: string;
  textSelector: string;
  interactiveSelector: string;
  zIndex: string;
};

export function resolveOptions(
  options: AdaptiveCaretOptions | undefined,
  doc: Document,
): ResolvedAdaptiveCaretOptions {
  const o = options ?? {};
  const hide =
    o.hideNativeCursor === undefined ? true : o.hideNativeCursor;

  const z =
    o.zIndex !== undefined
      ? typeof o.zIndex === "number"
        ? String(o.zIndex)
        : o.zIndex
      : String(DEFAULT_ADAPTIVE_CARET.zIndex);

  const d = DEFAULT_ADAPTIVE_CARET;
  return {
    container: o.container ?? doc.body,
    hideNativeCursor: hide,
    cursorSize: sizeToCss(o.cursorSize ?? d.cursorSize),
    interactiveSize: sizeToCss(o.interactiveSize ?? d.interactiveSize),
    caretWidth: sizeToCss(o.caretWidth ?? d.caretWidth),
    caretMinHeight: o.caretMinHeight ?? d.caretMinHeight,
    caretMaxHeight: o.caretMaxHeight ?? d.caretMaxHeight,
    morphDuration: durationToCss(o.transitionDuration ?? d.transitionDuration),
    morphEasing: o.transitionEasing ?? d.transitionEasing,
    transformTransition: o.transformTransition ?? d.transformTransition,
    cursorColor: o.cursorColor ?? d.cursorColor,
    caretColor: o.caretColor ?? d.caretColor,
    cursorShadow: o.cursorShadow ?? d.cursorShadow,
    caretShadow: o.caretShadow ?? d.caretShadow,
    interactiveShadow: o.interactiveShadow ?? d.interactiveShadow,
    selectionBackground: o.selectionBackground,
    selectionColor: o.selectionColor,
    textSelector: o.textSelector ?? d.textSelector,
    interactiveSelector: o.interactiveSelector ?? d.interactiveSelector,
    zIndex: z,
  };
}

export function applyCursorVariables(
  el: HTMLElement,
  resolved: ResolvedAdaptiveCaretOptions,
): void {
  const s = el.style;
  s.setProperty("--ac-cursor-size", resolved.cursorSize);
  s.setProperty("--ac-interactive-size", resolved.interactiveSize);
  s.setProperty("--ac-caret-width", resolved.caretWidth);
  s.setProperty("--ac-cursor-color", resolved.cursorColor);
  s.setProperty("--ac-caret-color", resolved.caretColor);
  s.setProperty("--ac-cursor-shadow", resolved.cursorShadow);
  s.setProperty("--ac-caret-shadow", resolved.caretShadow);
  s.setProperty("--ac-interactive-shadow", resolved.interactiveShadow);
  s.setProperty("--ac-morph-duration", resolved.morphDuration);
  s.setProperty("--ac-morph-easing", resolved.morphEasing);
  const tt = resolved.transformTransition.trim();
  const m = tt.match(/^([\d.]+m?s)\s+(.+)$/);
  if (m?.[1] != null && m[2] != null) {
    s.setProperty("--ac-transform-duration", m[1]);
    s.setProperty("--ac-transform-easing", m[2]);
  } else {
    s.setProperty("--ac-transform-duration", "0.2s");
    s.setProperty("--ac-transform-easing", "ease-out");
  }
  s.setProperty("--ac-z-index", resolved.zIndex);
}

const BASE_CSS = `
.adaptive-caret__cursor{
  position:fixed;top:0;left:0;pointer-events:none;
  transform:translate(-50%,-50%);
  box-sizing:border-box;
  width:var(--ac-cursor-size);height:var(--ac-cursor-size);
  border-radius:50%;
  background-color:var(--ac-cursor-color);
  box-shadow:var(--ac-cursor-shadow);
  z-index:var(--ac-z-index);
  transition:
    width var(--ac-morph-duration) var(--ac-morph-easing),
    height var(--ac-morph-duration) var(--ac-morph-easing),
    border-radius var(--ac-morph-duration) var(--ac-morph-easing),
    background-color 0.25s ease,
    box-shadow 0.25s ease,
    transform var(--ac-transform-duration) var(--ac-transform-easing);
  will-change:width,height,border-radius,background-color,transform;
}
.adaptive-caret__cursor.adaptive-caret__cursor--caret{
  width:var(--ac-caret-width);
  border-radius:20px;
  background-color:var(--ac-caret-color);
  box-shadow:var(--ac-caret-shadow);
}
.adaptive-caret__cursor.adaptive-caret__cursor--interactive{
  width:var(--ac-interactive-size);
  height:var(--ac-interactive-size);
  border-radius:50%;
  background-color:var(--ac-cursor-color);
  box-shadow:var(--ac-interactive-shadow);
}
`;

export function ensureBaseStylesInjected(doc: Document): void {
  if (doc.getElementById(BASE_STYLE_ID)) return;
  const style = doc.createElement("style");
  style.id = BASE_STYLE_ID;
  style.textContent = BASE_CSS;
  doc.head.appendChild(style);
}

export function injectSelectionStyles(
  doc: Document,
  instanceId: string,
  background?: string,
  color?: string,
): HTMLStyleElement | null {
  if (background === undefined && color === undefined) return null;
  const style = doc.createElement("style");
  style.id = `adaptive-caret-selection-${instanceId}`;
  const rules: string[] = [];
  if (background !== undefined) {
    rules.push(`background:${background};`);
  }
  if (color !== undefined) {
    rules.push(`color:${color};`);
  }
  const block = rules.join("");
  style.textContent = `
::selection{${block}}
::-moz-selection{${block}}
`;
  doc.head.appendChild(style);
  return style;
}

export function applyHideNativeCursor(
  target: boolean | HTMLElement,
  doc: Document,
): { el: HTMLElement | null; prev: string | null } {
  if (target === false) return { el: null, prev: null };
  const el =
    target === true ? doc.documentElement : target;
  const prev = el.style.cursor;
  el.style.cursor = "none";
  return { el, prev };
}

export function restoreHideNativeCursor(
  el: HTMLElement | null,
  prev: string | null,
): void {
  if (!el) return;
  if (prev === null || prev === "") el.style.removeProperty("cursor");
  else el.style.cursor = prev;
}
