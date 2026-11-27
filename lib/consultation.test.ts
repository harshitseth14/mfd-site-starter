import { describe, expect, it } from "vitest";

import { checkLead, checkSchedule, leadEmail, missedLeadsEmail, scheduleEmail } from "./consultation";

const SLOT = "2026-11-26T04:30:00.000Z"; // Thursday 26 November, 10:00 am IST
const AT = new Date("2026-11-25T06:30:00Z");

describe("step one: the lead", () => {
  it("needs a name, a mobile number and an email, tidying the number", () => {
    const r = checkLead({ name: " Asha Rao ", phone: "+91 90000 00001", email: " asha@example.com " });
    expect(r.ok && r.data).toEqual({ name: "Asha Rao", phone: "+919000000001", email: "asha@example.com" });
  });

  it("says what to fix in plain words", () => {
    const r = checkLead({ name: "A" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors).toEqual({ name: "Please tell us your name.", phone: "Please give us a number we can call.", email: "Please give us your email address." });
    const bad = checkLead({ name: "Asha", phone: "9000000001", email: "asha@" });
    expect(!bad.ok && bad.errors.email).toBe("Please check the email address.");
  });

  it("emails us the lead straight away", () => {
    const r = checkLead({ name: "Asha", phone: "9000000001", email: "asha@example.com" });
    if (!r.ok) throw new Error("expected a valid lead");
    const mail = leadEmail(r.data, AT);
    expect(mail.subject).toBe("New lead: Asha, 9000000001");
    expect(mail.text).toContain("asked for a call back");
    expect(mail.text).toContain("Email: asha@example.com");
  });
});

describe("the page the form was sent from", () => {
  it("names the service in the subject, and drops anything that is not a service", () => {
    const r = checkLead({ name: "Asha", phone: "9000000001", email: "asha@example.com", topic: "insurance" });
    if (!r.ok) throw new Error("expected a valid lead");
    const mail = leadEmail(r.data, AT);
    expect(mail.subject).toBe("New lead (Insurance): Asha, 9000000001");
    expect(mail.text).toContain("Interested in: Insurance");
    const odd = checkLead({ name: "Asha", phone: "9000000001", email: "asha@example.com", topic: "crypto" });
    expect(odd.ok && odd.data.topic).toBeUndefined();
    const s = checkSchedule({ name: "Asha", phone: "9000000001", email: "asha@example.com", startsAt: SLOT, topic: "real-estate" });
    if (!s.ok) throw new Error("expected a valid schedule");
    expect(scheduleEmail(s.data, AT).subject).toMatch(/^Call time picked \(Real estate\): Asha, /);
  });
});

describe("step two: the time, which they may skip", () => {
  it("needs a time, and falls back to a phone call for an unknown way of talking", () => {
    const r = checkSchedule({ name: "Asha", phone: "9000000001", email: "asha@example.com", startsAt: SLOT, mode: "PIGEON" });
    expect(r.ok && r.data.mode).toBe("PHONE");
    const missing = checkSchedule({ name: "Asha", phone: "9000000001", email: "asha@example.com" });
    expect(!missing.ok && missing.errors.startsAt).toBe("Please pick a time.");
  });

  it("emails us the time, time first", () => {
    const r = checkSchedule({ name: "Asha", phone: "9000000001", email: "asha@example.com", startsAt: SLOT, mode: "VIDEO" });
    if (!r.ok) throw new Error("expected a valid schedule");
    const mail = scheduleEmail(r.data, AT);
    expect(mail.subject).toBe("Call time picked: Asha, Thursday 26 November, 10:00 am");
    expect(mail.text.split("\n")[0]).toBe("Time: Thursday 26 November, 10:00 am (IST)");
    expect(mail.text).toContain("How: Video call");
  });
});

describe("names on the form", () => {
  it("are kept to one clean line", () => {
    const r = checkLead({ name: "  Asha\r\n  Kulkarni\t", phone: "9000000001", email: "asha@example.com" });
    expect(r.ok && r.data.name).toBe("Asha Kulkarni");
  });

  it("turn away links and tags, which only bots send", () => {
    for (const bad of ["Visit https://spam.example", "www.spam.example", "<b>Asha</b>"]) {
      expect(checkLead({ name: bad, phone: "9000000001", email: "asha@example.com" }).ok).toBe(false);
    }
  });
});

describe("the catch-up email for leads that were not emailed", () => {
  it("lists each missed lead with its number, email and when it came", () => {
    const at = new Date("2026-11-25T17:02:00Z");
    const one = missedLeadsEmail([{ name: "Asha", phone: "9000000001", email: "asha@example.com", topic: "corporates", createdAt: at }]);
    expect(one.subject).toBe("1 earlier lead that did not reach you");
    expect(one.text).toContain("Asha, 9000000001, asha@example.com (Corporates)");
    expect(one.text).toContain("25 Nov 2026");
    const two = missedLeadsEmail([
      { name: "A", phone: "1", email: "a@example.com", topic: null, createdAt: at },
      { name: "B", phone: "2", email: "b@example.com", topic: "nonsense", createdAt: at },
    ]);
    expect(two.subject).toBe("2 earlier leads that did not reach you");
    expect(two.text).toContain("B, 2, b@example.com\n");
  });
});

describe("an empty mobile number", () => {
  it("asks for a number rather than saying the number is wrong", () => {
    const r = checkLead({ name: "Asha", phone: "  ", email: "asha@example.com" });
    expect(!r.ok && r.errors.phone).toBe("Please give us a number we can call.");
  });
});
