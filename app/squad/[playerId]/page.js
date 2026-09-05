"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function PlayerProfilePage() {
  const params = useParams();
  const playerId = params.playerId;

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlayer() {
      const { data, error } = await supabase
        .from("public_squad")
        .select("id, full_name, squad_number, position, public_role, nationality, bio")
        .eq("id", playerId)
        .single();

      if (!error) {
        setPlayer(data);
      }

      setLoading(false);
    }

    loadPlayer();
  }, [playerId]);

  if (loading) {
    return <main style={{ padding: "40px" }}>Loading player...</main>;
  }

  if (!player) {
    return <main style={{ padding: "40px" }}>Player not found.</main>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#fff",
        color: "#111",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <section
        style={{
          background: "#111",
          color: "#fff",
          padding: "70px 6%",
        }}
      >
        <div
          style={{
            color: "#df1e2f",
            fontSize: "13px",
            fontWeight: "900",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}
        >
          SQUAD {player.squad_number ? `#${player.squad_number}` : ""}
        </div>

        <h1
          style={{
            fontSize: "clamp(42px, 7vw, 80px)",
            margin: 0,
            lineHeight: 1,
            fontWeight: "900",
          }}
        >
          {player.full_name}
        </h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          {player.position}
        </p>

        {player.public_role && (
          <p
            style={{
              color: "#df1e2f",
              fontWeight: "900",
              textTransform: "uppercase",
            }}
          >
            {player.public_role}
          </p>
        )}
      </section>

      <section
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "50px 6%",
        }}
      >
        <h2>Player Profile</h2>

        <p>
          Player biography, career information and season statistics will appear here.
        </p>

        <a
          href="/squad"
          style={{
            display: "inline-block",
            marginTop: "25px",
            background: "#111",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: "6px",
            fontWeight: "800",
            textDecoration: "none",
          }}
        >
          ← Back to Squad
        </a>
      </section>
    </main>
  );
}
