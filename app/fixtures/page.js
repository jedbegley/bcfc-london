export default function Fixtures() {
  const upcomingFixtures = [
    
    {
      competition: "Friendly",
      date: "Sunday 16 August 2026",
      time: "10:15",
      home: "Shepherd's Tuesday",
      away: "Bristol City",
      venue: "Burgess Park",
      note: "FRIENDLY",
    },
  ];

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
          <a href="/fixtures" style={styles.activeNav}>Fixtures</a>
          <a href="/squad" style={styles.navLink}>Squad</a>
          <a href="/stats" style={styles.navLink}>Stats</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <p style={styles.eyebrow}>2026/27</p>
        <h1 style={styles.title}>Fixtures & Results</h1>
        <p style={styles.intro}>
          Follow Bristol City throughout the season. fixtures,
          results and match details all in one place.
        </p>
      </section>

      {/* UPCOMING FIXTURES */}
      <section style={styles.content}>
        <div style={styles.sectionHeading}>
          <div>
            <p style={styles.redLabel}>NEXT UP</p>
            <h2 style={styles.heading}>Upcoming Fixtures</h2>
          </div>
        </div>

        <div className="fixture-list" style={styles.fixtureList}>
          {upcomingFixtures.map((fixture, index) => (
            <div key={index} className="fixture-card" style={styles.fixtureCard}>
              <div style={styles.fixtureTop}>
                <span style={styles.competition}>
                  {fixture.competition}
                </span>
                <span style={styles.date}>{fixture.date}</span>
              </div>

              <div className="fixture-teams" style={styles.teams}>
                <div style={styles.team}>
                  <span style={styles.teamName}>{fixture.home}</span>
                  <span style={styles.homeAway}>HOME</span>
                </div>

                <div style={styles.kickoff}>
                  <strong>{fixture.time}</strong>
                  <span style={styles.vs}>VS</span>
                </div>

                <div style={styles.team}>
                  <span style={styles.teamName}>{fixture.away}</span>
                  <span style={styles.homeAway}>AWAY</span>
                </div>
              </div>

              <div style={styles.fixtureBottom}>
                <span>{fixture.venue}</span>
                <strong style={styles.note}>{fixture.note}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section style={styles.resultsSection}>
        <div style={styles.content}>
          <p style={styles.redLabel}>2026/27</p>
          <h2 style={styles.heading}>Results</h2>

         <div style={styles.emptyResults}>
  <div style={styles.emptyScore}>Aberdeen 0 – 3 Bristol City</div>
  <h3 style={styles.emptyTitle}>Pre-season Friendly</h3>
  <p style={styles.emptyText}>
    Sunday 9 August 2026 · Prince George&apos;s Playing Fields, Raynes Park
  </p>

  <a
    href="/news"
    style={{
      display: "inline-block",
      marginTop: "14px",
      color: "#df1e2f",
      fontWeight: "900",
      textDecoration: "none",
    }}
  >
    Read match report →
  </a>
</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div>
          <strong style={styles.footerClub}>
            Bristol City London Supporters FC
          </strong>
          <p style={styles.footerText}>
            London-based Bristol City supporters football club.
          </p>
        </div>

        <div style={styles.sponsor}>
          <span style={styles.sponsorLabel}>
            PROUDLY SPONSORED BY
          </span>
          <img
           src="/IMG_1146.jpeg"
            alt="DUZZ Sports"
            style={styles.sponsorLogo}
          />
        </div>

        <div style={styles.copyright}>© 2026 BCFC London</div>
      </footer>
            <style>{`
 @media (max-width: 768px) {
  .fixture-card {
    padding: 22px 16px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }

  .fixture-teams {
  display: grid !important;
  grid-template-columns: 120px 70px 120px !important;
  gap: 8px !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
}

.fixture-teams > div {
  min-width: 0 !important;
  width: auto !important;
}

.fixture-teams > div:first-child {
  text-align: center !important;
}

.fixture-teams > div:nth-child(2) {
  width: 70px !important;
  height: 70px !important;
  min-width: 70px !important;
  min-height: 70px !important;
  margin: 0 !important;
  font-size: 14px !important;
}

.fixture-teams > div:last-child {
  text-align: center !important;
}

.fixture-teams strong {
  font-size: 15px !important;
}
}
`}</style>
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
    margin: "0",
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "65px 0",
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    marginBottom: "30px",
  },

  redLabel: {
    color: "#df1e2f",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "3px",
    margin: "0 0 8px",
  },

  heading: {
    fontSize: "36px",
    margin: 0,
    fontWeight: "900",
  },

  fixtureList: {
    display: "grid",
    gap: "20px",
  },

  fixtureCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
  },

  fixtureTop: {
    padding: "15px 25px",
    background: "#f5f5f5",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
  },

  competition: {
    color: "#df1e2f",
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "12px",
  },

  date: {
    fontWeight: "800",
    fontSize: "14px",
  },

  teams: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "35px 25px",
    gap: "30px",
  },

  team: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  teamName: {
    fontSize: "clamp(20px, 3vw, 32px)",
    fontWeight: "900",
  },

  homeAway: {
    color: "#999",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "900",
  },

  kickoff: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#df1e2f",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
  },

  vs: {
    fontSize: "10px",
    fontWeight: "900",
    opacity: 0.8,
  },

  fixtureBottom: {
    borderTop: "1px solid #eee",
    padding: "18px 25px",
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    flexWrap: "wrap",
    fontSize: "13px",
  },

  note: {
    color: "#df1e2f",
    letterSpacing: "1px",
  },

  resultsSection: {
    background: "#f4f4f4",
  },

  emptyResults: {
  marginTop: "24px",
  background: "white",
  padding: "28px 20px",
  borderRadius: "10px",
  textAlign: "center",
  border: "1px solid #e5e5e5",
},

 emptyScore: {
  color: "#171717",
  fontSize: "26px",
  fontWeight: "900",
  lineHeight: "1.2",
},

  emptyTitle: {
  fontSize: "16px",
  margin: "12px 0 6px",
  color: "#777",
  textTransform: "uppercase",
  letterSpacing: "1px",
},

  emptyText: {
    color: "#777",
    margin: 0,
  },

  footer: {
    background: "#111",
    color: "white",
    padding: "35px 6%",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "30px",
  },

  footerClub: {
    fontSize: "16px",
  },

  footerText: {
    color: "#aaa",
    margin: "7px 0 0",
    fontSize: "13px",
  },

  sponsor: {
    textAlign: "center",
  },

  sponsorLabel: {
    display: "block",
    color: "#999",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "3px",
    marginBottom: "8px",
  },

  sponsorLogo: {
    width: "150px",
    maxWidth: "100%",
    display: "block",
    margin: "0 auto",
  },

  copyright: {
    color: "#999",
    textAlign: "right",
    fontSize: "13px",
  },
};
