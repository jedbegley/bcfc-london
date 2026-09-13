"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function MotmVote({ matchId, candidates }) {
  const [player, setPlayer] = useState(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState("");
  const [message, setMessage] = useState("");
  const [existingVote, setExistingVote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVotingUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user || null;

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: playerData } = await supabase
        .from("Players")
        .select("id, full_name")
        .eq("user_id", user.id)
        .single();

      if (!playerData) {
        setLoading(false);
        return;
      }

      setPlayer(playerData);

      const { data: voteData } = await supabase
        .from("motm_votes")
        .select("voted_player_id")
        .eq("match_id", matchId)
        .eq("voter_player_id", playerData.id)
        .maybeSingle();

      if (voteData) {
        setExistingVote(voteData.voted_player_id);
      }

      setLoading(false);
    }

    loadVotingUser();
  }, [matchId]);

  async function submitVote() {
    if (!player || !selectedPlayerId) {
      return;
    }

    setMessage("Saving vote...");

    const { error } = await supabase.from("motm_votes").insert({
      match_id: Number(matchId),
      voter_player_id: player.id,
      voted_player_id: Number(selectedPlayerId),
    });

    if (error) {
      console.error("MOTM vote error:", error);
      setMessage("There was a problem saving your vote.");
      return;
    }

    setExistingVote(Number(selectedPlayerId));
    setMessage("Vote saved!");
  }

  if (loading) {
    return <p>Loading MOTM vote...</p>;
  }

  if (!player) {
    return (
      <p style={{ margin: 0 }}>
        Log in through the Player Portal to vote for Man of the Match.
      </p>
    );
  }

  if (existingVote) {
    const votedPlayer = candidates.find(
      (candidate) => Number(candidate.id) === Number(existingVote)
    );

    return (
      <p style={{ margin: 0, fontWeight: "700" }}>
        Your MOTM vote: {votedPlayer?.full_name || "Vote submitted"}
      </p>
    );
  }

  return (
    <div>
      <select
        value={selectedPlayerId}
        onChange={(e) => setSelectedPlayerId(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "12px",
          fontSize: "15px",
          marginBottom: "12px",
        }}
      >
        <option value="">Choose a player</option>

        {candidates.map((candidate) => (
          <option key={candidate.id} value={candidate.id}>
            {candidate.full_name}
          </option>
        ))}
      </select>

      <br />

      <button
        onClick={submitVote}
        disabled={!selectedPlayerId}
        style={{
          background: "#e31b23",
          color: "#fff",
          border: 0,
          padding: "12px 18px",
          borderRadius: "6px",
          fontWeight: "800",
          cursor: selectedPlayerId ? "pointer" : "not-allowed",
        }}
      >
        Submit MOTM Vote
      </button>

      {message && (
        <p style={{ marginTop: "12px", fontWeight: "700" }}>{message}</p>
      )}
    </div>
  );
}
