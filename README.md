# RetargetOS / AI GrowthOS

RetargetOS is an AI-powered first-party data activation and monetization platform.

It turns existing customer data, old leads, ad history, website/app events, marketplace activity, affiliate offers, product catalogs, and payment/conversion data into measurable revenue and net profit.

## Current Phase

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

## Non-Negotiables

- Suppression overrides everything.
- Unknown consent blocks activation.
- Unknown source blocks activation.
- No dirty or unconsented activation.
- No raw PII in logs.
- No secrets/client-side tokens.
- Official APIs only.
- No fake sync claims.
- AI cannot upload audiences, spend money, publish campaigns, change budgets, or remove suppression without approval.

## Build Order

1. Data foundation + consent/suppression
2. Audience builder + mock connectors
3. Event/conversion tracking
4. AI Copilot + Creative Studio
5. Real Meta/TikTok/Google/X connectors
6. Marketplace, affiliate, payment attribution, profit engine
