import "server-only";

import { attachDatabasePool } from "@vercel/functions";
import { Pool } from "pg";

/**
 * The Postgres pool (Neon works well). Neon's guidance for Next.js on Vercel: node-postgres
 * with the pooled DATABASE_URL, attached to Vercel Fluid compute so idle clients are released before a function is
 * suspended. Without DATABASE_URL (a laptop with no .env.local) there is no database, and callers carry on without it.
 */
let pool: Pool | null | undefined;

export function db(): Pool | null {
  if (pool !== undefined) return pool;
  const url = process.env.DATABASE_URL;
  if (!url) return (pool = null);
  pool = new Pool({ connectionString: url, max: 5, idleTimeoutMillis: 5_000, connectionTimeoutMillis: 5_000 });
  attachDatabasePool(pool);
  return pool;
}
