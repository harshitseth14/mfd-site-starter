import Link from "next/link";

import { pages, services, site } from "@/lib/site";

export const metadata = { title: "Page not found" };

/**
 * A link that leads nowhere: a mistyped address or an old one. Says so plainly and offers every page (2026-11-27: it used
 * to say "this page is next on our list", left over from when the site was being built).
 */
export default function NotFound() {
  return (
    <section className="sec soon">
      <div className="wrap g">
        <p className="mono label">Page not found</p>
        <div className="body">
          <h1 className="h">This page does not exist.</h1>
          <p className="intro">
            The link may be old or mistyped. Everything we do is one click away below, or call us on {site.phones[0].display}.
          </p>
          <ul className="nf-links">
            {[...services, pages.corporates, pages.story, pages.careers].map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.title}</Link>
              </li>
            ))}
          </ul>
          <div className="soon-links">
            <Link className="btn" href="/">
              <span>Back to the homepage</span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="cta-line" href={pages.consultation.href}>
              Book a free review
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
