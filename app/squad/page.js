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
.select("id, full_name, squad_number, position, public_role, squad_group, photo_url")
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
    <a href="/news" style={styles.navLink}>News</a>
    <a href="/league" style={styles.navLink}>League</a>
    <a href="/fixtures" style={styles.navLink}>Fixtures</a>
    <a href="/squad" style={styles.activeNav}>Squad</a>
    <a href="/stats" style={styles.navLink}>Stats</a>
    <a href="/dashboard" style={styles.loginButton}>Player Portal</a>
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
              {player.photo_url ? (
  <>
    <img
                className="squad-player-photo"
      src={player.photo_url}
      alt={player.full_name}
      style={{
        width: "100%",
        height: "220px",
        objectFit: "cover",
objectPosition: "center 25%",
        borderRadius: "8px",
        marginBottom: "14px",
      }}
    />

    <div
      style={{
        fontSize: "18px",
        fontWeight: "900",
        marginBottom: "6px",
      }}
    >
      {player.squad_number ? `${player.squad_number}. ` : ""}
      {player.full_name}
    </div>
  </>
) : (
  <>
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
  </>
)}

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
  <style>{`
  @media (max-width: 700px) {
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
    .squad-player-photo {
      height: 240px !important;
      object-position: center 20% !important;
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
    minHeight: "100vh",
    background: "#fff",
    color: "#111",
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
