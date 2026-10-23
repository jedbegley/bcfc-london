import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
const { PGlite } = await import(process.env.BCFC_PGLITE_MODULE || '@electric-sql/pglite');

test('closed public fixtures reject player writes, produce no alerts, and reopen only on explicit update', async (t) => {
  const db = new PGlite();
  t.after(() => db.close());
  await db.exec(`
    create role anon; create role authenticated; create role service_role bypassrls;
    create schema auth; create schema vault;
    create table vault.decrypted_secrets(name text,decrypted_secret text);
    create function auth.uid() returns uuid language sql stable as $$select null::uuid$$;
    create table auth.users(id uuid primary key,email text);
    create table public."Players"(id bigint primary key,full_name text,user_id uuid,is_admin boolean);
    create function public.current_user_is_admin() returns boolean language sql stable as $$select false$$;
    create table public.matches(id bigint primary key,opponent text,match_date date,kickoff_time time,status text);
    create table public.availability(id bigint generated always as identity primary key,player_id bigint,match_id bigint,status text);
    insert into matches values(1,'Existing open',(now() at time zone 'Europe/London')::date,'23:59:59','Upcoming');
    insert into "Players" values(1,'Manager','00000000-0000-0000-0000-000000000001',true),
      (2,'Player','00000000-0000-0000-0000-000000000002',false);
    insert into auth.users values('00000000-0000-0000-0000-000000000001','manager@example.com');
    grant usage on schema auth to authenticated;
    grant select on matches to authenticated;
    grant select,insert,update,delete on availability to authenticated;
    grant usage on sequence availability_id_seq to authenticated;
    alter table availability enable row level security;
    create policy own_response on availability for all to authenticated using(player_id=2) with check(player_id=2);
    alter table matches enable row level security;
    create policy public_fixtures on matches for select using(true);
  `);
  const original = (await readFile(new URL('../supabase/migrations/20261018150000_availability_alerts.sql',import.meta.url),'utf8'))
    .replace('create extension if not exists pg_net with schema extensions;','');
  await db.exec(original);
  await db.exec(await readFile(new URL('../supabase/migrations/20261023142111_fixture_availability_control.sql',import.meta.url),'utf8'));
  const rows = async (sql) => (await db.query(sql)).rows;
  assert.equal((await rows('select availability_open from matches where id=1'))[0].availability_open,true);
  await db.exec(`insert into matches values(2,'Closed',(now() at time zone 'Europe/London')::date,'23:59:59','Upcoming',false); set role authenticated;`);
  assert.equal((await rows('select count(*)::int n from matches'))[0].n,2);
  await assert.rejects(db.exec(`insert into availability(player_id,match_id,status) values(2,2,'available')`),/Availability is closed/);
  await db.exec(`insert into availability(player_id,match_id,status) values(2,1,'available'); reset role;`);
  assert.equal((await rows('select count(*)::int n from availability_change_history'))[0].n,1);
  assert.equal((await rows('select count(*)::int n from availability_alert_deliveries'))[0].n,1);
  await db.exec(`update matches set availability_open=false where id=1; set role authenticated;`);
  await assert.rejects(db.exec(`update availability set status='unavailable' where match_id=1`),/Availability is closed/);
  await assert.rejects(db.exec(`delete from availability where match_id=1`),/Availability is closed/);
  await db.exec(`reset role; update matches set availability_open=true where id=1; set role authenticated; update availability set status='unavailable' where match_id=1; reset role;`);
  assert.equal((await rows('select count(*)::int n from availability_change_history'))[0].n,2);
  assert.equal((await rows('select count(*)::int n from availability_alert_deliveries'))[0].n,2);
  assert.equal((await rows('select count(*)::int n from availability_change_history where match_id=2'))[0].n,0);
});
