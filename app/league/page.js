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
        <p style={styles.eyebrow}>
  SOUTHERN SUNDAY<span className="mobileLeagueBreak"><br /></span> FOOTBALL LEAGUE
</p>
<h1 style={styles.title}>League Eight</h1>
<p style={styles.intro}>
  League standings, recent results and upcoming fixtures for Southern Sunday
  Football League – League Eight.
</p>
      </section>
                 <section style={{ padding: "50px 4%", flex: 1 }}>
        <div className="league-grid">

          {/* LEAGUE TABLE */}
          <div className="league-column">
            <p style={styles.redLabel}>LEAGUE EIGHT</p>
            <h2 style={styles.sectionHeading}>League Table</h2>

            <iframe
              title="League Eight Table"
              className="league-frame league-table-frame"
              srcDoc={`
                <html>
                  <body style="margin:0;font-family:Arial,Helvetica,sans-serif;">
                    <div id="lrep918233212" style="width:100%;">
                      Data loading....
                    </div>
                    <script>
                      var lrcode = '918233212';
                    </script>
                    <script src="https://fulltime.thefa.com/client/api/cs1.js"></script>
                  </body>
                </html>
              `}
            />
          </div>

          {/* RECENT RESULTS */}
          <div className="league-column">
            <p style={styles.redLabel}>LEAGUE EIGHT</p>
            <h2 style={styles.sectionHeading}>Recent Results</h2>

            <iframe
              title="League Eight Recent Results"
              className="league-frame results-frame"
              srcDoc={`
                <html>
                  <body style="margin:0;font-family:Arial,Helvetica,sans-serif;">
                    <div id="lrep236550629" style="width:100%;">
                      Data loading....
                    </div>
                    <script>
                      var lrcode = '236550629';
                    </script>
                    <script src="https://fulltime.thefa.com/client/api/cs1.js"></script>
                  </body>
                </html>
              `}
            />
          </div>

          {/* UPCOMING FIXTURES */}
          <div className="league-column">
            <p style={styles.redLabel}>LEAGUE EIGHT</p>
            <h2 style={styles.sectionHeading}>Upcoming Fixtures</h2>

            <iframe
              title="League Eight Upcoming Fixtures"
              className="league-frame fixtures-frame"
              srcDoc={`
                <html>
                  <body style="margin:0;font-family:Arial,Helvetica,sans-serif;">
                    <div id="lrep239506247" style="width:100%;">
                      Data loading....
                    </div>
                    <script>
                      var lrcode = '239506247';
                    </script>
                    <script src="https://fulltime.thefa.com/client/api/cs1.js"></script>
                  </body>
                </html>
              `}
            />
          </div>

        </div>

        <style>{`
          .league-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 45px;
max-width: none;
  margin: 0 auto;
  align-items: start;
}

          .league-column {
            min-width: 0;
          }

         .league-frame {
  width: 100%;
  border: 0;
  display: block;
}

.league-table-frame {
  height: 260px;
}

.results-frame {
  height: 190px;
}

.fixtures-frame {
  height: 390px;
}
.mobileLeagueBreak {
  display: none;
}
          @media (max-width: 900px) {
          .mobileLeagueBreak {
  display: inline;
}
  .league-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .league-table-frame {
    height: 310px;
  }

  .results-frame {
    height: 220px;
  }

  .fixtures-frame {
    height: 430px;
  }
}
        `}</style>
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

              
              <Script id="fulltime-league-code" strategy="afterInteractive">
        {`var lrcode = '918233212';`}
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
  display: "flex",
  flexDirection: "column",
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
    redLabel: {
    color: "#df1e2f",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "3px",
    margin: "0 0 8px",
  },

  sectionHeading: {
    fontSize: "36px",
    margin: "0 0 25px",
    fontWeight: "900",
  },
};
