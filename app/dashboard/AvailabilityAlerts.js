"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const label = (status) => status === "no_response" ? "No Response" :
  status?.replace(/^./, (letter) => letter.toUpperCase());

export default function AvailabilityAlerts({ userId, players, fixture }) {
  const [history, setHistory] = useState([]);
  const [fixtures, setFixtures] = useState({});
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState("");
  const [deliveryStates, setDeliveryStates] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) return;
    let active = true;
    async function load() {
      const [changes, preference] = await Promise.all([
        supabase.from("availability_change_history")
          .select("id, match_id, player_id, actor_user_id, previous_status, new_status, changed_at, alert_eligible")
          .order("changed_at", { ascending: false }).limit(100),
        supabase.from("availability_alert_preferences")
          .select("email_enabled").eq("user_id", userId).maybeSingle(),
      ]);
      if (!active) return;
      if (changes.error || preference.error) {
        setMessage("Availability alerts could not be loaded. Please refresh.");
        return;
      }
      setHistory(changes.data || []);
      setEnabled(preference.data?.email_enabled ?? true);
      if (changes.data?.length) {
        const { data, error } = await supabase.from("availability_alert_deliveries")
          .select("change_id, state").in("change_id", changes.data.map((change) => change.id));
        if (active && !error) {
          const states = {};
          for (const delivery of data || []) {
            (states[delivery.change_id] ||= []).push(delivery.state);
          }
          setDeliveryStates(states);
        }
      }
      const ids = [...new Set((changes.data || []).map((change) => change.match_id))];
      if (ids.length) {
        const { data, error } = await supabase.from("matches")
          .select("id, opponent, match_date").in("id", ids);
        if (active && !error) setFixtures(Object.fromEntries((data || []).map((m) => [m.id, m])));
      }
    }
    load();
    return () => { active = false; };
  }, [userId, refresh]);

  async function changePreference(next) {
    setSaving(true);
    setMessage("Saving preference...");
    const { error } = await supabase.from("availability_alert_preferences")
      .upsert({ user_id: userId, email_enabled: next, updated_at: new Date().toISOString() },
        { onConflict: "user_id" });
    if (error) {
      setMessage("Could not save preference: " + error.message);
    } else {
      setEnabled(next);
      setMessage("Email alert preference saved.");
    }
    setSaving(false);
  }

  return <section style={{ marginTop: 30, padding: 25, background: "#fafafa", border: "1px solid #ddd", borderRadius: 12 }}>
    <h2>Availability alerts</h2>
    {fixture && (!fixture.match_date || !fixture.kickoff_time) &&
      <p>Set this fixture’s date and kick-off time to enable late availability alerts.</p>}
    <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <input type="checkbox" checked={enabled} disabled={saving} onChange={(event) => changePreference(event.target.checked)} />
      Email me about availability changes from Friday noon until kick-off
    </label>
    {message && <p role="status">{message}</p>}
    <h3 style={{ marginTop: 28 }}>Change history</h3>
    <button type="button" onClick={() => setRefresh((value) => value + 1)}>Refresh history</button>
    {history.length === 0 ? <p>No changes recorded yet.</p> :
      <div style={{ maxHeight: 480, overflowY: "auto" }}>
        {history.map((change) => {
          const player = players.find((p) => p.id === change.player_id);
          const actor = players.find((p) => p.user_id === change.actor_user_id);
          const match = fixtures[change.match_id];
          const states = deliveryStates[change.id] || [];
          const deliveryLabel = states.some((state) => state === "needs_review") ? "Email needs attention" :
            states.some((state) => state === "failed") ? "Email retry pending" :
            states.some((state) => state === "pending" || state === "sending") ? "Email queued" :
            states.length && states.every((state) => state === "sent") ? "Email accepted by provider" :
            states.length && states.every((state) => state === "cancelled") ? "Email disabled" : "";
          const time = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/London", day: "numeric", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit", timeZoneName: "short",
          }).format(new Date(change.changed_at));
          return <div key={change.id} style={{ padding: "12px 0", borderTop: "1px solid #ddd" }}>
            <strong>{player?.full_name || `Player ${change.player_id}`}</strong>
            {" · "}{match ? `${match.opponent} (${match.match_date})` : `Fixture ${change.match_id}`}
            <div>{label(change.previous_status)} → {label(change.new_status)}</div>
            <small>Changed by {actor?.full_name || (change.actor_user_id ? "another user" : "system/admin")}
              {" · "}{time}{change.alert_eligible ? " · Email alert window" : ""}</small>
            {deliveryLabel && <div><small>{deliveryLabel}</small></div>}
          </div>;
        })}
      </div>}
  </section>;
}
