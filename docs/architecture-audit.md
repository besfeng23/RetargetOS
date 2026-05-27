# RetargetOS Architecture Audit

## Current stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL target
- Zod dependency available for later validation work
- Mock connector architecture only

## Current phase

This repository is initialized for Phase 0 / Phase 1 foundation only.

## Known folders

- `src/app` — routes and API route handlers
- `src/components` — app shell and reusable UI components
- `src/lib` — constants, policy helpers, connector stubs, and Prisma helper
- `prisma` — database schema
- `docs` — project governance and build rules

## Existing foundation

- Main navigation routes exist.
- App shell exists.
- Data source, imports, profiles, consent/suppression, audience, destination, events, creative, campaign, product, offer, marketplace, reports, AI copilot, audit logs, and settings pages exist.
- Health API exists.
- Prisma schema includes the core Phase 1 models.
- Mock connector types and implementation exist.
- Activation eligibility helper exists.

## Missing foundation after this PR

- Real CRUD for Data Sources and Audit Logs
- Authentication and workspace membership enforcement
- Real import upload and mapping flow
- Real database migrations run against hosted Postgres
- Queue/worker infrastructure
- Real tests and CI

## Risks

- This scaffold was created through GitHub file operations, so local commands were not run from this chat.
- `pnpm install`, `pnpm typecheck`, `pnpm build`, `pnpm prisma:validate`, and `pnpm db:generate` must be run locally or in Codex before merge.
- Real platform integrations must not be added until eligibility, suppression, audit logs, and approval gates are proven.

## Recommended next implementation

Implement Data Sources + Audit Logs CRUD only. Do not jump to AI, campaigns, or live connectors.
