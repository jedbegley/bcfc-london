# Stage 1 availability alerts

Status: draft; activation requires completed preflight and end-to-end verification.

## Behaviour

Availability changes are recorded by a database trigger. Repeated saves of the same status do not create events. History is retained at all times; email eligibility runs from Friday noon to kick-off using Europe/London time. Only authorised administrators with email enabled receive alerts. Existing data is not backfilled or modified.

Each event/recipient pair is unique. Sender claims use row locks and leases. Resend requests use stable idempotency keys; ambiguous outcomes are withheld for review before the provider idempotency period expires. Provider acceptance does not guarantee inbox delivery.

The sender caps its own usage below the free email ceilings. Other sends on a shared account consume the same allowance; headroom is not a guaranteed reservation. Provider quota failures remain queued for retry. Do not enable paid overages.

## Release checklist

- Verify current plans, usage and hosting eligibility privately before activation.
- Reuse an existing free email account and verified domain where available. Use a separate domain-scoped sending-only key. Preserve Auth SMTP configuration. Obtain approval before DNS changes.
- Store RESEND_API_KEY directly in Edge Function Secrets, never in Git or chat.
- Apply the additive migration after capturing protected-data checksums.
- Deploy the sender; its own webhook authentication permits verify_jwt=false.
- Generate the webhook token server-side and keep it in Vault. Activate wakeup and retries only after the sender is ready.
- Verify real delivery, genuine changes, duplicate saves, failures/retries, opt-out, access restrictions and UK time boundaries. Compare original data checksums and inspect security advisors.
- Verify the authenticated dashboard and production deployment before proceeding to PWA work.

## Tests

Run `node --test tests/availability-delivery.test.mjs`.

Database tests use PostgreSQL WASM @electric-sql/pglite@0.5.10 in a temporary runtime. Set BCFC_PGLITE_MODULE to its dist/index.js and run `node --test tests/availability-database.test.mjs`. The tests run the actual migration except the network extension, using synthetic Auth and Vault fixtures. Network wakeup requires separate deployment verification.
