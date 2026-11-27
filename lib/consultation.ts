import { z } from "zod";

import { MODE_KEYS, MODES, slotLabel, type Mode } from "./booking";
import { pages, services, type ServiceSlug } from "./site";

// Zod tries `new Function()` to speed itself up; the site's security policy (no eval) rightly blocks that, which logged
// a policy violation on every page. Tell it not to try.
z.config({ jitless: true });

/**
 * The free review, lead first: getting the lead matters most. Step one asks only for a name and a mobile number and emails us
 * at once. Step two, which they may skip, picks a time and how to talk, and emails us again.
 */

const phone = z
  .string({ error: "Please give us a number we can call." })
  .trim()
  .min(1, "Please give us a number we can call.")
  .transform((s) => s.replace(/[\s().-]/g, ""))
  .pipe(z.string().regex(/^\+?\d{8,15}$/, "Please check the number. Add the country code if you are outside India."));
const name = z
  .string({ error: "Please tell us your name." })
  .transform((s) => s.replace(/[\s\u0000-\u001f\u007f]+/g, " ").trim())
  .pipe(
    z
      .string()
      .min(2, "Please tell us your name.")
      .max(80, "Please shorten the name.")
      .refine((s) => !/https?:|www\.|<|>/i.test(s), "Please tell us your name."),
  );
const email = z
  .string({ error: "Please give us your email address." })
  .trim()
  .min(1, "Please give us your email address.")
  .max(120, "Please check the email address.")
  .pipe(z.email("Please check the email address."));

/**
 * The page the form was sent from, if any, so the right person calls back: a service page, or the page for companies
 *. Anything else is dropped.
 */
export const TOPIC_KEYS = ["investments", "insurance", "loans", "real-estate", "family", "corporates"] as const satisfies readonly (ServiceSlug | "corporates")[];
export type Topic = (typeof TOPIC_KEYS)[number];
const topic = z.enum(TOPIC_KEYS).optional().catch(undefined);

export function topicTitle(t: Topic): string {
  if (t === "corporates") return pages.corporates.title;
  return services.find((s) => s.slug === t)?.title ?? t;
}

export const leadSchema = z.object({ name, phone, email, topic });
export const scheduleSchema = z.object({
  name,
  phone,
  email,
  startsAt: z.string({ error: "Please pick a time." }).trim().min(1, "Please pick a time.").max(40, "Please pick a time."),
  mode: z.enum(MODE_KEYS).catch("PHONE"),
  note: z.string().trim().max(1000, "Please keep the note under 1,000 characters.").optional(),
  topic,
  /** The saved lead this time belongs to (its database id, from step one), if it was saved. Anything else is dropped. */
  lead: z.uuid().optional().catch(undefined),
});

export type Lead = z.infer<typeof leadSchema>;
export type Schedule = z.infer<typeof scheduleSchema>;
export type Field = "name" | "phone" | "email" | "startsAt" | "mode" | "note" | "topic" | "lead";
export type Errors = Partial<Record<Field, string>>;
export type Values = Partial<Record<Field, string>>;

export type LeadState =
  | { status: "idle" }
  | { status: "invalid"; errors: Errors; values: Values }
  | { status: "failed"; values: Values }
  | { status: "received"; name: string; phone: string; email: string; topic?: Topic; lead?: string };

export type ScheduleState =
  | { status: "idle" }
  | { status: "invalid"; errors: Errors }
  | { status: "failed" }
  | { status: "booked"; startsAt: string; mode: Mode };

const FIELDS: readonly Field[] = ["name", "phone", "email", "startsAt", "mode", "note", "topic", "lead"];

/** The form's text values, for putting back into the fields when something needs fixing. */
export function formValues(data: FormData): Values {
  const out: Values = {};
  for (const f of FIELDS) {
    const v = data.get(f);
    if (typeof v === "string") out[f] = v.slice(0, 1000);
  }
  return out;
}

/** The first problem with each field, in plain words. */
function firstErrors(issues: readonly { path: PropertyKey[]; message: string }[]): Errors {
  const errors: Errors = {};
  for (const issue of issues) errors[issue.path[0] as Field] ??= issue.message;
  return errors;
}

export function checkLead(values: Values): { ok: true; data: Lead } | { ok: false; errors: Errors } {
  const r = leadSchema.safeParse(values);
  return r.success ? { ok: true, data: r.data } : { ok: false, errors: firstErrors(r.error.issues) };
}

export function checkSchedule(values: Values): { ok: true; data: Schedule } | { ok: false; errors: Errors } {
  const r = scheduleSchema.safeParse(values);
  return r.success ? { ok: true, data: r.data } : { ok: false, errors: firstErrors(r.error.issues) };
}

export function modeTitle(mode: Mode): string {
  return MODES.find((m) => m.key === mode)?.title ?? "Phone call";
}

const stamp = (at: Date) => at.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

/** The first email: a new lead, to call back. */
export function leadEmail(l: Lead, at: Date): { subject: string; text: string } {
  return {
    subject: `New lead${l.topic ? ` (${topicTitle(l.topic)})` : ""}: ${l.name}, ${l.phone}`,
    text: [
      `${l.name} asked for a call back.`,
      "",
      `Name: ${l.name}`,
      `Phone: ${l.phone}`,
      `Email: ${l.email}`,
      ...(l.topic ? [`Interested in: ${topicTitle(l.topic)}`] : []),
      "",
      `From the website, ${stamp(at)} (IST).`,
      "If they pick a time, a second email follows.",
    ].join("\n"),
  };
}

/** A lead saved earlier whose email did not go out (2026-11-26: the mail settings were wrong, and a lead went unseen). */
export type MissedLead = { name: string; phone: string; email: string; topic: string | null; createdAt: Date };

/** One email listing every lead that was saved but never emailed, oldest first, sent with the next lead that is. */
export function missedLeadsEmail(leads: readonly MissedLead[]): { subject: string; text: string } {
  const n = leads.length;
  return {
    subject: `${n} earlier lead${n === 1 ? "" : "s"} that did not reach you`,
    text: [
      `${n === 1 ? "This lead was" : "These leads were"} saved on the website, but the email about ${n === 1 ? "it" : "them"} did not go out at the time.`,
      "",
      ...leads.flatMap((l) => [
        `${l.name}, ${l.phone}, ${l.email}${l.topic && (TOPIC_KEYS as readonly string[]).includes(l.topic) ? ` (${topicTitle(l.topic as Topic)})` : ""}`,
        `  Sent on ${stamp(l.createdAt)} (IST)`,
        "",
      ]),
    ].join("\n"),
  };
}

/** The second email: the time they picked. */
export function scheduleEmail(s: Schedule, at: Date): { subject: string; text: string } {
  return {
    subject: `Call time picked${s.topic ? ` (${topicTitle(s.topic)})` : ""}: ${s.name}, ${slotLabel(s.startsAt)}`,
    text: [
      `Time: ${slotLabel(s.startsAt)} (IST)`,
      `How: ${modeTitle(s.mode)}`,
      "",
      `Name: ${s.name}`,
      `Phone: ${s.phone}`,
      `Email: ${s.email}`,
      ...(s.topic ? [`Interested in: ${topicTitle(s.topic)}`] : []),
      "",
      s.note ? `Note:\n${s.note}` : "No note.",
      "",
      `From the website, ${stamp(at)} (IST).`,
    ].join("\n"),
  };
}
