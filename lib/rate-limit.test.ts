import { describe, expect, it } from "vitest";

import { clientIp, createLimiter } from "./rate-limit";

describe("the form limit", () => {
  it("allows a few sends, then stops the same visitor until the window passes", () => {
    const l = createLimiter({ limit: 3, windowMs: 60_000 });
    expect([l.allow("a", 0), l.allow("a", 1), l.allow("a", 2)]).toEqual([true, true, true]);
    expect(l.allow("a", 3)).toBe(false);
    expect(l.allow("b", 3)).toBe(true);
    expect(l.allow("a", 60_001)).toBe(true);
  });

  it("forgets the oldest visitors when it holds too many", () => {
    const l = createLimiter({ limit: 1, windowMs: 60_000, maxKeys: 2 });
    l.allow("a", 0);
    l.allow("b", 0);
    l.allow("c", 0);
    expect(l.allow("a", 1)).toBe(true);
    expect(l.allow("c", 1)).toBe(false);
  });

  it("reads the visitor's address from the proxy headers", () => {
    expect(clientIp("203.0.113.9, 10.0.0.1", null)).toBe("203.0.113.9");
    expect(clientIp("1.2.3.4", "198.51.100.4")).toBe("198.51.100.4");
    expect(clientIp(null, "198.51.100.4")).toBe("198.51.100.4");
    expect(clientIp(null, null)).toBe("unknown");
  });
});
