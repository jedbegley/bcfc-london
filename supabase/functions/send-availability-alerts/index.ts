import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import { deliverOnce } from "./delivery.mjs";

type Delivery = {
  delivery_id: number; change_id: number; recipient_email: string;
  player_name: string; opponent: string; match_date: string;
  kickoff_time: string; previous_status: string; new_status: string;
  changed_at: string;
};

const url = Deno.env.get("SUPABASE_URL")!;
const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") || "{}");
const serviceKey = secretKeys.default || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const resendKey = Deno.env.get("RESEND_API_KEY")!;
const from = Deno.env.get("ALERT_FROM_EMAIL") || "BCFC London <availability@bcfclondon.co.uk>";
const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function update(id: number, fields: Record<string, unknown>) {
  const { error } = await supabase.from("availability_alert_deliveries")
    .update(fields).eq("id", id).eq("state", "sending");
  if (error) throw error;
}

Deno.serve(async (request) => {
  const secret = request.headers.get("x-alert-secret");
  if (request.method !== "POST" || secret?.length !== 64) {
    return new Response("Forbidden", { status: 403 });
  }
  const { data: authorized, error: authError } = await supabase.rpc("authorize_availability_alert_sender", { p_secret: secret });
  if (authError) return new Response("Authorization unavailable", { status: 503 });
  if (authorized !== true) return new Response("Forbidden", { status: 403 });
  if (!resendKey || !from || !serviceKey) return new Response("Not configured", { status: 503 });

  // The database reserves capacity atomically below the provider's free ceilings.
  const { data, error } = await supabase.rpc("claim_availability_alerts", { p_limit: 5 });
  if (error) return new Response("Unable to claim alerts", { status: 503 });
  const outcomes = [];
  for (const row of (data || []) as Delivery[]) {
    outcomes.push(await deliverOnce(row, { fetchImpl: fetch, mark: update, resendKey, from }));
    await new Promise((resolve) => setTimeout(resolve, 550));
  }
  return Response.json({ claimed: outcomes.length, outcomes });
});
