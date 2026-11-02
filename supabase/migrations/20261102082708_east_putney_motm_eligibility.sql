-- Players cannot vote for themselves. No historical self-votes existed at
-- preparation time; this constraint also protects writes outside the UI.
alter table public.motm_votes
  add constraint motm_votes_no_self_vote
  check (voter_player_id <> voted_player_id);

-- Preserve the existing voter ownership check. For the East Putney fixture,
-- require a recorded match appearance and an open, completed match as well.
drop policy "Authenticated players can vote for MOTM" on public.motm_votes;
create policy "Authenticated players can vote for MOTM"
on public.motm_votes for insert to authenticated
with check (
  exists (
    select 1 from public."Players" p
    where p.id = motm_votes.voter_player_id and p.user_id = (select auth.uid())
  )
  and (
    motm_votes.match_id <> 11
    or exists (
      select 1 from public.matches m
      join public.match_stats ms
        on ms.match_id = m.id and ms.player_id = motm_votes.voted_player_id
      where m.id = motm_votes.match_id
        and m.status = 'Completed'
        and m.motm_voting_closed = false
    )
  )
);
