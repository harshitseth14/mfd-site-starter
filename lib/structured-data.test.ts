import { describe, expect, it } from "vitest";

import { site } from "./site";
import { jsonLdScript, organizationJsonLd } from "./structured-data";

describe("structured data for search engines", () => {
  it("names the founder and the year the practice began", () => {
    const o = organizationJsonLd();
    expect(o.founder).toEqual({ "@type": "Person", name: site.founder.name });
    expect(o.foundingDate).toBe(String(site.since));
    expect(o.contactPoint).toHaveLength(2);
    expect(o.url).toBe(`https://${site.domain}`);
  });

  it("escapes anything that could close the script tag", () => {
    expect(jsonLdScript({ a: "</script><b>" })).toBe('{"a":"\\u003c/script>\\u003cb>"}');
  });
});
