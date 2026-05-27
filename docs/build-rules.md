# RetargetOS Build Rules

## Product boundary

RetargetOS is a first-party data activation and monetization platform. It is not a social scheduler, generic CRM, caption generator, Canva clone, vanity dashboard, scraping tool, or fake automation layer.

## Phase 1 rules

Build only the foundation:

1. Data Sources
2. Imports
3. Profiles
4. Identity Keys
5. Protected data storage model
6. Consent Ledger
7. Suppression Registry
8. Audience Preview
9. Mock Destinations
10. Audit Logs

## Non-negotiables

- Suppression overrides everything.
- Unknown consent blocks activation.
- Unknown source blocks activation.
- No dirty or unconsented activation.
- No raw personal data in logs.
- No secrets in client-side code.
- Official APIs only.
- Mock connector actions must be clearly labeled as mock.
- No fake sync claims.
- AI cannot upload audiences, spend money, publish campaigns, change budgets, or remove suppression without approval.

## Connector rules

Phase 1 uses mock connectors only. The UI may show Meta, TikTok, Google, and X as mock destinations, but it must never imply a live platform sync occurred.

## Infrastructure rule

Vercel is the cockpit, not the whole engine. Heavy imports, audience sync jobs, event forwarding, AI batch work, and analytics should later run through queues and workers.

## Next allowed slice

The next implementation slice should be Data Sources + Audit Logs CRUD only.
