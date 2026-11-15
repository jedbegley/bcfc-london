-- Publish only the saved display fields for this completed fixture.
create function public.get_haydons_park_result_players()
returns table(id bigint, full_name text, starting boolean, goals integer, assists integer, fantasy_points integer)
language sql stable security definer
set search_path = ''
as $$
  select p.id, p.full_name, coalesce(s.starting, false),
         t.goals::integer, t.assists::integer, t.fantasy_points
  from public.matches m
  join public.match_squad s on s.match_id = m.id and s.selected
  join public."Players" p on p.id = s.player_id
  left join public.match_stats t on t.match_id = m.id and t.player_id = s.player_id
  where m.id = 13 and m.match_date = '2026-11-15' and m.status = 'Completed'
  order by coalesce(s.starting, false) desc, p.full_name, p.id;
$$;
revoke execute on function public.get_haydons_park_result_players() from public;
grant execute on function public.get_haydons_park_result_players() to anon, authenticated;

-- Keep the existing voter ownership, unique vote and no-self-vote rules.
create policy "Haydons Park starter nominations"
on public.motm_votes as restrictive for insert to authenticated
with check (
  match_id <> 13 or (
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

update public.matches
set sumup_link = 'https://pay.sumup.com/b2c/QR3SOAUS'
where id = 13 and match_date = '2026-11-15' and lower(opponent) = 'haydons park'
  and status = 'Completed' and sumup_link is null;
