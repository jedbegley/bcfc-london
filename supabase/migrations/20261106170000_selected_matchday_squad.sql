-- Use the manager's saved squad for match previews when it has been selected.
-- Fixtures without any saved selections retain the existing availability fallback.
create or replace function public.get_public_matchday_squad(p_match_id bigint)
returns table(full_name text)
language sql stable security definer
set search_path = ''
as $function$
  select p.full_name
  from public."Players" as p
  join public.matches as m on m.id = p_match_id and m.status = 'Upcoming'
  where p.full_name is not null
    and (
      (exists (select 1 from public.match_squad as chosen
               where chosen.match_id = p_match_id)
       and exists (select 1 from public.match_squad as chosen
                   where chosen.match_id = p_match_id
                     and chosen.player_id = p.id
                     and chosen.selected = true))
      or
      (not exists (select 1 from public.match_squad as chosen
                   where chosen.match_id = p_match_id)
       and exists (select 1 from public.availability as a
                   where a.match_id = p_match_id
                     and a.player_id = p.id
                     and a.status = 'available'))
    )
  order by p.full_name;
$function$;
