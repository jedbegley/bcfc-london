-- Fixture 10: saved stat rows are the manager-confirmed appearances,
-- including the substitute. Leave voter ownership and existing constraints intact.
create policy "Kew Antigua played nominations"
on public.motm_votes as restrictive for insert to authenticated
with check (
  match_id <> 10 or exists (
    select 1 from public.matches m
    join public.match_stats s on s.match_id = m.id
    where m.id = motm_votes.match_id
      and m.status = 'Completed' and m.motm_voting_closed = false
      and s.player_id = motm_votes.voted_player_id
  )
);

-- Only the requested payment field; do not alter result, report or statistics.
update public.matches
set sumup_link = 'https://pay.sumup.com/b2c/Q2Z9VH80'
where id = 10 and opponent = 'Kew Antigua' and match_date = date '2026-11-22';
