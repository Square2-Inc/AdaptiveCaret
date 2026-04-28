/**
 * Options for {@link createAdaptiveCaret}.
 */
export interface AdaptiveCaretOptions {
  /**
   * Element that receives the cursor node (default: `document.body`).
   */
  container?: HTMLElement;

  /**
   * Where to apply `cursor: none` so the native cursor is hidden.
   * `true` → `document.documentElement`. `false` → do not hide.
   * @default true
   */
  hideNativeCursor?: boolean | HTMLElement;

  /** Default circle diameter (px number or CSS length). @default 28 */
  cursorSize?: number | string;

  /** Circle size over interactive targets (buttons, links). @default 42 */
  interactiveSize?: number | string;

  /** Caret pill width. @default 4 */
  caretWidth?: number | string;

  /** Min caret height in px (from line metrics). @default 22 */
  caretMinHeight?: number;

  /** Max caret height in px. @default 64 */
  caretMaxHeight?: number;

  /**
   * Morph transition duration, e.g. `"0.28s"` or `280` (ms).
   * @default "0.28s"
   */
  transitionDuration?: string | number;

  /**
   * Easing for width/height/border-radius morph.
   * @default "cubic-bezier(0.22, 0.61, 0.36, 1)"
   */
  transitionEasing?: string;

  /**
   * Separate transition for `transform` (position smoothing).
   * @default "0.2s ease-out"
   */
  transformTransition?: string;

  /** Default circle fill. @default "#0f0f0f" */
  cursorColor?: string;

  /** Caret pill fill. @default "#2563eb" */
  caretColor?: string;

  /** Box shadow for default circle. @default "0 2px 10px rgba(0,0,0,0.12)" */
  cursorShadow?: string;

  /** Box shadow in caret mode. @default "0 0 14px rgba(37, 99, 235, 0.65)" */
  caretShadow?: string;

  /** Box shadow over interactive targets. @default "0 4px 16px rgba(0,0,0,0.22)" */
  interactiveShadow?: string;

  /** `::selection` background (injects a global style rule). */
  selectionBackground?: string;

  /** `::selection` color. */
  selectionColor?: string;

  /**
   * Selector for text regions that use adaptive caret height (passed to `closest()`).
   * @default '[data-adaptive-caret-text], .text-hover'
   */
  textSelector?: string;

  /**
   * Selector for interactive targets (passed to `closest()`).
   * @default 'button, a, [role="button"]'
   */
  interactiveSelector?: string;

  /** Fixed positioning z-index. @default 99999 */
  zIndex?: number | string;
}

export interface AdaptiveCaretInstance {
  /** Remove listeners, cursor node, and injected selection styles. */
  destroy(): void;

  /** The cursor DOM element. */
  readonly element: HTMLElement;
}
