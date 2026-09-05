export default function StatsPage() {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.clubName}>BRISTOL CITY</div>
          <div style={styles.clubSub}>LONDON SUPPORTERS FC</div>
        </div>

        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/news" style={styles.navLink}>News</a>
          <a href="/fixtures" style={styles.navLink}>Fixtures</a>
          <a href="/squad" style={styles.navLink}>Squad</a>
          <a href="/stats" style={styles.activeNav}>Stats</a>
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

      <section style={styles.hero}>
        <p style={styles.eyebrow}>BCFC LONDON</p>
        <h1 style={styles.title}>Stats</h1>
        <p style={styles.intro}>
          Player appearances, goals, assists and more are coming soon.
        </p>
      </section>

      <section style={styles.content}>
        <div style={styles.card}>
          <div style={styles.comingSoon}>COMING SOON</div>
          <h2 style={styles.cardTitle}>Player Stats</h2>
          <p style={styles.cardText}>
            Appearances, goals, assists, cards and season statistics will all
            be available here soon.
          </p>

          <a href="/" style={styles.button}>
            ← Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    margin: 0,
    fontFamily: "Arial, Helvetica, sans-serif",
    minHeight: "100vh",
    background: "#fff",
    color: "#111",
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

  content: {
    width: "88%",
    maxWidth: "900px",
    margin: "0 auto",
    padding: "65px 0",
  },

  card: {
    background: "#f4f4f4",
    borderRadius: "14px",
    padding: "45px",
    textAlign: "center",
  },

  comingSoon: {
    color: "#df1e2f",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "3px",
  },

  cardTitle: {
    fontSize: "36px",
    margin: "12px 0",
  },

  cardText: {
    color: "#666",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto",
  },

  button: {
    display: "inline-block",
    marginTop: "25px",
    background: "#111",
    color: "white",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    fontWeight: "900",
  },
};
