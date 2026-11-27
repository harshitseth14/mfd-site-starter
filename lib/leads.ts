import "server-only";

import type { Lead, MissedLead, Schedule } from "./consultation";
import { db } from "./db";

/**
 * Leads in the database. Every function here swallows its own errors (and logs them), so a database problem never
 * stops the email from going out: the form only fails when neither the database nor the email took the lead.
 */

/** Saves a new lead and returns its id, or null when there is no database or the write failed. */
export async function saveLead(l: Lead): Promise<string | null> {
  const pool = db();
  if (!pool) return null;
  try {
    const r = await pool.query<{ id: string }>("INSERT INTO leads (name, phone, email, topic) VALUES ($1, $2, $3, $4) RETURNING id", [l.name, l.phone, l.email, l.topic ?? null]);
    return r.rows[0]?.id ?? null;
  } catch (err) {
    console.error("[website] could not save the lead", err);
    return null;
  }
}

/**
 * The same lead (same name, number and email) saved in the last `minutes`, if any: the same form sent twice is not a
 * new lead, so it is not emailed again. A corrected name or email is a new send, and is emailed.
 */
export async function recentSameLead(l: Lead, minutes: number): Promise<string | null> {
  const pool = db();
  if (!pool) return null;
  try {
    const r = await pool.query<{ id: string }>(
      "SELECT id FROM leads WHERE phone = $1 AND lower(email) = lower($2) AND lower(name) = lower($3) AND created_at > now() - make_interval(mins => $4) ORDER BY created_at DESC LIMIT 1",
      [l.phone, l.email, l.name, minutes],
    );
    return r.rows[0]?.id ?? null;
  } catch (err) {
    console.error("[website] could not check for a recent lead", err);
    return null;
  }
}

/** How many leads arrived in the last `minutes` (0 when the database cannot be reached). */
export async function leadsInLast(minutes: number): Promise<number> {
  const pool = db();
  if (!pool) return 0;
  try {
    const r = await pool.query<{ n: number }>("SELECT count(*)::int AS n FROM leads WHERE created_at > now() - make_interval(mins => $1)", [minutes]);
    return r.rows[0]?.n ?? 0;
  } catch (err) {
    console.error("[website] could not count recent leads", err);
    return 0;
  }
}

/** Leads from the last `days` that were saved but never emailed (at most 50), oldest first, with their ids. */
export async function unsentLeads(days: number): Promise<(MissedLead & { id: string })[]> {
  const pool = db();
  if (!pool) return [];
  try {
    const r = await pool.query<{ id: string; name: string; phone: string; email: string; topic: string | null; created_at: Date }>(
      "SELECT id, name, phone, email, topic, created_at FROM leads WHERE emailed_at IS NULL AND created_at > now() - make_interval(days => $1) AND created_at < now() - interval '1 minute' ORDER BY created_at LIMIT 50",
      [days],
    );
    return r.rows.map((x) => ({ id: x.id, name: x.name, phone: x.phone, email: x.email, topic: x.topic, createdAt: x.created_at }));
  } catch (err) {
    console.error("[website] could not look for unsent leads", err);
    return [];
  }
}

/** Adds the time they picked to their lead, once. Returns whether it was saved. */
export async function saveCallTime(id: string, s: Schedule): Promise<boolean> {
  const pool = db();
  if (!pool) return false;
  try {
    const r = await pool.query("UPDATE leads SET starts_at = $2, mode = $3, note = $4, time_picked_at = now() WHERE id = $1 AND time_picked_at IS NULL", [id, s.startsAt, s.mode, s.note ?? null]);
    return (r.rowCount ?? 0) > 0;
  } catch (err) {
    console.error("[website] could not save the call time", err);
    return false;
  }
}

/** Notes that the email for this lead (or for its call time) went out. */
export async function markEmailed(id: string, which: "lead" | "time"): Promise<void> {
  const pool = db();
  if (!pool) return;
  try {
    await pool.query(which === "lead" ? "UPDATE leads SET emailed_at = now() WHERE id = $1" : "UPDATE leads SET time_emailed_at = now() WHERE id = $1", [id]);
  } catch (err) {
    console.error("[website] could not mark the lead emailed", err);
  }
}
