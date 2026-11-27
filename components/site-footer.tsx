import Link from "next/link";

import { pages, services, site } from "@/lib/site";

const FIRM = [pages.story, pages.approach, pages.about, pages.careers] as const;
const WHAT_WE_DO = [...services, pages.corporates] as const;

const LEGAL = [
  { href: "/privacy", title: "Privacy" },
  { href: "/terms", title: "Terms" },
  { href: "/grievance", title: "Grievances" },
] as const;

/** Links, how to reach us, the registrations and the market-risk line, the © line, then the firm's two letters, large. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <p className="foot-name">{site.name}</p>
            <p>
              Founded by {site.founder.name} in {site.since}. {site.base}
            </p>
            <Link className="cta-line" href="/book">
              Book a free review
            </Link>
          </div>
          <nav className="foot-col" aria-label="What we do">
            <p className="mono">What we do</p>
            <ul>
              {WHAT_WE_DO.map((s) => (
                <li key={s.href}>
                  <Link href={s.href}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="foot-col" aria-label="The firm">
            <p className="mono">The firm</p>
            <ul>
              {FIRM.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="foot-col">
            <p className="mono">Talk to us</p>
            <ul>
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`}>{p.display}</a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>{site.hoursShort}</li>
            </ul>
          </div>
          <nav className="foot-col" aria-label="Legal">
            <p className="mono">The fine print</p>
            <ul>
              {LEGAL.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="legal">
          <p>
            {site.amfiLine} · {site.arn} · EUIN {site.euin}
          </p>
          <p>{site.insuranceLine}</p>
          <p>{site.loanLine}</p>
          <p>{site.marketRisk}</p>
        </div>
        <p className="foot-base">
          © {year} {site.name}. All rights reserved.
        </p>
        {/* Decoration only, so drawn by CSS rather than as text (it was flagged as low-contrast text; 2026-11-27). */}
        <p className="ghost" aria-hidden="true" data-text={site.short} />
      </div>
    </footer>
  );
}
