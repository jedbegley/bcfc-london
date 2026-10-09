export const metadata = {
  title: "Bristol City Progress in London Cup Following Walkover | BCFC London",
  description: "Bristol City have been awarded a walkover in the London Sunday Junior Shield after Highams Park Rangers First withdrew. City progress without the fixture being played.",
  openGraph: {
    title: "Bristol City Progress in London Cup Following Walkover",
    description: "Bristol City have been awarded a walkover in the London Sunday Junior Shield after Highams Park Rangers First withdrew. City progress without the fixture being played.",
    url: "https://www.bcfclondon.co.uk/news/london-cup-walkover-2026",
    siteName: "BCFC London", type: "article",
    images: [{ url: "https://www.bcfclondon.co.uk/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg", alt: "BCFC London club crest" }],
  },
  twitter: {
    card: "summary", title: "Bristol City Progress in London Cup Following Walkover",
    description: "Bristol City have been awarded a walkover in the London Sunday Junior Shield after Highams Park Rangers First withdrew. City progress without the fixture being played.",
    images: ["https://www.bcfclondon.co.uk/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg"],
  },
};
export default function LondonCupWalkover2026() {
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
          <a href="/news" style={styles.activeNav}>News</a>
          <a href="/league" style={styles.navLink}>League</a>
          <a href="/fixtures" style={styles.navLink}>Fixtures</a>
          <a href="/squad" style={styles.navLink}>Squad</a>
          <a href="/stats" style={styles.navLink}>Stats</a>
          <a href="/dashboard" style={styles.loginButton}>Player Portal</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <p style={styles.eyebrow}>CLUB NEWS · 9 OCTOBER 2026</p>
        <h1 style={styles.title}>
          Bristol City Progress in London Cup Following Walkover
        </h1>
        <p style={styles.intro}>City progress to the next round of the London Sunday Junior Shield following an awarded walkover.</p>
      </section>

      <article style={styles.article}>
        <img src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg" alt="BCFC London club crest" style={{width: "220px", maxWidth: "100%", display: "block", margin: "0 auto 35px", objectFit: "contain"}} />
        <p style={styles.lead}>Bristol City London Supporters FC have progressed to the next round of the London Sunday Junior Shield after Sunday’s opponents, Highams Park Rangers First, were forced to withdraw from the fixture.</p>
        <p style={styles.text}>The visitors were unable to fulfil the tie due to a scheduling clash with their Essex Cup commitments, meaning City have been awarded a walkover.</p>
        <p style={styles.text}>It’s a disappointing way for the fixture to be decided, with the lads looking forward to testing themselves against unfamiliar opposition in our first-ever London Cup campaign.</p>
        <p style={styles.text}>However, there is a small piece of club history to celebrate. The result means Bristol City have technically won their first-ever London Cup fixture — without kicking a ball!</p>
        <p style={styles.text}>While we’d much rather have earned our place in the next round on the pitch, we’ll certainly take the progression and look forward to discovering our next opponents.</p>
        <p style={styles.text}>Up the City! 🔴⚪</p>
        <a href="/fixtures/7" style={styles.backLink}>VIEW WALKOVER DETAILS →</a>
        <br />
        <a href="/news" style={styles.backLink}>← BACK TO NEWS</a>
      </article>

      <footer style={styles.footer}>
        <div>
          <strong>Bristol City London Supporters FC</strong>
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
          header nav {
            display: grid !important;
            grid-template-columns: auto auto auto auto !important;
            width: 100% !important;
            justify-content: space-between !important;
            column-gap: 0 !important;
            row-gap: 22px !important;
            align-items: center !important;
          }

          header nav a:nth-child(5) {
            grid-column: 1;
          }

          header nav a:nth-child(6) {
            grid-column: 2;
          }

          header nav a:nth-child(7) {
            grid-column: 3 / 5;
            justify-self: start;
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
    color: "#111",
    background: "#fff",
  },

  header: {
    background: "#fff",
    padding: "22px 6%",
    display: "flex",
    justifyContent: "space-between",
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
  },

  navLink: {
    textDecoration: "none",
    color: "#111",
    fontSize: "14px",
    fontWeight: "700",
  },

  activeNav: {
    textDecoration: "none",
    color: "#e31b23",
    fontSize: "14px",
    fontWeight: "900",
  },

  loginButton: {
    background: "#e31b23",
    color: "white",
    padding: "12px 18px",
    borderRadius: "6px",
    fontWeight: "800",
    textDecoration: "none",
  },

  hero: {
    background: "#111",
    color: "#fff",
    padding: "75px 6%",
  },

  eyebrow: {
    color: "#e31b23",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "3px",
  },

  title: {
    maxWidth: "950px",
    fontSize: "clamp(40px, 6vw, 76px)",
    lineHeight: "1.03",
    margin: "15px 0 20px",
    fontWeight: "900",
  },

  intro: {
    maxWidth: "750px",
    color: "#ccc",
    fontSize: "19px",
    lineHeight: "1.6",
  },

  cupLogos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "35px",
    background: "#f4f4f4",
    borderRadius: "12px",
    padding: "35px 25px",
    marginBottom: "45px",
  },

  cupLogoBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    textAlign: "center",
  },

  cupLogo: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
  },

  cupLogoLabel: {
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "1.5px",
  },

  cupLogoDivider: {
    width: "1px",
    height: "150px",
    background: "#ccc",
  },

  article: {
    width: "88%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "60px 0 80px",
  },

  lead: {
    fontSize: "21px",
    fontWeight: "700",
    lineHeight: "1.7",
  },

  text: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#444",
  },

  drawCard: {
    background: "#111",
    color: "#fff",
    textAlign: "center",
    padding: "30px 20px",
    borderRadius: "10px",
    margin: "35px 0",
  },

  drawLabel: {
    color: "#e31b23",
    fontWeight: "900",
    fontSize: "11px",
    letterSpacing: "2px",
    marginBottom: "20px",
  },

  fixture: {
    fontSize: "23px",
    fontWeight: "900",
  },

  vs: {
    color: "#e31b23",
    fontWeight: "900",
    margin: "10px 0",
  },

  details: {
    borderTop: "1px solid #444",
    color: "#ccc",
    marginTop: "20px",
    paddingTop: "18px",
    fontSize: "13px",
    fontWeight: "700",
  },

  teaser: {
    background: "#f4f4f4",
    borderLeft: "5px solid #e31b23",
    padding: "28px",
    margin: "40px 0",
  },

  teaserLabel: {
    color: "#e31b23",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  teaserText: {
    fontSize: "17px",
    lineHeight: "1.7",
  },

  teaserClosing: {
    fontSize: "17px",
    fontWeight: "900",
    marginBottom: 0,
  },

  backLink: {
    color: "#e31b23",
    textDecoration: "none",
    fontWeight: "900",
    fontSize: "13px",
  },

  footer: {
    background: "#111",
    color: "#fff",
    padding: "35px 6%",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "30px",
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

