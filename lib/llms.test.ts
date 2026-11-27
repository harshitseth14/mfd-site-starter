import { describe, expect, it } from "vitest";

import { llmsText } from "./llms";
import { services, site } from "./site";

describe("llms.txt", () => {
  const t = llmsText();

  it("says what we are, with the ARN, and keeps the founding year on the practice, not the mutual funds", () => {
    const summary = t.split("\n").find((l) => l.startsWith("> ")) ?? "";
    expect(summary.startsWith(`> ${site.summary}`)).toBe(true);
    expect(summary).toContain(`AMFI-registered Mutual Fund Distributor (${site.arn})`);
    expect(summary).not.toMatch(new RegExp(`Mutual Fund Distributor[^.]*since ${site.since}`));
    expect(summary).toContain(site.founder.name);
  });

  it("links every service and the other pages", () => {
    for (const s of services) expect(t).toContain(`https://${site.domain}${s.href})`);
    for (const p of ["/corporates", "/approach", "/about", "/careers"]) expect(t).toContain(`https://${site.domain}${p})`);
  });

  it("never uses the words a distributor may not use for itself", () => {
    expect(t).not.toMatch(/advis[eo]r|advisory|investment advice|wealth manag|portfolio manag|financial planner|guarantee|assured/i);
  });
});
