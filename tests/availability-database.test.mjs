// Run with PostgreSQL WASM test runtime @electric-sql/pglite@0.5.10.
// Set BCFC_PGLITE_MODULE to its absolute module path when installed outside this repo.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
const { PGlite } = await import(process.env.BCFC_PGLITE_MODULE || "@electric-sql/pglite");

test("real migration: changes, outbox, claims, opt-out and manager access", async (context) => {
  const db = new PGlite();
  context.after(() => db.close());
  await db.exec(`
    create role anon; create role authenticated; create role service_role bypassrls;
    create schema auth;
    create schema vault;
    create table vault.decrypted_secrets(name text, decrypted_secret text);
    insert into vault.decrypted_secrets values('availability_alert_secret',repeat('a',64));
    create function auth.uid() returns uuid language sql stable as
      $$ select (current_setting('request.jwt.claims',true)::jsonb->>'sub')::uuid $$;
    grant usage on schema auth to authenticated, service_role;
    create table auth.users(id uuid primary key,email text);
    create table public."Players"(id bigint primary key,full_name text,user_id uuid,is_admin boolean);
    create table public.matches(id bigint primary key,opponent text,match_date date,kickoff_time time,status text);
    create table public.availability(id bigint generated always as identity primary key,
      player_id bigint,match_id bigint,status text,responded_at timestamptz,notes text,
      unique(player_id,match_id));
    create function public.current_user_is_admin() returns boolean
      language sql stable security definer set search_path='' as
      $$ select exists(select 1 from public."Players" where user_id=auth.uid() and is_admin=true) $$;
    insert into auth.users values ('00000000-0000-0000-0000-000000000001','manager@example.com'),
      ('00000000-0000-0000-0000-000000000002','player@example.com');
    insert into public."Players" values
      (1,'Manager','00000000-0000-0000-0000-000000000001',true),
      (2,'Player','00000000-0000-0000-0000-000000000002',false);
    insert into public.matches values
      (1,'Opponent',(now() at time zone 'Europe/London')::date,'23:59:59','Upcoming'),
      (2,'Next Week',(now() at time zone 'Europe/London')::date+7,'23:59:59','Upcoming'),
      (3,'Completed',(now() at time zone 'Europe/London')::date,'23:59:59','Completed');
  `);
  const migration = (await readFile(new URL("../supabase/migrations/20261018150000_availability_alerts.sql", import.meta.url), "utf8"))
    .replace("create extension if not exists pg_net with schema extensions;", "-- pg_net is tested separately on Supabase; no network calls in this migration.");
  await db.exec(migration);
  const rows = async (sql) => (await db.query(sql)).rows;
  assert.equal((await rows("select public.authorize_availability_alert_sender(repeat('a',64)) as allowed"))[0].allowed,true);
  assert.equal((await rows("select public.authorize_availability_alert_sender(repeat('b',64)) as allowed"))[0].allowed,false);
  await db.exec(`insert into public.availability(player_id,match_id,status) values(2,1,'available');`);
  let history = await rows("select * from public.availability_change_history order by id");
  assert.equal(history.length, 1);
  assert.equal(history[0].previous_status,"no_response");
  assert.equal(history[0].new_status,"available");
  assert.equal(history[0].alert_eligible,true);
  assert.equal((await rows("select * from public.availability_alert_deliveries")).length,1);
  await db.exec(`update public.availability set responded_at=now(),notes='same status' where match_id=1;`);
  assert.equal((await rows("select * from public.availability_change_history")).length,1);
  await db.exec(`update public.availability set status='unavailable' where match_id=1;`);
  assert.equal((await rows("select * from public.availability_alert_deliveries")).length,2);
  const claimed = await rows("select * from public.claim_availability_alerts(20)");
  assert.equal(claimed.length,2);
  assert.equal(claimed[0].recipient_email,"manager@example.com");
  assert.equal((await rows("select * from public.claim_availability_alerts(20)")).length,0,"active leases prevent a second worker sending duplicates");
  await db.exec("update public.availability_alert_deliveries set state='failed',leased_until=null where id=1;");
  assert.equal((await rows("select * from public.claim_availability_alerts(20)")).length,1,"failed delivery can be reclaimed");
  await db.exec("update public.availability_alert_deliveries set state='sent' where id=1;");
  assert.equal((await rows("select * from public.claim_availability_alerts(20)")).length,0,"sent deliveries cannot be reclaimed");
  await db.exec(`delete from public.availability where match_id=1;
    insert into public.availability(player_id,match_id,status) values(2,2,'available'),(2,3,'available');`);
  history = await rows("select * from public.availability_change_history order by id");
  assert.equal(history[2].new_status,"no_response");
  assert.equal(history[3].alert_eligible,false,"outside Friday window");
  assert.equal(history[4].alert_eligible,false,"completed fixture");
  await db.exec(`set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000002","role":"authenticated"}'; set role authenticated;`);
  assert.equal((await rows("select * from public.availability_change_history")).length,0,"ordinary player cannot read history");
  assert.equal((await rows("select * from public.availability_alert_deliveries")).length,0,"ordinary player cannot read email status");
  await assert.rejects(db.exec(`insert into public.availability_alert_preferences(user_id,email_enabled)
    values('00000000-0000-0000-0000-000000000002',false)`));
  await assert.rejects(db.query("select * from public.claim_availability_alerts(20)"));
  await assert.rejects(db.query("select public.authorize_availability_alert_sender(repeat('a',64))"));
  await db.exec(`reset role; set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}'; set role authenticated;`);
  assert.equal((await rows("select * from public.availability_change_history")).length,5);
  await db.exec(`insert into public.availability_alert_preferences(user_id,email_enabled)
    values('00000000-0000-0000-0000-000000000001',false); reset role;`);
  await db.exec(`insert into public.availability(player_id,match_id,status) values(2,1,'maybe');`);
  assert.equal((await rows("select count(*)::int as n from public.availability_alert_deliveries"))[0].n,3,"opt-out does not enqueue new emails");
  await db.exec("select * from public.claim_availability_alerts(20)");
  assert.equal((await rows("select count(*)::int as n from public.availability_alert_deliveries where state='cancelled'"))[0].n,1,"pending email is cancelled after opt-out");
  await db.exec(`update public.availability_alert_preferences set email_enabled=true;
    update public.availability_alert_deliveries set first_attempt_at=now()-interval '24 hours',
    leased_until=now()-interval '1 minute' where id=2; select * from public.claim_availability_alerts(5);`);
  assert.equal((await rows("select state from public.availability_alert_deliveries where id=2"))[0].state,"needs_review",
    "unknown outcomes are not resent after provider idempotency expires");
  await db.exec(`update public.availability_alert_preferences set email_enabled=true;
    update public.availability set status='unavailable' where match_id=1;
    with added as (
      insert into public.availability_change_history(match_id,player_id,previous_status,new_status)
      select 1,2,'no_response','available' from generate_series(1,79) returning id
    ) insert into public.availability_alert_deliveries(change_id,recipient_user_id,state,first_attempt_at,sent_at)
      select id,'00000000-0000-0000-0000-000000000001','sent',now(),now() from added;`);
  assert.equal((await rows("select * from public.claim_availability_alerts(5)")).length,0,
    "the daily free-plan safety cap blocks new claims without discarding pending alerts");
});
