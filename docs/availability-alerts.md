# Stage 1 availability alerts

Status: draft, not enabled in production. PR #5 must remain unmerged until the release checks below pass.

## Behaviour

- A database trigger writes a history row only when the status genuinely changes, including the first response and deletion back to No Response. A repeated save of the same status does not create an event.
- Existing availability records are not backfilled or modified by the migration.
- History is recorded at all times. Email is queued only for Upcoming fixtures between the most recent Friday at 12:00 Europe/London and kick-off (inclusive start, exclusive end).
- UK local fixture date and time are converted independently to UTC, including BST/GMT transition weekends. Missing date/kick-off prevents email eligibility and is surfaced in the manager dashboard.
- Recipients are current Players with is_admin=true, a linked Auth user, and email preference enabled. Access is rechecked before claiming queued work. Read-only availability viewers are not email recipients.
- History, preferences and delivery status are protected by RLS. Preferences can only be changed for the signed-in admin's own account. Sender RPCs and writes to delivery status are restricted to service_role.
- Each change/recipient pair is unique. Claims use row locks and leases. Provider requests use a stable Resend idempotency key. Unknown outcomes are withheld for manual review after 23 hours rather than resent outside Resend's 24-hour idempotency period.
- The database serializes quota reservations and caps accepted/in-flight mail below the free ceilings: 80 per rolling 24 hours and 2,400 per rolling 31 days. These limits cover this sender only; keep the Resend account dedicated to it or account for other sends.
- A failed provider request is retried; permanent errors or exhausted attempts require attention. "Accepted by provider" is not a guarantee of inbox delivery.

## Release checks

1. Confirm the Supabase organization is Free and has sufficient database/function/egress allowances. Verify the actual live schema and admin recipients. Do not enable a paid plan or paid branch.
2. Verify Vercel plan/usage and non-commercial eligibility. The connected API does not expose all usage/plan details. Fee links deserve specific consideration under Hobby terms; no paid upgrade is authorized.
3. Create a Resend Free account with user involvement. Verify alerts.bcfclondon.co.uk; obtain the exact DNS records from Resend and obtain user approval before changing DNS. Do not alter existing website or mailbox records unnecessarily.
4. Apply the additive migration only after preflight and capture/compare protected-table counts and checksums. No player, fixture, statistics, fantasy, squad, payment or availability row needs updating.
5. Set RESEND_API_KEY in Supabase Edge Function Secrets directly, not in Git or chat. ALERT_FROM_EMAIL is optional; default is BCFC London <availability@alerts.bcfclondon.co.uk>.
6. Deploy send-availability-alerts with verify_jwt=false (the handler authenticates its own webhook token through a service-only RPC). It uses Supabase's built-in backend key environment variables. Never expose those to the browser.
7. Generate a random 64-character token in Vault as availability_alert_secret and set availability_alert_url to the function URL. Do not print the token. Apply supabase/activation/availability_alert_wakeup.sql only when the sender is ready. This enables the immediate database wakeup and five-minute retry cron. It must not be run automatically with the base migration.
8. Test real mail to the confirmed manager, a genuine first response and withdrawal, same-status duplicate save, concurrent claims, provider failure/retry, opt-out, unauthorized access and UTC/BST/GMT cutoffs. Use synthetic rows in rolled-back transactions for DB tests wherever possible; do not change player records or count tests as appearances/statistics. A rolled-back pg_net request is not sent.
9. Check advisors for regressions, verify original data checksums, test the authenticated dashboard, then merge/deploy and verify production. Do not start PWA work until Stage 1 is confirmed working.

## Local checks

Production build: npm run build with valid test Supabase build-time configuration.

Sender tests: node --test tests/availability-delivery.test.mjs

Database tests use PostgreSQL WASM @electric-sql/pglite@0.5.10, installed in a temporary test runtime (not a production dependency). Point BCFC_PGLITE_MODULE at its dist/index.js and run node --test tests/availability-database.test.mjs. The tests run the actual migration; only the pg_net extension statement is omitted because network wakeup is tested separately on Supabase. Auth and Vault tables are synthetic; no production data is imported.

Confirmed preflight on 18 October 2026: Supabase Free; database approximately 13.4 MB; storage approximately 33.0 MB; 37 Auth users; no Edge Functions; 38 Players, 8 matches and 169 availability rows. Only Jed Begley currently has is_admin=true. Full monthly egress and Vercel resource usage remain unverified through the available connectors.
