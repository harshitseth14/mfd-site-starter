import { describe, expect, it } from "vitest";

import { bookingDays, dayLabel, googleCalendarHref, HOURS, isOpenSlot, slotLabel, timeLabel } from "./booking";

// 25 Nov 2026, 9:00 am IST (03:30 UTC), a Wednesday.
const NOW = new Date("2026-11-25T03:30:00Z");

describe("booking a call", () => {
  it("offers every day for two weeks, 10 am to 7 pm in half hours", () => {
    const days = bookingDays(HOURS, NOW);
    expect(days).toHaveLength(14);
    expect(days[1].slots).toHaveLength(18);
    expect(days[1].slots[0].label).toBe("10:00 am");
    expect(days[1].slots.at(-1)?.label).toBe("6:30 pm");
  });

  it("needs two hours' notice, so today starts at 11 am when it is 9 am", () => {
    const today = bookingDays(HOURS, NOW)[0];
    expect(today.long).toBe("Wednesday 25 November");
    expect(today.slots[0].label).toBe("11:00 am");
  });

  it("drops today once its last time has gone", () => {
    const late = new Date("2026-11-25T13:00:00Z"); // 6:30 pm IST
    expect(bookingDays(HOURS, late)[0].long).toBe("Thursday 26 November");
  });

  it("groups times into morning, afternoon and evening", () => {
    const parts = new Set(bookingDays(HOURS, NOW)[1].slots.map((s) => s.part));
    expect([...parts]).toEqual(["Morning", "Afternoon", "Evening"]);
  });

  it("accepts only times it offered", () => {
    const open = bookingDays(HOURS, NOW)[1].slots[3].startsAt;
    expect(isOpenSlot(HOURS, NOW, open)).toBe(true);
    expect(isOpenSlot(HOURS, NOW, "2026-11-26T04:40:00.000Z")).toBe(false);
    expect(isOpenSlot(HOURS, NOW, "2026-11-25T04:30:00.000Z")).toBe(false); // 10 am today: too soon
  });

  it("writes times in Indian time", () => {
    expect(timeLabel("2026-11-26T04:30:00Z")).toBe("10:00 am");
    expect(dayLabel("2026-11-26T04:30:00Z")).toBe("Thursday 26 November");
    expect(slotLabel("2026-11-26T12:00:00Z")).toBe("Thursday 26 November, 5:30 pm");
  });

  it("links to Google Calendar for the call's half hour", () => {
    const href = googleCalendarHref("2026-11-26T04:30:00.000Z", 30, "Call", "Details");
    expect(href).toContain("dates=20261126T043000Z%2F20261126T050000Z");
  });
});
