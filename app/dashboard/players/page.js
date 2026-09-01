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

      <pre>{JSON.stringify(players, null, 2)}</pre>
    </main>
  );
}
