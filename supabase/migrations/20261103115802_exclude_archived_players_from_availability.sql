-- The existing availability viewer lists every Players row, including
-- archived legacy profiles marked is_guest. Keep its manager access check
-- and output shape; omit guests from current fixture response lists.
create or replace function public.get_fixture_availability(p_match_id bigint)
returns table(full_name text, availability_status text)
language plpgsql stable security definer set search_path = ''
as $function$
begin
  if auth.uid() is null or not exists (
    select 1 from public."Players" p
    where p.user_id = auth.uid()
      and (p.is_admin = true or p.can_view_availability = true)
  ) then
    raise exception 'Availability viewer access required' using errcode = '42501';
  end if;

  if not exists (
    select 1 from public.matches m
    where m.id = p_match_id and m.status <> 'Completed'
  ) then
    raise exception 'Upcoming fixture not found' using errcode = '22023';
  end if;

  return query
    select p.full_name,
           coalesce(a.status, 'no_response') as availability_status
    from public."Players" p
    left join public.availability a
      on a.player_id = p.id and a.match_id = p_match_id
    where p.is_guest = false
    order by p.full_name, p.id;
end;
$function$;
