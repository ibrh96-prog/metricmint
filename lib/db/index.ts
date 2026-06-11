import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { metrics, settings } from './schema';

// Env vars are provided by the runtime: Vercel injects them in production, and
// the entrypoints (api-server/src/index.ts for local dev) load .env before this
// module is imported. We deliberately avoid filesystem-based dotenv loading here
// so the file bundles cleanly into the CJS serverless bundle on Vercel.
const connectionString = process.env.DATABASE_URL || '';

// postgres.js tuned for stateless serverless (Vercel functions) talking to
// Supabase's transaction pooler (port 6543):
//   - prepare: false -> the transaction pooler (pgBouncer transaction mode) does
//                       not support prepared statements.
//   - max: 1         -> each short-lived function invocation needs at most one
//                       connection; keeps us well under pooler limits.
// The same DATABASE_URL is used unchanged.
const client = postgres(connectionString, { prepare: false, max: 1 });
export const db = drizzle(client);
export { metrics, settings, client };
