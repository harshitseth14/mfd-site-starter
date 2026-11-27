import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ConsultEnding } from "@/components/consult-ending";
import { CORP_AREAS, CORP_EXAMPLE, CORP_FAQS, CORP_FINE, CORP_STEPS, CORP_WHO } from "@/lib/corporates";
import { pages, phonesInOrder, services, site } from "@/lib/site";

const TITLE = "Surplus cash, insurance, loans and property for companies";
const DESCRIPTION =
  "Surplus cash in liquid and debt funds, business insurance, loans and property for companies and SMEs, and help for the people who work there. Free review.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: pages.corporates.href },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
    url: pages.corporates.href,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: site.name }],
  },
};

const crore = (s: string) => Number(s.replace(/[^\d.]/g, ""));

/** /corporates: what we do for a company and its people. Mutual funds lead, so the first phone number is shown first. */
export default function CorporatesPage() {
  const phones = phonesInOrder(0);
  const total = crore(CORP_EXAMPLE.total);

  return (
    <>
      <section className="screen svc-hero corp-hero" aria-labelledby="corp-title">
        <div className="wrap hero">
          <div className="hero-words" data-reveal="">
            <p className="mono">Corporates</p>
            <h1 id="corp-title">
              Your company&apos;s money, <em>looked after in one place.</em>
            </h1>
            <p>
              We have worked with a great many SMEs, and with larger companies, for years. Surplus cash, insurance, loans and property, and help for the people who
              work there: one team for all of it, and statements your accounts team can use.
            </p>
            <div className="svc-actions">
              <Link className="btn" href="#begin">
                <span>Book a free review</span>
                <span aria-hidden="true">→</span>
              </Link>
              <span className="svc-call">
                Or call <a href={`tel:${phones[0].tel}`}>{phones[0].display}</a> or <a href={`tel:${phones[1].tel}`}>{phones[1].display}</a>
              </span>
            </div>
          </div>
          <div className="card corp-ex" role="figure" aria-labelledby="corp-ex-title">
            <div className="card-head">
              <b id="corp-ex-title">{CORP_EXAMPLE.title}</b>
            </div>
            <div className="card-body">
              {CORP_EXAMPLE.rows.map((r) => (
                <div className="ladder" key={r.when}>
                  <span className="mono">{r.when}</span>
                  <span>
                    {r.need}
                    <small>{r.fund}</small>
                    <i className="bar" aria-hidden="true" style={{ "--w": `${Math.round((crore(r.amount) / total) * 100)}%` } as CSSProperties} />
                  </span>
                  <span className="amt">{r.amount}</span>
                </div>
              ))}
              <div className="ladder total">
                <span className="mono">Total</span>
                <span>The company&apos;s surplus</span>
                <span className="amt">{CORP_EXAMPLE.total}</span>
              </div>
            </div>
            <p className="card-foot">{CORP_EXAMPLE.note}</p>
          </div>
        </div>
        <div className="wrap">
          <ul className="corp-who" aria-label="Who we work with">
            <li className="mono">We work with</li>
            {CORP_WHO.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="svc-block" id="help" aria-labelledby="help-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">What we do for companies</p>
            <h2 className="h" id="help-title">
              Everything we do for families, for your company and its people.
            </h2>
          </div>
          <ol className="corp-areas" data-reveal-group="">
            {CORP_AREAS.map((a, i) => (
              <li key={a.slug} id={a.slug}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <div className="corp-area-head">
                  <h3>{a.title}</h3>
                  <p>{a.line}</p>
                  {a.more ? (
                    <Link className="cta-line" href={a.more.href}>
                      {a.more.label} →
                    </Link>
                  ) : null}
                </div>
                <ul>
                  {a.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="svc-block" id="how" aria-labelledby="how-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">How it works</p>
            <h2 className="h" id="how-title">
              Four steps. Your company decides at every one.
            </h2>
          </div>
          <ol className="steps-row c4" data-reveal-group="">
            {CORP_STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="mono">Step {i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="svc-block" id="questions" aria-labelledby="faq-title">
        <div className="wrap faq-g">
          <div data-reveal="">
            <p className="mono">Good to know</p>
            <h2 className="h" id="faq-title">
              Questions companies often ask.
            </h2>
          </div>
          <div className="faq">
            {CORP_FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ConsultEnding
        title={["Talk to us about ", "your company."]}
        lede="Leave your name, number and email. We call you, meet the owners or your finance team, and begin with what the company already holds."
        phones={phones}
        topic="corporates"
        whatsappText="Hello, I would like to know more about your services for companies."
      />

      <section className="svc-fine" aria-label="About our services for companies">
        <div className="wrap fine-g">
          <div className="fine">
            {CORP_FINE.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <nav className="also" aria-label="Our services">
            <p className="mono">Also</p>
            <ul>
              {services.map((o) => (
                <li key={o.slug}>
                  <Link href={o.href}>{o.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
