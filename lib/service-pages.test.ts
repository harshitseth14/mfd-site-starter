import { describe, expect, it } from "vitest";

import { SERVICE_PAGES } from "./service-pages";
import { pages, phonesInOrder, services, site } from "./site";

/** Words an AMFI-registered Mutual Fund Distributor must not use about itself, and promises no one may make. */
const BANNED = /advis[eo]r|investment advice|wealth manager|portfolio manager|financial planner|guarantee|assured|risk[- ]free|best returns/i;

describe("service pages", () => {
  it("has a page for every service, under its own address", () => {
    for (const s of services) {
      expect(SERVICE_PAGES[s.slug].slug).toBe(s.slug);
      expect(s.href).toBe(`/${s.slug}`);
    }
  });

  it("gives every page the same parts", () => {
    for (const p of Object.values(SERVICE_PAGES)) {
      expect(p.offers.length).toBeGreaterThanOrEqual(6);
      expect(p.steps).toHaveLength(4);
      if (p.faqs.length) expect(p.faqs.length).toBeGreaterThanOrEqual(3);
      expect(p.fine.length).toBeGreaterThanOrEqual(1);
      expect(p.meta.description.length).toBeLessThanOrEqual(170);
    }
  });

  it("leaves the questions off the investments page", () => {
    expect(SERVICE_PAGES.investments.faqs).toHaveLength(0);
  });

  it("leads with the first number for investments, loans and real estate, the second for insurance and family, and always shows both", () => {
    const [a, b] = site.phones.map((p) => p.tel);
    const first = (slug: keyof typeof SERVICE_PAGES) => phonesInOrder(SERVICE_PAGES[slug].callFirst).map((p) => p.tel);
    for (const slug of ["investments", "loans", "real-estate"] as const) expect(first(slug)).toEqual([a, b]);
    for (const slug of ["insurance", "family"] as const) expect(first(slug)).toEqual([b, a]);
  });

  it("never lets a phone number break across two lines", () => {
    for (const p of site.phones) expect(p.display).not.toMatch(/ /);
  });

  it("carries the right fine print", () => {
    expect(SERVICE_PAGES.insurance.fine).toContain(site.insuranceSolicitation);
    expect(SERVICE_PAGES.loans.fine).toContain(site.lenderNote);
  });

  it("never uses words the rules forbid, or promises returns", () => {
    const words = JSON.stringify([SERVICE_PAGES, services, pages, site]);
    expect(words).not.toMatch(BANNED);
  });
});

describe("fee questions", () => {
  it("are not asked on any page; how we are paid is on the terms page", () => {
    for (const page of Object.values(SERVICE_PAGES)) expect(page.faqs.some((f) => /fee|free\?/i.test(f.q))).toBe(false);
  });
});
