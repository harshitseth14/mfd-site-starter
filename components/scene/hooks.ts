"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

/** True when the visitor asked their device to reduce motion: 3D scenes then stay still. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    // On the server, assume still: nothing animates until the browser says otherwise.
    () => true,
  );
}

/** The pointer across the whole window, as -1…1 on each axis (0, 0 at the centre), without re-rendering. */
export function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

/** Whether `element` is on screen (with a margin), so off-screen 3D scenes stop drawing. */
export function useVisible(element: Element | null, margin = "200px"): boolean {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!element) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: margin });
    io.observe(element);
    return () => io.disconnect();
  }, [element, margin]);
  return visible;
}

/**
 * True once `ref`'s element has come within `margin` of the screen, and from then on: a heavy scene mounts only when
 * it is about to be seen (useVisible then pauses it off screen). Measured 2026-10-24: loading both 3D scenes at
 * once cost phones several seconds of busy main thread.
 */
export function useNear(ref: RefObject<Element | null>, margin = "100% 0px"): boolean {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || near) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: margin },
    );
    io.observe(element);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}

/** True after the browser's first quiet moment (at most `timeout` ms), so the 3D starts once the page is usable. */
export function useIdle(timeout = 1500): boolean {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setIdle(true), Math.min(timeout, 800));
    return () => window.clearTimeout(id);
  }, [timeout]);
  return idle;
}

function lowPowerNow(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    nav.connection?.saveData === true
  );
}

/**
 * Phones and low-power devices (a small screen, four or fewer cores, 4 GB or less memory, or Data Saver): the 3D
 * draws lighter there (30 frames a second, normal pixel density, no glow pass). False on the server.
 */
export function useLowPower(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    lowPowerNow,
    () => false,
  );
}

let webglSupport: boolean | undefined;

function canDrawWebGL(): boolean {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

/** True when the browser can draw WebGL; without it the page shows the still background instead. Null on the server. */
export function useWebGL(): boolean | null {
  return useSyncExternalStore(
    () => () => {},
    canDrawWebGL,
    () => null,
  );
}

export type StageTheme = "light" | "dark";

/** The site's theme (`data-theme` on <html>, set by the theme button), so 3D scenes can match the page. */
export function useStageTheme(): StageTheme {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => observer.disconnect();
    },
    () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
    () => "light",
  );
}

/** Colours the 3D scenes use in each theme; they match the --stage tokens in src/app/globals.css. */
export const SCENE_COLOURS = {
  light: {
    background: "#f1ebe0",
    gold: "#c9a063",
    goldDeep: "#8a6129",
    goldLight: "#f3dba6",
    glass: "#f2fbfb",
    path: "#b48a4a",
    glow: "#e2c287",
    dust: "#b48a4a",
  },
  dark: {
    background: "#061820",
    gold: "#d4ad62",
    goldDeep: "#b08a4e",
    goldLight: "#ffe7b0",
    glass: "#b5edf2",
    path: "#58bcc8",
    glow: "#d8b676",
    dust: "#d8b676",
  },
} as const;
