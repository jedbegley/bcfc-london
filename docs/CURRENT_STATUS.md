# Current status and next-session handover

Checked 2 November 2026 (Europe/London). Recheck GitHub, the live site and Supabase before acting. Keep credentials and unpublished player/article details out of Git.

## Production and recently completed

- Production repository `jedbegley/bcfc-london`, main commit at this audit: `fad143499ec0d3337a5a7e2f82291712e2501a5a`. Production URL: `https://www.bcfclondon.co.uk`. Vercel project settings and exact production alias/commit still need verification with the correct Vercel account scope.
- October's scheduled approval workflow ran; the article is now `published` and its separate squad announcement was sent on 31 October. Do not republish or resend. The workflow remains documented in `PROJECT_GUIDE.md`.
- On 2 November, a new home league fixture for Three Little Birds FC was created once as match ID 12, Sunday 8 November at 10:30, Clapham Common, with `availability_open=true`. The earlier 4 October away fixture (ID 6) remains a separate completed record. No availability announcement was queued by this work.
- East Putney FC match ID 11 is `Completed`, Bristol City 0–7, Sunday 1 November, with its existing report. Its SumUp URL is stored in `matches.sumup_link` for this match alone. The public report page still needs the proposed code change to render that link. Thirteen match-stat rows exist (11 starters and two substitutes whom Jed confirmed played), all with the schema's default zero minutes; no minutes were invented. No East Putney MOTM votes existed at audit. Voting was temporarily closed to avoid an unverified list or self-votes before the proposed guard is released.

## Current PR and pending approval

- Branch `fix/november-fixture-motm` proposes East Putney stat-row candidates, hiding self from the selection, database enforcement of no self-votes and East Putney eligibility/open state, and the match-specific payment section. Await Jed's explicit approval before merging/deploying or applying the production migration. After release and verification, reopen East Putney MOTM voting, confirm candidates under an authorised player session, and verify one-vote behavior. No player push is authorised.
- Other open PRs: none at the start of this work; recheck. Historical payment links and match reports are unchanged.

## Verification gaps and next actions

- Read-only public HTTP checks returned 200 for homepage, fixtures and fixtures 11/12. Database confirms the next-match ordering inputs and open availability. Signed-in player availability save and voting on a physical phone were not exercised without a player session; inspect those flows after approved release.
- Confirm the external SumUp checkout destination in a browser; storing the provided URL is not proof that SumUp accepts payment. Do not submit a payment as a test.
- After reviewed release, verify homepage/fixture ordering, mobile/desktop report layout, manager and player access, East Putney candidates and rejection of self/duplicate votes. Only then reopen voting and let Jed separately send MOTM and availability notifications using the existing dashboard controls.

## Continuity procedure

Read `AGENTS.md`, this file, `PROJECT_GUIDE.md`, and the deployment checklist. Inspect actual main/PRs/live data. Update this dated record with production SHA, release/test evidence, decisions, open tasks, deadlines and approvals before handing over.
