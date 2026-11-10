begin;

alter table public.matches
  add column availability_withdrawals_open boolean not null default false;

create or replace function public.require_open_fixture_availability()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare v_match_id bigint; v_open boolean;
begin
  v_match_id := case when tg_op = 'DELETE' then old.match_id else new.match_id end;
  select m.availability_open into v_open from public.matches m where m.id = v_match_id;
  if v_open is false and tg_op = 'UPDATE' then
    if old.match_id = new.match_id and old.player_id = new.player_id
      and old.id = new.id and old.status = 'available' and new.status = 'unavailable'
      and exists (
        select 1 from public.matches m where m.id = v_match_id
          and m.availability_withdrawals_open and not m.availability_open
          and m.status = 'Upcoming'
          and (m.match_date + m.kickoff_time) at time zone 'Europe/London' > statement_timestamp()
      ) then
      return new;
    end if;
  end if;
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

-- Enable withdrawals for the closed Downing Street friendly.
update public.matches
set availability_withdrawals_open = true
where opponent = 'Downing Street XI' and match_date = date '2026-11-18'
  and status = 'Upcoming' and not availability_open;

commit;
