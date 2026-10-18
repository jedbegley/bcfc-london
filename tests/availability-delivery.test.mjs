import assert from "node:assert/strict";
import { test } from "node:test";
import { deliverOnce, emailFor } from "../supabase/functions/send-availability-alerts/delivery.mjs";

const row = {
  delivery_id: 17, change_id: 10, recipient_email: "manager@example.com",
  player_name: "Alex Player", opponent: "Larkhall City", match_date: "2026-10-18",
  kickoff_time: "10:30:00", previous_status: "no_response", new_status: "available",
  changed_at: "2026-10-17T12:30:00Z",
};
const config = { resendKey: "test", from: "BCFC <alerts@example.com>", now: () => Date.UTC(2026, 9, 17, 12, 31) };

test("email contains every required field in UK time", () => {
  const mail = emailFor(row, config.from).text;
  for (const part of ["Alex Player", "Larkhall City", "No Response", "Available", "17 October 2026", "13:30", "BST"])
    assert.ok(mail.includes(part), part);
});

test("provider success records one delivery and stable idempotency key", async () => {
  const marks = []; const requests = [];
  const result = await deliverOnce(row, { ...config,
    mark: async (...args) => marks.push(args),
    fetchImpl: async (_url, options) => {
      requests.push(options); return { ok: true, status: 200, json: async () => ({ id: "email-1" }) };
    },
  });
  assert.equal(result, "sent");
  assert.equal(requests.length, 1);
  assert.equal(requests[0].headers["Idempotency-Key"], "availability-delivery-17");
  assert.equal(marks[0][1].state, "sent");
  assert.equal(marks[0][1].provider_message_id, "email-1");
});

test("known transient failure is retried, permanent failure goes to review", async () => {
  for (const [status, state] of [[503, "failed"], [429, "failed"], [400, "needs_review"]]) {
    const marks = [];
    await deliverOnce(row, { ...config, mark: async (_, fields) => marks.push(fields),
      fetchImpl: async () => ({ ok: false, status, json: async () => ({ error: "unavailable" }) }),
    });
    assert.equal(marks[0].state, state);
    assert.ok(Date.parse(marks[0].next_attempt_at) > config.now());
  }
});

test("ambiguous network failure keeps lease and reuses same key on retry", async () => {
  const marks = []; const keys = [];
  const fetchImpl = async (_url, options) => {
    keys.push(options.headers["Idempotency-Key"]);
    if (keys.length === 1) throw new Error("connection lost");
    return { ok: true, json: async () => ({ id: "email-1" }) };
  };
  const options = { ...config, fetchImpl, mark: async (_, fields) => marks.push(fields) };
  assert.equal(await deliverOnce(row, options), "unknown");
  assert.equal(marks[0].state, "sending");
  assert.equal(await deliverOnce(row, options), "sent");
  assert.deepEqual(keys, ["availability-delivery-17", "availability-delivery-17"]);
});
