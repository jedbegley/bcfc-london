export function label(value) {
  return value === "no_response" ? "No Response" :
    value.slice(0, 1).toUpperCase() + value.slice(1);
}

export function emailFor(row, from) {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  }).format(new Date(row.changed_at));
  return {
    from, to: [row.recipient_email],
    subject: `BCFC London availability: ${row.player_name} — ${row.opponent}`,
    text: [
      `Player: ${row.player_name}`,
      `Fixture: Bristol City v ${row.opponent} (${row.match_date}, ${row.kickoff_time?.slice(0, 5) || "kick-off TBC"})`,
      `Previous: ${label(row.previous_status)}`,
      `New: ${label(row.new_status)}`,
      `Changed: ${time}`,
      `View: https://www.bcfclondon.co.uk/dashboard`,
    ].join("\n"),
  };
}

export async function deliverOnce(row, { fetchImpl, mark, resendKey, from, now = () => Date.now() }) {
  let response;
  try {
    response = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `availability-delivery-${row.delivery_id}`,
      },
      body: JSON.stringify(emailFor(row, from)),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    // Unknown outcome: provider may have accepted before the connection failed.
    await mark(row.delivery_id, {
      state: "sending", leased_until: new Date(now() + 5 * 60_000).toISOString(),
      last_error: `Outcome unknown: ${String(error).slice(0, 300)}`,
    });
    return "unknown";
  }
  const result = await response.json().catch(() => ({}));
  if (response.ok && result.id) {
    await mark(row.delivery_id, {
      state: "sent", sent_at: new Date(now()).toISOString(),
      provider_message_id: result.id, leased_until: null, last_error: null,
    });
    return "sent";
  }
  const retry = response.status === 429 || response.status >= 500;
  await mark(row.delivery_id, {
    state: retry ? "failed" : "needs_review", leased_until: null,
    next_attempt_at: new Date(now() + (response.status === 429 ? 60 : 5) * 60_000).toISOString(),
    last_error: `Email provider HTTP ${response.status}: ${JSON.stringify(result).slice(0, 400)}`,
  });
  return "failed";
}
