"use server";

import { headers } from "next/headers";
import { after } from "next/server";

import { HOURS, isOpenSlot } from "@/lib/booking";
import { checkLead, checkSchedule, formValues, leadEmail, missedLeadsEmail, scheduleEmail, type LeadState, type ScheduleState } from "@/lib/consultation";
import { leadsInLast, markEmailed, recentSameLead, saveCallTime, saveLead, unsentLeads } from "@/lib/leads";
import { loggedCounts, sendToUs } from "@/lib/mail";
import { clientIp, createLimiter, type Limiter } from "@/lib/rate-limit";

/**
 * Limits against floods: one visitor can send each step at most 5 times in 10 minutes; the same form sent
 * again within 10 minutes is the same lead, not a new email; and if more than 30 leads arrive in 10 minutes (a bot, not
 * people), the rest are still saved to the database but no longer emailed.
 */
// Kept on globalThis so the counts survive the module being loaded again (as it is in development).
const g = globalThis as typeof globalThis & { __formLimits?: { lead: Limiter; time: Limiter } };
const perVisitor = (g.__formLimits ??= { lead: createLimiter({ limit: 5, windowMs: 10 * 60_000 }), time: createLimiter({ limit: 5, windowMs: 10 * 60_000 }) });
const SAME_LEAD_MINUTES = 10;
const FLOOD = { leads: 30, minutes: 10 };

async function visitor(): Promise<string> {
  const h = await headers();
  return clientIp(h.get("x-forwarded-for"), h.get("x-real-ip"));
}

/** Sends an email to us; true when it went out (or, on a laptop, was printed to the log). Never throws. */
async function emailUs(mail: { subject: string; text: string }): Promise<boolean> {
  try {
    const how = await sendToUs(mail);
    return how === "sent" || loggedCounts();
  } catch (err) {
    console.error("[website] email failed", err);
    return false;
  }
}

/**
 * Once an email has gone through, any lead from the last week whose email failed is sent in one more email, so a lead
 * is never left unseen in the database.
 */
async function sendMissedLeads(): Promise<void> {
  const missed = await unsentLeads(7);
  if (!missed.length) return;
  if (await emailUs(missedLeadsEmail(missed))) for (const m of missed) await markEmailed(m.id, "lead");
}

/**
 * Step one: a name, a number and an email. Saved to the database and emailed to us at once, so the lead is never lost:
 * the visitor sees an error only if neither worked. A hidden field catches bots.
 */
export async function requestCallBack(_prev: LeadState, data: FormData): Promise<LeadState> {
  const values = formValues(data);
  if (String(data.get("b_hp") ?? "").trim()) return { status: "idle" };
  const checked = checkLead(values);
  if (!checked.ok) return { status: "invalid", errors: checked.errors, values };
  if (!perVisitor.lead.allow(await visitor())) return { status: "failed", values };

  const already = await recentSameLead(checked.data, SAME_LEAD_MINUTES);
  if (already) return { status: "received", ...checked.data, lead: already };

  const id = await saveLead(checked.data);
  // Only when the save worked: if the database is unreachable, this would be one more wait before the email goes out.
  if (id && (await leadsInLast(FLOOD.minutes)) > FLOOD.leads) {
    console.warn("[website] too many leads at once; saved, not emailed");
    return { status: "received", ...checked.data, lead: id };
  }
  const emailed = await emailUs(leadEmail(checked.data, new Date()));
  if (id && emailed) await markEmailed(id, "lead");
  // After the visitor has their answer, so they never wait for it.
  if (emailed) after(sendMissedLeads);
  if (!id && !emailed) return { status: "failed", values };
  return { status: "received", ...checked.data, ...(id ? { lead: id } : {}) };
}

/** Step two, optional: the time they would like, checked again here (it must still be open), saved and emailed. */
export async function pickCallTime(_prev: ScheduleState, data: FormData): Promise<ScheduleState> {
  const checked = checkSchedule(formValues(data));
  if (!checked.ok) return { status: "invalid", errors: checked.errors };
  if (!perVisitor.time.allow(await visitor())) return { status: "failed" };
  if (!isOpenSlot(HOURS, new Date(), checked.data.startsAt)) return { status: "invalid", errors: { startsAt: "That time has just gone. Please pick another." } };

  const lead = checked.data.lead;
  const saved = lead ? await saveCallTime(lead, checked.data) : false;
  const emailed = await emailUs(scheduleEmail(checked.data, new Date()));
  if (lead && saved && emailed) await markEmailed(lead, "time");
  if (!saved && !emailed) return { status: "failed" };
  return { status: "booked", startsAt: checked.data.startsAt, mode: checked.data.mode };
}
