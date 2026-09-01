import Script from "next/script";

const featuredNews = {
  label: "MATCH PREVIEW",
  category: "LEAGUE",
  date: "13 September 2026",
  title: "City Begin League Eight Campaign Against Barnes Stormers",
  matchDate: "Sunday 13 September 2026",
  fixture: "Barnes Stormers FC (H)",
  venue: "Clapham Common",
  kickOff: "10:30am",
  summary:
    "City open the 2026/27 league season at home to familiar opponents Barnes Stormers FC, looking for a first victory over the side after two meetings last season.",
  image: "/IMG_5497.jpeg",
  imageAlt: "Bristol City London Supporters FC squad",
  imageCaption:
    "Bristol City London Supporters FC ahead of the 2026/27 league campaign.",
  link: "/news/barnes-stormers-preview",
};
export default function News() {
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
          <a href="/news" style={styles.activeNav}>News</a>
          <a href="/fixtures" style={styles.navLink}>Fixtures</a>
          <a href="/squad" style={styles.navLink}>Squad</a>
          <a href="/stats" style={styles.navLink}>Stats</a>
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

<article className="featured-card" style={styles.featuredCard}>
  <div style={styles.storyContent}>
    <div style={styles.storyMeta}>
      <span style={styles.category}>{featuredNews.category}</span>
      <span>{featuredNews.date}</span>
    </div>

    <h2 style={styles.storyTitle}>
  {featuredNews.title}
</h2>

     {/* MATCH DETAILS */}
<div style={styles.previewDetails}>
  <div style={styles.previewDetail}>
    <span style={styles.previewLabel}>DATE</span>
    <strong>{featuredNews.matchDate}</strong>
  </div>

  <div style={styles.previewDetail}>
    <span style={styles.previewLabel}>FIXTURE</span>
    <strong>{featuredNews.fixture}</strong>
  </div>

  <div style={styles.previewDetail}>
    <span style={styles.previewLabel}>VENUE</span>
    <strong>{featuredNews.venue}</strong>
  </div>

  <div style={styles.previewDetail}>
    <span style={styles.previewLabel}>KICK OFF</span>
    <strong>{featuredNews.kickOff}</strong>
  </div>
</div>
   <p style={styles.storyLead}>
  {featuredNews.summary}
</p>
         <div style={{ margin: "28px 0" }}>
  <img
   src={featuredNews.image}
   alt={featuredNews.imageAlt}
    style={{
      width: "100%",
      height: "auto",
      display: "block",
      borderRadius: "10px",
    }}
  />

  <p
    style={{
      margin: "8px 0 0",
      color: "#777",
      fontSize: "12px",
      fontStyle: "italic",
    }}
  >
   {featuredNews.imageCaption}
  </p>
</div>
     <p style={styles.storyText}>
  Barnes will be a familiar opponent for City, with the sides meeting twice
  during last season&apos;s League Nine campaign. City were unable to get the
  better of the Stormers on either occasion, taking just one point from the
  two games.
</p>

<p style={styles.storyText}>
  The first meeting at Clapham Common ended in a 2–2 draw before Barnes took
  all three points in the return fixture with a 2–1 victory later in the
  season.
</p>

<p style={styles.storyText}>
  Despite those results, it was City who ultimately finished higher in the
  table, ending the campaign one place above Barnes.
</p>

<p style={styles.storyText}>
  A summer restructuring of the Southern Sunday Football League means the
  two sides will meet again this season, with both competing in League Eight.
</p>

<p style={styles.storyText}>
  City head into the opener unbeaten in pre-season following a 3–0 victory
  over Aberdeen and a 2–2 draw against Shepherd&apos;s Tuesday.
</p>

<a
 href={featuredNews.link}
  style={{
    display: "inline-block",
    marginTop: "12px",
    padding: "12px 18px",
    background: "#e31b23",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "900",
    borderRadius: "4px",
  }}
>
  READ MATCH PREVIEW
</a>
</div>

{/* RIGHT-HAND MATCH CARD */}
<div style={styles.storySide}>
  <div style={styles.previewMatchCard}>
    <div style={styles.previewMatchLabel}>NEXT MATCH</div>

    <div style={styles.previewTeam}>
      Bristol City
    </div>

    <div style={styles.previewVs}>VS</div>

    <div style={styles.previewTeam}>
      Barnes Stormers FC
    </div>

    <div style={styles.previewMatchInfo}>
      <strong>Sunday 13 September</strong>
      <span>10:30 Kick Off</span>
      <span>Clapham Common</span>
      <span>League Eight</span>
    </div>
  </div>
</div>
  </article>
</section>

    {/* MORE NEWS */}
<section style={styles.moreNews}>
  <div style={styles.content}>
    <p style={styles.redLabel}>MORE FROM BCFC LONDON</p>
    <h2 style={styles.sectionTitle}>More News</h2>

  <div style={styles.emptyNews}>
  <div style={styles.storyMeta}>
    <span style={styles.category}>MATCH REPORT</span>
    <span>16 August 2026</span>
  </div>

  <h3 style={styles.emptyTitle}>
    Shepherd&apos;s Tuesday 2–2 Bristol City
  </h3>

  <p style={styles.emptyText}>
    City rounded off an unbeaten pre-season with a 2–2 draw at Burgess Park.
  </p>

  <a
    href="/news/shepherds-tuesday-2-2-bristol-city"
    style={{
      display: "inline-block",
      marginTop: "20px",
      background: "#df1e2f",
      color: "white",
      textDecoration: "none",
      padding: "12px 18px",
      borderRadius: "6px",
      fontWeight: "900",
      fontSize: "13px",
    }}
  >
    Read Match Report →
  </a>
</div>
  <div style={styles.emptyNews}>
  <div style={styles.storyMeta}>
    <span style={styles.category}>MATCH REPORT</span>
    <span>9 August 2026</span>
  </div>

  <h3 style={styles.emptyTitle}>
    Aberdeen 0–3 Bristol City
  </h3>

  <p style={styles.emptyText}>
    City made the perfect start to pre-season with a convincing 3–0 victory
    at Raynes Park.
  </p>

  <a
    href="/news/aberdeen-0-3-bristol-city"
    style={{
      display: "inline-block",
      marginTop: "20px",
      background: "#df1e2f",
      color: "white",
      textDecoration: "none",
      padding: "12px 18px",
      borderRadius: "6px",
      fontWeight: "900",
      fontSize: "13px",
    }}
  >
    Read Match Report →
  </a>
</div>  
  
  <div style={styles.emptyNews}>
      <div style={styles.storyMeta}>
        <span style={styles.category}>CLUB NEWS</span>
        <span>August 2026</span>
      </div>

      <h3 style={styles.emptyTitle}>
        BCFC London call on former player Andy Burnham for a little help
      </h3>

      <p style={styles.emptyText}>
        Our search for support with a new kit took an unexpected turn when
        we called on one of the club&apos;s most high-profile former players.
      </p>

      <a
        href="/news/andy-burnham"
        style={{
          display: "inline-block",
          marginTop: "20px",
          background: "#df1e2f",
          color: "white",
          textDecoration: "none",
          padding: "12px 18px",
          borderRadius: "6px",
          fontWeight: "900",
          fontSize: "13px",
        }}
      >
        Read Story →
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
    .featured-card {
      display: block !important;
      padding: 24px !important;
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
