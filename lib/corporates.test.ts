import { describe, expect, it } from "vitest";

import { CORP_AREAS, CORP_EXAMPLE, CORP_FAQS, CORP_FINE, CORP_STEPS, CORP_WHO } from "./corporates";
import { services } from "./site";

const ALL_TEXT = JSON.stringify({ CORP_AREAS, CORP_EXAMPLE, CORP_FAQS, CORP_FINE, CORP_STEPS, CORP_WHO });

describe("the Corporates page", () => {
  it("covers investments, statements, insurance, loans, property and people", () => {
    expect(CORP_AREAS.map((a) => a.slug)).toEqual(["surplus-cash", "statements", "insurance", "loans", "property", "people"]);
    for (const a of CORP_AREAS) expect(a.items.length).toBeGreaterThanOrEqual(3);
  });

  it("links each area only to service pages that exist", () => {
    const hrefs = new Set(services.map((s) => s.href));
    for (const a of CORP_AREAS) if (a.more) expect(hrefs.has(a.more.href)).toBe(true);
  });

  it("adds up the example", () => {
    const crore = (s: string) => Number(s.replace(/[^\d.]/g, ""));
    const sum = CORP_EXAMPLE.rows.reduce((t, r) => t + crore(r.amount), 0);
    expect(sum).toBe(crore(CORP_EXAMPLE.total));
  });

  it("asks no fee question, and says debt funds are not deposits", () => {
    expect(CORP_FAQS.some((f) => /fee/i.test(f.q))).toBe(false);
    expect(ALL_TEXT).toMatch(/not deposits/);
    expect(CORP_STEPS).toHaveLength(4);
  });

  it("never uses words a distributor may not use, or promises returns", () => {
    expect(ALL_TEXT).not.toMatch(/advis[eo]r|advisory|investment advice|wealth manag|portfolio manag|financial planner|guarantee|assured|expert in/i);
    expect(ALL_TEXT).not.toMatch(/\d+(\.\d+)?\s?%/);
  });
});
