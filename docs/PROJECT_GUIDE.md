# BCFC London project guide

Audited 30 October 2026. Recheck live state; `CURRENT_STATUS.md` holds time-sensitive facts. Focused guides: [app notifications](app-notifications.md), [availability alerts](availability-alerts.md), and [deployment checklist](DEPLOYMENT_CHECKLIST.md).

## Stack and routes

Public repository `jedbegley/bcfc-london`, branch `main`. Next.js 15 App Router, React 19, Supabase JS 2, Vercel production domain `https://www.bcfclondon.co.uk`. `package.json` provides `dev`, `build`, `start` (no lint script). `next.config.js` holds a news redirect, private/noindex dashboard-news headers, and public Supabase photo origin. `app/layout.js`, `SiteHeader.js`, `SiteFooter.js` provide the shell.

| Route/source | Function |
| --- | --- |
| `app/page.js` | Next match, latest result, scorers, featured news (`newsArticles[0]`). |
| `app/fixtures/page.js`, `app/fixtures/[matchId]/page.js`, `app/fixtureDisplay.js` | Schedule, previews, results, report, matchday squad, MOTM voting. |
| `app/league/page.js`, `app/stats/page.js`, `app/playerOfMonth.js` | League, saved performance/fantasy totals, monthly ranking derived from match stats. Ranking does not publish awards. |
| `app/squad/page.js`, `app/squad/[playerId]/page.js` | Public squad profiles and photos from `public_squad`. Some photos also reside under `public/players/`. |
| `app/news/page.js`, `app/news/articles.js`, `app/news/<slug>/page.js` | Hand-authored articles/cards plus dynamic published news, sorted by date; first item is News feature. |
| `app/news/[slug]/page.js`, `app/news/published.js`, `app/news/ArticleBody.js` | Public article through published-only RPC, spoiler-free Open Graph/X title, description and image. |
| `app/login/page.js`, `app/reset-password/page.js`, `app/dashboard/page.js` | Supabase email/password sign-in, reset, signed-in availability and manager controls. |
| `app/dashboard/players/page.js`, `analytics/page.js`, `matches/[matchId]/report/page.js` | Roster, page analytics, manager match report/stats/results/MOTM closure. |
| `app/dashboard/news/page.js`, `news/[id]/page.js`, `news/ManagerNews.js` | Manager-only draft editor, scheduling, preview, approve/publish, separate notification action. |
| `app/api/notification-stories/route.js` | Published story targets for manager push controls. |

## Supabase, roles and data

Production project reference `qyvwpywlitnlbmzcxzlf`. Read-only audit found RLS on all 18 public tables. The public `player-photos` Storage bucket serves profile photos; no Storage policies were listed in this audit. Verify uploads and privileges before changing photo management. `public_squad` view exposes display fields only for non-guest players. Inspect view security/grants when editing.

| Area | Tables | Usage |
| --- | --- | --- |
| Identity | `"Players"`, `public_squad` view | Private profile/contact data linked to `auth.users`, `is_admin`, approval, availability visibility, public display profile. |
| Fixtures | `matches`, `availability`, `match_squad`, `match_payments` | Date, kickoff, venue, scores, report, availability opening/responses, selection and fee records. |
| Performance | `match_stats`, `fantasy_rules`, `motm_votes` | Events, fantasy totals/rules, eligible player voting and MOTM award. |
| News | `news` | Private draft/content, spoiler-free preview, image/photo reference, state, approval owner/due time, publication and send timestamps. |
| Analytics/email | `page_visits`, `availability_change_history`, `availability_alert_preferences`, `availability_alert_deliveries` | Visits and optional manager availability email history/preferences. |
| Push | `app_push_config`, `app_devices`, `app_push_preferences`, `app_push_messages`, `app_push_deliveries` | Broadcast flag, subscriptions, categories, message and delivery outcomes. |

Browser client `app/browserSupabase.js` uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Never place service-role keys in browser code. Manager role is `"Players".is_admin`; players manage own availability and push preferences. `can_view_availability` enables selected non-admins to view fixture availability through `get_fixture_availability`. Public routes use anonymous reads and restricted views/functions. Client dashboard guards are paired with live RLS and manager-checked RPCs; a shell HTTP 200 alone is not proof of authenticated access.

Managers control fixture availability separately from push announcements. Players respond through `/dashboard`. Match report editor stores squad, result, narrative and stats/fantasy points, then can close MOTM voting and award points. Public fixture/stat pages read saved outcomes. Payment records and a SumUp link exist; do not claim a full payment processor integration without a separate audit.

## News workflow and social previews

Existing static article routes coexist with private Supabase news. Relevant functions: `save_news_draft`, `process_news_approvals`, `publish_news_article`, `published_news_article`, `published_news_previews`, `queue_news_notification`. Sources: `supabase/activation/news-approval-functions.sql`, `news-title-only-push.sql`. Compare live migration history and definitions before reapplying any activation script. Cron `news-approval-review` runs each minute, moves due scheduled articles to `awaiting_approval` and queues a manager-only review link. It does not publish. Manager approval explicitly publishes; only then do published-only RPCs expose the article. Publishing does not queue a squad notification. The separate button queues it once, subject to preferences. Newly published news with the newest date becomes the featured homepage and News item.

Open Graph/X cards use `preview_title`, `summary`, and `image_url` from published records; `public/potm-october-2026-social-v2.jpg` is a generic preview graphic. The full article photo appears in the manager preview and public article only after publication. Never include an unreleased winner in metadata, documentation, push copy or a new public filename.

## PWA, push and email

`public/manifest.webmanifest`, `app/install/*`, `app/AppNotifications.js`, `app/pushClient.js`, `public/sw.js` implement install guidance, opt-in, Web Push and safe same-origin click links. `app/dashboard/PushPreferences.js` supports own-device tests/category choices; `PushAdmin.js` queues manual news, fixture, availability and report announcements. `supabase/functions/send-app-push/index.ts` handles delivery with protected credentials; `retry-app-push` cron runs every minute. `send-availability-alerts` and `retry-availability-alerts` provide independent email plumbing. Provider acceptance does not establish phone display. See topic guides for rate limits, idempotency and activation details.

## Deployment, testing and limits

GitHub reported Vercel success for main commit at audit; public route checks succeeded. Connected Vercel API could not resolve project/deployments under the visible team, so environment values, root directory, protection and exact production alias/commit mapping were not independently verified. Resolve account/team scope before the next release. Compare repository `supabase/migrations/`, `supabase/activation/` with live migration history; versions/names differ. Run focused `node --test tests/*.test.mjs` and `npm run build` for code changes; some database tests require PGlite described in topic guides. Test public routes, anonymous denial, manager authenticated actions, jobs and recipients without player pushes.

Verified 30 October: public route HTTP responses, tables/RLS, active cron/function names, private October record and public 404, GitHub Vercel success status. Not verified in this audit: signed-in manager browser UI, physical-phone receipt, Vercel settings, live availability email delivery (zero preference/delivery rows). See `CURRENT_STATUS.md`.
