export default function Home() {
  const quickLinks = [
    { title: "Fixtures & Results", text: "Upcoming games and latest scores", icon: "⚽" },
    { title: "News", text: "Match reports, signings and club updates", icon: "📰" },
    { title: "Squad", text: "Meet the BCFC London squad", icon: "👕" },
    { title: "Stats", text: "Goals, assists, appearances and fantasy points", icon: "📊" },
  ];

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.clubName}>BRISTOL CITY</div>
          <div style={styles.clubSub}>LONDON SUPPORTERS FC</div>
        </div>

        <nav style={styles.nav}>
          <span>Home</span>
          <span>News</span>
          <span>Fixtures</span>
          <span>Squad</span>
          <span>Stats</span>
          <button style={styles.loginButton}>Player Login</button>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.eyebrow}>BRISTOL CITY IN LONDON</div>

          <h1 style={styles.heroTitle}>
            One club.
            <br />
            One city.
            <br />
            <span style={styles.redText}>London based.</span>
          </h1>

          <p style={styles.heroText}>
            The home of Bristol City London Supporters FC. Fixtures, results,
            match reports, player stats and everything happening around the club.
          </p>

          <div style={styles.heroButtons}>
            <button style={styles.primaryButton}>View Fixtures</button>
            <button style={styles.secondaryButton}>Latest News</button>
          </div>
        </div>

        <div style={styles.matchCard}>
          <div style={styles.matchLabel}>NEXT MATCH</div>
          <div style={styles.competition}>FRIENDLY</div>

          <div style={styles.teams}>
            <div style={styles.team}>
              <div style={styles.aberdeenBadge}>AFC</div>
              <strong>Aberdeen</strong>
              <span style={styles.homeAway}>HOME</span>
            </div>

            <div style={styles.versus}>VS</div>

            <div style={styles.team}>
              <div style={styles.cityBadge}>BC</div>
              <strong>Bristol City</strong>
              <span style={styles.homeAway}>AWAY</span>
            </div>
          </div>

          <div style={styles.matchInfo}>
            <strong>Sunday 9 August 2026</strong>
            <span>14:00 Kick Off</span>
            <span>Prince George&apos;s Playing Fields, Raynes Park</span>
          </div>

          <div style={styles.friendlyTag}>THE SCOTTY MURRAY DERBY</div>
        </div>
      </section>

      <section style={styles.quickSection}>
        <div style={styles.sectionHeading}>
          <div>
            <div style={styles.eyebrow}>THE CLUB</div>
            <h2 style={styles.sectionTitle}>Everything BCFC London</h2>
          </div>

          <p style={styles.sectionText}>
            Follow the season, keep up with the squad and see who&apos;s leading
            the way on the pitch.
          </p>
        </div>

        <div style={styles.grid}>
          {quickLinks.map((item) => (
            <div key={item.title} style={styles.quickCard}>
              <div style={styles.icon}>{item.icon}</div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardText}>{item.text}</p>
              <div style={styles.cardLink}>Explore →</div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.newsStrip}>
        <div>
          <div style={styles.eyebrowLight}>LATEST FROM THE CLUB</div>
          <h2 style={styles.newsTitle}>News, reports and announcements</h2>
        </div>

        <button style={styles.whiteButton}>View all news</button>
      </section>

      <footer style={styles.footer}>
        <div>
          <strong>Bristol City London Supporters FC</strong>
          <div style={styles.footerSmall}>
            London-based Bristol City supporters football club.
          </div>
        </div>

        <div style={styles.footerSmall}>© 2026 BCFC London</div>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    margin: 0,
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f5f5f5",
    color: "#171717",
    minHeight: "100vh",
  },

  header: {
    background: "#ffffff",
    padding: "22px 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "4px solid #e31b23",
    flexWrap: "wrap",
    gap: "20px",
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
  },

  loginButton: {
    background: "#e31b23",
    color: "white",
    border: 0,
    padding: "12px 18px",
    borderRadius: "6px",
    fontWeight: "800",
    cursor: "pointer",
  },

  hero: {
    background: "#151515",
    color: "white",
    padding: "70px 6%",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "50px",
    alignItems: "center",
  },

  heroContent: {
    maxWidth: "720px",
  },

  eyebrow: {
    color: "#e31b23",
    fontSize: "13px",
    letterSpacing: "3px",
    fontWeight: "900",
    marginBottom: "16px",
  },

  heroTitle: {
    fontSize: "clamp(48px, 7vw, 92px)",
    lineHeight: "0.95",
    margin: "0 0 25px 0",
    fontWeight: "900",
    letterSpacing: "-3px",
  },

  redText: {
    color: "#e31b23",
  },

  heroText: {
    color: "#d3d3d3",
    lineHeight: "1.7",
    fontSize: "18px",
    maxWidth: "650px",
  },

  heroButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  primaryButton: {
    background: "#e31b23",
    color: "white",
    border: 0,
    padding: "15px 22px",
    borderRadius: "6px",
    fontWeight: "900",
    cursor: "pointer",
  },

  secondaryButton: {
    background: "transparent",
    color: "white",
    border: "1px solid #555",
    padding: "15px 22px",
    borderRadius: "6px",
    fontWeight: "900",
    cursor: "pointer",
  },

  matchCard: {
    background: "white",
    color: "#111",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
  },

  matchLabel: {
    fontSize: "12px",
    letterSpacing: "2px",
    fontWeight: "900",
    color: "#e31b23",
  },

  competition: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#777",
    marginTop: "6px",
  },

  teams: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "15px",
    margin: "30px 0",
    textAlign: "center",
  },

  team: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },

  aberdeenBadge: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "#d71920",
    color: "white",
    display: "grid",
    placeItems: "center",
    fontWeight: "900",
    fontSize: "17px",
  },

  cityBadge: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "#e31b23",
    color: "white",
    display: "grid",
    placeItems: "center",
    fontWeight: "900",
    fontSize: "19px",
    border: "5px solid #111",
  },

  homeAway: {
    fontSize: "10px",
    letterSpacing: "1px",
    fontWeight: "900",
    color: "#999",
  },

  versus: {
    fontWeight: "900",
    color: "#999",
  },

  matchInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    textAlign: "center",
    fontSize: "14px",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
  },

  friendlyTag: {
    marginTop: "20px",
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "11px",
    fontWeight: "900",
    fontSize: "12px",
    letterSpacing: "1px",
    borderRadius: "5px",
  },

  quickSection: {
    padding: "70px 6%",
    background: "#ffffff",
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: "30px",
    marginBottom: "35px",
    flexWrap: "wrap",
  },

  sectionTitle: {
    fontSize: "42px",
    margin: 0,
    fontWeight: "900",
  },

  sectionText: {
    maxWidth: "500px",
    color: "#666",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },

  quickCard: {
    background: "#f4f4f4",
    borderRadius: "10px",
    padding: "28px",
    borderTop: "4px solid #e31b23",
  },

  icon: {
    fontSize: "28px",
    marginBottom: "25px",
  },

  cardTitle: {
    fontSize: "21px",
    marginBottom: "8px",
  },

  cardText: {
    color: "#666",
    lineHeight: "1.5",
    minHeight: "48px",
  },

  cardLink: {
    color: "#e31b23",
    marginTop: "20px",
    fontWeight: "900",
  },

  newsStrip: {
    background: "#e31b23",
    color: "white",
    padding: "45px 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },

  eyebrowLight: {
    fontSize: "12px",
    letterSpacing: "3px",
    fontWeight: "900",
    opacity: 0.8,
  },

  newsTitle: {
    fontSize: "35px",
    margin: "8px 0 0",
  },

  whiteButton: {
    background: "white",
    color: "#e31b23",
    border: 0,
    borderRadius: "6px",
    padding: "14px 20px",
    fontWeight: "900",
    cursor: "pointer",
  },

  footer: {
    background: "#101010",
    color: "white",
    padding: "32px 6%",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },

  footerSmall: {
    color: "#999",
    marginTop: "6px",
    fontSize: "13px",
  },
};
