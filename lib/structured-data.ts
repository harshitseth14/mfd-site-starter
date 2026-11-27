import { site } from "./site";

/**
 * What search engines read about the firm (schema.org, as JSON-LD in the layout): the name, the founder and the year,
 * how to reach us, and the hours. This is how a search for the firm can show its founder.
 */
export function organizationJsonLd() {
  const url = `https://${site.domain}`;
  return {
    "@context": "https://schema.org",
    // LocalBusiness, not FinancialService, and a description that leads with what we are, so nothing reads us as an
    // advisory firm.
    "@type": "LocalBusiness",
    name: site.name,
    description: site.summary,
    identifier: { "@type": "PropertyValue", propertyID: "AMFI Registration Number (ARN)", value: site.arn },
    url,
    logo: `${url}/apple-icon.png`,
    image: `${url}/opengraph-image.png`,
    foundingDate: String(site.since),
    founder: { "@type": "Person", name: site.founder.name },
    email: site.email,
    telephone: site.phones[0].tel,
    contactPoint: site.phones.map((p) => ({ "@type": "ContactPoint", telephone: p.tel, contactType: "customer service" })),
    address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: site.country },
    openingHours: "Mo-Su 10:00-19:00",
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped so nothing in it can close the tag. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
