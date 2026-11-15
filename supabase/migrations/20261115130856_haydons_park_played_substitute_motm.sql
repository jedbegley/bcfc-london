-- The manager confirmed every selected player with saved stats played in fixture 13.
-- Use one candidate list for the picker and insert policy without changing stats.
create function public.get_haydons_park_motm_candidates()
returns table(id bigint, full_name text)
language sql stable security definer
set search_path = ''
as $$
  select distinct p.id, p.full_name
  from public.matches m
  join public.match_squad s on s.match_id = m.id and s.selected
  join public."Players" p on p.id = s.player_id
  where m.id = 13 and m.match_date = '2026-11-15' and m.status = 'Completed'
    and (s.starting or exists (
      select 1 from public.match_stats t where t.match_id = s.match_id and t.player_id = s.player_id
    ))
  order by p.full_name, p.id;
$$;
revoke execute on function public.get_haydons_park_motm_candidates() from public;
grant execute on function public.get_haydons_park_motm_candidates() to anon, authenticated;

alter policy "Haydons Park starter nominations" on public.motm_votes
rename to "Haydons Park played nominations";

alter policy "Haydons Park played nominations" on public.motm_votes
with check (
  match_id <> 13 or (
    exists (
      select 1 from public.matches m
      where m.id = motm_votes.match_id and m.status = 'Completed'
        and m.motm_voting_closed = false
    )
    and exists (
      select 1 from public.get_haydons_park_motm_candidates() c
      where c.id = motm_votes.voted_player_id
    )
  )
);
