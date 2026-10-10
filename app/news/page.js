import Image from "next/image";
import { getNewsArticles } from "./articles";

export const dynamic = "force-dynamic";

export default async function News() {
  const [featuredNews, ...moreNews] = await getNewsArticles();
  return (
    <main style={styles.page}>
      {/* HEADER */}
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
        <p style={styles.eyebrow}>FROM THE CLUB</p>
        <h1 style={styles.title}>Latest News</h1>
        <p style={styles.intro}>
          Match reports, club announcements and everything happening
          around Bristol City London Supporters FC.
        </p>
      </section>

      {/* FEATURED STORY */}
      <section style={styles.content}>
        <p style={styles.redLabel}>{featuredNews.label}</p>
        <article className="featured-card" style={{ ...styles.featuredCard, gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 0.8fr)", alignItems: "center" }}>
          <div style={styles.storyContent}>
            <div style={styles.storyMeta}>
              <span style={styles.category}>{featuredNews.category}</span>
              <span>{featuredNews.displayDate}</span>
            </div>
            <h2 style={styles.storyTitle}>{featuredNews.title}</h2>
            <p style={styles.storyLead}>{featuredNews.summary}</p>
            <a href={featuredNews.link} style={{ ...styles.primaryButton, display: "inline-block", marginTop: "8px" }}>READ FULL STORY →</a>
          </div>
          <div className="featured-image-wrap" style={{ position: "relative", height: "430px", background: "#151515", borderRadius: "10px", overflow: "hidden" }}>
            {featuredNews.image ? (
              featuredNews.imagePlayerId ? (
                <Image src={featuredNews.image} alt={featuredNews.imageAlt}
                  fill sizes="(max-width: 768px) 88vw, 40vw"
                  style={{ objectFit: "cover", objectPosition: "center 22%" }} />
              ) : (
                <img src={featuredNews.image} alt={featuredNews.imageAlt}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              )
            ) : (
              <img src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg"
                alt="BCFC London badge" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            )}
          </div>
        </article>
      </section>

      {/* MORE NEWS */}
      <section style={styles.moreNews}>
        <div style={styles.content}>
          <p style={styles.redLabel}>MORE FROM BCFC LONDON</p>
          <h2 style={styles.sectionTitle}>More News</h2>
          {moreNews.map((article) => (
            <article key={article.link} style={styles.emptyNews}>
              {article.thumbnail && article.image && (
                <a href={article.link} aria-label={`Read ${article.title}`}>
                  <Image src={article.image} alt={article.imageAlt} width={1200} height={1600}
                    sizes="(max-width: 768px) 70vw, 280px"
                    style={{ width: "100%", maxWidth: "280px", height: "auto", borderRadius: "8px", display: "block", margin: "0 auto 24px" }} />
                </a>
              )}
              <div style={{ ...styles.storyMeta, justifyContent: "center" }}>
                <span style={styles.category}>{article.category}</span>
                <span>{article.displayDate}</span>
              </div>
              <h3 style={styles.emptyTitle}>{article.title}</h3>
              <p style={styles.emptyText}>{article.summary}</p>
              <a href={article.link} style={{ ...styles.primaryButton, display: "inline-block", marginTop: "20px" }}>
                {article.button}
              </a>
            </article>
          ))}
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
    .featured-card {
      display: block !important;
      padding: 24px !important;
    }
    .featured-image-wrap {
      height: min(420px, 105vw) !important;
      margin-top: 24px;
    }

    .record-box {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 18px 12px !important;
      text-align: center !important;
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
  background: "#ffffff",
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

  content: {
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
    margin: "0 0 18px",
  },

  featuredCard: {
    display: "grid",
    gridTemplateColumns: "1fr",
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

  storyTitle: {
    fontSize: "clamp(32px, 4vw, 54px)",
    lineHeight: "1.05",
    margin: "0 0 25px",
    fontWeight: "900",
  },

  storyLead: {
    fontSize: "20px",
    lineHeight: "1.6",
    fontWeight: "700",
    color: "#333",
  },

  storyText: {
    fontSize: "16px",
    lineHeight: "1.75",
    color: "#555",
  },

  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  primaryButton: {
    background: "#df1e2f",
    color: "white",
    textDecoration: "none",
    padding: "14px 20px",
    borderRadius: "6px",
    fontWeight: "900",
    fontSize: "14px",
    alignSelf: "flex-start",
  },

 xEmbed: {
  marginTop: "30px",
  maxWidth: "550px",
},

embedLabel: {
  color: "#df1e2f",
  fontSize: "11px",
  fontWeight: "900",
  letterSpacing: "2px",
  marginBottom: "12px",
},

  storySide: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "25px",
  },

  badge: {
    width: "260px",
    maxWidth: "100%",
    borderRadius: "50%",
    display: "block",
    margin: "0 auto",
  },

  quoteBox: {
    background: "#111",
    color: "white",
    padding: "28px",
    borderRadius: "10px",
  },

  quoteMark: {
    color: "#df1e2f",
    fontSize: "50px",
    fontWeight: "900",
    lineHeight: "0.7",
  },

  quoteText: {
    fontSize: "17px",
    lineHeight: "1.6",
    margin: "10px 0 0",
    fontWeight: "700",
  },

  moreNews: {
    background: "#f4f4f4",
  },

  sectionTitle: {
    fontSize: "36px",
    margin: 0,
    fontWeight: "900",
  },

  emptyNews: {
    marginTop: "30px",
    background: "white",
    padding: "50px",
    textAlign: "center",
    borderRadius: "10px",
    border: "1px solid #e5e5e5",
  },

  emptyIcon: {
    fontSize: "35px",
  },

  emptyTitle: {
    fontSize: "24px",
    margin: "15px 0 7px",
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

  previewDetails: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "12px",
  margin: "25px 0 32px",
},

previewDetail: {
  background: "#f4f4f4",
  borderTop: "4px solid #df1e2f",
  borderRadius: "7px",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  fontSize: "13px",
},

previewLabel: {
  color: "#df1e2f",
  fontSize: "10px",
  fontWeight: "900",
  letterSpacing: "2px",
},

articleHeading: {
  fontSize: "22px",
  fontWeight: "900",
  margin: "35px 0 10px",
},

recordBox: {
  background: "#111",
  color: "white",
  padding: "20px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-around",
  gap: "15px",
  flexWrap: "wrap",
  margin: "25px 0",
  fontSize: "13px",
  fontWeight: "800",
},

squadBox: {
  background: "#f4f4f4",
  borderRadius: "10px",
  padding: "25px",
  margin: "25px 0",
},

squadLabel: {
  color: "#df1e2f",
  fontSize: "11px",
  fontWeight: "900",
  letterSpacing: "2px",
  marginBottom: "12px",
},

squadNames: {
  fontSize: "15px",
  lineHeight: "1.8",
  fontWeight: "700",
  margin: 0,
},

squadExtra: {
  color: "#777",
  fontSize: "13px",
  margin: "10px 0 0",
},

actionButtons: {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "25px",
},

portalButton: {
  background: "#111",
  color: "white",
  textDecoration: "none",
  padding: "14px 20px",
  borderRadius: "6px",
  fontWeight: "900",
  fontSize: "13px",
},

payButton: {
  background: "#df1e2f",
  color: "white",
  textDecoration: "none",
  padding: "14px 20px",
  borderRadius: "6px",
  fontWeight: "900",
  fontSize: "13px",
},

previewClosing: {
  marginTop: "35px",
  fontSize: "18px",
  lineHeight: "1.7",
},

previewMatchCard: {
  background: "#111",
  color: "white",
  borderRadius: "12px",
  padding: "35px 25px",
  textAlign: "center",
},

previewMatchLabel: {
  color: "#df1e2f",
  fontSize: "11px",
  fontWeight: "900",
  letterSpacing: "2px",
  marginBottom: "25px",
},

previewTeam: {
  fontSize: "23px",
  fontWeight: "900",
},

previewVs: {
  color: "#df1e2f",
  fontSize: "16px",
  fontWeight: "900",
  margin: "15px 0",
},

previewMatchInfo: {
  borderTop: "1px solid #444",
  marginTop: "25px",
  paddingTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "7px",
  fontSize: "13px",
  color: "#ccc",
},

formBox: {
  background: "#df1e2f",
  color: "white",
  borderRadius: "10px",
  padding: "28px",
  textAlign: "center",
},

formLabel: {
  fontSize: "10px",
  fontWeight: "900",
  letterSpacing: "2px",
  opacity: 0.8,
},

formRecord: {
  fontSize: "34px",
  fontWeight: "900",
  margin: "8px 0",
},

formText: {
  fontSize: "13px",
  fontWeight: "700",
},
  copyright: {
    color: "#999",
    textAlign: "right",
    fontSize: "13px",
  },
};
