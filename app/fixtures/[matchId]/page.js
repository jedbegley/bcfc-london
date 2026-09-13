import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

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
    <main style={styles.main}>
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

        <Link href="/fixtures" style={styles.backLink}>
          ← Back to Fixtures
        </Link>
      </section>
    </main>
  );
}

const styles = {
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
};
