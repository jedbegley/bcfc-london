# Current status and next-session handover

Checked 5 November 2026 (Europe/London). Recheck GitHub, the live site and Supabase before acting. Keep credentials and unpublished player/article details out of Git.

## Pending recruitment page (5 November)

- Branch `feature/join-bcfc-london` prepares permanent `/join` content, internal links, contact options, Open Graph/X metadata, a static QR SVG for the canonical URL and vector card designs. It is separate from the news feed.
- User supplied real current-squad and West Ham cup photographs, but the task execution environment was unavailable while preparing the branch; the referenced `/join/squad-2026.jpg` and `/join/cup-winners-west-ham.jpg` assets still need uploading before deployment. Do not ship broken images or preview metadata. No production deployment authorised yet.
- Recruitment enquiry form and private manager notification are deferred until private storage, validation, rate limiting and notification delivery can be tested. Email, Instagram and X contacts are present now. PNG/PDF exports and camera scanning QA remain outstanding; static vector assets are in `public/join/`.
- Main release status below predates PR #22; recheck main and live Supabase when this branch resumes. No player notification is part of recruitment work.

## Production and recently completed

- Main release commit `814b203b7e8bd4bff512630b0898af1efc191d5a` merged PR #20; GitHub's Vercel check is `success`. Production `/fixtures/11` HTML contains the new payment section and East Putney SumUp URL. The connected Vercel API could not independently inspect project configuration; verify team scope before the next release.
- The separate 8 November Three Little Birds home league fixture is ID 12, Sunday 10:30 at Clapham Common, `Upcoming` with `availability_open=true`; it appears as Next Match. The completed October away fixture ID 6 remains separate. Player availability uses existing authenticated upsert/RLS. No availability announcement was queued.
- East Putney ID 11 remains `Completed`, Bristol City 0–7, with its existing match report and SumUp link `https://pay.sumup.com/b2c/XS8WMVF0GJ`. The new button is rendered beneath the report; historical match links were not changed. Thirteen match-stat rows (11 starters and two substitutes Jed confirmed played) are the voting source; minutes stayed at their default zero. MOTM voting has since been closed by the manager. Do not reopen without an explicit instruction.
- Production Supabase migration `east_putney_motm_eligibility` (live version `20261102083753`) adds a no-self-vote constraint and a policy requiring a recorded East Putney candidate while the completed match's voting is open. Existing voter ownership and one-vote-per-player constraints remain. Focused PGlite test passed. Next.js build passed with nonsecret public-variable placeholders.
- Two duplicate legacy player profiles with no linked login were archived after manager approval; signed-in profiles remain active. Historical match references were consolidated onto the active profile, preserving existing statistics and voting records. Verify protected Supabase records for details; do not place player-level data in this handover.
- October's scheduled news approval workflow completed separately; its article is published and its squad announcement was sent on 31 October. Do not republish or resend. No player notification was sent during this November fixture work.

## Open work and verification limits

- PR #20 is merged. PR #21 is an unmerged documentation handover. This availability fix branch includes its handover update and proposes filtering archived guest profiles from the manager dashboard and `get_fixture_availability` viewer RPC. Obtain Jed's approval before merging/deploying this branch or applying its migration; PR #21 can then be closed as superseded.
- Live fixture 12 currently has two archived guest profiles appearing as `No Response` because both current availability readers include all `Players` rows. The proposed filter excludes guests while preserving all availability responses and historical records. A read-only count showed 21 active profiles with no response and 16 active profiles with responses at preparation time; these counts can change as players respond.
- Read-only production checks returned HTTP 200 for `/`, `/fixtures`, `/fixtures/11` and `/fixtures/12`. Database confirmed next-match inputs, availability open, result/report and eligible candidates at release, with no fixture announcements queued then. Voting is now closed.
- A signed-in player save/vote and mobile/PWA rendering were not tested on a real device. The Vercel preview was protected and the connected Vercel API lacked access. The external SumUp checkout returned 403 to automated requests; Jed should open the button in a normal browser to confirm payment page details without submitting a test payment.
- Jed can separately send `Notify players: availability open` for fixture 12 and `Notify players: match report live` for fixture 11 from the manager dashboard. Broadcasts were enabled at the last check. Sending either requires Jed's decision; do not send automatically.

## Continuity procedure

Read `AGENTS.md`, this file, `PROJECT_GUIDE.md`, and the deployment checklist. Inspect current main/PRs/live data. Update this dated record with production SHA, release/test evidence, decisions, open tasks, deadlines and approvals before handing over.
