import type { Metadata } from "next";
import Link from "next/link";

import { ConsultEnding } from "@/components/consult-ending";
import { FounderPortrait } from "@/components/founder";
import { CountUp } from "@/components/motion";
import { gridCols } from "@/components/service-page";
import { pages, services, site } from "@/lib/site";

const TITLE = `Our story: founded by ${site.founder.name} in ${site.since}`;
const DESCRIPTION = `${site.name} was founded by ${site.founder.name} in ${site.since}. ${site.base}`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: pages.story.href },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
    url: pages.story.href,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: site.name }],
  },
};

/** What the practice works by. Edit these to match how you work. */
const PRINCIPLES = [
  { title: "The truth about your money", line: "Including when the right answer is to leave it alone." },
  { title: "Nothing sold for the sake of it", line: "If what you hold is working, we say so." },
  { title: "The same people, every time", line: "Families speak to people who know them, year after year." },
  { title: "No fee to you", line: "The review, and everything after it, cost you nothing." },
  { title: "Your money stays yours", line: "Payments go straight from your bank to the fund house, insurer or bank." },
  { title: "Every decision is yours", line: "We set out the options and what each costs. You decide, in your own time." },
] as const;

const TODAY = [...services.map((s) => ({ href: s.href, title: s.title, line: s.line })), { href: pages.corporates.href, title: pages.corporates.title, line: "Surplus cash, insurance, loans and property for companies, and help for the people who work there." }];

/** /about: Our story. Everything here comes from `site.story`, `site.stats` and `site.recognition` in lib/site.ts. */
export default function StoryPage() {
  return (
    <>
      <section className="screen svc-hero" aria-labelledby="story-title">
        <div className="wrap hero">
          <div className="hero-words" data-reveal="">
            <p className="mono">Our story</p>
            <h1 id="story-title">
              {site.story.title[0]}
              <em>{site.story.title[1]}</em>
            </h1>
            <p>{site.story.lede}</p>
            <div className="svc-actions">
              <a className="svc-call" href="#how-it-began">
                Read how it began
              </a>
              <Link className="svc-call" href={pages.approach.href}>
                How we work
              </Link>
            </div>
          </div>
          <FounderPortrait />
        </div>
        <div className="wrap">
          <dl className="stats story-figs" data-reveal="">
            {site.stats.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>
                  <CountUp to={f.value} suffix={f.suffix ?? ""} plain={f.plain ?? false} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="svc-block" id="how-it-began" aria-labelledby="began-title">
        <div className="wrap story-g">
          <div data-reveal="">
            <p className="mono">How it began</p>
            <h2 className="h" id="began-title">
              {site.story.heading}
            </h2>
          </div>
          <div className="story-text" data-reveal="">
            {site.story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {site.recognition.length ? (
        <section className="svc-block" id="recognition" aria-labelledby="recognition-title">
          <div className="wrap">
            <div className="services-top" data-reveal="">
              <p className="mono">Recognition</p>
              <h2 className="h" id="recognition-title">
                Recognised for our work.
              </h2>
            </div>
            <ul className={`offer-grid ${gridCols(site.recognition.length)}`} data-reveal-group="">
              {site.recognition.map((r, i) => (
                <li key={r.title}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{r.title}</h3>
                  <p>{r.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="svc-block" id="principles" aria-labelledby="principles-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">What has not changed</p>
            <h2 className="h" id="principles-title">
              The way we started is the way we still work.
            </h2>
          </div>
          <ul className={`offer-grid ${gridCols(PRINCIPLES.length)}`} data-reveal-group="">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="svc-block" id="today" aria-labelledby="today-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">The practice today</p>
            <h2 className="h" id="today-title">
              Everything a family, or a company, needs.
            </h2>
          </div>
          <ul className={`offer-grid link-grid ${gridCols(TODAY.length)}`} data-reveal-group="">
            {TODAY.map((t, i) => (
              <li key={t.href}>
                <Link href={t.href}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t.title}</h3>
                  <p>{t.line}</p>
                  <span className="more" aria-hidden="true">
                    Read more →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="story-careers" data-reveal="">
            We are {site.team}, and growing. <Link href={pages.careers.href}>See the open roles →</Link>
          </p>
        </div>
      </section>

      <ConsultEnding title={["Start with a free ", "review."]} lede="Leave your name, number and email. We call you, and begin with what you already have." />
    </>
  );
}
