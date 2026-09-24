import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import MotmVote from "./MotmVote";
// Match report page
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const dynamic = "force-dynamic";

function formatMatchDate(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    timeZone: "Europe/London",
  }).format(new Date(Date.UTC(year, month - 1, day, 12))).replace(/^([^,]+), /, "$1 ");
}

function formatMatchTime(value) {
  if (!value) return null;
  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return null;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function teamsFor(match) {
  return match.home_or_away === "Away"
    ? `${match.opponent || "Opponent"} v Bristol City`
    : `Bristol City v ${match.opponent || "Opponent"}`;
}

export async function generateMetadata({ params }) {
  const matchId = params.matchId;

  const { data: match } = await supabase
    .from("matches")
    .select("opponent, our_score, opponent_score, status, match_date, kickoff_time, venue, venue_details, competition, match_type, home_or_away, meet_time")
    .eq("id", matchId)
    .single();

  if (!match) {
    return {
      title: "Match Report | BCFC London",
    };
  }

  const isCompleted = match.status === "Completed";

const title = isCompleted
  ? (match.home_or_away === "Away"
    ? `${match.opponent} ${match.opponent_score}–${match.our_score} Bristol City | Match Report`
    : `Bristol City ${match.our_score}–${match.opponent_score} ${match.opponent} | Match Report`)
  : `${teamsFor(match)} | Match Preview`;

const description = isCompleted
  ? `Read the full BCFC London match report, watch the highlights and vote for your Man of the Match.`
  : [match.competition, match.match_type, formatMatchDate(match.match_date),
      formatMatchTime(match.kickoff_time) && `${formatMatchTime(match.kickoff_time)} kick off`,
      match.home_or_away, match.venue, match.venue_details,
      formatMatchTime(match.meet_time) && `Meet ${formatMatchTime(match.meet_time)}`]
      .filter(Boolean).join(" · ") + ". View match details and the BCFC London squad.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.bcfclondon.co.uk/fixtures/${matchId}`,
      siteName: "Bristol City London Supporters FC",
    },
    ...(!isCompleted && { twitter: { card: "summary", title, description } }),
  };
}
export default async function PublicMatchReport({ params }) {
  const matchId = params.matchId;

  const { data: match, error } = await supabase
    .from("matches")
    .select("*")
    .eq("id", matchId)
    .single();
 
  if (error || !match) {
    return (
      <main style={styles.main}>
        <div style={styles.content}>
          <h1>Match Report</h1>
          <p>We couldn&apos;t find this match.</p>

       
      <Link href="/fixtures" style={styles.backLink}>
            ← Back to Fixtures
          </Link>
        </div>
      </main>
    );
  }

 const opponent = match.opponent || "Opponent";
  const isCompleted = match.status === "Completed";
  const date = formatMatchDate(match.match_date);
  const kickoff = formatMatchTime(match.kickoff_time);
  const meet = formatMatchTime(match.meet_time);
  let squad = [];
  let nextMatch = null;

  if (!isCompleted) {
    const { data: selectedSquad, error: squadError } = await supabase
      .rpc("get_public_matchday_squad", { p_match_id: Number(matchId) });

    if (squadError) {
      console.error("Error loading match squad:", squadError);
    } else {
      squad = (selectedSquad || [])
        .map((row) => row.full_name)
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
    }
  }

  if (isCompleted) {
    const todayParts = Object.fromEntries(
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
      }).formatToParts(new Date()).map(({ type, value }) => [type, value])
    );
    const today = `${todayParts.year}-${todayParts.month}-${todayParts.day}`;
    const { data, error: nextMatchError } = await supabase
      .from("matches")
      .select("opponent, match_date, kickoff_time, venue, venue_details")
      .eq("status", "Upcoming")
      .gte("match_date", today)
      .order("match_date", { ascending: true })
      .order("kickoff_time", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (nextMatchError) {
      console.error("Error loading next match:", nextMatchError);
    } else {
      nextMatch = data;
    }
  }

  return (
   <main style={styles.page}>
  <header style={styles.header}>
    <div style={styles.headerBrand}>
      <img
        src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg"
        alt="BCFC London badge"
        style={styles.headerBadge}
      />

      <div>
        <div style={styles.clubName}>BRISTOL CITY</div>
        <div style={styles.clubSub}>LONDON SUPPORTERS FC</div>
      </div>
    </div>

    <nav style={styles.nav}>
      <a href="/" style={styles.navLink}>Home</a>
      <a href="/news" style={styles.navLink}>News</a>
      <a href="/league" style={styles.navLink}>League</a>
      <a href="/fixtures" style={styles.navLink}>Fixtures</a>
      <a href="/squad" style={styles.navLink}>Squad</a>
      <a href="/stats" style={styles.navLink}>Stats</a>
      <a href="/dashboard" style={styles.loginButton}>Player Portal</a>
    </nav>
  </header>

 <section style={styles.hero}>
  <div style={styles.heroInner}>
    <div style={styles.eyebrow}>
      {isCompleted ? "MATCH REPORT" : "MATCH PREVIEW"}
    </div>

    <h1 style={styles.title}>
      {isCompleted
        ? (match.home_or_away === "Away"
          ? `${opponent} ${match.opponent_score}–${match.our_score} Bristol City`
          : `Bristol City ${match.our_score}–${match.opponent_score} ${opponent}`)
        : teamsFor(match)}
    </h1>

    <div style={styles.fullTime}>
      {isCompleted ? "FULL TIME" : match.competition}
    </div>
  </div>
</section>

      <section style={styles.content}>
        <div style={styles.report}>
      {!isCompleted && (
  <div style={{ marginBottom: "35px" }}>
    <p style={styles.redLabel}>MATCH DETAILS</p>

    <h2 style={{ marginTop: 0 }}>{date || "Date to be confirmed"}</h2>

    {match.competition && <p><strong>Competition:</strong> {match.competition}</p>}
    {match.match_type && <p><strong>Match Type:</strong> {match.match_type}</p>}
    {match.home_or_away && <p><strong>Home/Away:</strong> {match.home_or_away}</p>}
    {meet && <p><strong>Meet:</strong> {meet}</p>}
    {kickoff && <p><strong>Kick Off:</strong> {kickoff}</p>}
    {match.venue && <p><strong>Venue:</strong> {match.venue}</p>}
    {match.venue_details && <p><strong>Venue Details:</strong> {match.venue_details}</p>}
  </div>
)}
{!isCompleted && squad.length > 0 && (
  <div style={{ marginBottom: "35px" }}>
    <p style={styles.redLabel}>MATCHDAY SQUAD</p>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px 25px",
        fontSize: "16px",
        lineHeight: "1.6",
      }}
    >
      {squad.map((name, index) => <span key={`${name}-${index}`}>{name}</span>)}
    </div>
  </div>
)}
          {isCompleted && (match.match_report ? (
            match.match_report
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== "")
             .map((paragraph, index) => (
  <div key={index}>
    <p style={styles.paragraph}>
      {paragraph}
    </p>

    {paragraph.includes("smashed an effort against the crossbar") && (
      <video
        controls
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          maxWidth: "700px",
          borderRadius: "8px",
          margin: "10px 0 25px",
          display: "block",
        }}
      >
        <source src="/hayes-crossbar-web.mp4" type="video/mp4" />
      </video>
    )}

{paragraph.includes("Ben Earle stepped up and made no mistake") && (
  <video
    controls
    playsInline
    preload="metadata"
    style={{
      width: "100%",
      maxWidth: "700px",
      borderRadius: "8px",
      margin: "10px 0 25px",
      display: "block",
    }}
  >
    <source
      src="/WhatsApp Video 2026-09-20 at 13.36.44.mp4"
      type="video/mp4"
    />
  </video>
)}     

{paragraph.includes("Sayer was there to slot home for 3-1") && (
  <video
    controls
    playsInline
    preload="metadata"
    style={{
      width: "100%",
      maxWidth: "700px",
      borderRadius: "8px",
      margin: "10px 0 25px",
      display: "block",
    }}
  >
    <source
      src="/WhatsApp Video 2026-09-20 at 13.38.02.mp4"
      type="video/mp4"
    />
  </video>
)}
{paragraph.includes("bottom corner with his left foot") && (
  <video
    controls
    playsInline
    preload="metadata"
    style={{
      width: "100%",
      maxWidth: "700px",
      borderRadius: "8px",
      margin: "10px 0 25px",
      display: "block",
    }}
  >
    <source src="/hayes-goal-web.mp4" type="video/mp4" />
  </video>
)}
  </div>
))
          ) : (
            <p>Match report coming soon.</p>
          ))}
        </div>

            {isCompleted && (<>
            <div style={{ marginTop: "45px", paddingTop: "30px", borderTop: "1px solid #ddd" }}>
  <div
    style={{
      color: "#e31b23",
      fontSize: "12px",
      fontWeight: "900",
      letterSpacing: "2px",
      marginBottom: "8px",
    }}
  >
    MAN OF THE MATCH
  </div>

  <h2 style={{ marginTop: 0 }}>Vote for your MOTM</h2>

<MotmVote
  matchId={matchId}
  votingClosed={match.motm_voting_closed === true}
/>
</div>

       <div
  style={{
    marginTop: "45px",
    paddingTop: "30px",
    borderTop: "1px solid #ddd",
  }}
>
  <div
    style={{
      color: "#e31b23",
      fontSize: "12px",
      fontWeight: "900",
      letterSpacing: "2px",
      marginBottom: "8px",
    }}
  >
    MATCH FEES
  </div>


 <h2 style={{ marginTop: 0 }}>Pay your match fee</h2>

<p style={{ marginBottom: "20px" }}>
  Match fee — £10
</p>

<a
  href="https://pay.sumup.com/b2c/QVVL7SH7"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    display: "inline-block",
    background: "#e31b23",
    color: "#fff",
    padding: "13px 20px",
    borderRadius: "6px",
    fontWeight: "800",
    textDecoration: "none",
  }}
>
  PAY £10 →
</a>
        {nextMatch && <div
  style={{
    marginTop: "30px",
    paddingTop: "30px",
    borderTop: "1px solid #ddd",
  }}
>
  <div
    style={{
      color: "#e31b23",
      fontSize: "12px",
      fontWeight: "900",
      letterSpacing: "2px",
      marginBottom: "8px",
    }}
  >
    NEXT MATCH
  </div>

  <h2 style={{ marginTop: 0 }}>{nextMatch.opponent} — {formatMatchDate(nextMatch.match_date)}</h2>

  <p style={{ marginBottom: "20px" }}>
  {[formatMatchDate(nextMatch.match_date), formatMatchTime(nextMatch.kickoff_time),
    nextMatch.venue, nextMatch.venue_details].filter(Boolean).join(" · ")}
</p>

  <Link
    href="/dashboard"
    style={{
      display: "inline-block",
      background: "#111",
      color: "#fff",
      padding: "13px 20px",
      borderRadius: "6px",
      fontWeight: "800",
      textDecoration: "none",
    }}
  >
    CONFIRM AVAILABILITY →
  </Link>
</div>}
</div>
            </>)}

<Link href="/fixtures" style={styles.backLink}>
  ← Back to Fixtures
</Link>
          </section>

      <footer style={styles.footer}>
        <div>
          <div style={styles.footerClub}>BRISTOL CITY</div>
          <div style={styles.footerSub}>LONDON SUPPORTERS FC</div>
        </div>

        <div style={styles.footerSponsor}>
          <span style={styles.sponsorLabel}>SPONSORED BY</span>
          <img
            src="/IMG_1146.jpeg"
            alt="DUZZ Sports"
            style={styles.sponsorImage}
          />
        </div>

        <div style={styles.copyright}>
          © 2026 Bristol City London Supporters FC
        </div>
      </footer>
    </main>
  );
}

const styles = {
    page: {
    minHeight: "100vh",
    background: "#fff",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#111",
  },

  header: {
    background: "#ffffff",
    padding: "22px 6%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottom: "4px solid #e31b23",
    flexWrap: "wrap",
    gap: "20px",
  },

  headerBrand: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  headerBadge: {
    width: "70px",
    height: "70px",
    objectFit: "contain",
  },

  clubName: {
    fontWeight: "900",
    letterSpacing: "3px",
    fontSize: "25px",
    color: "#e31b23",
  },

  clubSub: {
    fontWeight: "800",
    letterSpacing: "2px",
    fontSize: "12px",
    marginTop: "4px",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    fontSize: "14px",
    fontWeight: "700",
    flexWrap: "wrap",
    marginLeft: "auto",
  },

  navLink: {
    textDecoration: "none",
    color: "#111",
    fontSize: "14px",
    fontWeight: "700",
  },

  loginButton: {
    background: "#e31b23",
    color: "white",
    border: 0,
    padding: "12px 18px",
    borderRadius: "6px",
    fontWeight: "800",
    cursor: "pointer",
    textDecoration: "none",
  },
  main: {
    minHeight: "100vh",
    background: "#fff",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: "#111",
  },

  hero: {
    background: "#111",
    color: "#fff",
    padding: "55px 6%",
    borderBottom: "4px solid #e31b23",
  },

  heroInner: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  eyebrow: {
    color: "#e31b23",
    fontWeight: "900",
    fontSize: "13px",
    letterSpacing: "2px",
    marginBottom: "12px",
  },

  title: {
    fontSize: "clamp(32px, 6vw, 58px)",
    lineHeight: "1.05",
    margin: "0 0 15px",
    fontWeight: "900",
  },

  fullTime: {
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  content: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "45px 6% 70px",
  },

  report: {
    fontSize: "17px",
    lineHeight: "1.8",
  },

  paragraph: {
    margin: "0 0 24px",
  },

  backLink: {
    display: "inline-block",
    marginTop: "25px",
    color: "#e31b23",
    fontWeight: "800",
    textDecoration: "none",
  },
    footer: {
    background: "#111",
    color: "#fff",
    padding: "30px 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    flexWrap: "wrap",
  },

  footerClub: {
    fontWeight: "900",
    letterSpacing: "3px",
    fontSize: "18px",
    color: "#e31b23",
  },

  footerSub: {
    fontWeight: "800",
    letterSpacing: "2px",
    fontSize: "10px",
    marginTop: "4px",
  },

  footerSponsor: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  sponsorLabel: {
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  sponsorImage: {
    height: "45px",
    width: "auto",
    objectFit: "contain",
  },

  copyright: {
    fontSize: "11px",
    opacity: 0.7,
  },
};
