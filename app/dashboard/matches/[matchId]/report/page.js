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
const [startedPlayers, setStartedPlayers] = useState({});
  const [fantasyPositions, setFantasyPositions] = useState({});
  const [playerGoals, setPlayerGoals] = useState({});
  const [playerAssists, setPlayerAssists] = useState({});
  const [playerYellowCards, setPlayerYellowCards] = useState({});
  const [playerRedCards, setPlayerRedCards] = useState({});
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
  const savePlayerStats = async () => {
  const selectedIds = Object.keys(selectedPlayers).filter(
    (id) => selectedPlayers[id]
  );

  if (selectedIds.length === 0) {
    alert("Please select at least one player.");
    return;
  }

  const squadRows = selectedIds.map((id) => ({
    match_id: Number(matchId),
    player_id: Number(id),
    selected: true,
    starting: !!startedPlayers[id],
    fantasy_position: fantasyPositions[id] || null,
  }));

  const { error } = await supabase
    .from("match_squad")
    .insert(squadRows);

  if (error) {
    console.error("Error saving match squad:", error);
    alert("There was a problem saving the match squad.");
    return;
  }

  alert("Match squad saved!");
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
    {selectedPlayers[player.id] && (
  <>
    <label style={{ marginLeft: "12px" }}>
      <input
        type="checkbox"
        checked={!!startedPlayers[player.id]}
        onChange={(e) =>
          setStartedPlayers({
            ...startedPlayers,
            [player.id]: e.target.checked,
          })
        }
      />
      {" "}Started
    </label>

    <select
      value={fantasyPositions[player.id] || ""}
      onChange={(e) =>
        setFantasyPositions({
          ...fantasyPositions,
          [player.id]: e.target.value,
        })
      }
      style={{ marginLeft: "12px", padding: "5px" }}
    >
      <option value="">Match position</option>
      <option value="Goalkeeper">Goalkeeper</option>
      <option value="Defender">Defender</option>
      <option value="Midfielder">Midfielder</option>
      <option value="Striker">Striker</option>
    </select>
      <label style={{ marginLeft: "12px" }}>
  Goals
  <input
    type="number"
    min="0"
    value={playerGoals[player.id] || ""}
    onChange={(e) =>
      setPlayerGoals({
        ...playerGoals,
        [player.id]: e.target.value,
      })
    }
    style={{ width: "45px", marginLeft: "5px", padding: "5px" }}
  />
</label>
    <label style={{ marginLeft: "12px" }}>
  Assists
  <input
    type="number"
    min="0"
    value={playerAssists[player.id] || ""}
    onChange={(e) =>
      setPlayerAssists({
        ...playerAssists,
        [player.id]: e.target.value,
      })
    }
    style={{ width: "45px", marginLeft: "5px", padding: "5px" }}
  />
</label>
    <label style={{ marginLeft: "12px" }}>
  YC
  <input
    type="number"
    min="0"
    value={playerYellowCards[player.id] || ""}
    onChange={(e) =>
      setPlayerYellowCards({
        ...playerYellowCards,
        [player.id]: e.target.value,
      })
    }
    style={{ width: "40px", marginLeft: "5px", padding: "5px" }}
  />
</label>
    <label style={{ marginLeft: "12px" }}>
  RC
  <input
    type="number"
    min="0"
    value={playerRedCards[player.id] || ""}
    onChange={(e) =>
      setPlayerRedCards({
        ...playerRedCards,
        [player.id]: e.target.value,
      })
    }
    style={{ width: "40px", marginLeft: "5px", padding: "5px" }}
  />
</label>
  </>
)}
  </div>
))}
  <button
  onClick={savePlayerStats}
  style={{
    marginTop: "20px",
    padding: "10px 18px",
    cursor: "pointer",
  }}
>
  Save Player Stats
</button>
</div>
    </main>
  );
}
