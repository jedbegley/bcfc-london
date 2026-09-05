export default function Fixtures() {
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
          Keep up with upcoming fixtures, results and match details for
          Bristol City London Supporters FC.
        </p>
      </section>
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

{/* UPCOMING */}
<section style={styles.section}>
  <p style={styles.redLabel}>NEXT UP</p>
  <h2 style={styles.heading}>Upcoming Fixtures</h2>

  <div style={styles.cardWrap}>
  
    <div style={styles.matchCard}>
      <div style={styles.matchLabel}>NEXT MATCH</div>
      <div style={styles.competition}>SOUTHERN SUNDAY FOOTBALL LEAGUE</div>

      <div style={styles.teams}>
        <div style={styles.team}>
          <img
            src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg"
            alt="Bristol City"
            style={styles.fixtureBadge}
          />
          <strong>Bristol City</strong>
          <span style={styles.homeAway}>HOME</span>
        </div>

        <div style={styles.versus}>VS</div>

        <div style={styles.team}>
          <div style={styles.aberdeenBadge}>BS</div>
          <strong>Barnes Stormers FC</strong>
          <span style={styles.homeAway}>AWAY</span>
        </div>
      </div>

      <div style={styles.matchInfo}>
        <strong>Sunday 13 September 2026</strong>
        <span>10:30 Kick Off</span>
        <span>Clapham Common</span>
      </div>

      <div style={styles.friendlyTag}>LEAGUE</div>
    </div>
  </div>
</section>

      {/* RESULTS */}
      <section style={styles.resultsSection}>
        <div style={styles.section}>
          <p style={styles.redLabel}>2026/27</p>
          <h2 style={styles.heading}>Results</h2>

          <div style={styles.cardWrap}>
        <div style={styles.matchCard}>
  <div style={styles.matchLabel}>LATEST RESULT</div>
  <div style={styles.competition}>PRE-SEASON FRIENDLY</div>

  <div style={styles.teams}>
    <div style={styles.team}>
      <div style={styles.aberdeenBadge}>ST</div>
      <strong>Shepherd&apos;s Tuesday</strong>
      <span style={styles.homeAway}>HOME</span>
    </div>

    <div style={styles.versus}>
      <div
        style={{
          fontSize: "34px",
          fontWeight: "900",
          color: "#111",
        }}
      >
        2–2
      </div>
      <div
        style={{
          fontSize: "11px",
          fontWeight: "900",
          marginTop: "6px",
        }}
      >
        FULL TIME
      </div>
    </div>

    <div style={styles.team}>
      <img
        src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg"
        alt="Bristol City"
        style={styles.fixtureBadge}
      />
      <strong>Bristol City</strong>
      <span style={styles.homeAway}>AWAY</span>
    </div>
  </div>

  <div style={styles.matchInfo}>
    <strong>Sunday 16 August 2026</strong>
    <span>Burgess Park</span>
    <span>⚽ Own Goal · Nathan</span>
  </div>

 <a
  href="/news/shepherds-tuesday-2-2-bristol-city"
  style={{
    ...styles.friendlyTag,
    display: "block",
    width: "100%",
    textAlign: "center",
    textDecoration: "none",
    boxSizing: "border-box",
  }}
>
  READ MATCH REPORT
</a>
</div>
            <div style={styles.matchCard}>
              <div style={styles.matchLabel}>PRE-SEASON RESULT</div>
              <div style={styles.competition}>PRE-SEASON FRIENDLY</div>

              <div style={styles.teams}>
                <div style={styles.team}>
                  <div style={styles.aberdeenBadge}>AFC</div>
                  <strong>Aberdeen</strong>
                  <span style={styles.homeAway}>HOME</span>
                </div>

                <div style={styles.versus}>
                  <div
                    style={{
                      fontSize: "34px",
                      fontWeight: "900",
                      color: "#111",
                    }}
                  >
                    0–3
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "900",
                      marginTop: "6px",
                    }}
                  >
                    FULL TIME
                  </div>
                </div>

                <div style={styles.team}>
                  <img
                    src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg"
                    alt="Bristol City"
                    style={styles.fixtureBadge}
                  />
                  <strong>Bristol City</strong>
                  <span style={styles.homeAway}>AWAY</span>
                </div>
              </div>

              <div style={styles.matchInfo}>
                <strong>Sunday 9 August 2026</strong>
                <span>Prince George&apos;s Playing Fields, Raynes Park</span>
                <span>⚽ Bellamy · Hayes · Nathaniel</span>
              </div>

              <a
              href="/news/aberdeen-0-3-bristol-city"
                style={{
                  ...styles.friendlyTag,
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  textDecoration: "none",
                  boxSizing: "border-box",
                }}
              >
                READ MATCH REPORT
              </a>
            </div>
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
          <span style={styles.sponsorLabel}>PROUDLY SPONSORED BY</span>
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
          .fixtures-card-wrap {
            width: 100% !important;
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

  section: {
    width: "88%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "65px 0",
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
    margin: "0 0 30px",
    fontWeight: "900",
  },

  cardWrap: {
    width: "100%",
    maxWidth: "620px",
    margin: "0 auto",
  },

  matchCard: {
    background: "white",
    color: "#111",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
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

  fixtureBadge: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    objectFit: "cover",
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

  resultsSection: {
    background: "#f4f4f4",
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
