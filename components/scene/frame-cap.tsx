"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

/**
 * Draws a canvas at most `fps` times a second (use with frameloop="demand"): phones and low-power devices get smooth
 * enough motion for about half the work. Lives apart from hooks.ts so three.js stays out of the page's
 * first bundle.
 */
export function FrameCap({ fps = 30 }: { fps?: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const id = window.setInterval(() => invalidate(), 1000 / fps);
    return () => window.clearInterval(id);
  }, [invalidate, fps]);
  return null;
}
