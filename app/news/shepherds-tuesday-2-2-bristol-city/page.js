export default function ShepherdsTuesdayReport() {
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
        <h1 style={styles.title}>Shepherd&apos;s Tuesday 2–2 Bristol City</h1>
        <p style={styles.intro}>
          City rounded off an unbeaten pre-season with a frustrating draw at
          Burgess Park.
        </p>
      </section>

      <section style={styles.content}>
        <article className="report-card" style={styles.reportCard}>
          <div>
            <div style={styles.storyMeta}>
              <span style={styles.category}>PRE-SEASON FRIENDLY</span>
              <span>16 August 2026</span>
            </div>

            <img
              src="/IMG_5615.jpeg"
              alt="Bristol City London Supporters FC at Burgess Park"
              style={styles.image}
            />

            <p style={styles.storyText}>
              Bristol City London Supporters FC wrapped up pre-season with a
              2–2 draw against Shepherd&apos;s Tuesday at Burgess Park.
            </p>

            <p style={styles.storyText}>
              City took the lead when Brian&apos;s corner was turned into his
              own net by a Tuesday defender, before the hosts equalised late in
              the first half.
            </p>

            <div style={styles.videoWrap}>
              <video
                controls
                playsInline
                preload="metadata"
                style={styles.video}
              >
                <source
                  src="/0263fbb4-b4cd-44b8-bd41-66cc4fc4b1d9.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div style={styles.videoCaption}>
                Brian&apos;s corner is turned in for City&apos;s opener.
              </div>
            </div>

            <p style={styles.storyText}>
              Tuesday moved ahead early in the second period with a one-on-one
              finish, but City levelled when Louis&apos; free kick was turned
              home by the returning Nathan.
            </p>

            <p style={styles.storyText}>
              Both sides had chances to win it late on, with the Tuesday
              goalkeeper producing a couple of excellent saves, but neither
              side could find the breakthrough.
            </p>

            <p style={styles.storyText}>
              It was not City&apos;s best performance, but the result means we
              finish pre-season unbeaten and also preserve our unbeaten record
              against Shepherd&apos;s Tuesday.
            </p>

            <p style={styles.storyText}>
              Attention now turns to the Southern Sunday League Eight campaign,
              which begins on 6 September.
            </p>

            <div style={styles.playerInfoBox}>
              <div style={styles.playerInfoLabel}>PLAYER INFO</div>

              <p style={styles.playerInfoText}>
                Match subs, registration and availability can all be sorted
                below.
              </p>

              <div style={styles.buttons}>
                <a
                  href="https://pay.sumup.com/b2c/QEJQYWB5"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.payButton}
                >
                  PAY MATCH SUBS
                </a>

                <a href="/dashboard" style={styles.portalButton}>
                  PLAYER PORTAL
                </a>

                <a
  href="https://pay.sumup.com/b2c/Q9GDM34D"
  target="_blank"
  rel="noopener noreferrer"
  style={styles.registerButton}
>
  PAY REGISTRATION
</a>
              </div>
            </div>

            <a href="/news" style={styles.backButton}>
              ← Back to News
            </a>
          </div>

          <aside style={styles.side}>
            <div style={styles.scoreCard}>
              <div style={styles.scoreLabel}>FULL TIME</div>

              <div style={styles.teamName}>Shepherd&apos;s Tuesday</div>

              <div style={styles.score}>2 – 2</div>

              <div style={styles.teamName}>Bristol City</div>
            </div>

            <div style={styles.goalsBox}>
              <div style={styles.goalsLabel}>CITY GOALS</div>
              <div>⚽ Own Goal</div>
              <div style={styles.assist}>Brian corner</div>
              <div style={{ marginTop: "10px" }}>⚽ Nathan</div>
              <div style={styles.assist}>Louis assist</div>
            </div>

            <div style={styles.statusBox}>
              <div style={styles.statusLabel}>PRE-SEASON</div>
              <div style={styles.statusText}>UNBEATEN</div>
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

  videoWrap: {
    margin: "28px 0",
  },

  video: {
    width: "100%",
    display: "block",
    borderRadius: "10px",
    background: "#000",
  },

  videoCaption: {
    marginTop: "8px",
    color: "#777",
    fontSize: "12px",
    fontStyle: "italic",
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
    lineHeight: "1.7",
    fontWeight: "700",
  },

  goalsLabel: {
    color: "#df1e2f",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
    marginBottom: "10px",
  },

  assist: {
    color: "#777",
    fontSize: "12px",
    marginTop: "2px",
  },

  statusBox: {
    background: "#df1e2f",
    color: "white",
    borderRadius: "10px",
    padding: "28px",
    textAlign: "center",
  },

  statusLabel: {
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "2px",
    opacity: 0.8,
  },

  statusText: {
    fontSize: "28px",
    fontWeight: "900",
    marginTop: "6px",
  },

  playerInfoBox: {
    marginTop: "30px",
    background: "#f4f4f4",
    padding: "25px",
    borderRadius: "10px",
  },

  playerInfoLabel: {
    color: "#df1e2f",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  playerInfoText: {
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "18px",
  },

  buttons: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  payButton: {
    background: "#df1e2f",
    color: "white",
    textDecoration: "none",
    padding: "13px 18px",
    borderRadius: "6px",
    fontWeight: "900",
    fontSize: "13px",
  },

  portalButton: {
    background: "#111",
    color: "white",
    textDecoration: "none",
    padding: "13px 18px",
    borderRadius: "6px",
    fontWeight: "900",
    fontSize: "13px",
  },

  registerButton: {
    background: "white",
    color: "#111",
    border: "1px solid #ccc",
    textDecoration: "none",
    padding: "13px 18px",
    borderRadius: "6px",
    fontWeight: "900",
    fontSize: "13px",
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
