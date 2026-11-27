import { describe, expect, it } from "vitest";

import { applyHref, ROLES } from "./careers";

/** Names an AMFI-registered Mutual Fund Distributor may not use for itself, here or in a job title. */
const BANNED = /advis[eo]r|investment advice|wealth manager|portfolio manager|financial planner|guarantee|assured/i;

describe("job profiles", () => {
  it("lists a role for every part of the practice, each with what they do and what we look for", () => {
    expect(ROLES.map((r) => r.title)).toEqual([
      "Client Relationship Manager",
      "Research Analyst",
      "Economist",
      "Planning Associate",
      "Insurance Executive",
      "Loans Executive",
      "Property Associate",
      "Office Assistant",
    ]);
    for (const r of ROLES) {
      expect(r.does.length).toBeGreaterThanOrEqual(3);
      expect(r.needs.length).toBeGreaterThanOrEqual(3);
      expect(new Set(ROLES.map((x) => x.slug)).size).toBe(ROLES.length);
    }
  });

  it("never uses a title or words the rules forbid", () => {
    expect(JSON.stringify(ROLES)).not.toMatch(BANNED);
  });

  it("puts the role in the email's subject line", () => {
    expect(applyHref("careers@example.com", "Research Analyst")).toBe("mailto:careers@example.com?subject=Application%3A%20Research%20Analyst");
    expect(applyHref("careers@example.com")).toBe("mailto:careers@example.com?subject=Application");
  });
});
