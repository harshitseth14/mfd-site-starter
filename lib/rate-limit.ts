/**
 * A small in-memory limit on how often one visitor (by IP address) can send the forms, so a bot cannot
 * flood our inboxes. It lives in the server's memory, so each server instance counts on its own: a first line of
 * defence, backed by the checks against the database in app/actions.ts.
 */
export type Limiter = { allow: (key: string, now?: number) => boolean };

export function createLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }): Limiter {
  const hits = new Map<string, number[]>();
  return {
    allow(key, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.delete(key);
      hits.set(key, recent);
      // Forget the oldest visitors first, so memory stays small.
      while (hits.size > maxKeys) hits.delete(hits.keys().next().value as string);
      return true;
    },
  };
}

/**
 * The visitor's IP address, or "unknown". x-real-ip comes first: Vercel sets it itself, while x-forwarded-for can carry
 * whatever a bot writes there, which would let it look like a new visitor on every send.
 */
export function clientIp(forwardedFor: string | null, realIp: string | null): string {
  const real = realIp?.trim();
  if (real) return real;
  const first = forwardedFor?.split(",")[0]?.trim();
  return first || "unknown";
}
