"use client";

import dynamic from "next/dynamic";

import { useIdle, useWebGL } from "./hooks";
import { SceneBoundary } from "./scene-boundary";

/** The still glow shown while the 3D loads, and instead of it where WebGL is not available. */
function Glow() {
  return (
    <div aria-hidden="true" className="scene-fill scene-glow">
      <span />
      <i />
    </div>
  );
}

// Three.js only ever loads in the browser, after the page's words have rendered.
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false, loading: () => <Glow /> });

/**
 * The gold armillary sphere at the top of the homepage. It starts after the browser's first quiet moment, so the page is
 * usable first.
 */
export function HeroSceneLazy() {
  const webgl = useWebGL();
  const idle = useIdle();
  if (!webgl || !idle) return <Glow />;
  return (
    <SceneBoundary fallback={<Glow />}>
      <HeroScene />
    </SceneBoundary>
  );
}
