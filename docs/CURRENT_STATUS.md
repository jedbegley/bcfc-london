# Current status and next-session handover

Checked 5 November 2026 (Europe/London). Recheck GitHub, the live site and Supabase before acting. Keep credentials and unpublished player/article details out of Git.

## Three Little Birds result, 8 November

- Fixture 12 is completed, 2–4. The new fixture-specific SumUp URL and the requested additional starter and zero goal/assist stat row are saved in Supabase. No report or push was created. Seven starters are recorded.
- The results fix is pending approval. Apply its migration before deploying: it exposes the recorded starting lineup and limits fixture 12 votes to selected starters. The current live vote flag is open and its old page can still offer non-starters. Do not announce until the release is verified.

## Pending recruitment page (5 November)

- PR #23 on `feature/join-bcfc-london` is ready for review. It prepares permanent `/join` content, internal links, contact options, Open Graph/X metadata, canonical URL QR, and digital card assets. It is separate from the news feed. No production merge or deployment authorised yet.
- The CSS-module build failure in the initial preview was reproduced locally: a bare `a:focus-visible` selector was rejected as non-pure. A scoped selector fixes it. The supplied real current-squad and West Ham cup photographs were recovered, exported and added, along with a 1200 × 630 squad social crop. Local `npm run build` passes with nonsecret public-variable placeholders and lists `/join` as a static page. Await the new Vercel preview check after pushing this branch.
- Vercel check for PR #23 commit `6adeec2cbd6b49c1ef7acb3bade59637dc341f79` succeeded. The connected Vercel account is denied access to the protected preview (403), so external browser/mobile rendering remains to be checked by an authorised account.
- The QR SVG's payload was independently decoded to `https://www.bcfclondon.co.uk/join`; `qr.png` (1480 square) remains unchanged. The first card design was replaced with a clean white one-sided card, 75 mm square sticker, 75 mm round sticker and 1080 × 1600 phone PNG. Print PDFs have 3 mm bleed and vector QR. All four final PNGs decode to the canonical URL. Physical camera scanning and production destination remain outstanding until the page is deployed.
- Recruitment enquiry form and private manager notification are deferred until private storage, validation, rate limiting and notification delivery can be tested. Email, Instagram and X contacts work without a form. No player notification is part of recruitment work.
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
