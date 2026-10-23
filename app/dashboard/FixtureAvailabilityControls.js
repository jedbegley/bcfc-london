"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { formatMatchDate, londonToday } from "../fixtureDisplay";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function FixtureAvailabilityControls() {
  const [fixtures, setFixtures] = useState([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.from("matches")
      .select("id, opponent, match_date, kickoff_time, home_or_away, availability_open")
      .eq("status", "Upcoming").gte("match_date", londonToday())
      .order("match_date").order("kickoff_time").order("id")
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setMessage("Fixture controls could not be loaded. Please refresh.");
        else setFixtures(data || []);
      });
    return () => { active = false; };
  }, []);

  async function toggle(fixture) {
    const opening = !fixture.availability_open;
    if (!window.confirm(`${opening ? "Open" : "Close"} availability for ${fixture.opponent}? This does not send an announcement.`)) return;
    setSaving(true);
    setMessage("Saving…");
    // Supabase's existing manager policy authorises this update.
    const { data, error } = await supabase.from("matches")
      .update({ availability_open: opening }).eq("id", fixture.id)
      .eq("availability_open", fixture.availability_open)
      .select("id").maybeSingle();
    if (error || !data) {
      setMessage("Could not save. Please refresh and try again.");
      setSaving(false);
      return;
    }
    window.location.reload();
  }

  return (
    <section style={{ background: "#fafafa", border: "1px solid #ddd", borderRadius: "12px", padding: "24px", marginTop: "24px", textAlign: "left" }}>
      <h2 style={{ marginTop: 0 }}>Fixture availability controls</h2>
      <p>Public fixtures can stay visible while availability is closed. Opening availability does not send an announcement.</p>
      {fixtures.map((fixture) => (
        <div key={fixture.id} style={{ borderTop: "1px solid #ddd", padding: "18px 0", display: "flex", gap: "16px", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div><strong>{fixture.home_or_away === "Away" ? `${fixture.opponent} v Bristol City` : `Bristol City v ${fixture.opponent}`}</strong><br />
            {formatMatchDate(fixture.match_date)} · {fixture.kickoff_time?.slice(0, 5)}<br />
            <strong>Availability: {fixture.availability_open ? "Open" : "Closed"}</strong>
          </div>
          <button disabled={saving} onClick={() => toggle(fixture)} style={{ background: "#e31b23", color: "#fff", border: 0, borderRadius: "6px", padding: "12px 16px", fontWeight: 700, cursor: "pointer" }}>
            {fixture.availability_open ? "Close availability" : "Open availability"}
          </button>
        </div>
      ))}
      <p role="status">{message}</p>
    </section>
  );
}
