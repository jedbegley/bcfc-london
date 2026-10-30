# BCFC London agent instructions

Start each session by reading this file, `docs/CURRENT_STATUS.md`, `docs/PROJECT_GUIDE.md`, and the relevant existing topic guides. Verify current main, open PRs, production, and Supabase before trusting an old handover.

- Reuse existing Next.js routes, Supabase tables/RPCs, PWA worker, and notification queue. Search before adding features, migrations, jobs, or records; never duplicate a private article.
- Keep credentials, tokens, subscription endpoints, unpublished article text, confidential player data, and secret award winners out of Git, PRs, logs, and public metadata. Protected Supabase records hold private content.
- Never publish private content without Jed's explicit approval for that publication. A scheduled review never publishes automatically.
- Never send real player or squad notifications without explicit approval for that send. Publication and squad announcement are separate. A self-test may only target the authorised account.
- Require Jed's approval before each production deployment or merge that triggers one. Prepare a reviewable PR first. Prior release approval does not cover a later release.
- Check RLS, RPC guards, public previews, recipients, and UK clock conversion when relevant. Run focused tests and `npm run build` for code changes; inspect preview and production appropriately without live squad test pushes.
- Before ending substantial work, update `docs/CURRENT_STATUS.md` with dated production commit, completed work, open PRs, bugs, unfinished work, deadlines, pending approvals, decisions, and verification limits. Update `docs/PROJECT_GUIDE.md` for architecture/functionality changes and topic guides/checklist for procedure changes. Leave a concise final handover.
- Read `docs/DEPLOYMENT_CHECKLIST.md` before releases. Documentation-only work does not authorise a production release.
