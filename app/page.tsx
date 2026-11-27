import Image from "next/image";
import Link from "next/link";

import { BalanceKey, BalanceSheetCards } from "@/components/balance-sheet";
import { BookingForm } from "@/components/booking-form";
import { Icon } from "@/components/icons";
import { FounderLine } from "@/components/founder";
import { CountUp } from "@/components/motion";
import { SERVICE_PHOTOS } from "@/components/photos";
import { HeroSceneLazy } from "@/components/scene/hero-scene-lazy";
import { pages, services, site, whatsappHref } from "@/lib/site";

import chai from "@/assets/photos/chai.jpg";
import pen from "@/assets/photos/pen.jpg";

/** Why us: six reasons, in no particular order. */
const REASONS = [
  { title: "Nothing sold for the sake of it", line: "If what you hold is working, we tell you so and leave it alone." },
  { title: "The same people, every time", line: "Whoever you speak to on the first call looks after you year after year." },
  { title: "Everything in one place", line: "Investments, insurance, loans and real estate, without being passed between firms." },
  { title: "A plan on paper", line: "Every recommendation comes as a written plan, reviewed on a schedule you choose." },
  { title: "No fee to start", line: "The first review of everything you hold costs you nothing." },
  { title: "Every day, any city", line: "In person or by video, wherever you live. Calling after 7 pm is fine too." },
] as const;

/** Everything we do for you: the practical help that comes with the relationship. */
const WE_DO = [
  { icon: "target", title: "A plan for every goal", line: "What each goal will cost, what to set aside each month, and a review with us every year." },
  { icon: "landmark", title: "Loans compared across banks", line: "Home, car, business and education loans: the banks' offers for your profile side by side, and help until it is disbursed." },
  { icon: "shield", title: "Insurance that fits", line: "Health, motor, home and business cover explained plainly, renewed on time, and help when you claim." },
  { icon: "dashboard", title: "Everything in one place", line: "One view of what you own and owe, including funds held elsewhere, kept up to date by us." },
  { icon: "clipboard", title: "Paperwork, handled", line: "KYC, forms, nominations, bank and address changes, and the follow-up until it is done." },
  { icon: "phone", title: "A call when it matters", line: "When markets fall sharply or a renewal is due, we call you before you have to ask." },
  { icon: "wallet", title: "Your money stays yours", line: "Payments go straight from your bank to the fund house, insurer or bank. We never ask for your OTP or passwords." },
  { icon: "handshake", title: "No pressure, ever", line: "We lay out the options and what each one costs. You decide, at your own pace." },
] as const;


/**
 * The homepage. Each section is sized to fit one laptop screen, so nothing in a section has to be scrolled to.
 */
export default function HomePage() {
  return (
    <>
      <section className="screen first" aria-labelledby="hero-title">
        <div className="wrap hero">
          <div className="hero-words" data-reveal="">
            <span className="mono">{services.slice(0, 4).map((x) => x.title).join(" · ")}</span>
            <h1 id="hero-title">
              We tell you what is right with your money, <em>and help with what can be improved.</em>
            </h1>
            <p>
              A family practice since {site.since}, for families across India: mutual funds, insurance, loans and real estate. It begins with a free
              review of everything you already hold.
            </p>
            <Link className="btn" href="#begin">
              <span>Book a free review</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="hero-scene">
            <HeroSceneLazy />
          </div>
        </div>
        <div className="wrap">
          <div className="four" data-reveal-group="">
            <div>
              <span className="mono">Free</span>
              <h2>A free review</h2>
              <p>Of everything you already hold, read against your goals.</p>
            </div>
            <div>
              <span className="mono">Untouched</span>
              <h2>What is right stays right</h2>
              <p>If it is working, we say so and leave it alone. Nothing is sold for the sake of it.</p>
            </div>
            <div>
              <span className="mono">Room to improve</span>
              <h2>We help with what can be improved</h2>
              <p>A written plan for the parts that can be better, and nothing more.</p>
            </div>
            <div>
              <span className="mono">Since {site.since}</span>
              <h2>In the industry since {site.since}</h2>
              <p>With families and businesses across {site.region}.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="screen" id="services" aria-labelledby="services-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">What we do</p>
            <h2 className="h" id="services-title">
              One relationship for everything your family owns and owes.
            </h2>
          </div>
          <ul className="plates" data-reveal-group="">
            {services.map((s) => {
              const photo = SERVICE_PHOTOS[s.slug];
              return (
                <li key={s.slug} className="item">
                  <Link href={s.href}>
                    <span className="art">
                      <Image className="photo" src={photo.src} alt={photo.alt} placeholder="blur" sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 280px" />
                    </span>
                    <span className="mono">{s.tag}</span>
                    <h3>{s.title}</h3>
                    <ul className="prod">
                      {s.products.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <span className="more" aria-hidden="true">
                      Read more →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link className="corp-strip" href={pages.corporates.href} data-reveal="">
            <span className="mono">For companies</span>
            <span>We work with a great many SMEs: surplus cash, insurance for the business, loans and property, and help for the people who work there.</span>
            <span className="more">Corporates →</span>
          </Link>
        </div>
      </section>

      <section className="screen sheet-screen" id="approach" aria-labelledby="approach-title">
        <div className="wrap">
          <div className="sheet-top" data-reveal="">
            <div>
              <p className="mono">The goal-based balance sheet</p>
              <h2 className="h" id="approach-title">
                Your balance sheet, read against your goals.
              </h2>
            </div>
            <div className="sheet-intro">
              <p>
                A company is judged by its whole balance sheet, not by one investment. We look at your family the same way, set it against what each of you is working
                towards, mark every line, and then write a plan.
              </p>
              <BalanceKey />
            </div>
            <figure className="sheet-ph">
              <Image className="photo" src={pen} alt="A line drawing of a pen writing on ruled lines" placeholder="blur" sizes="260px" />
            </figure>
          </div>

          <BalanceSheetCards />
        </div>
      </section>

      <section className="screen why" id="why" aria-labelledby="why-title">
        <div className="wrap why-g">
          <div className="why-main" data-reveal="">
            <p className="mono">Why us</p>
            <h2 id="why-title">
              Trusted by families and businesses across {site.region}, <em>since {site.since}.</em>
            </h2>
            <p className="why-trust">
              What they trust us for is simple: we tell them the truth about their money, including when the right answer is to leave it alone.
            </p>
            <dl className="stats">
              {site.stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>
                    <CountUp to={s.value} suffix={s.suffix ?? ""} plain={s.plain ?? false} />
                  </dd>
                </div>
              ))}
            </dl>
            <FounderLine />
          </div>
          <ul className="reasons" data-reveal-group="">
            {REASONS.map((r) => (
              <li key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="screen we-do" id="everything" aria-labelledby="we-do-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">What you get</p>
            <h2 className="h" id="we-do-title">
              Everything we do for you.
            </h2>
          </div>
          <ul className="we-do-grid" data-reveal-group="">
            {WE_DO.map((w) => (
              <li key={w.title}>
                <span className="we-icon">
                  <Icon name={w.icon} />
                </span>
                <h3>{w.title}</h3>
                <p>{w.line}</p>
              </li>
            ))}
          </ul>
          <p className="we-do-fee">There is no fee to you for any of this.</p>
        </div>
      </section>

      <section className="screen ending" id="begin" aria-labelledby="begin-title">
        <div className="wrap end-g">
          <div className="end-words" data-reveal="">
            <p className="mono">Begin here</p>
            <h2 id="begin-title">
              A free <em>review.</em>
            </h2>
            <p className="lede">Leave your name, number and email and we will call you, or call or WhatsApp us with any question, big or small. If we miss your call, we will call you back.</p>
            <div className="reach">
              <figure className="tea">
                <Image className="photo" src={chai} alt="A line drawing of a cup of tea" placeholder="blur" sizes="200px" />
              </figure>
              <div>
                <div className="contact">
                  {site.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`}>
                      {p.display}
                    </a>
                  ))}
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                  <a className="wa" href={whatsappHref("Hello, I would like to know more about your services.")} target="_blank" rel="noopener noreferrer">
                    Message us on WhatsApp →
                  </a>
                </div>
                <p className="hours">
                  {site.hours}
                  <br />
                  {site.afterHours}
                </p>
              </div>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
