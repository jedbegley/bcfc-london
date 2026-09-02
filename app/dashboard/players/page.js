"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PlayersAdmin() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [search, setSearch] = useState("");
  const filteredPlayers = players.filter((player) =>
  player.full_name?.toLowerCase().includes(search.toLowerCase())
);

  useEffect(() => {
    async function loadPlayers() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/player-login";
        return;
      }

      const { data: playerData, error: playerError } = await supabase
        .from("Players")
        .select("is_admin")
        .eq("user_id", user.id)
        .single();

      if (playerError || playerData?.is_admin !== true) {
        window.location.href = "/dashboard";
        return;
      }

      setIsAdmin(true);

      const { data: playersData, error: playersError } = await supabase
        .from("Players")
        .select("*")
        .order("full_name", { ascending: true });

      if (playersError) {
        console.error("PLAYERS ERROR:", playersError);
      } else {
        setPlayers(playersData || []);
      }

      setLoading(false);
    }

    loadPlayers();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Loading squad...</h1>
      </main>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
   <main style={{ padding: "40px" }}>
  <h1>Squad Admin</h1>

  <p>{players.length} players registered</p>
    <input
  type="text"
  placeholder="Search player..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "10px 12px",
    width: "280px",
    maxWidth: "100%",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  }}
/>

  <div style={{ overflowX: "auto", marginTop: "24px" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        minWidth: "1000px",
      }}
    >
      <thead>
        <tr>
          <th style={styles.th}>Player</th>
          <th style={styles.th}>DOB</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Mobile</th>
          <th style={styles.th}>Postcode</th>
          <th style={styles.th}>Position</th>
          <th style={styles.th}>Squad No.</th>
          <th style={styles.th}>Type</th>
        </tr>
      </thead>

      <tbody>
        {filteredPlayers.map((player) => (
          <tr key={player.id}>
            <td style={styles.td}>{player.full_name || "-"}</td>
            <td style={styles.td}>
  {player.date_of_birth
    ? new Date(`${player.date_of_birth}T12:00:00`).toLocaleDateString("en-GB")
    : "-"}
</td>
            <td style={styles.td}>{player.email || "-"}</td>
            <td style={styles.td}>{player.mobile || "-"}</td>
            <td style={styles.td}>{player.postcode || "-"}</td>
            <td style={styles.td}>
  <select
    defaultValue={player.position || ""}
    onChange={async (e) => {
      const value = e.target.value || null;

      const { error } = await supabase
        .from("Players")
        .update({ position: value })
        .eq("id", player.id);

      if (error) {
        alert("Could not save position");
      }
    }}
    style={{
      padding: "6px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  >
    <option value="">-</option>
    <option value="Goalkeeper">Goalkeeper</option>
    <option value="Defender">Defender</option>
    <option value="Midfielder">Midfielder</option>
    <option value="Goalkeeper / Midfielder">
  Goalkeeper / Midfielder
</option>
    <option value="Striker">Striker</option>
  </select>
</td>
            <td style={styles.td}>
  <input
    type="number"
    defaultValue={player.squad_number ?? ""}
    onBlur={async (e) => {
      const value =
        e.target.value === "" ? null : Number(e.target.value);

      const { error } = await supabase
        .from("Players")
        .update({ squad_number: value })
        .eq("id", player.id);

      if (error) {
        alert("Could not save squad number");
      }
    }}
    style={{
      width: "60px",
      padding: "6px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    }}
  />
</td>
            <td style={styles.td}>
              {player.is_guest ? "Guest" : "Registered"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</main>
  );
}
const styles = {
  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #ddd",
    background: "#f5f5f5",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    verticalAlign: "top",
    whiteSpace: "nowrap",
  },
};
