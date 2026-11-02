import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const { PGlite } = await import(process.env.BCFC_PGLITE_MODULE || "@electric-sql/pglite");

test("East Putney voting accepts only an authenticated voter, a recorded candidate and one non-self vote while open", async (context) => {
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
    create table public.matches(id bigint primary key,status text,motm_voting_closed boolean);
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
    insert into public.matches values (11,'Completed',false),(12,'Completed',true);
    insert into public.match_stats values (11,1),(11,2),(11,3);
  `);
  const migration = await readFile(new URL("../supabase/migrations/20261102082708_east_putney_motm_eligibility.sql", import.meta.url), "utf8");
  await db.exec(migration);
  await db.exec(`set request.jwt.claims='{"sub":"00000000-0000-0000-0000-000000000001"}'; set role authenticated;`);

  const vote = (voter, candidate, match = 11) => db.exec(`insert into public.motm_votes values(${match},${voter},${candidate});`);
  await assert.rejects(vote(1, 1), /motm_votes_no_self_vote/);
  await assert.rejects(vote(2, 3), /row-level security/);
  await assert.rejects(vote(1, 4), /row-level security/);
  await db.exec("reset role; update public.matches set motm_voting_closed=true where id=11; set role authenticated;");
  await assert.rejects(vote(1, 3), /row-level security/);
  await db.exec("reset role; update public.matches set motm_voting_closed=false where id=11; set role authenticated;");
  await vote(1, 3);
  await assert.rejects(vote(1, 2), /duplicate key/);
  await db.exec("reset role;");
  const result = await db.query("select count(*)::int as total from public.motm_votes");
  assert.equal(result.rows[0].total, 1);
});
