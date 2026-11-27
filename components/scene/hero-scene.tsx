"use client";

import { ContactShadows, Environment, Lightformer, MeshTransmissionMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import * as THREE from "three";

import { FrameCap } from "./frame-cap";
import { SCENE_COLOURS, type StageTheme, useLowPower, usePointer, useReducedMotion, useVisible } from "./hooks";

/**
 * The home page's 3D hero: an armillary sphere. Three rings,
 * one for each desk (investing, insurance, loans), turn slowly around a glowing core, the family they look after. It
 * settles into place on load, leans towards the pointer and turns as you scroll away. Studio-lit gold and glass on
 * porcelain in light mode, glowing at night in dark mode. Decorative: the hero's words carry the meaning.
 */

type Palette = (typeof SCENE_COLOURS)[StageTheme];

function Gold({ palette, roughness = 0.18 }: { palette: Palette; roughness?: number }) {
  return <meshStandardMaterial color={palette.gold} metalness={1} roughness={roughness} envMapIntensity={1.9} />;
}

function Glass({ palette, thickness = 0.35 }: { palette: Palette; thickness?: number }) {
  const background = useMemo(() => new THREE.Color(palette.background), [palette.background]);
  return (
    <MeshTransmissionMaterial
      background={background}
      color={palette.glass}
      samples={6}
      resolution={512}
      transmission={1}
      roughness={0.04}
      thickness={thickness}
      ior={1.45}
      chromaticAberration={0.08}
      anisotropicBlur={0.15}
      distortion={0.1}
      distortionScale={0.3}
      temporalDistortion={0.05}
      clearcoat={1}
      iridescence={0.35}
      iridescenceIOR={1.3}
      iridescenceThicknessRange={[200, 600]}
      attenuationColor="#ffffff"
      attenuationDistance={4}
      envMapIntensity={2}
    />
  );
}

/** Fine graduations around the outer ring, like the scale on an instrument. */
function Ticks({ radius, count, palette }: { radius: number; count: number; palette: Palette }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const ready = useRef(false);
  useFrame(() => {
    if (ready.current || !mesh.current) return;
    const m = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const long = i % 6 === 0;
      m.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
      m.rotation.set(0, 0, a);
      m.scale.set(long ? 1.9 : 1, 1, 1);
      m.updateMatrix();
      mesh.current.setMatrixAt(i, m.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    ready.current = true;
  });
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.07, 0.012, 0.012]} />
      <Gold palette={palette} roughness={0.3} />
    </instancedMesh>
  );
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/** The scroll position as 0–1 across the first screen, read without re-rendering. */
function useScrollRatio() {
  const ratio = useRef(0);
  useFrame(() => {
    ratio.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
  });
  return ratio;
}

function Armillary({ still, palette }: { still: boolean; palette: Palette }) {
  const root = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Group>(null);
  const middle = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const pointer = usePointer();
  const scroll = useScrollRatio();
  const intro = useRef(still ? 1 : 0);
  const viewport = useThree((s) => s.viewport);

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 30);
    intro.current = Math.min(1, intro.current + dt / 2.6);
    const e = easeOut(intro.current);
    const spin = still ? 0 : 1;
    // Each ring turns on its own axis at its own pace, faster while the page scrolls away.
    const boost = 1 + scroll.current * 3;
    if (outer.current) outer.current.rotation.y += dt * 0.1 * spin * boost;
    if (middle.current) middle.current.rotation.z += dt * 0.16 * spin * boost;
    if (inner.current) inner.current.rotation.x -= dt * 0.22 * spin * boost;
    if (core.current && !still) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.03;
      core.current.scale.setScalar(pulse);
    }
    // Settle into place on load (from a little smaller and turned away), then lean towards the pointer.
    const k = 1 - Math.pow(0.003, dt);
    const targetY = (1 - e) * -1.2 + (still ? 0 : pointer.current.x * 0.28) + scroll.current * 0.9;
    const targetX = (still ? 0 : -pointer.current.y * 0.14) + 0.08;
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    const fit = Math.min(1, viewport.width / 4.4, viewport.height / 4.4);
    g.scale.setScalar(fit * (0.82 + 0.18 * e));
    g.position.y = scroll.current * 0.6;
  });

  return (
    <group ref={root}>
      <group rotation={[0.38, 0, -0.41]}>
        {/* Axis through the poles, with gold finials. */}
        <mesh>
          <cylinderGeometry args={[0.012, 0.012, 3.9, 16]} />
          <Gold palette={palette} />
        </mesh>
        {[1.95, -1.95].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <sphereGeometry args={[0.055, 32, 32]} />
            <Gold palette={palette} />
          </mesh>
        ))}

        {/* Investing: the outer gold meridian, graduated. */}
        <group ref={outer}>
          <mesh>
            <torusGeometry args={[1.62, 0.028, 24, 220]} />
            <Gold palette={palette} />
          </mesh>
          <Ticks radius={1.62} count={72} palette={palette} />
        </group>

        {/* Insurance: a broad band of glass, tilted. */}
        <group ref={middle} rotation={[Math.PI / 2.1, 0.32, 0]}>
          <mesh>
            <torusGeometry args={[1.36, 0.075, 48, 220]} />
            <Glass palette={palette} />
          </mesh>
        </group>

        {/* Loans: the inner gold ring, crossing the other two. */}
        <group ref={inner} rotation={[0.2, Math.PI / 2.6, 0.9]}>
          <mesh>
            <torusGeometry args={[1.1, 0.022, 24, 200]} />
            <Gold palette={palette} roughness={0.12} />
          </mesh>
        </group>

        {/* The family at the centre: a glass sphere around a warm core. */}
        <mesh>
          <sphereGeometry args={[0.44, 64, 64]} />
          <Glass palette={palette} thickness={0.9} />
        </mesh>
        <mesh ref={core}>
          <sphereGeometry args={[0.16, 48, 48]} />
          <meshStandardMaterial color={palette.goldLight} emissive={palette.goldLight} emissiveIntensity={1.6} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function useCompact() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
}

export default function HeroScene() {
  const reduced = useReducedMotion();
  // The new site is light only (warm beige), so the scene always uses its daylight palette.
  const theme = "light" as StageTheme;
  const palette = SCENE_COLOURS[theme];
  const [host, setHost] = useState<HTMLDivElement | null>(null);
  const visible = useVisible(host);
  const compact = useCompact();
  // Phones and low-power devices: 30 frames a second, normal pixel density, the shadow drawn once.
  const lowPower = useLowPower();
  const capped = lowPower && visible && !reduced;
  const lightformers = useMemo(
    () => (
      <>
        {/* The studio's walls: what the gold reflects between the lights (porcelain by day, deep teal at night). */}
        <color attach="background" args={[theme === "dark" ? "#0b2a33" : "#efe6d6"]} />
        <Lightformer form="rect" intensity={4} position={[0, 4, 3]} scale={[10, 2.5, 1]} />
        <Lightformer form="rect" intensity={2} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} color={theme === "dark" ? "#5fc3cf" : "#ffffff"} />
        <Lightformer form="rect" intensity={1.6} position={[5, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} color="#f3dcae" />
        <Lightformer form="ring" intensity={2.5} position={[2, 3, -4]} scale={2.5} color="#ffe2a8" />
      </>
    ),
    [theme],
  );

  return (
    <div ref={setHost} className="scene-fill" aria-hidden="true">
      <Canvas
        dpr={lowPower ? 1 : [1, compact ? 1.5 : 2]}
        camera={{ position: [0, 0, 8.2], fov: 30 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping }}
        frameloop={reduced || capped ? "demand" : visible ? "always" : "never"}
      >
        {capped ? <FrameCap fps={30} /> : null}
        <ambientLight intensity={theme === "dark" ? 0.25 : 0.6} />
        <directionalLight position={[3, 5, 4]} intensity={theme === "dark" ? 1.2 : 2} />
        <pointLight position={[0, 0, 0]} intensity={theme === "dark" ? 6 : 3} color={palette.goldLight} distance={4} />
        <Armillary still={reduced} palette={palette} />
        <Environment resolution={256}>{lightformers}</Environment>
        {theme === "light" ? (
          <ContactShadows position={[0, -1.95, 0]} opacity={0.28} scale={7} blur={3} far={4} color="#5b4524" frames={reduced || lowPower ? 1 : Infinity} />
        ) : null}
      </Canvas>
    </div>
  );
}
