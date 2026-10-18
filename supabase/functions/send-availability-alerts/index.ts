import { createClient } from "npm:@supabase/supabase-js@2";
import { deliverOnce } from "./delivery.mjs";

type Delivery = {
  delivery_id: number; change_id: number; recipient_email: string;
  player_name: string; opponent: string; match_date: string;
  kickoff_time: string; previous_status: string; new_status: string;
  changed_at: string;
};

const url = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const webhookSecret = Deno.env.get("ALERT_WEBHOOK_SECRET")!;
const resendKey = Deno.env.get("RESEND_API_KEY")!;
const from = Deno.env.get("ALERT_FROM_EMAIL")!;
const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function update(id: number, fields: Record<string, unknown>) {
  const { error } = await supabase.from("availability_alert_deliveries")
    .update(fields).eq("id", id).eq("state", "sending");
  if (error) throw error;
}

Deno.serve(async (request) => {
  if (request.method !== "POST" || !webhookSecret ||
      request.headers.get("x-alert-secret") !== webhookSecret) {
    return new Response("Forbidden", { status: 403 });
  }
  if (!resendKey || !from || !serviceKey) return new Response("Not configured", { status: 503 });

  // Use headroom below the provider's 100/day and 3,000/month free ceilings.
  const day = new Date(Date.now() - 24 * 60 * 60_000).toISOString();
  const month = new Date(Date.now() - 30 * 24 * 60 * 60_000).toISOString();
  const [{ count: daily, error: dayError }, { count: monthly, error: monthError }] = await Promise.all([
    supabase.from("availability_alert_deliveries").select("id", { head: true, count: "exact" }).gte("sent_at", day),
    supabase.from("availability_alert_deliveries").select("id", { head: true, count: "exact" }).gte("sent_at", month),
  ]);
  if (dayError || monthError) return new Response("Unable to check free quota", { status: 503 });
  const capacity = Math.min(20, 80 - (daily || 0), 2400 - (monthly || 0));
  if (capacity <= 0) return Response.json({ deferred: "free email limit" });
  const { data, error } = await supabase.rpc("claim_availability_alerts", { p_limit: capacity });
  if (error) return new Response("Unable to claim alerts", { status: 503 });
  const outcomes = [];
  for (const row of (data || []) as Delivery[]) outcomes.push(await deliverOnce(row, {
    fetchImpl: fetch, mark: update, resendKey, from,
  }));
  return Response.json({ claimed: outcomes.length, outcomes });
});
