export default function CupDraws2026() {
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
        <p style={styles.eyebrow}>CLUB NEWS · 15 SEPTEMBER 2026</p>
        <h1 style={styles.title}>City Handed Two Home Ties in Opening Cup Draws</h1>
        <p style={styles.intro}>
          Bristol City London Supporters FC have been handed home ties in the
          first two cup competitions of the 2026/27 season.
        </p>
      </section>

      <article style={styles.article}>
            <div style={styles.cupLogos}>
  <div style={styles.cupLogoBox}>
    <img
      src="/london-fa.png"
      alt="London FA"
      style={styles.cupLogo}
    />
    <span style={styles.cupLogoLabel}>LONDON FA</span>
  </div>

  <div style={styles.cupLogoDivider}></div>

  <div style={styles.cupLogoBox}>
    <img
      src="/southern-sunday-league.png"
      alt="Southern Sunday Football League"
      style={styles.cupLogo}
    />
    <span style={styles.cupLogoLabel}>
      SOUTHERN SUNDAY FOOTBALL LEAGUE
    </span>
  </div>
</div>
        <p style={styles.lead}>
          Bristol City London Supporters FC have been handed home ties in the
          first two cup competitions of the 2026/27 season.
        </p>

        <p style={styles.text}>
          City will make their return to the London Cup for the first time in
          several years, with the draw taking place at London FA headquarters.
        </p>

        <p style={styles.text}>
          We have been drawn at home against <strong>Higham Park Rangers</strong>,
          who compete in the Essex Sunday Corinthian League, with the tie
          scheduled for <strong>Sunday 11 October at 10:30am at Clapham Common</strong>.
        </p>

        <p style={styles.text}>
          It will be City&apos;s first appearance in the competition for a number
          of years and gives us the opportunity to test ourselves against
          opposition from outside the Southern Sunday Football League.
        </p>

        <div style={styles.drawCard}>
          <div style={styles.drawLabel}>LONDON CUP</div>
          <div style={styles.fixture}>BRISTOL CITY</div>
          <div style={styles.vs}>VS</div>
          <div style={styles.fixture}>HIGHAM PARK RANGERS</div>
          <div style={styles.details}>
            Sunday 11 October · 10:30am · Clapham Common
          </div>
        </div>

        <p style={styles.text}>
          The second cup draw of the season has also produced a home tie, with
          City set to face fellow <strong>League Eight</strong> side{" "}
          <strong>Sue&apos;s Angels</strong> in the{" "}
          <strong>Brian Howard&apos;s President Cup</strong>.
        </p>

        <p style={styles.text}>
          The competition features teams from Leagues Seven, Eight and Nine of
          the Southern Sunday Football League, and City have been handed a tough
          opening assignment.
        </p>

        <p style={styles.text}>
          Sue&apos;s Angels earned promotion last season after winning the
          division below and have made an impressive start to life in League
          Eight, winning both of their opening matches to sit top of the table.
        </p>

        <div style={styles.drawCard}>
          <div style={styles.drawLabel}>BRIAN HOWARD&apos;S PRESIDENT CUP</div>
          <div style={styles.fixture}>BRISTOL CITY</div>
          <div style={styles.vs}>VS</div>
          <div style={styles.fixture}>SUE&apos;S ANGELS</div>
          <div style={styles.details}>October · Date TBC</div>
        </div>

        <p style={styles.text}>
          The tie will take place in <strong>October</strong>, with the date and
          kick-off time to be confirmed.
        </p>

        <div style={styles.teaser}>
          <div style={styles.teaserLabel}>AND THERE&apos;S MORE...</div>
          <p style={styles.teaserText}>
            There is also more fixture news on the way, with City set to play a
            friendly against a <strong>team from Downing Street</strong> after
            the club&apos;s pleas for a new kit were heard in high places...
          </p>
          <p style={styles.teaserClosing}>
            More details on the fixture — and the new kit — coming soon. 👀
          </p>
        </div>

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
          <img src="/IMG_1146.jpeg" alt="DUZZ Sports" style={styles.sponsorLogo} />
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
