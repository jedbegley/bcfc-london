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
  const [player, setPlayer] = useState(null);
const [availability, setAvailability] = useState("");
const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      if (user) {
  const { data: playerData, error: playerError } = await supabase
    .from("Players")
    .select("*")
  .eq("user_id", user.id)
    .single();

  if (playerError) {
    console.log("PLAYER ERROR:", playerError);
  } else {
    setPlayer(playerData);
    setIsAdmin(playerData.is_admin === true);
  }
}
      
      setLoading(false);
    }

    checkUser();
  }, []);

  async function saveAvailability(status) {
  if (!player) {
    setAvailabilityMessage("Player profile not found.");
    return;
  }

  setAvailabilityMessage("Saving...");

  const { error } = await supabase
  .from("availability")
  .upsert(
    {
      player_id: player.id,
      match_id: 2,
      status,
      responded_at: new Date().toISOString(),
    },
    {
      onConflict: "player_id,match_id",
    }
  );

  if (error) {
    setAvailabilityMessage(error.message);
    return;
  }

  setAvailability(status);
  setAvailabilityMessage("Availability saved!");
}

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
  <p style={{ marginTop: "0", fontWeight: "900", fontSize: "18px" }}>
    Are you available?
  </p>

  <div
    style={{
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      flexWrap: "wrap",
    }}
  >
 <button
  onClick={() => saveAvailability("available")}
  style={{
    ...styles.availableButton,
    opacity: availability && availability !== "available" ? 0.45 : 1,
    transform: availability === "available" ? "scale(1.05)" : "scale(1)",
    boxShadow:
      availability === "available"
        ? "0 0 0 4px rgba(31, 143, 78, 0.25)"
        : "none",
  }}
>
  {availability === "available" ? "✓ SELECTED — AVAILABLE" : "✓ Available"}
</button>

<button
  onClick={() => saveAvailability("maybe")}
  style={{
    ...styles.maybeButton,
    opacity: availability && availability !== "maybe" ? 0.45 : 1,
    transform: availability === "maybe" ? "scale(1.05)" : "scale(1)",
    boxShadow:
      availability === "maybe"
        ? "0 0 0 4px rgba(229, 165, 10, 0.25)"
        : "none",
  }}
>
  {availability === "maybe" ? "? SELECTED — MAYBE" : "? Maybe"}
</button>

<button
  onClick={() => saveAvailability("unavailable")}
  style={{
    ...styles.unavailableButton,
    opacity: availability && availability !== "unavailable" ? 0.45 : 1,
    transform: availability === "unavailable" ? "scale(1.05)" : "scale(1)",
    boxShadow:
      availability === "unavailable"
        ? "0 0 0 4px rgba(227, 27, 35, 0.25)"
        : "none",
  }}
>
  {availability === "unavailable"
    ? "✕ SELECTED — UNAVAILABLE"
    : "✕ Unavailable"}
</button>
  </div>

{availability && (
  <div
    style={{
      marginTop: "20px",
      padding: "12px 16px",
      background: "#f4f4f4",
      borderRadius: "6px",
      fontWeight: "900",
      fontSize: "14px",
      textAlign: "center",
    }}
  >
    YOUR RESPONSE: {availability.toUpperCase()}
  </div>
)}

    {availabilityMessage && (
  <p
    style={{
      marginTop: "18px",
      marginBottom: "0",
      fontWeight: "800",
      color: "#e31b23",
    }}
  >
    {availabilityMessage}
  </p>
)}
</div>
        </div>

  {isAdmin && (
  <div style={styles.adminCard}>
    <div style={styles.matchLabel}>MANAGER VIEW</div>
    <h2 style={{ marginTop: "10px" }}>Squad Availability</h2>
    <p style={styles.text}>
      Admin availability summary coming next...
    </p>
  </div>
)}
  
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

  availableButton: {
  padding: "14px 20px",
  background: "#1f8f4e",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "900",
  cursor: "pointer",
  fontSize: "15px",
},

maybeButton: {
  padding: "14px 20px",
  background: "#e5a50a",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "900",
  cursor: "pointer",
  fontSize: "15px",
},

unavailableButton: {
  padding: "14px 20px",
  background: "#e31b23",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "900",
  cursor: "pointer",
  fontSize: "15px",
},
  
  adminCard: {
  marginTop: "30px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "25px",
  background: "#fafafa",
},
  
};
