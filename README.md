# RetargetOS / AI GrowthOS

RetargetOS is an AI-powered first-party data activation and monetization platform.

It turns existing customer data, old leads, ad history, website and app events, marketplace activity, affiliate offers, product catalogs, and payment or conversion data into measurable revenue and net profit.

## Current phase

Phase 0 / Phase 1 foundation only.

The first build priority is:

- Data Sources
- Imports
- Profiles
- Identity Keys
- PII Vault
- Consent Ledger
- Suppression Registry
- Audience Preview
- Mock Destinations
- Audit Logs

## Non-negotiables

- Suppression overrides everything.
- Unknown consent blocks activation.
- Unknown source blocks activation.
- No dirty or unconsented activation.
- No raw personal data in logs.
- No secrets or tokens in client-side code.
- Official APIs only.
- Mock connector actions must be clearly labeled as mock.
- No fake sync claims.
- AI cannot upload audiences, spend money, publish campaigns, change budgets, or remove suppression without approval.

## Local setup

Run install, generate Prisma client, then start the app.

Commands:

- pnpm install
- cp .env.example .env
- pnpm db:generate
- pnpm dev

Verification commands:

- pnpm lint
- pnpm typecheck
- pnpm build
- pnpm prisma:validate

## Build order

1. Data foundation plus consent and suppression
2. Audience builder plus mock connectors
3. Event and conversion tracking
4. AI Copilot plus Creative Studio
5. Real Meta, TikTok, Google, and X connectors
6. Marketplace, affiliate, payment attribution, and profit engine

## Infrastructure note

Vercel is the cockpit, not the whole engine. Heavy imports, sync jobs, event forwarding, analytics, AI batch work, and attribution processing should later run through queues and workers.

## Warning

Do not build live ad-platform sync before the data foundation, consent and suppression enforcement, eligibility logic, audit logs, and approval gates are stable.
