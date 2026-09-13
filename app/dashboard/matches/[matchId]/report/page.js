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
  const [matchReport, setMatchReport] = useState("");
  const [motmVotingClosed, setMotmVotingClosed] = useState(false);
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
  setMatchReport(data.match_report || "");
        setMotmVotingClosed(data.motm_voting_closed === true);
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

  const { data, error } = await supabase
  .from("matches")
  .update({
    our_score: Number(ourScore),
    opponent_score: Number(opponentScore),
    status: "Completed",
  })
  .eq("id", matchId)
  .select();

 if (error) {
  console.error("Error saving result:", error);
  alert("There was a problem saving the result.");
  return;
}

if (!data || data.length === 0) {
  alert("Result was not saved. Your account may not have permission to update this match.");
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

  const { error: squadError } = await supabase
    .from("match_squad")
    .insert(squadRows);

  if (squadError) {
    console.error("Error saving match squad:", squadError);
    alert("There was a problem saving the match squad.");
    return;
  }

  const statRows = selectedIds.map((id) => ({
    match_id: Number(matchId),
    player_id: Number(id),
    goals: Number(playerGoals[id] || 0),
    assists: Number(playerAssists[id] || 0),
    yellow_cards: Number(playerYellowCards[id] || 0),
    red_cards: Number(playerRedCards[id] || 0),
    own_goals: 0,
    clean_sheet: Number(opponentScore) === 0,
    motm: false,
    fantasy_points:
  2 +
  Number(playerGoals[id] || 0) *
    (fantasyPositions[id] === "Goalkeeper"
      ? 6
      : fantasyPositions[id] === "Defender"
      ? 6
      : fantasyPositions[id] === "Midfielder"
      ? 5
      : 4) +
  Number(playerAssists[id] || 0) * 3 -
  Number(playerYellowCards[id] || 0) * 2 -
  Number(playerRedCards[id] || 0) * 4 +
(Number(opponentScore) === 0
  ? fantasyPositions[id] === "Goalkeeper"
    ? 4
    : fantasyPositions[id] === "Defender"
    ? 4
    : fantasyPositions[id] === "Midfielder"
? 3
: 2
: 0
)}));

  const { error: statsError } = await supabase
    .from("match_stats")
    .insert(statRows);

  if (statsError) {
    console.error("Error saving match stats:", statsError);
    alert("There was a problem saving the player stats.");
    return;
  }

  alert("Match squad and player stats saved!");
};

  const saveMatchReport = async () => {
  const { error } = await supabase
    .from("matches")
    .update({
      match_report: matchReport,
    })
    .eq("id", matchId);

  if (error) {
    console.error("Error saving match report:", error);
    alert("There was a problem saving the match report.");
    return;
  }

  alert("Match report saved!");
};

  const closeMotmVoting = async () => {
  const { data: votes, error: votesError } = await supabase
    .from("motm_votes")
    .select("voted_player_id")
    .eq("match_id", Number(matchId));

  if (votesError) {
    console.error("Error loading MOTM votes:", votesError);
    alert("There was a problem loading MOTM votes.");
    return;
  }

  if (!votes || votes.length === 0) {
    alert("No MOTM votes have been cast yet.");
    return;
  }

  const voteCounts = {};

  votes.forEach((vote) => {
    voteCounts[vote.voted_player_id] =
      (voteCounts[vote.voted_player_id] || 0) + 1;
  });

 const highestVotes = Math.max(...Object.values(voteCounts));

const winners = Object.keys(voteCounts).filter(
  (playerId) => voteCounts[playerId] === highestVotes
);

if (winners.length > 1) {
  alert("MOTM voting is tied. Please resolve the tie before closing voting.");
  return;
}

const winnerId = Number(winners[0]);

  const { data: winnerStats, error: statsError } = await supabase
    .from("match_stats")
    .select("id, fantasy_points, motm")
    .eq("match_id", Number(matchId))
    .eq("player_id", winnerId)
    .single();

  if (statsError || !winnerStats) {
    console.error("Error finding winner stats:", statsError);
    alert("Could not find the winning player's match stats.");
    return;
  }
    if (winnerStats.motm === true) {
  alert("MOTM has already been awarded for this match.");
  return;
}

  const { error: updateStatsError } = await supabase
    .from("match_stats")
    .update({
      motm: true,
      fantasy_points: Number(winnerStats.fantasy_points || 0) + 3,
    })
    .eq("id", winnerStats.id);

  if (updateStatsError) {
    console.error("Error updating MOTM winner:", updateStatsError);
    alert("There was a problem updating the MOTM winner.");
    return;
  }

  const { error: closeError } = await supabase
    .from("matches")
    .update({
      motm_voting_closed: true,
    })
    .eq("id", Number(matchId));

  if (closeError) {
    console.error("Error closing MOTM voting:", closeError);
    alert("The winner was saved, but voting could not be closed.");
    return;
  }

  setMotmVotingClosed(true);
  alert("MOTM voting closed and winner awarded +3 fantasy points!");
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

<div style={{ marginTop: "40px" }}>
  <h3>Match Report</h3>

  <textarea
    value={matchReport}
    onChange={(e) => setMatchReport(e.target.value)}
    placeholder="Write the match report here..."
    rows="14"
    style={{
      width: "100%",
      maxWidth: "800px",
      padding: "12px",
      fontSize: "14px",
      lineHeight: "1.6",
      boxSizing: "border-box",
    }}
  />

  <br />

  <button
    onClick={saveMatchReport}
    style={{
      marginTop: "12px",
      padding: "10px 18px",
      cursor: "pointer",
    }}
  >
    Save Match Report
  </button>
      <div style={{ marginTop: "30px" }}>
  <h3>Man of the Match</h3>

  {motmVotingClosed ? (
    <p style={{ fontWeight: "700" }}>MOTM voting is closed.</p>
  ) : (
    <button
      onClick={closeMotmVoting}
      style={{
        padding: "10px 18px",
        cursor: "pointer",
        background: "#e31b23",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontWeight: "700",
      }}
    >
      Close MOTM Voting
    </button>
  )}
</div>
</div>
</div>
    </main>
  );
}
