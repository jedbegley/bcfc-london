export default function AberdeenReport() {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.clubName}>BRISTOL CITY</div>
          <div style={styles.clubSub}>LONDON SUPPORTERS FC</div>
        </div>

        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/news" style={styles.activeNav}>News</a>
          <a href="/fixtures" style={styles.navLink}>Fixtures</a>
          <a href="/squad" style={styles.navLink}>Squad</a>
          <a href="/stats" style={styles.navLink}>Stats</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <p style={styles.eyebrow}>MATCH REPORT</p>
        <h1 style={styles.title}>Aberdeen 0–3 Bristol City</h1>
        <p style={styles.intro}>
          City made the perfect start to pre-season with a convincing
          victory in scorching conditions at Raynes Park.
        </p>
      </section>

      <section style={styles.content}>
        <article className="report-card" style={styles.reportCard}>
          <div>
            <div style={styles.storyMeta}>
              <span style={styles.category}>PRE-SEASON FRIENDLY</span>
              <span>9 August 2026</span>
            </div>

            <img
              src="/IMG_5497.jpeg"
              alt="Bristol City London Supporters FC team after the Aberdeen match"
              style={styles.image}
            />

            <p style={styles.storyText}>
              Bristol City London Supporters FC kicked off pre-season with a
              3–0 win over Aberdeen at Prince George&apos;s Playing Fields in
              Raynes Park.
            </p>

            <p style={styles.storyText}>
              First-half goals from Bellamy, Hayes and Nathaniel did the damage,
              ensuring City came away with the victory from their first outing
              of the summer.
            </p>

            <p style={styles.storyText}>
              Conditions were far from easy, with temperatures soaring in
              south-west London — made even tougher by City taking to the field
              in the long-sleeved purple and lime kit.
            </p>

            <p style={styles.storyText}>
              Despite the heat, City managed the game well, kept a clean sheet
              and made an excellent start to preparations for the new season.
            </p>

            <p style={styles.storyText}>
              <strong>Starting XI:</strong> Freddie, Louis, Ben, Shapes, Joycey,
              Nikita, Ryan, Jack, Bellamy, Scoobs, Hayes.
            </p>

            <p style={styles.storyText}>
              <strong>Subs:</strong> Meddy, Lewis, Sam, Nathaniel, Yeremi and Jed.
            </p>

            <p style={styles.storyText}>
              There was also a welcome return to football for gaffer Jed, who
              made his first appearance in almost two years following an ACL
              injury.
            </p>

            <p style={styles.storyText}>
              A cracking start to pre-season for City.
            </p>

            <a href="/news" style={styles.backButton}>
              ← Back to News
            </a>
          </div>

          <aside style={styles.side}>
            <div style={styles.scoreCard}>
              <div style={styles.scoreLabel}>FULL TIME</div>

              <div style={styles.teamName}>Aberdeen</div>

              <div style={styles.score}>0 – 3</div>

              <div style={styles.teamName}>Bristol City</div>
            </div>

            <div style={styles.goalsBox}>
              <div style={styles.goalsLabel}>GOALSCORERS</div>
              <div>⚽ Bellamy</div>
              <div>⚽ Hayes</div>
              <div>⚽ Nathaniel</div>
            </div>
          </aside>
        </article>
      </section>

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
          .report-card {
            display: block !important;
            padding: 24px !important;
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
    fontSize: "clamp(42px, 7vw, 82px)",
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "65px 0",
  },

  reportCard: {
    display: "grid",
    gridTemplateColumns: "1.4fr 0.6fr",
    gap: "50px",
    padding: "45px",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.07)",
  },

  storyMeta: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    color: "#777",
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  category: {
    color: "#df1e2f",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  image: {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "10px",
    marginBottom: "25px",
  },

  storyText: {
    fontSize: "16px",
    lineHeight: "1.75",
    color: "#555",
  },

  side: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  scoreCard: {
    background: "#111",
    color: "white",
    borderRadius: "12px",
    padding: "35px 25px",
    textAlign: "center",
  },

  scoreLabel: {
    color: "#df1e2f",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "18px",
  },

  teamName: {
    fontSize: "22px",
    fontWeight: "900",
  },

  score: {
    fontSize: "52px",
    fontWeight: "900",
    margin: "12px 0",
  },

  goalsBox: {
    background: "#f4f4f4",
    borderRadius: "10px",
    padding: "25px",
    lineHeight: "1.9",
    fontWeight: "700",
  },

  goalsLabel: {
    color: "#df1e2f",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "10px",
  },

  backButton: {
    display: "inline-block",
    marginTop: "25px",
    background: "#111",
    color: "white",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    fontWeight: "900",
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
