import Image from "next/image";

export const metadata = {
  metadataBase: new URL("https://www.bcfclondon.co.uk"),
  "title": "The Bill Has Been Passed! Scott Murray Delivers for BCFC London",
  "description": "BCFC London receive a brand-new Bristol City kit thanks to Downing Street and club legend Scott Murray, with a special friendly also in the works.",
  "alternates": {
    "canonical": "/news/scott-murray-new-kit"
  },
  "openGraph": {
    "title": "The Bill Has Been Passed! Scott Murray Delivers for BCFC London",
    "description": "A letter to Andy Burnham, Bristol Live coverage and a helping hand from Downing Street brought a new kit from Scott Murray — with a friendly on the horizon.",
    "url": "https://www.bcfclondon.co.uk/news/scott-murray-new-kit",
    "siteName": "BCFC London",
    "type": "article",
    "publishedTime": "2026-10-10",
    "images": [
      {
        "url": "https://www.bcfclondon.co.uk/news/downing-street-number-10-shirts.jpg",
        "width": 1200,
        "height": 1600,
        "alt": "Black and yellow Bristol City goalkeeper shirt beside the red number 10 shirt"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "The Bill Has Been Passed! Scott Murray Delivers for BCFC London",
    "description": "A letter to Andy Burnham, Bristol Live coverage and a helping hand from Downing Street brought a new kit from Scott Murray — with a friendly on the horizon.",
    "images": [
      "https://www.bcfclondon.co.uk/news/downing-street-number-10-shirts.jpg"
    ]
  }
};

export default function Number10KitStory() {
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
        <p style={styles.eyebrow}>CLUB NEWS · SATURDAY 10 OCTOBER 2026</p>
        <h1 style={styles.title}>
          The Bill Has Been Passed! Scott Murray Delivers for BCFC London
        </h1>
        <p style={styles.intro}>From Downing Street to the Bristol City dressing room, a little help has gone a long way for BCFC London’s new kit.</p>
      </section>

      <article style={styles.article}>
        <Image src="/news/downing-street-number-10-shirts.jpg" alt="Black and yellow Bristol City goalkeeper shirt beside the red number 10 shirt" width={1200} height={1600} sizes="(max-width: 768px) 88vw, 600px" priority style={{ width: "100%", maxWidth: "600px", height: "auto", display: "block", margin: "0 auto 36px", borderRadius: "12px" }} />
        <p style={styles.lead}>Bristol City London Supporters FC are delighted to have received a brand-new playing kit, courtesy of Bristol City legend Scott Murray, with a helping hand from Downing Street.</p>
        <p style={styles.text}>What started with <a href="/news/andy-burnham" style={{ color: "#e31b23", fontWeight: "700" }}>our original letter</a> to former Bristol City player Andy Burnham has turned into something truly special for our London-based supporters’ football club.</p>
        <p style={styles.text}>Following our original letter and the subsequent coverage in Bristol Live, Downing Street got in touch with the club and helped coordinate a fantastic gesture with Bristol City legend and current kitman Scott Murray.</p>
        <p style={styles.text}>Today, following Bristol City’s away fixture against Charlton Athletic, BCFC London captain Alfie met with Scotty to collect a brand-new set of playing kit for the team.</p>
        <p style={styles.text}>The generous donation includes a full set of Bristol City shirts, shorts and socks, a goalkeeper strip and footballs, giving the team a brilliant new look for the remainder of the season.</p>
        <figure style={{ margin: "32px 0", textAlign: "center" }}>
          <Image src="/news/downing-street-kit-and-footballs.jpg" alt="Donated Bristol City shirts, goalkeeper kit, shorts, socks and two footballs on a wooden table" width={1200} height={1600} sizes="(max-width: 768px) 88vw, 600px" style={{ width: "100%", maxWidth: "600px", height: "auto", borderRadius: "12px", display: "block", margin: "0 auto" }} />
          <figcaption style={{ fontSize: "14px", lineHeight: "1.6", color: "#666", marginTop: "12px" }}>The new Bristol City playing kit and footballs kindly arranged through Downing Street and Scott Murray.</figcaption>
        </figure>
        <p style={styles.text}>And in a fitting nod to where this whole story began, we’ve even got a number 10 shirt — a little tribute to Number 10 Downing Street!</p>
        <p style={styles.text}>As a club made up of Bristol City supporters living in and around London, we’re absolutely delighted with the gesture. Support like this means a huge amount to a grassroots football club like ours.</p>
        <p style={styles.text}>A massive thank you to everyone at Downing Street who helped make this happen, and especially to Scotty Murray for helping arrange the kit and taking the time to hand it over to our captain Alfie.</p>
        <p style={styles.text}>We can’t wait to wear the new kit for the first time next Sunday, 18 October, when we return to competitive action.</p>
        <p style={styles.text}>And there’s more to come…</p>
        <p style={styles.text}>Following our correspondence with Downing Street, plans are also progressing for a friendly between BCFC London and a Downing Street team.</p>
        <p style={styles.text}>We’re hugely excited about the prospect and look forward to sharing further details once arrangements have been confirmed.</p>
        <p style={styles.text}>From a simple letter to a brand-new kit and a potential friendly against Downing Street, it’s been quite a journey for our little supporters’ club!</p>
        <p style={styles.text}>Up the City! 🔴⚪</p>
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

