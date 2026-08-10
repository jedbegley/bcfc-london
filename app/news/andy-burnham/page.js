"use client";

import { useEffect } from "react";

export default function AndyBurnhamStory() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
          BCFC London call on former City striker Andy Burnham for kit help
        </h1>

        <p style={styles.date}>5 August 2026</p>

        <p style={styles.lead}>
          Our slightly ambitious search for a new kit sponsor has made the
          Bristol headlines.
        </p>
      </section>

      <article style={styles.article}>
        <p>
          Bristol City London Supporters FC&apos;s search for help with a new
          kit took an unexpected turn when we decided to call on one of the
          club&apos;s most high-profile former players.
        </p>

        <p>
          With the team preparing for the new season, we put out a slightly
          ambitious appeal to Andy Burnham to see whether he could help us
          with our search for a new kit.
        </p>

        <p>
          Burnham has previously pulled on the red shirt for the London
          Supporters side, so we thought it was worth asking an old player
          for a favour.
        </p>

        <div style={styles.tweetWrap}>
          <blockquote className="twitter-tweet">
            <a href="https://x.com/bcfc_fans_fc/status/2084898845209633273">
              View our post on X
            </a>
          </blockquote>
        </div>

        <p>
          The appeal soon attracted attention beyond the supporters&apos;
          football world, with Bristol Live picking up the story.
        </p>

        <div style={styles.pressBox}>
          <div style={styles.pressLabel}>IN THE PRESS</div>

          <h2 style={styles.pressTitle}>
            Bristol Live picks up BCFC London&apos;s Andy Burnham appeal
          </h2>

          <p style={styles.pressText}>
            Read the Bristol Live story about the London Supporters&apos;
            search for help with the new kit.
          </p>

          <a
            href="https://www.bristolpost.co.uk/news/bristol-news/bristol-city-supporters-team-ask-11094119"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.pressButton}
          >
            Read the Bristol Live story →
          </a>
        </div>

        <p>
          Whether our former striker can come through with the goods remains
          to be seen, but it&apos;s already given BCFC London a bit more
          attention than we were expecting.
        </p>

        <a href="/news" style={styles.backButton}>
          ← Back to News
        </a>
      </article>

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
    maxWidth: "950px",
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

  tweetWrap: {
    margin: "35px 0",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    overflow: "hidden",
  },

  pressBox: {
    background: "#f4f4f4",
    borderRadius: "12px",
    padding: "28px",
    margin: "35px 0",
    boxSizing: "border-box",
  },

  pressLabel: {
    color: "#df1e2f",
    fontWeight: "900",
    fontSize: "12px",
    letterSpacing: "1px",
  },

  pressTitle: {
    margin: "8px 0 10px",
    fontSize: "24px",
    lineHeight: "1.2",
  },

  pressText: {
    margin: "0 0 20px",
  },

  pressButton: {
    display: "inline-block",
    background: "#df1e2f",
    color: "white",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    fontWeight: "900",
    fontSize: "13px",
  },

  backButton: {
    display: "inline-block",
    marginTop: "25px",
    background: "#151515",
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
