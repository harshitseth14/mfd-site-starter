import { describe, expect, it } from "vitest";

import { recipients } from "./recipients";

describe("lead email recipients", () => {
  it("always includes our inbox", () => {
    expect(recipients("info@firm.example", undefined)).toEqual(["info@firm.example"]);
    expect(recipients("info@firm.example", "")).toEqual(["info@firm.example"]);
  });

  it("adds the extra addresses, once each, ignoring anything that is not an address", () => {
    expect(recipients("info@firm.example", " a@example.com, B@example.com;a@example.com  not-an-email , INFO@firm.example")).toEqual([
      "info@firm.example",
      "a@example.com",
      "b@example.com",
    ]);
  });
});
