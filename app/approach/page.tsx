import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BalanceKey, BalanceSheetCards } from "@/components/balance-sheet";
import { ConsultEnding } from "@/components/consult-ending";
import { gridCols } from "@/components/service-page";
import { site } from "@/lib/site";

import pen from "@/assets/photos/pen.jpg";

export const metadata: Metadata = {
  title: "Our approach: the goal-based balance sheet",
  description: "Everything your family owns and owes, read against your goals. Every line marked right or needs attention, and a written plan only for what can be improved.",
  alternates: { canonical: "/approach" },
};

const STEPS = [
  { title: "A free review", line: "Thirty minutes by phone, video or in person, about your family and what each of you is working towards." },
  { title: "Everything in one place", line: "Your fund statements, policies, loans, deposits and property, gathered with you, including funds held elsewhere." },
  { title: "Read against your goals", line: "Each goal gets a date and an amount, and each line of the balance sheet is matched to the goal it serves." },
  { title: "Every line marked", line: "What is right, we leave alone and tell you so. What can be improved, we mark." },
  { title: "A written plan", line: "Only for what can be better: what to do, why, and what it costs you." },
  { title: "Reviewed every year", line: "Plus a call when markets fall sharply, a renewal is due, or your life changes." },
] as const;

const NEVER = [
  { title: "Sell for the sake of it", line: "If what you hold is right, we say so and leave it alone." },
  { title: "Hold your money", line: "Payments go straight from your bank to the fund house, insurer or bank." },
  { title: "Ask for your OTP or passwords", line: "You approve every transaction yourself, on your own phone." },
  { title: "Promise returns", line: "No one can, and we never will. The assumptions behind your plan are written down for you." },
  { title: "Rush you", line: "We set out the options and what each one costs. You decide, in your own time." },
  { title: "Charge you a fee", line: "There is no fee to you, for the review or for anything after it." },
] as const;

/** /approach: the goal-based balance sheet, the six steps of working with us, and what we will never do. */
export default function ApproachPage() {
  return (
    <>
      <section className="screen svc-hero" aria-labelledby="approach-title">
        <div className="wrap hero">
          <div className="hero-words" data-reveal="">
            <p className="mono">Our approach</p>
            <h1 id="approach-title">
              Your balance sheet, <em>read against your goals.</em>
            </h1>
            <p>
              A company is judged by its whole balance sheet, not by one investment. We look at your family the same way: everything you own and owe, set against what
              each of you is working towards. Then we mark every line, and write a plan only for what can be improved.
            </p>
            <div className="svc-actions">
              <Link className="btn" href="#begin">
                <span>Book a free review</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a className="svc-call" href="#example">
                See an example
              </a>
            </div>
          </div>
          <figure className="svc-photo">
            <Image className="photo" src={pen} alt="A line drawing of a pen writing on ruled lines" placeholder="blur" loading="eager" fetchPriority="high" sizes="(max-width: 900px) 100vw, 45vw" />
          </figure>
        </div>
      </section>

      <section className="screen sheet-screen" id="example" aria-labelledby="example-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">An example</p>
            <div className="example-head">
              <h2 className="h" id="example-title">
                Every line marked: right, or needs attention.
              </h2>
              <BalanceKey />
            </div>
          </div>
          <BalanceSheetCards />
        </div>
      </section>

      <section className="svc-block" id="how" aria-labelledby="how-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">How it works</p>
            <h2 className="h" id="how-title">
              From the first call to a review every year.
            </h2>
          </div>
          <ol className={`steps-row ${gridCols(STEPS.length)}`} data-reveal-group="">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="mono">Step {i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="svc-block" id="never" aria-labelledby="never-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">What we will not do</p>
            <h2 className="h" id="never-title">
              Six things we will never do.
            </h2>
          </div>
          <ul className={`offer-grid ${gridCols(NEVER.length)}`} data-reveal-group="">
            {NEVER.map((n, i) => (
              <li key={n.title}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{n.title}</h3>
                <p>{n.line}</p>
              </li>
            ))}
          </ul>
          <p className="never-note" data-reveal="">
            We started the practice on these rules in {site.since}. They have not changed.
          </p>
        </div>
      </section>

      <ConsultEnding title={["Start with a free ", "review."]} lede="Leave your name, number and email. We call you, and begin with what you already have." />
    </>
  );
}
