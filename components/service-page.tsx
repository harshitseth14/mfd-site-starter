import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ConsultEnding } from "@/components/consult-ending";
import { SERVICE_PHOTOS } from "@/components/photos";
import type { ServicePage as Page } from "@/lib/service-pages";
import { phonesInOrder, services, site } from "@/lib/site";

export function serviceMetadata(page: Page): Metadata {
  const path = `/${page.slug}`;
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: path },
    // The whole openGraph object replaces the layout's, so the site name, locale and picture are repeated here (the
    // picture is app/opengraph-image.png, what WhatsApp shows when a link is shared).
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title: page.meta.title,
      description: page.meta.description,
      url: path,
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: site.name }],
    },
  };
}

/** Rows of four when the items divide by four, otherwise rows of three, so no row is left with a gap. */
export function gridCols(count: number): "c4" | "c3" {
  return count % 4 === 0 ? "c4" : "c3";
}

/**
 * A service page: the opening screen with its photograph, what we help with, how it works, questions, the free
 * consultation, then the fine print and the other services.
 */
export function ServicePage({ page }: { page: Page }) {
  const photo = SERVICE_PHOTOS[page.slug];
  const phones = phonesInOrder(page.callFirst);
  const others = services.filter((s) => s.slug !== page.slug);

  return (
    <>
      <section className="screen svc-hero" aria-labelledby="svc-title">
        <div className="wrap hero">
          <div className="hero-words" data-reveal="">
            <nav className="mono crumbs" aria-label="Breadcrumb">
              <Link href="/#services">What we do</Link> <span aria-hidden="true">/</span> <span aria-current="page">{page.label}</span>
            </nav>
            <h1 id="svc-title">
              {page.title[0]}
              <em>{page.title[1]}</em>
            </h1>
            <p>{page.lede}</p>
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
          <figure className="svc-photo">
            <Image className="photo" src={photo.src} alt={photo.alt} placeholder="blur" loading="eager" fetchPriority="high" sizes="(max-width: 900px) 100vw, 45vw" />
          </figure>
        </div>
      </section>

      <section className="svc-block" id="help" aria-labelledby="help-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">What we help with</p>
            <h2 className="h" id="help-title">
              {page.offersTitle}
            </h2>
          </div>
          <ul className={`offer-grid ${gridCols(page.offers.length)}`} data-reveal-group="">
            {page.offers.map((o, i) => (
              <li key={o.title}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <h3>{o.title}</h3>
                <p>{o.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="svc-block" id="how" aria-labelledby="how-title">
        <div className="wrap">
          <div className="services-top" data-reveal="">
            <p className="mono">How it works</p>
            <h2 className="h" id="how-title">
              Four steps. You decide at every one.
            </h2>
          </div>
          <ol className="steps-row c4" data-reveal-group="">
            {page.steps.map((s, i) => (
              <li key={s.title}>
                <span className="mono">Step {i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {page.faqs.length ? (
        <section className="svc-block" id="questions" aria-labelledby="faq-title">
          <div className="wrap faq-g">
            <div data-reveal="">
              <p className="mono">Good to know</p>
              <h2 className="h" id="faq-title">
                Questions we are often asked.
              </h2>
            </div>
            <div className="faq">
              {page.faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>
                    {f.a}
                    {f.link ? (
                      <>
                        {" "}
                        <Link href={f.link.href}>{f.link.label}</Link>
                      </>
                    ) : null}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ConsultEnding
        title={page.closing.title}
        lede={page.closing.lede}
        phones={phones}
        topic={page.slug}
        whatsappText={`Hello, I would like to know more about ${page.label.toLowerCase()}.`}
      />

      <section className="svc-fine" aria-label={`About ${page.label.toLowerCase()} through us`}>
        <div className="wrap fine-g">
          <div className="fine">
            {page.fine.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <nav className="also" aria-label="Our other services">
            <p className="mono">Also</p>
            <ul>
              {others.map((o) => (
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
