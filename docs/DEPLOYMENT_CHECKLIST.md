# Deployment checklist

Documentation-only PRs do not require production deployment. Record evidence and update `CURRENT_STATUS.md` after each release.

## Prepare and review

- [ ] Read `AGENTS.md`, status/project/topic guides. Verify current main, open PRs, production and live Supabase.
- [ ] Identify exact scope, target Vercel project/team/environment/commit and migration order. Preserve existing records/local edits; avoid duplicates.
- [ ] Inspect access boundaries: RLS, security-definer guards, views/grants, unpublished public responses/metadata, image paths, recipients and secret handling.
- [ ] Compare repository migrations/activation scripts to live migration history/function definitions. Plan additive changes, rollback and verification; obtain approval for production data/configuration changes.
- [ ] Run focused tests and `npm run build` for code changes. Test UK time transitions when scheduling. Note fixture dependencies and skipped checks.
- [ ] Open a reviewable PR. Inspect full diff and preview; test anonymous denial and authorised manager access without publish/send actions.

## Release approval

- [ ] Obtain Jed's explicit approval for **this** production merge/deployment. Publication of private content and sending real players notifications each require separate explicit approval.
- [ ] Verify project, team, commit and environment immediately before release. Check required variable names/protected configuration without printing values.
- [ ] Apply only approved migrations in order; verify RLS, functions, jobs, idempotency. Do not blindly rerun activation SQL.
- [ ] Merge/deploy reviewed commit; inspect build, production alias and SHA. If Vercel API is inaccessible, state the verification limit.

## After release

- [ ] Smoke-test home, news, fixtures, squad, stats, login and dashboard.
- [ ] Check signed-out private URLs/metadata and signed-in manager preview/edit; confirm article state and feature ordering.
- [ ] Check cron timing, owner/recipient, queue idempotency, click URL and delivery status without sending players notifications. Self-test only Jed's authorised installation after explicit consent; provider acceptance differs from phone display.
- [ ] Confirm publish/notify remain separate and reconcile message counts.
- [ ] Update status, architecture and topic guides as needed; hand over production SHA, tests, open issues, deadline and approvals.
