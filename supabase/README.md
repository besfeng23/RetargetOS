# RetargetOS Supabase Backend

This folder contains the Supabase backend layer for RetargetOS / AI GrowthOS.

## Project target

Supabase project ref:

```text
qlzcqzqbcjioweatllhi
```

## Confirmed live functions

The Supabase project already has these JWT-protected functions live:

- `retargetos-api`
- `retargetos-consent`

## Backend rule

The frontend should call safe Edge Functions for sensitive work. Do not expose raw customer, consent, suppression, payment, or sync tables directly to the browser.

## Required function set

- `retargetos-api`
- `retargetos-consent`
- `retargetos-profile`
- `retargetos-import`
- `retargetos-suppression`
- `retargetos-payments`
- `retargetos-ai`
- `retargetos-sync`

## Non-negotiables

- Suppression overrides everything.
- Unknown consent blocks activation.
- Unknown source blocks activation.
- No dirty or unconsented activation.
- No raw personal data in logs.
- No client-side tokens.
- Official APIs only.
- Mock connectors must clearly say mock.
- No fake sync claims.
- AI cannot execute external actions without approval.

## Deployment

Deploy with Supabase CLI after setting project secrets in Supabase dashboard or CLI.

```bash
supabase functions deploy retargetos-api --project-ref qlzcqzqbcjioweatllhi
supabase functions deploy retargetos-consent --project-ref qlzcqzqbcjioweatllhi
supabase functions deploy retargetos-profile --project-ref qlzcqzqbcjioweatllhi
supabase functions deploy retargetos-import --project-ref qlzcqzqbcjioweatllhi
supabase functions deploy retargetos-suppression --project-ref qlzcqzqbcjioweatllhi
supabase functions deploy retargetos-payments --project-ref qlzcqzqbcjioweatllhi
supabase functions deploy retargetos-ai --project-ref qlzcqzqbcjioweatllhi
supabase functions deploy retargetos-sync --project-ref qlzcqzqbcjioweatllhi
```
