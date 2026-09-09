import Script from "next/script";

export default function LeaguePage() {
  return (
    <main style={styles.page}>
          {/* HEADER */}
      <header style={styles.header}>
        <div>
          <div style={styles.clubName}>BRISTOL CITY</div>
          <div style={styles.clubSub}>LONDON SUPPORTERS FC</div>
        </div>

        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/news" style={styles.navLink}>News</a>
          <a href="/league" style={styles.activeNav}>League</a>
          <a href="/fixtures" style={styles.navLink}>Fixtures</a>
          <a href="/squad" style={styles.navLink}>Squad</a>
          <a href="/stats" style={styles.navLink}>Stats</a>

          <a
            href="/dashboard"
            style={{
              background: "#e31b23",
              color: "#fff",
              padding: "12px 18px",
              borderRadius: "6px",
              fontWeight: "800",
              textDecoration: "none",
            }}
          >
            Player Portal
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>2026/27</p>
        <h1 style={styles.title}>League</h1>
        <p style={styles.intro}>
          League Eight standings, fixtures and results for Bristol City London
          Supporters FC.
        </p>
      </section>
      <section style={{ padding: "60px 6%" }}>
        <p
          style={{
            color: "#df1e2f",
            fontSize: "12px",
            fontWeight: "900",
            letterSpacing: "3px",
          }}
        >
          LEAGUE EIGHT
        </p>

        <h1 style={{ fontSize: "48px", marginBottom: "30px" }}>
          League Table
        </h1>

        <div
          id="lrep216855742"
          style={{
            width: "100%",
            maxWidth: "600px",
            overflowX: "auto",
          }}
        >
          Data loading....
          <a
            href="https://fulltime.thefa.com/index.html?divisionseason=383208413"
            target="_blank"
            rel="noopener noreferrer"
          >
            View League Eight on FA Full-Time
          </a>
        </div>
      </section>

      <Script id="fulltime-league-code" strategy="afterInteractive">
        {`var lrcode = '216855742';`}
      </Script>

      <Script
        src="https://fulltime.thefa.com/client/api/cs1.js"
        strategy="afterInteractive"
      />
    </main>
  );
}
const styles = {
    page: {
    margin: 0,
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#fff",
    color: "#111",
    minHeight: "100vh",
  },
  header: {
    padding: "24px 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "4px solid #df1e2f",
    flexWrap: "wrap",
    gap: "20px",
  },

  clubName: {
    color: "#df1e2f",
    fontSize: "20px",
    fontWeight: "900",
    letterSpacing: "3px",
  },

  clubSub: {
    fontSize: "9px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginTop: "5px",
  },

  nav: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  navLink: {
    textDecoration: "none",
    color: "#111",
    fontSize: "13px",
    fontWeight: "800",
  },

  activeNav: {
    textDecoration: "none",
    color: "#df1e2f",
    fontSize: "13px",
    fontWeight: "900",
  },

  hero: {
    background: "#111",
    color: "white",
    padding: "70px 6%",
  },

  eyebrow: {
    color: "#df1e2f",
    fontWeight: "900",
    letterSpacing: "4px",
    fontSize: "13px",
    margin: "0 0 10px",
  },

  title: {
    fontSize: "clamp(45px, 7vw, 90px)",
    margin: 0,
    lineHeight: "1",
    fontWeight: "900",
  },

  intro: {
    maxWidth: "650px",
    color: "#ccc",
    fontSize: "18px",
    lineHeight: "1.6",
    marginTop: "25px",
  },
};
