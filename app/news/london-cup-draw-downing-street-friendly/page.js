import Image from "next/image";

export const metadata = {
  "metadataBase": new URL("https://www.bcfclondon.co.uk"),
  "title": "London Cup Draw Confirmed as BCFC London Prepare for Downing Street Friendly",
  "description": "BCFC London face unbeaten League Five leaders Kew Antigua in the London Cup, with a special friendly against a Downing Street XI also confirmed.",
  "alternates": {
    "canonical": "https://www.bcfclondon.co.uk/news/london-cup-draw-downing-street-friendly"
  },
  "openGraph": {
    "title": "London Cup Draw Confirmed as BCFC London Prepare for Downing Street Friendly",
    "description": "BCFC London face unbeaten League Five leaders Kew Antigua in the London Cup, with a special friendly against a Downing Street XI also confirmed.",
    "url": "https://www.bcfclondon.co.uk/news/london-cup-draw-downing-street-friendly",
    "siteName": "BCFC London",
    "type": "article",
    "publishedTime": "2026-10-23",
    "locale": "en_GB",
    "images": [
      {
        "url": "https://www.bcfclondon.co.uk/news/clapham-common-action-social.jpg",
        "width": 1200,
        "height": 630,
        "alt": "BCFC London players in action on Clapham Common"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "London Cup Draw Confirmed as BCFC London Prepare for Downing Street Friendly",
    "description": "BCFC London face unbeaten League Five leaders Kew Antigua in the London Cup, with a special friendly against a Downing Street XI also confirmed.",
    "images": [
      "https://www.bcfclondon.co.uk/news/clapham-common-action-social.jpg"
    ]
  }
};

export default function LondonCupFriendlyStory() {
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
        <p style={styles.eyebrow}>CLUB NEWS · FRIDAY 23 OCTOBER 2026</p>
        <h1 style={styles.title}>
          London Cup Draw Confirmed as BCFC London Prepare for Downing Street Friendly
        </h1>

      </section>

      <article style={styles.article}>
        <Image src="/news/clapham-common-action.jpg" alt="BCFC London players in action on Clapham Common" width={1536} height={991} sizes="(max-width: 768px) 88vw, 800px" priority style={{ width: "100%", height: "auto", display: "block", margin: "0 auto 36px", borderRadius: "12px" }} />
        <p style={styles.lead}>BCFC London have two exciting fixtures on the horizon, with a London Cup second-round tie against Kew Antigua and a friendly against a Downing Street XI now confirmed.</p>
        <p style={styles.text}>There will be no match this weekend, with several teams across the league involved in cup competitions and an odd number of teams in the division resulting in a scheduled rest week.</p>
        <p style={styles.text}>The break gives the squad an opportunity to regroup following three consecutive defeats, with the team determined to return to winning ways when league action resumes next week, subject to fixture confirmation.</p>
        <h2 style={{ marginTop: "36px", fontSize: "26px", lineHeight: "1.3" }}>Tough London Cup Test Awaits</h2>
        <p style={styles.text}>The draw for the second round of the London Cup has handed BCFC London a home tie against Kew Antigua, who also compete in the Southern Sunday Football League.</p>
        <p style={styles.text}>Currently sitting top of League Five, three divisions above BCFC London, Kew Antigua have enjoyed an unbeaten start to their campaign, going six matches without defeat.</p>
        <p style={styles.text}>It promises to be a tough challenge, but one the squad will relish as they look to test themselves against higher-division opposition.</p>
        <p style={styles.text}>The tie will take place on Sunday 22 November, with a 10:30am kick-off at Clapham Common.</p>
        <h2 style={{ marginTop: "36px", fontSize: "26px", lineHeight: "1.3" }}>Downing Street Friendly Confirmed</h2>
        <p style={styles.text}>Meanwhile, the club is delighted to confirm that our much-anticipated friendly against a Downing Street XI will take place on Wednesday 18 November at Chiswick Sports Ground, kicking off at 7pm.</p>
        <p style={styles.text}>Following the fantastic support the club has received from Downing Street and Bristol City legend Scott Murray, including the <a href="/news/from-number-10-to-number-10" style={{ color: "#e31b23", fontWeight: "700" }}>recent donation of a brand-new playing kit</a>, the fixture promises to be a memorable occasion for everyone involved.</p>
        <p style={styles.text}>The lads are already looking forward to the evening, with some even hoping the Prime Minister might make an appearance on the pitch — although we suspect that may be a little optimistic!</p>
        <h2 style={{ marginTop: "36px", fontSize: "26px", lineHeight: "1.3" }}>Time to Regroup</h2>
        <p style={styles.text}>For now, BCFC London will enjoy a weekend off before returning to action next week, with details of the next fixture still to be confirmed.</p>
        <p style={styles.text}>After three consecutive defeats, the focus is firmly on putting things right and getting the season back on track.</p>
        <p style={styles.text}>Up the City! 🔴⚪</p>
        <a href="/news" style={styles.backLink}>← BACK TO NEWS</a>
      </article>


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

  backLink: {
    color: "#e31b23",
    textDecoration: "none",
    fontWeight: "900",
    fontSize: "13px",
  },

};
