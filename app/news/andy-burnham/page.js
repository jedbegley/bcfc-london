export default function AndyBurnhamStory() {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <a href="/" style={styles.brand}>
          BCFC LONDON
        </a>

        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/fixtures" style={styles.navLink}>Fixtures</a>
          <a href="/news" style={styles.navLink}>News</a>
          <a href="/player-login" style={styles.navLink}>Player Portal</a>
        </nav>
      </header>

      <section style={styles.hero}>
        <div style={styles.tag}>CLUB NEWS</div>

        <h1 style={styles.title}>
          City legend Andy Burnham answers the call
        </h1>

        <p style={styles.date}>Bristol City London Supporters FC</p>

        <p style={styles.lead}>
          Our search for support with a new kit took an unexpected turn when
          we called on one of the club&apos;s most high-profile former players.
        </p>
      </section>

      <section style={styles.article}>
        <p>
          Bristol City London Supporters FC have been looking for support as
          we prepare for the new season, including helping the team secure a
          new kit.
        </p>

        <p>
          As part of the search, we decided to aim high and reach out to
          Bristol City fan and former Ashton Gate regular Andy Burnham.
        </p>

        <p>
          The Mayor of Greater Manchester responded to the club&apos;s request,
          giving our search for sponsorship an unexpected boost and helping
          spread the word about the team.
        </p>

        <p>
          The London Supporters team brings together City fans living in and
          around the capital, representing the club in supporters&apos; football
          while building a community for Bristol City fans away from home.
        </p>

        <p>
          With preparations for the new season continuing, the search for
          support goes on — although getting a response from Andy Burnham
          certainly wasn&apos;t a bad place to start.
        </p>

        <a href="/news" style={styles.backButton}>
          ← Back to News
        </a>
      </section>

      <footer style={styles.footer}>
        <div>
          <strong>BCFC London Supporters FC</strong>
          <p style={styles.footerText}>
            Bristol City fans. London based. Representing the Robins.
          </p>
        </div>
      </footer>
    </main>
  );
}

const styles = {
  page: {
    margin: 0,
    fontFamily: "Arial, sans-serif",
    background: "#fff",
    color: "#171717",
    minHeight: "100vh",
  },

  header: {
    background: "#151515",
    color: "white",
    padding: "22px 6%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "18px",
  },

  brand: {
    color: "white",
    textDecoration: "none",
    fontWeight: "900",
    fontSize: "20px",
  },

  nav: {
    display: "flex",
    gap: "18px",
    flexWrap: "wrap",
  },

  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
  },

  hero: {
    background: "#151515",
    color: "white",
    padding: "65px 6%",
  },

  tag: {
    display: "inline-block",
    background: "#df1e2f",
    padding: "8px 12px",
    borderRadius: "5px",
    fontWeight: "900",
    fontSize: "12px",
    letterSpacing: "1px",
    marginBottom: "22px",
  },

  title: {
    fontSize: "clamp(36px, 6vw, 72px)",
    lineHeight: "1",
    maxWidth: "900px",
    margin: "0 0 18px",
    fontWeight: "900",
  },

  date: {
    color: "#aaa",
    fontWeight: "700",
    marginBottom: "30px",
  },

  lead: {
    fontSize: "20px",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: 0,
  },

  article: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "50px 6%",
    fontSize: "17px",
    lineHeight: "1.8",
  },

  backButton: {
    display: "inline-block",
    marginTop: "25px",
    background: "#df1e2f",
    color: "white",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    fontWeight: "900",
    fontSize: "13px",
  },

  footer: {
    background: "#111",
    color: "white",
    padding: "35px 6%",
  },

  footerText: {
    color: "#aaa",
    margin: "7px 0 0",
    fontSize: "13px",
  },
};
