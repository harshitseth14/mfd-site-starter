import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { gridCols } from "@/components/service-page";
import { applyHref, ROLES } from "@/lib/careers";
import { site } from "@/lib/site";

import desk from "@/assets/photos/consultation.jpg";

export const metadata: Metadata = {
  title: "Careers",
  description: `Work with ${site.name}: roles in client relationships, research, planning, insurance, loans, property and the office. Apply to ${site.careersEmail}.`,
  alternates: { canonical: "/careers" },
};

const HOW_WE_WORK = [
  { title: "A growing team", line: "From your first month you work directly with clients and with the people who run the firm." },
  { title: "For the long run", line: "We look after families for years, not for one sale. We hire people who want to work the same way." },
  { title: "Honest, always", line: "We never sell anything for the sake of it, and we will never ask you to." },
  { title: "The whole picture", line: "Investments, insurance, loans and property, read as one balance sheet. You learn all of it." },
  { title: "Help with certification", line: "Anyone who works with clients on mutual funds needs NISM Series V-A. We help you prepare for it." },
  { title: "From home or the office", line: `Some roles are from home and some are at our office in ${site.city}. It varies by role, and we discuss it with you.` },
] as const;

const INCLUDE = ["Your CV, as a PDF", "The role you are applying for, in the subject line", "A few lines on why you would be good at it", "Your city, and when you could start"] as const;

/** /careers: how we work, the job profiles, and how to apply (by email; nothing is sent through the website). */
export default function CareersPage() {
  return (
    <>
      <section className="screen svc-hero" aria-labelledby="careers-title">
        <div className="wrap hero">
          <div className="hero-words" data-reveal="">
            <p className="mono">Careers</p>
            <h1 id="careers-title">
              Work with a firm that has helped families with their finances <em>since {site.since}.</em>
            </h1>
            <p>
              {site.founder.name} started the firm in {site.since}. Today we are {site.team} in {site.city}, looking after families&apos; investments, insurance, loans and
              property. We hire for the long run: people who are careful with numbers, honest with clients, and happy to own their work.
            </p>
            <div className="svc-actions">
              <Link className="btn" href="#roles">
                <span>See the roles</span>
                <span aria-hidden="true">→</span>
              </Link>
              <span className="svc-call">
                Or email <a href={applyHref(site.careersEmail)}>{site.careersEmail}</a>
              </span>
            </div>
          </div>
          <figure className="svc-photo">
            <Image className="photo" src={desk} alt="A line drawing of papers on a desk" placeholder="blur" loading="eager" fetchPriority="high" sizes="(max-width: 900px) 100vw, 45vw" />
          </figure>
        </div>
      </section>

      <section className="svc-block" id="roles" aria-labelledby="roles-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">Open roles</p>
            <h2 className="h" id="roles-title">
              Read the profiles. If one fits you, write to us.
            </h2>
          </div>
          <div className="roles" data-reveal-group="">
            {ROLES.map((r, i) => (
              <details key={r.slug} id={r.slug}>
                <summary>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="role-name">
                    <b>{r.title}</b>
                    <span>{r.line}</span>
                  </span>
                  <span className="role-open mono" aria-hidden="true" />
                </summary>
                <div className="role-body">
                  <div>
                    <p className="mono">What you will do</p>
                    <ul>
                      {r.does.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mono">What we look for</p>
                    <ul>
                      {r.needs.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                    {r.plus.length ? (
                      <>
                        <p className="mono">Good to have</p>
                        <ul>
                          {r.plus.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                  <p className="role-apply">
                    <span>From home or at the office: this varies by role, and we discuss it with you.</span>
                    <a className="cta-line" href={applyHref(site.careersEmail, r.title)}>
                      Apply for this role by email →
                    </a>
                  </p>
                </div>
              </details>
            ))}
          </div>
          <p className="roles-other" data-reveal="">
            <span>Not one of these roles? If you have another skill that could be useful to us, write to us and tell us about it.</span>
            <a className="cta-line" href={applyHref(site.careersEmail, "Another skill")}>
              {site.careersEmail} →
            </a>
          </p>
        </div>
      </section>

      <section className="svc-block" id="how-we-work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">How we work</p>
            <h2 className="h" id="work-title">
              What working here is like.
            </h2>
          </div>
          <ul className={`offer-grid ${gridCols(HOW_WE_WORK.length)}`} data-reveal-group="">
            {HOW_WE_WORK.map((w, i) => (
              <li key={w.title}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{w.title}</h3>
                <p>{w.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="screen ending" id="apply" aria-labelledby="apply-title">
        <div className="wrap end-g">
          <div className="end-words" data-reveal="">
            <p className="mono">How to apply</p>
            <h2 id="apply-title">
              Apply <em>by email.</em>
            </h2>
            <p className="lede">
              If you feel you are the right person for one of these roles, email us. We read every application ourselves, and if there is a fit we will get in touch to
              talk further.
            </p>
          </div>
          <div className="form apply-card">
            <div className="booking-head">
              <h3>Write to us</h3>
              <p className="small-note">There is no form to fill in.</p>
            </div>
            <a className="apply-mail" href={applyHref(site.careersEmail)}>
              {site.careersEmail}
            </a>
            <div>
              <p className="mono">Please include</p>
              <ul className="include">
                {INCLUDE.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <a className="btn" href={applyHref(site.careersEmail)}>
              <span>Email your application</span>
              <span aria-hidden="true">→</span>
            </a>
            <p className="small-note consent">
              We use what you send only to consider you for a role. <Link href="/privacy#applicants">Privacy notice</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
