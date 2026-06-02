# MetricMint
[![Buy on Gumroad](https://img.shields.io/badge/Buy%20on%20Gumroad-%2349-green)](https://ibrh96.gumroad.com/l/jwdmao)
> 🔗 **[Live Demo](https://metricmint-app-production.up.railway.app)** · 💰 **[Buy the boilerplate — $49](https://ibrh96.gumroad.com/l/jwdmao)**
> 
MetricMint — a single-user MRR & growth dashboard for indie hackers.

Tech stack
- Frontend: React 19 + Vite + TypeScript
- Styling: Tailwind CSS v4 + shadcn/ui
- Animation: Framer Motion
- Charts: Recharts
- Backend: Node.js + Express 5 + TypeScript
- Database: PostgreSQL via Drizzle ORM
- Validation: Zod v4 + drizzle-zod
- Package manager: pnpm workspaces (monorepo)

Project structure
```
metricmint/
├── artifacts/
│   ├── api-server/          # Express 5 API (port 8080, base path /api)
│   └── metricmint/          # React + Vite frontend (port 3000, proxies /api)
├── lib/
│   ├── api-spec/            # OpenAPI 3.1 spec
│   └── db/                  # Drizzle client + schema
├── pnpm-workspace.yaml
├── package.json             # workspace scripts
├── tsconfig.base.json
├── tsconfig.json
└── seed.sql
```

Prerequisites
- Node.js (18+ recommended)
- pnpm
- A running PostgreSQL database (hosted is fine). You will provide `DATABASE_URL` in a `.env` file.

Environment
Create a `.env` file in the repo root (do not commit). See `.env.example`.

Quick local dev
Run the API and frontend in two terminals (or use the workspace `dev` script):

```bash
# install dependencies (do not run migrations)
pnpm install

# start API only
pnpm --filter metricmint-api dev

# start frontend only
pnpm --filter metricmint-app dev

# or run both (requires your terminal to support concurrently)
pnpm dev
```

Database
The API reads `DATABASE_URL` from the environment. Example in `.env.example`:

```
DATABASE_URL=postgresql://user:password@host:6543/postgres
PORT=8080
```

Seed data
Use `seed.sql` to create schema and insert demo rows (12 months of sample metrics and settings):

```sql
-- run on your Postgres instance
\i seed.sql
```

Available scripts
- `pnpm dev` — starts API and frontend concurrently (workspace root)
- `pnpm dev:api` — run API server dev
- `pnpm dev:web` — run frontend dev
- `pnpm build` — build all packages
- `pnpm start` — start the API from `dist`

API endpoints
Base path: `/api`

- `GET /api/healthz` — health check
- `GET /api/metrics` — list all metrics (ordered by month)
- `POST /api/metrics` — create metric
- `PATCH /api/metrics/:id` — update metric
- `DELETE /api/metrics/:id` — delete metric
- `GET /api/settings` — get settings (mrr_goal)
- `PUT /api/settings` — update settings
- `GET /api/summary` — computed KPIs: `net_mrr`, `growth_pct`, `churn_rate`, `arpu`

Database schema

Table `metrics`:
- `id`: serial PK
- `month`: text (YYYY-MM, unique)
- `new_mrr`: numeric(10,2)
- `churned_mrr`: numeric(10,2)
- `new_customers`: integer
- `churned_customers`: integer
- `refunds`: numeric(10,2)
- `created_at`: timestamptz default now()

Table `settings`:
- `id`: serial PK
- `mrr_goal`: numeric(10,2) (singleton row, seeded at 15000 in `seed.sql`)

How the app works
- Frontend calls the API under `/api` to manage monthly metric rows and settings.
- `GET /api/summary` computes KPIs from stored metrics and returns numeric strings (where applicable) and numbers for percentages.

Extending
- Add more validation in the backend Zod schemas.
- Add authentication or multi-tenant support (out of scope — do not add unless requested).

Production build
- Build: `pnpm build`
- Serve API: ensure `DATABASE_URL` is set and run `pnpm --filter metricmint-api start` (after `pnpm --filter metricmint-api build`)

License
MIT

