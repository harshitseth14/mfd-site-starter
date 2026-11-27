"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Motion. Blocks marked data-reveal glide in as they come into view, and the
 * children of data-reveal-group follow one after another. Everything is visible without the script, and nothing moves
 * for visitors who ask their device for less motion.
 *
 * This lives in the root layout, which stays mounted when a visitor moves between pages with the header links, so it
 * watches for new content as well: a page that arrives later is picked up the moment it is added (otherwise a page
 * opened from the menu would show its photograph but not its words, because they were never observed).
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.classList.add("motion");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const seen = new WeakSet<Element>();
    const watch = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      io.observe(el);
    };
    const scan = () => {
      document.querySelectorAll("[data-reveal]").forEach(watch);
      document.querySelectorAll("[data-reveal-group]").forEach((group) =>
        Array.from(group.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty("--i", String(i));
          child.setAttribute("data-reveal-item", "");
          watch(child);
        }),
      );
    };
    scan();
    let queued = 0;
    const mo = new MutationObserver(() => {
      if (!queued) queued = requestAnimationFrame(() => ((queued = 0), scan()));
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(queued);
    };
  }, []);
  return null;
}

/** A figure that counts up when it comes into view: 1,25,000 in Indian digit grouping, a year without separators. */
export function CountUp({ to, suffix = "", plain = false, ms = 1400 }: { to: number; suffix?: string; plain?: boolean; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(to);
  const format = (n: number) => (plain ? String(n) : n.toLocaleString("en-IN"));

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const from = plain ? Math.max(0, to - 24) : 0;
    setValue(from);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (t: number) => {
          // The first frame's timestamp can be a little earlier than `start`; never let progress go below zero.
          const p = Math.min(1, Math.max(0, (t - start) / ms));
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(from + (to - from) * eased));
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, plain, ms]);

  // Screen readers get the final figure as plain text; the moving number is hidden from them. (An aria-label on a plain
  // span is not allowed and was ignored by some readers; 2026-11-27.)
  return (
    <span ref={ref}>
      <span className="sr-only">{`${format(to)}${suffix}`}</span>
      <span aria-hidden="true">
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
