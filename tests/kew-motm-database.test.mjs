import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const { PGlite } = await import(process.env.BCFC_PGLITE_MODULE || "@electric-sql/pglite");

test("Kew voting includes a played substitute, excludes nonparticipants and preserves ownership/one-vote/no-self rules", async (context) => {
  const db = new PGlite();
  context.after(() => db.close());
  await db.exec(`
    create role authenticated;
    create schema auth;
    create function auth.uid() returns uuid language sql stable as
      $$ select (current_setting('request.jwt.claims',true)::jsonb->>'sub')::uuid $$;
    grant usage on schema auth to authenticated;
    grant execute on function auth.uid() to authenticated;
    create table public."Players"(id bigint primary key,user_id uuid);
    create table public.matches(id bigint primary key,status text,motm_voting_closed boolean, opponent text, match_date date, sumup_link text);
    create table public.match_stats(match_id bigint,player_id bigint);
    create table public.motm_votes(
      match_id bigint,voter_player_id bigint,voted_player_id bigint,
      unique(match_id,voter_player_id));
    grant select on public."Players",public.matches,public.match_stats to authenticated;
    grant insert,select on public.motm_votes to authenticated;
    alter table public.motm_votes enable row level security;
    create policy "Authenticated players can vote for MOTM"
      on public.motm_votes for insert to authenticated
      with check (exists(select 1 from public."Players" p
        where p.id=voter_player_id and p.user_id=auth.uid()));
    insert into public."Players" values
      (1,'00000000-0000-0000-0000-000000000001'),
      (2,'00000000-0000-0000-0000-000000000002'),
      (3,'00000000-0000-0000-0000-000000000003');
    insert into public.matches values (10,'Completed',false,'Kew Antigua','2026-11-22',null),(11,'Completed',true,'Other','2026-11-15','historical');
    insert into public.match_stats values (10,1),(10,2),(10,3);
  `);
  const migration = await readFile(new URL("../supabase/migrations/20261102082708_east_putney_motm_eligibility.sql", import.meta.url), "utf8");
  await db.exec(migration);
  const before = await db.query('select * from public.match_stats order by player_id');
  await db.exec(await readFile(new URL('../supabase/migrations/20261122130109_kew_antigua_played_motm.sql', import.meta.url), 'utf8'));
  assert.deepEqual((await db.query('select * from public.match_stats order by player_id')).rows, before.rows);
  assert.equal((await db.query('select sumup_link from public.matches where id=10')).rows[0].sumup_link, 'https://pay.sumup.com/b2c/Q2Z9VH80');
  assert.equal((await db.query('select sumup_link from public.matches where id=11')).rows[0].sumup_link, 'historical');
  await db.exec(`set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000001"}'; set role authenticated;`);

  const vote = (voter, candidate, match = 10) => db.exec(`insert into public.motm_votes values(${match},${voter},${candidate});`);
  await assert.rejects(vote(1, 1), /motm_votes_no_self_vote/);
  await assert.rejects(vote(2, 3), /row-level security/);
  await assert.rejects(vote(1, 4), /row-level security/);
  await db.exec("reset role; update public.matches set motm_voting_closed=true where id=10; set role authenticated;");
  await assert.rejects(vote(1, 3), /row-level security/);
  await db.exec("reset role; update public.matches set motm_voting_closed=false where id=10; set role authenticated;");
  await db.exec("reset role; update public.matches set status='Upcoming' where id=10; set role authenticated;");
  await assert.rejects(vote(1, 3), /row-level security/);
  await db.exec("reset role; update public.matches set status='Completed' where id=10; set role authenticated;");
  // Candidate 3 represents the recorded substitute; no starter requirement.
  await vote(1, 3);
  await assert.rejects(vote(1, 2), /duplicate key/);
  await db.exec("reset role;");
  const result = await db.query("select count(*)::int as total from public.motm_votes");
  assert.equal(result.rows[0].total, 1);
});
