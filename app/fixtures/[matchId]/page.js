import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import MotmVote from "./MotmVote";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const dynamic = "force-dynamic";

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
          <div style={styles.eyebrow}>MATCH REPORT</div>

          <h1 style={styles.title}>
            Bristol City {match.our_score}–{match.opponent_score} {opponent}
          </h1>

          <div style={styles.fullTime}>FULL TIME</div>
        </div>
      </section>

      <section style={styles.content}>
        <div style={styles.report}>
          {match.match_report ? (
            match.match_report
              .split("\n")
              .filter((paragraph) => paragraph.trim() !== "")
              .map((paragraph, index) => (
                <p key={index} style={styles.paragraph}>
                  {paragraph}
                </p>
              ))
          ) : (
            <p>Match report coming soon.</p>
          )}
        </div>

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
