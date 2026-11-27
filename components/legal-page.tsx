import type { ReactNode } from "react";

import { site } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: ReactNode };

/**
 * A legal page (privacy, terms, grievances): the title and the date it last changed, a contents list that stays in
 * view on wide screens, then numbered sections in plain English.
 */
export function LegalPage({ label, title, intro, sections }: { label: string; title: string; intro: ReactNode; sections: readonly LegalSection[] }) {
  return (
    <article className="legal-page">
      <div className="wrap legal-g">
        <header className="legal-head">
          <p className="mono">{label}</p>
          <h1>{title}</h1>
          <div className="legal-intro">{intro}</div>
          <p className="mono legal-date">Last updated {site.legalUpdated}</p>
        </header>
        <nav className="legal-toc" aria-label="On this page">
          <p className="mono">On this page</p>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="legal-body">
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`}>
              <h2 id={`${s.id}-t`}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="legal-text">{s.body}</div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

/** An outside website, opening in a new tab. */
export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
