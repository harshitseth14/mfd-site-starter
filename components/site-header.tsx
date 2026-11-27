"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { pages, services, site } from "@/lib/site";

/**
 * One header: the name, a "What we do" dropdown of the five services, Corporates, three links and the action (Our story
 * took the place of Why us on 2026-11-26; Why us is still in the footer). On a phone everything
 * folds into one "Menu". Built on <details>, so it works before the page's script loads; the script only closes the
 * menus on a click elsewhere, on choosing a link, and on Escape.
 */
export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const drops = () => Array.from(root.querySelectorAll<HTMLDetailsElement>("details.drop"));
    const closeAll = (except?: Node) => drops().forEach((d) => (except && d.contains(except) ? null : (d.open = false)));
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest(".menu a")) closeAll();
      else closeAll(t);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const serviceLinks = services.map((s) => (
    <Link key={s.slug} href={s.href}>
      <b>{s.title}</b>
      <span>{s.menu}</span>
    </Link>
  ));

  return (
    <header className="top" ref={ref}>
      <div className="wrap bar">
        <Link className="mark" href="/">
          {site.mark[0]} <span>{site.mark[1]}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <details className="drop wide-only">
            <summary>What we do</summary>
            <div className="menu">{serviceLinks}</div>
          </details>
          <Link className="wide-only" href={pages.corporates.href}>
            {pages.corporates.title}
          </Link>
          <Link className="wide-only" href={pages.approach.href}>
            {pages.approach.title}
          </Link>
          <Link className="wide-only" href={pages.story.href}>
            {pages.story.title}
          </Link>
          <Link className="wide-only" href={pages.careers.href}>
            {pages.careers.title}
          </Link>
          <details className="drop narrow-only">
            <summary>Menu</summary>
            <div className="menu menu-right">
              {serviceLinks}
              <Link className="sep" href={pages.corporates.href}>
                <b>{pages.corporates.title}</b>
                <span>{pages.corporates.line}</span>
              </Link>
              <Link className="sep" href={pages.approach.href}>
                <b>{pages.approach.title}</b>
                <span>{pages.approach.line}</span>
              </Link>
              <Link href={pages.story.href}>
                <b>{pages.story.title}</b>
                <span>{pages.story.line}</span>
              </Link>
              <Link href={pages.careers.href}>
                <b>{pages.careers.title}</b>
                <span>{pages.careers.line}</span>
              </Link>
            </div>
          </details>
          <Link
            className="cta"
            href={pages.consultation.href}
            onClick={(e) => {
              // A page with its own form (each service page, Corporates, Our story…) uses it, so the visitor stays where
              // they were and the lead keeps that page's topic; other pages go to the homepage form.
              const own = document.getElementById("begin");
              if (!own || e.metaKey || e.ctrlKey || e.shiftKey) return;
              e.preventDefault();
              own.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
              history.replaceState(null, "", "#begin");
            }}
          >
            {pages.consultation.title}
          </Link>
        </nav>
      </div>
    </header>
  );
}
