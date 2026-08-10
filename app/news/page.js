import Script from "next/script";
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
  <p style={styles.redLabel}>MATCH REPORT</p>

  <article className="featured-card" style={styles.featuredCard}>
    <div style={styles.storyContent}>
      <div style={styles.storyMeta}>
        <span style={styles.category}>PRE-SEASON FRIENDLY</span>
        <span>9 August 2026</span>
      </div>

      <h2 style={styles.storyTitle}>
        Aberdeen 0–3 Bristol City
      </h2>

      <p style={styles.storyLead}>
        City made the perfect start to pre-season with a convincing
        victory in scorching conditions at Raynes Park.
      </p>

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
    </div>

    <div style={styles.storySide}>
      <div
        style={{
          background: "#111",
          color: "white",
          borderRadius: "12px",
          padding: "35px 25px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#df1e2f",
            fontSize: "11px",
            fontWeight: "900",
            letterSpacing: "2px",
            marginBottom: "18px",
          }}
        >
          FULL TIME
        </div>

        <div style={{ fontSize: "22px", fontWeight: "900" }}>
          Aberdeen
        </div>

        <div
          style={{
            fontSize: "52px",
            fontWeight: "900",
            margin: "12px 0",
          }}
        >
          0 – 3
        </div>

        <div style={{ fontSize: "22px", fontWeight: "900" }}>
          Bristol City
        </div>
      </div>

      <div style={styles.quoteBox}>
        <span style={styles.quoteMark}>⚽</span>

        <p style={styles.quoteText}>
          Bellamy
          <br />
          Hayes
          <br />
          Nathaniel
        </p>
      </div>

     <div style={{ marginTop: "10px" }}>
<img
  src="/IMG_5497.jpeg"
  alt="Bristol City London Supporters FC team after the Aberdeen match"
  style={{
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "10px",
  }}
/>
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
        href="/news"
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

  copyright: {
    color: "#999",
    textAlign: "right",
    fontSize: "13px",
  },
};
