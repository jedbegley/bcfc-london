"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabaseClient";

export default function MatchReportPage() {
  const params = useParams();
  const matchId = params.matchId;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [matchId]);

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
    </main>
  );
}
