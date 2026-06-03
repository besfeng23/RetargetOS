# RetargetOS Supabase Backend Implementation Spec

## Target repository

`besfeng23/RetargetOS`

## Target Supabase project

`qlzcqzqbcjioweatllhi`

## Confirmed live functions

The connected Supabase project already has:

- `retargetos-api`
- `retargetos-consent`

Both require JWT.

## Required next functions

Create these Supabase Edge Functions under `supabase/functions`:

- `retargetos-profile`
- `retargetos-import`
- `retargetos-suppression`
- `retargetos-payments`
- `retargetos-ai`
- `retargetos-sync`

Every function must:

- require JWT
- verify the authenticated user
- check workspace ownership or active membership
- write audit logs for sensitive operations
- avoid logging raw personal data
- return clear structured JSON errors

## Function responsibilities

### retargetos-profile

Creates profile records from safe inputs.

Rules:

- Store only normalized or masked identity output.
- Hash identifiers server-side where needed.
- Do not write raw email, phone, IP, or tokens to logs.
- Create an audit log after insert.

### retargetos-import

Creates import batches and import jobs.

Rules:

- Unknown source defaults to review or quarantine.
- Unknown consent blocks activation.
- Mapping must be preserved.
- Validation report must count invalid email, invalid phone, missing consent, duplicate, suppressed, and quarantined rows.

### retargetos-suppression

Adds opt-out and suppression records.

Rules:

- Suppression overrides everything.
- Profile must be marked suppressed when applicable.
- Removal of suppression must require explicit approval.
- Downstream removal/suppression sync must be queued when destination sync exists.

### retargetos-payments

Records orders and payments.

Rules:

- Payment truth is the attribution anchor.
- Store campaign, audience, creative, product, and offer references when available.
- Track gross amount, fees, net amount, refund, dispute, and settlement state.

### retargetos-ai

Creates AI recommendations.

Rules:

- AI recommendations are not executions.
- External actions require approval.
- Risk level is required.
- Recommendations must include data used, expected impact, and exclusions.

### retargetos-sync

Creates mock sync jobs now and later controls destination sync.

Rules:

- Mock sync must say mock.
- No live sync claim unless official API confirms success.
- No upload if suppression, consent, source, identifier, or policy checks fail.

## Deployment checklist

1. Add function folders under `supabase/functions`.
2. Add shared helper module for auth, workspace access, JSON response, and audit logging.
3. Keep all sensitive writes server-side.
4. Deploy through Supabase CLI.
5. Verify with Supabase dashboard and API logs.
6. Run security advisor after deployment.

## Security warning

Do not open direct client policies for identity, PII, consent, suppression, sync, payment, or AI execution tables until safe views and backend routes are finished.
