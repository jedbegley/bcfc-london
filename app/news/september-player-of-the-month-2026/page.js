import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { getPlayerOfMonth } from "../../playerOfMonth";
import { getNewsArticles } from "../articles";

export const dynamic = "force-dynamic";

const socialTitle = "September Player of the Month Revealed 🏆";
const socialDescription = "The stats are in. Find out who has been named BCFC London’s first Player of the Month of the 2026/27 season.";
const articleUrl = "https://www.bcfclondon.co.uk/news/september-player-of-the-month-2026";
const socialImage = "https://www.bcfclondon.co.uk/potm-september-2026-social.png";

export const metadata = {
  title: socialTitle,
  description: socialDescription,
  alternates: { canonical: articleUrl },
  openGraph: {
    title: socialTitle,
    description: socialDescription,
    url: articleUrl,
    siteName: "BCFC London",
    type: "article",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "BCFC London Player of the Month" }],
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description: socialDescription,
    images: [socialImage],
  },
};

export default async function SeptemberPlayerOfTheMonth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const [articles, award] = await Promise.all([
    getNewsArticles(),
    getPlayerOfMonth(supabase, 2026, 9),
  ]);
  const article = articles.find(({ link }) => link === "/news/september-player-of-the-month-2026");
  const jack = award.winners.find(({ playerId }) => playerId === 20);

  return (
    <main className="potm-page">
      <header className="site-header">
        <a href="/" className="brand">
          <img src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg" alt="BCFC London badge" />
          <span><strong>BRISTOL CITY</strong><small>LONDON SUPPORTERS FC</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a><a href="/news" aria-current="page">News</a>
          <a href="/league">League</a><a href="/fixtures">Fixtures</a>
          <a href="/squad">Squad</a><a href="/stats">Stats</a>
          <a className="portal" href="/dashboard">Player Portal</a>
        </nav>
      </header>

      <section className="article-hero">
        <div className="hero-inner">
          <a href="/news" className="back">← Back to News</a>
          <p className="eyebrow">PLAYER OF THE MONTH · SEPTEMBER 2026</p>
          <h1>Smithy Wins September Player of the Month</h1>
          <p className="hero-lead">The first Player of the Month of 2026/27 is Jack Smith.</p>
        </div>
      </section>

      <article className="article-body">
        <div className="winner-feature">
          <div className="portrait">
            {article?.image ? (
              <Image src={article.image} alt="Jack Smith, September Player of the Month"
                fill sizes="(max-width: 720px) 90vw, 410px"
                style={{ objectFit: "cover", objectPosition: "center 22%" }} priority />
            ) : (
              <img src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg"
                alt="BCFC London badge" className="portrait-fallback" />
            )}
          </div>
          <div className="winner-details">
            <p className="eyebrow">2026/27 · FIRST WINNER</p>
            <h2>Jack Smith</h2>
            {jack && (
              <div className="stat-strip" aria-label="September fantasy statistics">
                <span><strong>{jack.points}</strong> Fantasy points</span>
                <span><strong>{jack.assists}</strong> Assists</span>
                <span><strong>{jack.motmAwards}</strong> MOTM</span>
              </div>
            )}
            <p>Decided by fantasy points earned in completed September matches.</p>
          </div>
        </div>

        <div className="story-copy">
          <p>This season sees the return of Fantasy Football and, with it, the Player of the Month award, decided purely by the stats.</p>
          <p>The first winner of the season is Jack Smith, who has made a cracking start to the campaign.</p>
          <p>A player whose best position we’re still not entirely sure of, Smithy can regularly be seen tearing up the Tuesday five-a-side league, but for one reason or another has never quite managed to reproduce that form consistently on a Sunday.</p>
          <p>This season, though, things look a little different. Jack appears to have made the number 10 role his own in the two games he’s played so far, already contributing three assists and picking up Man of the Match in the 3–3 draw with Pure Football.</p>
          <p>Away from the pitch, Jack’s alter ego midnight.manoeuvres can occasionally be heard taking over the late-night airwaves or spinning some beats at your local techno rave.</p>
          <p>Hopefully Smithy can keep the form going and, most importantly, get a good run of games under his belt — something he hasn’t managed too often in previous seasons.</p>
          <p className="closing">Congratulations to our first Player of the Month of 2026/27, Jack Smith.</p>
        </div>
        <a href="/news" className="all-news">MORE NEWS →</a>
      </article>

      <footer>
        <div><strong>Bristol City London Supporters FC</strong><p>London-based Bristol City supporters football club.</p></div>
        <div className="sponsor"><small>PROUDLY SPONSORED BY</small><img src="/IMG_1146.jpeg" alt="DUZZ Sports" /></div>
        <span>© 2026 BCFC London</span>
      </footer>
      <style>{`
        .potm-page { margin: 0; background: #f5f5f5; color: #111; font-family: Arial, Helvetica, sans-serif; }
        .potm-page * { box-sizing: border-box; }
        .site-header { background: #fff; border-bottom: 4px solid #e31b23; padding: 22px 6%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; }
        .brand { display: flex; gap: 18px; align-items: center; text-decoration: none; color: #111; }
        .brand img { width: 70px; height: 70px; object-fit: contain; }
        .brand strong { display: block; color: #e31b23; font-size: 25px; font-weight: 900; letter-spacing: 3px; }
        .brand small { display: block; font-size: 12px; font-weight: 800; letter-spacing: 2px; margin-top: 4px; }
        .site-header nav { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .site-header nav a { color: #111; text-decoration: none; font-size: 14px; font-weight: 700; }
        .site-header nav a[aria-current] { color: #e31b23; }
        .site-header nav .portal { background: #e31b23; color: #fff; padding: 12px 18px; border-radius: 6px; font-weight: 800; }
        .article-hero { background: #151515; color: #fff; padding: 48px 6% 70px; }
        .hero-inner { max-width: 1060px; margin: auto; }
        .back { display: inline-block; color: #fff; text-decoration: none; font-size: 14px; font-weight: 800; margin-bottom: 46px; }
        .eyebrow { color: #e31b23; font-size: 12px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; }
        .article-hero h1 { max-width: 900px; margin: 12px 0 20px; font-size: clamp(40px, 6vw, 74px); line-height: 1.04; letter-spacing: -2px; }
        .hero-lead { margin: 0; font-size: 20px; line-height: 1.5; }
        .article-body { max-width: 1060px; margin: -32px auto 70px; padding: 0 24px; position: relative; }
        .winner-feature { background: #fff; display: grid; grid-template-columns: minmax(260px, 0.8fr) 1fr; border-radius: 12px; overflow: hidden; box-shadow: 0 12px 32px #0002; }
        .portrait { position: relative; min-height: 490px; background: #1b1b1b; }
        .portrait-fallback { width: 100%; height: 100%; object-fit: contain; }
        .winner-details { padding: 42px; display: flex; flex-direction: column; justify-content: center; }
        .winner-details h2 { margin: 6px 0 24px; font-size: clamp(38px, 5vw, 62px); line-height: 1; }
        .winner-details > p:last-child { color: #555; line-height: 1.5; }
        .stat-strip { display: flex; flex-wrap: wrap; gap: 20px; border-top: 3px solid #e31b23; border-bottom: 1px solid #ddd; padding: 20px 0; }
        .stat-strip span { display: flex; flex-direction: column; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .5px; }
        .stat-strip strong { font-size: 32px; color: #e31b23; }
        .story-copy { max-width: 760px; margin: 50px auto 35px; background: #fff; padding: 40px 48px; border-radius: 10px; font-size: 18px; line-height: 1.75; }
        .story-copy p { margin: 0 0 24px; }
        .story-copy p:last-child { margin-bottom: 0; }
        .closing { font-weight: 900; }
        .all-news { display: table; margin: auto; padding: 14px 24px; background: #e31b23; color: #fff; text-decoration: none; border-radius: 5px; font-weight: 900; }
        footer { background: #111; color: #fff; padding: 42px 6%; display: flex; align-items: center; justify-content: space-between; gap: 28px; flex-wrap: wrap; }
        footer p, footer span { color: #bbb; font-size: 13px; }
        .sponsor { display: flex; align-items: center; gap: 12px; }
        .sponsor small { font-weight: 900; letter-spacing: 1px; }
        .sponsor img { max-width: 110px; max-height: 55px; object-fit: contain; }
        @media (max-width: 768px) {
          .site-header nav { display: grid; grid-template-columns: repeat(4, auto); width: 100%; justify-content: space-between; gap: 20px 8px; }
          .site-header nav a:nth-child(5) { grid-column: 1; }
          .site-header nav a:nth-child(6) { grid-column: 2; }
          .site-header nav a:nth-child(7) { grid-column: 3 / 5; }
          .article-hero { padding-top: 34px; padding-bottom: 65px; }
          .back { margin-bottom: 35px; }
          .winner-feature { display: block; }
          .portrait { min-height: min(110vw, 520px); }
          .winner-details { padding: 28px; }
          .story-copy { padding: 28px 24px; margin-top: 26px; font-size: 17px; }
        }
      `}</style>
    </main>
  );
}
