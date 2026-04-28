import type { AdaptiveCaretInstance, AdaptiveCaretOptions } from "./types";
import {
  applyCursorVariables,
  applyHideNativeCursor,
  ensureBaseStylesInjected,
  injectSelectionStyles,
  resolveOptions,
  restoreHideNativeCursor,
} from "./styles";

const CARET_CLASS = "adaptive-caret__cursor--caret";
const INTERACTIVE_CLASS = "adaptive-caret__cursor--interactive";
const BASE_CLASS = "adaptive-caret__cursor";

let instanceSeq = 0;

function nextInstanceId(): string {
  instanceSeq += 1;
  return `${instanceSeq}`;
}

export function createAdaptiveCaret(
  options?: AdaptiveCaretOptions,
): AdaptiveCaretInstance {
  const doc = document;
  const resolved = resolveOptions(options, doc);
  ensureBaseStylesInjected(doc);

  const cursorEl = doc.createElement("div");
  cursorEl.className = BASE_CLASS;
  applyCursorVariables(cursorEl, resolved);

  const instanceId = nextInstanceId();
  const selectionStyle = injectSelectionStyles(
    doc,
    instanceId,
    resolved.selectionBackground,
    resolved.selectionColor,
  );

  const hideCtx = applyHideNativeCursor(resolved.hideNativeCursor, doc);

  resolved.container.appendChild(cursorEl);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let lastState: "default" | "caret" | "interactive" = "default";
  let currentTextElement: Element | null = null;

  function setPosition(x: number, y: number): void {
    cursorEl.style.left = `${x}px`;
    cursorEl.style.top = `${y}px`;
  }

  function updateCaretHeight(element: Element | null): void {
    if (!element) return;
    const computedStyle = window.getComputedStyle(element);
    let lineHeight = computedStyle.lineHeight;
    const fontSize = computedStyle.fontSize;

    if (lineHeight === "normal") {
      const fontSizeValue = parseFloat(fontSize);
      lineHeight = `${fontSizeValue * 1.3}px`;
    }

    let heightPx = parseFloat(lineHeight);
    if (Number.isNaN(heightPx)) {
      heightPx = parseFloat(fontSize) * 1.3;
    }

    const caretHeight = Math.min(
      Math.max(heightPx, resolved.caretMinHeight),
      resolved.caretMaxHeight,
    );

    if (cursorEl.classList.contains(CARET_CLASS)) {
      cursorEl.style.height = `${caretHeight}px`;
    }
  }

  function enableCaretMode(element: Element): void {
    if (
      lastState === "caret" &&
      currentTextElement === element
    ) {
      updateCaretHeight(element);
      return;
    }
    cursorEl.classList.remove(INTERACTIVE_CLASS);
    cursorEl.classList.add(CARET_CLASS);
    updateCaretHeight(element);
    lastState = "caret";
    currentTextElement = element;
  }

  function enableInteractiveMode(): void {
    if (lastState === "interactive") return;
    cursorEl.classList.remove(CARET_CLASS);
    cursorEl.classList.add(INTERACTIVE_CLASS);
    cursorEl.style.height = "";
    lastState = "interactive";
    currentTextElement = null;
  }

  function resetToDefault(): void {
    if (lastState === "default") return;
    cursorEl.classList.remove(CARET_CLASS, INTERACTIVE_CLASS);
    cursorEl.style.height = "";
    lastState = "default";
    currentTextElement = null;
  }

  function updateCursorStateFromPoint(clientX: number, clientY: number): void {
    const elementUnderCursor = doc.elementFromPoint(clientX, clientY);
    if (!elementUnderCursor) {
      resetToDefault();
      return;
    }

    const interactiveTarget = elementUnderCursor.closest(
      resolved.interactiveSelector,
    );
    if (interactiveTarget) {
      enableInteractiveMode();
      return;
    }

    const textTarget = elementUnderCursor.closest(resolved.textSelector);
    if (textTarget) {
      enableCaretMode(textTarget);
      return;
    }

    resetToDefault();
  }

  function onMouseMove(e: MouseEvent): void {
    mouseX = e.clientX;
    mouseY = e.clientY;
    setPosition(mouseX, mouseY);
    updateCursorStateFromPoint(e.clientX, e.clientY);
  }

  function onMouseLeave(): void {
    resetToDefault();
  }

  function onBlur(): void {
    resetToDefault();
  }

  function onLoad(): void {
    setPosition(mouseX, mouseY);
    updateCursorStateFromPoint(mouseX, mouseY);
  }

  window.addEventListener("mousemove", onMouseMove);
  doc.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("blur", onBlur);
  window.addEventListener("load", onLoad);

  setPosition(mouseX, mouseY);
  queueMicrotask(() => {
    updateCursorStateFromPoint(mouseX, mouseY);
  });

  return {
    element: cursorEl,
    destroy(): void {
      window.removeEventListener("mousemove", onMouseMove);
      doc.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("load", onLoad);
      cursorEl.remove();
      selectionStyle?.remove();
      restoreHideNativeCursor(hideCtx.el, hideCtx.prev);
    },
  };
}
