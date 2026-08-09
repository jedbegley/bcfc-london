"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    }

    checkUser();
  }, []);

  if (loading) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>Loading player portal...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main style={styles.page}>
        <div style={styles.card}>
          <div style={styles.label}>BCFC LONDON</div>
          <h1 style={styles.title}>Player Portal</h1>

          <p style={styles.text}>
            You need to be signed in to access the player dashboard.
          </p>

          <a href="/login" style={styles.button}>
            Player Login
          </a>

          <a href="/" style={styles.backLink}>
            ← Back to BCFC London
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.dashboard}>
        <div style={styles.label}>PLAYER PORTAL</div>

        <h1 style={styles.title}>Welcome to BCFC London</h1>

        <p style={styles.text}>
          Signed in as <strong>{user.email}</strong>
        </p>

        <div style={styles.matchCard}>
          <div style={styles.matchLabel}>NEXT MATCH</div>

          <h2 style={styles.matchTitle}>
            Shepherd&apos;s Tuesday v Bristol City
          </h2>

          <p style={styles.matchDetails}>
            Sunday 16 August 2026 · 10:15
            <br />
            Burgess Park
          </p>

          <div style={styles.availabilityBox}>
            Availability coming next...
          </div>
        </div>

        <a href="/" style={styles.backLink}>
          ← Back to BCFC London
        </a>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#151515",
    padding: "50px 20px",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  dashboard: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "14px",
    padding: "40px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    margin: "100px auto",
    background: "#fff",
    borderRadius: "14px",
    padding: "40px",
    boxSizing: "border-box",
  },

  label: {
    color: "#e31b23",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "3px",
    marginBottom: "10px",
  },

  title: {
    margin: "0 0 15px",
    fontSize: "36px",
  },

  text: {
    color: "#666",
    lineHeight: "1.6",
  },

  button: {
    display: "inline-block",
    marginTop: "20px",
    background: "#e31b23",
    color: "#fff",
    padding: "13px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "900",
  },

  matchCard: {
    marginTop: "35px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    padding: "30px",
  },

  matchLabel: {
    color: "#e31b23",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  matchTitle: {
    fontSize: "28px",
    margin: "12px 0",
  },

  matchDetails: {
    color: "#666",
    lineHeight: "1.6",
  },

  availabilityBox: {
    marginTop: "25px",
    background: "#f4f4f4",
    borderRadius: "8px",
    padding: "25px",
    textAlign: "center",
    fontWeight: "800",
  },

  backLink: {
    display: "block",
    marginTop: "30px",
    color: "#e31b23",
    textDecoration: "none",
    fontWeight: "800",
  },
};
