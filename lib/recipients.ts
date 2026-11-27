/**
 * Who receives the website's lead emails: our own inbox always, plus any extra addresses listed in the LEAD_COPY_TO
 * setting (comma-separated, kept in Vercel's settings rather than in the code). Duplicates and anything that is not an
 * email address are dropped.
 */
export function recipients(always: string, extra: string | undefined): string[] {
  const out: string[] = [];
  for (const raw of [always, ...(extra ?? "").split(/[,;\s]+/)]) {
    const a = raw.trim().toLowerCase();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a) && !out.includes(a)) out.push(a);
  }
  return out;
}
