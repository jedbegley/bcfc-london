"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function SquadPage() {
  const [players, setPlayers] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
  async function loadPlayers() {
    const { data, error } = await supabase
     .from("public_squad")
.select("id, full_name, squad_number, position, public_role, squad_group")
.order("squad_number", { ascending: true });

    if (error) {
      console.error("SQUAD ERROR:", error);
    } else {
      setPlayers(data || []);
    }

    setLoading(false);
  }

  loadPlayers();
}, []);
const goalkeepers = players.filter(
  (player) => player.squad_group?.toLowerCase() === "goalkeeper"
);

const defenders = players.filter(
  (player) => player.squad_group?.toLowerCase() === "defender"
);

const midfielders = players.filter(
  (player) => player.squad_group?.toLowerCase() === "midfielder"
);

const strikers = players.filter(
  (player) => player.squad_group?.toLowerCase() === "striker"
);
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <div style={styles.clubName}>BRISTOL CITY</div>
          <div style={styles.clubSub}>LONDON SUPPORTERS FC</div>
        </div>

        <nav style={styles.nav}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/news" style={styles.navLink}>News</a>
          <a href="/fixtures" style={styles.navLink}>Fixtures</a>
          <a href="/squad" style={styles.activeNav}>Squad</a>
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

      <section style={styles.hero}>
        <p style={styles.eyebrow}>BCFC LONDON</p>
        <h1 style={styles.title}>Squad</h1>
       <p style={styles.intro}>
  Meet the Bristol City London Supporters FC squad for the 2026/27 season.
</p>
      </section>

     <section style={styles.content}>
  {loading ? (
    <p>Loading squad...</p>
  ) : (
    [
      ["GOALKEEPERS", goalkeepers],
      ["DEFENDERS", defenders],
      ["MIDFIELDERS", midfielders],
      ["STRIKERS", strikers],
    ].map(([title, group]) => (
      <div key={title} style={{ marginBottom: "50px" }}>
        <h2
          style={{
            fontSize: "24px",
            marginBottom: "20px",
            borderBottom: "3px solid #df1e2f",
            paddingBottom: "8px",
          }}
        >
          {title}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "18px",
          }}
        >
          {group.map((player) => (
            <a
  href={`/squad/${player.id}`}
              key={player.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "24px 18px",
                textAlign: "center",
                background: "#fff",
                textDecoration: "none",
color: "inherit",
              }}
            >
              <div
                style={{
                  fontSize: "52px",
                  fontWeight: "900",
                  color: "#df1e2f",
                  marginBottom: "14px",
                }}
              >
                {player.squad_number || "-"}
              </div>

              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "900",
                  marginBottom: "6px",
                }}
              >
                {player.full_name}
              </div>

              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  textTransform: "uppercase",
                }}
              >
                {player.position}
              </div>

              {player.public_role && (
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#df1e2f",
                    textTransform: "uppercase",
                  }}
                >
                  {player.public_role}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    ))
  )}
</section>
    </main>
  );
}

const styles = {
  page: {
    margin: 0,
    fontFamily: "Arial, Helvetica, sans-serif",
    minHeight: "100vh",
    background: "#fff",
    color: "#111",
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
    maxWidth: "900px",
    margin: "0 auto",
    padding: "65px 0",
  },

  card: {
    background: "#f4f4f4",
    borderRadius: "14px",
    padding: "45px",
    textAlign: "center",
  },

  comingSoon: {
    color: "#df1e2f",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "3px",
  },

  cardTitle: {
    fontSize: "36px",
    margin: "12px 0",
  },

  cardText: {
    color: "#666",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto",
  },

  button: {
    display: "inline-block",
    marginTop: "25px",
    background: "#111",
    color: "white",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "6px",
    fontWeight: "900",
  },
};
