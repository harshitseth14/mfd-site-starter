"use client";

import { Component, type ReactNode } from "react";

/**
 * Keeps a 3D scene's failure (a lost WebGL context, a driver bug, a shader that will not compile) inside the scene:
 * the page shows `fallback` in its place and everything else keeps working.
 */
export class SceneBoundary extends Component<{ fallback?: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("[3d] scene stopped:", error instanceof Error ? error.message : error);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
