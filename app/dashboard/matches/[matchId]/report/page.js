"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function MatchReportPage() {
  const params = useParams();
  const matchId = params.matchId;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ourScore, setOurScore] = useState("");
const [opponentScore, setOpponentScore] = useState("");
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState({});

  useEffect(() => {
    async function loadMatch() {
      const { data, error } = await supabase
        .from("matches")
        .select("*")
        .eq("id", matchId)
        .single();

      if (error) {
        console.error("Error loading match:", error);
      } else {
        setMatch(data);
      }

      setLoading(false);
    }

    loadMatch();

    async function loadPlayers() {
  const { data, error } = await supabase
    .from("Players")
    .select("id, full_name, squad_number, position")
    .eq("is_guest", false)
    .order("full_name", { ascending: true });

  if (error) {
    console.error("Error loading players:", error);
  } else {
    setPlayers(data || []);
  }
}

loadPlayers();
  }, [matchId]);

  const saveResult = async () => {
  if (ourScore === "" || opponentScore === "") {
    alert("Please enter both scores.");
    return;
  }

  const { error } = await supabase
    .from("matches")
    .update({
      our_score: Number(ourScore),
      opponent_score: Number(opponentScore),
      status: "Completed",
    })
    .eq("id", matchId);

  if (error) {
    console.error("Error saving result:", error);
    alert("There was a problem saving the result.");
    return;
  }

  alert("Result saved!");
};
  if (loading) {
    return <main style={{ padding: "40px" }}>Loading...</main>;
  }

  if (!match) {
    return <main style={{ padding: "40px" }}>Match not found.</main>;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Manager Match Report</h1>

      <h2>Bristol City (London) v {match.opponent}</h2>

      <p>
        {match.match_date} at {match.kickoff_time}
      </p>

      <p>{match.venue}</p>

      <p>{match.competition}</p>

      <p>Status: {match.status}</p>

        <div style={{ marginTop: "30px" }}>
  <h3>Final Score</h3>

  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
    <input
  type="number"
  min="0"
  placeholder="City"
  value={ourScore}
  onChange={(e) => setOurScore(e.target.value)}
  style={{ width: "80px", padding: "8px" }}
/>

    <span>-</span>

   <input
  type="number"
  min="0"
  placeholder={match.opponent}
  value={opponentScore}
  onChange={(e) => setOpponentScore(e.target.value)}
  style={{ width: "120px", padding: "8px" }}
/>
  </div>

  <button
  onClick={saveResult}
  style={{
    marginTop: "15px",
    padding: "10px 18px",
    cursor: "pointer",
  }}
>
  Save Result
</button>
</div>
    <div style={{ marginTop: "40px" }}>
  <h2>Players</h2>

  {players.map((player) => (
  <div
    key={player.id}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "12px",
    }}
  >
    <input
  type="checkbox"
  checked={!!selectedPlayers[player.id]}
  onChange={(e) =>
    setSelectedPlayers({
      ...selectedPlayers,
      [player.id]: e.target.checked,
    })
  }
/>

    <span>
      {player.squad_number ? `#${player.squad_number} ` : ""}
      {player.full_name}
    </span>
  </div>
))}
</div>
    </main>
  );
}
