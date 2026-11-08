-- Public result data for the completed 8 November fixture only.
create function public.get_three_little_birds_starting_lineup()
returns table(id bigint, full_name text, position text, goals integer, assists integer)
language sql stable security definer
set search_path = ''
as $$
  select distinct p.id::bigint, p.full_name, s.fantasy_position, t.goals::integer, t.assists::integer
  from public.match_squad s
  join public.matches m on m.id = s.match_id
  join public."Players" p on p.id = s.player_id
  left join public.match_stats t on t.match_id = s.match_id and t.player_id = s.player_id
  where m.id = 12 and m.match_date = '2026-11-08'
    and m.status = 'Completed' and s.selected and s.starting
  order by p.full_name;
$$;
revoke execute on function public.get_three_little_birds_starting_lineup() from public;
grant execute on function public.get_three_little_birds_starting_lineup() to anon, authenticated;

-- Narrow candidate eligibility while retaining existing voter ownership and
-- the unique vote and no-self-vote constraints. Voters need not have started.
create policy "Three Little Birds starter nominations"
on public.motm_votes as restrictive for insert to authenticated
with check (
  match_id <> 12 or (
    exists (
      select 1 from public.matches m
      where m.id = motm_votes.match_id and m.status = 'Completed'
        and m.motm_voting_closed = false
    )
    and exists (
      select 1 from public.match_squad s
      where s.match_id = motm_votes.match_id and s.player_id = motm_votes.voted_player_id
        and s.selected and s.starting
    )
  )
);
