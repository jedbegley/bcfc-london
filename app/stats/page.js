import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default async function StatsPage() {
    const { data: stats, error } = await supabase
    .from("match_stats")
   .select(`
  player_id,
  goals,
  assists,
  yellow_cards,
  red_cards,
  clean_sheet,
  motm,
  fantasy_points
`);
    const { data: squad } = await supabase
    .from("public_squad")
    .select("id, full_name, squad_number");

  if (error) {
    console.error("Error loading stats:", error);
  }
    const leaderboard = (squad || [])
    .map((player) => {
      const playerStats = (stats || []).filter(
        (row) => row.player_id === player.id
      );

      return {
        id: player.id,
        full_name: player.full_name,
        squad_number: player.squad_number,
        apps: playerStats.length,
        goals: playerStats.reduce((sum, row) => sum + (row.goals || 0), 0),
        assists: playerStats.reduce((sum, row) => sum + (row.assists || 0), 0),
        cleanSheets: playerStats.reduce(
          (sum, row) => sum + (row.clean_sheet ? 1 : 0),
          0
        ),
        yellowCards: playerStats.reduce(
          (sum, row) => sum + (row.yellow_cards || 0),
          0
        ),
        redCards: playerStats.reduce(
          (sum, row) => sum + (row.red_cards || 0),
          0
        ),
        motm: playerStats.reduce(
          (sum, row) => sum + (row.motm ? 1 : 0),
          0
        ),
        fantasyPoints: playerStats.reduce(
          (sum, row) => sum + (row.fantasy_points || 0),
          0
        ),
      };
    })
    .sort((a, b) => b.fantasyPoints - a.fantasyPoints);
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
          <a href="/squad" style={styles.navLink}>Squad</a>
          <a href="/stats" style={styles.activeNav}>Stats</a>
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
        <h1 style={styles.title}>Stats</h1>
        <p style={styles.intro}>
          Player stats and Fantasy League standings for the 2026/27 season.
        </p>
      </section>

      <section style={styles.content}>
        <div style={styles.card}>
  <h2 style={styles.cardTitle}>Fantasy Leaderboard</h2>

  <div style={{ overflowX: "auto" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th style={{ textAlign: "left", padding: "10px" }}>Pos</th>
          <th style={{ textAlign: "left", padding: "10px" }}>Player</th>
          <th style={{ textAlign: "center", padding: "10px" }}>Apps</th>
          <th style={{ textAlign: "center", padding: "10px" }}>Goals</th>
          <th style={{ textAlign: "center", padding: "10px" }}>Assists</th>
          <th style={{ textAlign: "center", padding: "10px" }}>CS</th>
          <th style={{ textAlign: "center", padding: "10px" }}>YC</th>
          <th style={{ textAlign: "center", padding: "10px" }}>RC</th>
          <th style={{ textAlign: "center", padding: "10px" }}>MOTM</th>
          <th style={{ textAlign: "center", padding: "10px" }}>Pts</th>
        </tr>
      </thead>

      <tbody>
        {leaderboard.map((player, index) => (
          <tr key={player.id}>
            <td style={{ padding: "10px" }}>{index + 1}</td>

            <td style={{ padding: "10px" }}>
              {player.squad_number ? `#${player.squad_number} ` : ""}
              {player.full_name}
            </td>

            <td style={{ textAlign: "center", padding: "10px" }}>
              {player.apps}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {player.goals}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {player.assists}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {player.cleanSheets}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {player.yellowCards}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {player.redCards}
            </td>
            <td style={{ textAlign: "center", padding: "10px" }}>
              {player.motm}
            </td>
            <td
              style={{
                textAlign: "center",
                padding: "10px",
                fontWeight: "700",
              }}
            >
              {player.fantasyPoints}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
          
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
