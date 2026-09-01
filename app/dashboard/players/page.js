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

  useEffect(() => {
    async function loadPlayers() {
      const { data, error } = await supabase
        .from("Players")
        .select("*")
        .order("full_name", { ascending: true });

      if (error) {
        console.error("PLAYERS ERROR:", error);
      } else {
        setPlayers(data || []);
      }

      setLoading(false);
    }

    loadPlayers();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Loading players...</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Squad Admin</h1>

      <p>
        {players.length} players registered
      </p>

      <pre>{JSON.stringify(players, null, 2)}</pre>
    </main>
  );
}
