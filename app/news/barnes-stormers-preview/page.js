export default function BarnesStormersPreview() {
  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <a href="/news" style={styles.backLink}>
          ← Back to News
        </a>

        <div style={styles.label}>MATCH PREVIEW</div>

        <h1 style={styles.title}>
          City Begin League Eight Campaign Against Barnes Stormers
        </h1>

        <p style={styles.intro}>
          Bristol City London Supporters FC begin their 2026/27 league campaign
          on Sunday 13 September as Barnes Stormers FC visit Clapham Common for
          the opening game of the Southern Sunday Football League season.
        </p>

        <img
          src="/IMG_5497.jpeg"
          alt="Bristol City London Supporters FC squad"
          style={styles.image}
        />

        <div style={styles.article}>
          <p>
            Barnes will be a familiar opponent for City, with the sides meeting
            twice during last season&apos;s League Nine campaign. City were
            unable to get the better of the Stormers on either occasion, taking
            just one point from the two games.
          </p>

          <p>
            The first meeting at Clapham Common ended in a 2–2 draw before
            Barnes took all three points in the return fixture with a 2–1
            victory later in the season.
          </p>

          <p>
            Despite those results, it was City who ultimately finished higher
            in the table, ending the campaign one place above Barnes and
            condemning the Stormers to what would ordinarily have been
            relegation.
          </p>

          <p>
            However, a summer restructuring of the Southern Sunday Football
            League handed Barnes a reprieve — and then some. Rather than
            dropping down a division, the Stormers will instead join City in
            the newly formed League Eight, setting up another season between
            two sides who already know each other well.
          </p>

          <p>
            City head into the opener unbeaten so far in 2026/27 following a
            positive pre-season, with a 3–0 victory over Aberdeen followed by a
            2–2 draw against Shepherd&apos;s Tuesday.
          </p>

          <p style={styles.finalLine}>Now the competitive stuff begins.</p>
        </div>

        <div style={styles.matchCard}>
          <div style={styles.matchLabel}>NEXT MATCH</div>

          <h2 style={styles.matchTitle}>
            Bristol City v Barnes Stormers FC
          </h2>

          <div style={styles.matchDetails}>
            <strong>Sunday 13 September 2026</strong>
            <span>10:30 Kick Off</span>
            <span>Clapham Common</span>
            <span>Southern Sunday Football League — League Eight</span>
          </div>
        </div>

        <a href="/fixtures" style={styles.button}>
          VIEW FIXTURES
        </a>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "40px 20px 70px",
    fontFamily: "Arial, sans-serif",
    color: "#111",
  },

  container: {
    maxWidth: "900px",
    margin: "0 auto",
  },

  backLink: {
    display: "inline-block",
    marginBottom: "30px",
    color: "#111",
    textDecoration: "none",
    fontWeight: "800",
  },

  label: {
    color: "#e31b23",
    fontSize: "13px",
    fontWeight: "900",
    letterSpacing: "1.5px",
    marginBottom: "12px",
  },

  title: {
    fontSize: "clamp(36px, 6vw, 64px)",
    lineHeight: "1",
    margin: "0 0 22px",
    fontWeight: "900",
    letterSpacing: "-2px",
  },

  intro: {
    fontSize: "20px",
    lineHeight: "1.6",
    fontWeight: "700",
    marginBottom: "30px",
  },

  image: {
    width: "100%",
    display: "block",
    borderRadius: "8px",
    marginBottom: "35px",
  },

  article: {
    background: "#fff",
    padding: "32px",
    borderRadius: "8px",
    fontSize: "17px",
    lineHeight: "1.7",
  },

  finalLine: {
    fontWeight: "900",
    fontSize: "20px",
    marginBottom: "0",
  },

  matchCard: {
    marginTop: "30px",
    background: "#111",
    color: "#fff",
    padding: "28px",
    borderRadius: "8px",
  },

  matchLabel: {
    color: "#e31b23",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  matchTitle: {
    margin: "10px 0 18px",
    fontSize: "28px",
    fontWeight: "900",
  },

  matchDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    fontSize: "16px",
  },

  button: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    marginTop: "25px",
    padding: "15px 20px",
    background: "#e31b23",
    color: "#fff",
    textAlign: "center",
    textDecoration: "none",
    fontWeight: "900",
    borderRadius: "4px",
  },
};
