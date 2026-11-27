/**
 * Booking a call. Pure: the open times for the coming days from our hours (IST), the words for a time, and a
 * Google Calendar link. Times travel as ISO instants (UTC); every label is in Indian time.
 */

export type BookingHours = {
  /** Which weekdays we take calls, Sunday first. */
  days: readonly [boolean, boolean, boolean, boolean, boolean, boolean, boolean];
  /** "10:00", 24-hour, IST. */
  start: string;
  end: string;
  slotMinutes: number;
  daysAhead: number;
  /** How soon a call can be booked, in hours from now. */
  noticeHours: number;
};

/** Every day, 10 am to 7 pm, 30-minute calls, two weeks ahead, at least two hours' notice. */
export const HOURS: BookingHours = {
  days: [true, true, true, true, true, true, true],
  start: "10:00",
  end: "19:00",
  slotMinutes: 30,
  daysAhead: 14,
  noticeHours: 2,
};

export const MODES = [
  { key: "PHONE", title: "Phone call", line: "We call you on your mobile." },
  { key: "VIDEO", title: "Video call", line: "We WhatsApp you a Google Meet link before the call." },
  { key: "IN_PERSON", title: "Meet in person", line: "We confirm the place on WhatsApp." },
] as const;
export type Mode = (typeof MODES)[number]["key"];
export const MODE_KEYS = MODES.map((m) => m.key) as [Mode, ...Mode[]];

const IST_MIN = 330;
const MIN = 60_000;
const DAY = 24 * 60 * MIN;
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function ist(instant: Date) {
  const d = new Date(instant.getTime() + IST_MIN * MIN);
  return { weekday: d.getUTCDay(), day: d.getUTCDate(), month: d.getUTCMonth(), year: d.getUTCFullYear(), hours: d.getUTCHours(), minutes: d.getUTCMinutes() };
}

/** Midnight UTC of the Indian calendar day that `instant` falls on (a date-only value). */
export function istDay(instant: Date): Date {
  const p = ist(instant);
  return new Date(Date.UTC(p.year, p.month, p.day));
}

const clock = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
/** The instant of `minutes` past midnight IST on the date-only day `day`. */
const at = (day: Date, minutes: number) => new Date(day.getTime() + (minutes - IST_MIN) * MIN);
const iso = (day: Date) => day.toISOString().slice(0, 10);

/** "10:30 am" */
export function timeLabel(instant: Date | string): string {
  const p = ist(new Date(instant));
  const h = p.hours % 12 === 0 ? 12 : p.hours % 12;
  return `${h}:${String(p.minutes).padStart(2, "0")} ${p.hours < 12 ? "am" : "pm"}`;
}

/** "Monday 2 December" */
export function dayLabel(instant: Date | string): string {
  const p = ist(new Date(instant));
  return `${WEEKDAYS[p.weekday]} ${p.day} ${MONTHS[p.month]}`;
}

/** "Monday 2 December, 10:30 am" */
export function slotLabel(instant: Date | string): string {
  return `${dayLabel(instant)}, ${timeLabel(instant)}`;
}

export type Slot = { startsAt: string; label: string; part: "Morning" | "Afternoon" | "Evening" };
export type BookingDay = { date: string; weekday: string; short: string; long: string; slots: Slot[] };

/** The days to pick from, today first: each working day with its open times. Today drops off once it has none left. */
export function bookingDays(hours: BookingHours, now: Date): BookingDay[] {
  const today = istDay(now);
  const earliest = now.getTime() + hours.noticeHours * 60 * MIN;
  const out: BookingDay[] = [];
  for (let i = 0; i < hours.daysAhead; i++) {
    const day = new Date(today.getTime() + i * DAY);
    if (!hours.days[day.getUTCDay()]) continue;
    const slots: Slot[] = [];
    for (let t = clock(hours.start); t + hours.slotMinutes <= clock(hours.end); t += hours.slotMinutes) {
      const instant = at(day, t);
      if (instant.getTime() < earliest) continue;
      const h = Math.floor(t / 60);
      slots.push({ startsAt: instant.toISOString(), label: timeLabel(instant), part: h < 12 ? "Morning" : h < 16 ? "Afternoon" : "Evening" });
    }
    const p = ist(at(day, 12 * 60));
    out.push({ date: iso(day), weekday: WEEKDAYS[p.weekday].slice(0, 3), short: `${p.day} ${MONTHS[p.month].slice(0, 3)}`, long: `${WEEKDAYS[p.weekday]} ${p.day} ${MONTHS[p.month]}`, slots });
  }
  if (out[0] && out[0].slots.length === 0) out.shift();
  return out;
}

/** True when `startsAt` is one of the open times right now (checked again on the server when a call is booked). */
export function isOpenSlot(hours: BookingHours, now: Date, startsAt: string): boolean {
  return bookingDays(hours, now).some((d) => d.slots.some((s) => s.startsAt === startsAt));
}

/** A link that adds the call to Google Calendar. */
export function googleCalendarHref(startsAt: string, minutes: number, title: string, details: string): string {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + minutes * MIN);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const q = new URLSearchParams({ action: "TEMPLATE", text: title, dates: `${stamp(start)}/${stamp(end)}`, details });
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}
