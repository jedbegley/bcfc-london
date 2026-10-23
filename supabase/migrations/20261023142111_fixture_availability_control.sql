begin;
-- Existing fixtures keep their existing behaviour. Public visibility is independent.
alter table public.matches add column availability_open boolean not null default true;

-- Enforce closure for API writes and stale clients before history/outbox triggers run.
create function public.require_open_fixture_availability()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare v_match_id bigint; v_open boolean;
begin
  v_match_id := case when tg_op = 'DELETE' then old.match_id else new.match_id end;
  select m.availability_open into v_open from public.matches m where m.id = v_match_id;
  if v_open is false then
    raise exception 'Availability is closed for this fixture' using errcode = '42501';
  end if;
  if tg_op = 'UPDATE' and old.match_id is distinct from new.match_id then
    if exists(select 1 from public.matches m where m.id = old.match_id and not m.availability_open) then
      raise exception 'Availability is closed for this fixture' using errcode = '42501';
    end if;
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;
revoke all on function public.require_open_fixture_availability() from public, anon, authenticated;
create trigger require_open_fixture_availability
before insert or update or delete on public.availability
for each row execute function public.require_open_fixture_availability();
commit;
