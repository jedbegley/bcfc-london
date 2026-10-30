# Current status and next-session handover

Checked 30 October 2026 (Europe/London). Verify again before acting. Keep unpublished identity/text, private player details and secrets out of this document.

## Production and recent work

- Main head: `af6c72a6929bb29ec05f2bd4bb93a83d99d82bda` (PR #18 merged, title-only news push). PRs #16–#18 added private approval, refined article font/social graphic and optional empty news push body. GitHub Vercel status: success. Production: `https://www.bcfclondon.co.uk`.
- Read-only HTTP checks: `/`, `/news`, `/fixtures`, `/squad`, `/stats`, manager route shell `/dashboard/news/1` returned 200; unpublished article URL returned 404. The manager shell 200 does not prove signed-in access.
- Supabase project `qyvwpywlitnlbmzcxzlf`: 18 public RLS tables, public player-photo bucket, active `send-app-push` and `send-availability-alerts` Edge Functions. Live migration history includes `news_title_only_push`. `news-approval-review` and `retry-app-push` cron active each minute; `retry-availability-alerts` every five minutes. Broadcast switch enabled; this grants no permission to send a squad push.
- Vercel connector listed no accessible projects/deployments under the visible team and returned 404 for the GitHub-linked target. GitHub check and production HTTP provide partial release evidence, but Vercel settings, environment values and exact production alias/commit mapping remain unverified. Resolve correct access before the next release.

## Private October approval: 31 October deadline

- One existing October award record (ID 1) remains `scheduled`, `published=false`, due **31 October 2026 10:00 GMT** (`2026-10-31 10:00:00+00`). Approval owner is an admin. No review message or squad notification for this record was queued at audit. Active cron should transition to `awaiting_approval` and queue a manager-only preview reminder at/after the due minute; verify actual execution, recipient and delivery afterward. Database status cannot guarantee physical-phone display.
- Private manager route: `https://www.bcfclondon.co.uk/dashboard/news/1`. Public article route currently returns 404. The generic October social graphic is configured; full article content/photo stay protected until manager approval. Do not disclose the winner in Git or public previews.
- Manager must click **Approve and publish**. Publication alone does not notify the squad. **Send spoiler-free squad notification** is a later, distinct action requiring Jed's approval; the configured message has title only. A newly published dynamic item becomes first on homepage/News unless a later dated story exists.

## Open work, bugs, approvals

- Documentation branch `docs/permanent-project-handover` is for Jed's review. No production deployment/migration/publication/notification is authorised by this task. Approval is required before any merge triggering production.
- Other open PRs: none found at audit; recheck. No confirmed production bug in read-only checks.
- Verification gaps: no signed-in manager browser test or phone receipt in this documentation task; Vercel configuration inaccessible; availability email cron/function exist but no recorded preferences/deliveries, so actual delivery is unverified. Existing staged availability email guide needs comparison with live activation. Payment processor end-to-end status needs a dedicated audit.
- Next: on/after 31 October 10:00 GMT, read-only check transition, manager recipient/delivery and continued public 404 until Jed approves. Never auto-publish or use a squad push as a test. After Jed's approval, check featured ordering; send squad announcement only upon separate instruction.

## Next-session procedure

Read `AGENTS.md`, this file, `PROJECT_GUIDE.md` and relevant topic guides. Check current main, PRs, live site and Supabase. Update this dated handover after substantial work with actual deployment SHA, verification, decisions, pending approvals, and next task.
