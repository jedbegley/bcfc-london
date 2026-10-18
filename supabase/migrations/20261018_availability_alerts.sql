-- Additive migration: does not modify existing player, fixture or availability rows.
begin;

create extension if not exists pg_net with schema extensions;

create table public.availability_change_history (
  id bigint generated always as identity primary key,
  match_id bigint not null,
  player_id bigint not null,
  actor_user_id uuid,
  previous_status text not null,
  new_status text not null,
  changed_at timestamptz not null default clock_timestamp(),
  alert_eligible boolean not null default false
);
create index on public.availability_change_history (match_id, changed_at desc);

create table public.availability_alert_preferences (
  user_id uuid primary key,
  email_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.availability_alert_deliveries (
  id bigint generated always as identity primary key,
  change_id bigint not null references public.availability_change_history(id) on delete cascade,
  recipient_user_id uuid not null,
  state text not null default 'pending' check (state in ('pending','sending','sent','failed','needs_review','cancelled')),
  attempts integer not null default 0,
  first_attempt_at timestamptz,
  leased_until timestamptz,
  next_attempt_at timestamptz not null default now(),
  sent_at timestamptz,
  provider_message_id text,
  last_error text,
  unique (change_id, recipient_user_id)
);
create index on public.availability_alert_deliveries (state, next_attempt_at);

create function public.availability_is_admin(p_user_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public."Players" where user_id = p_user_id and is_admin = true);
$$;
revoke all on function public.availability_is_admin(uuid) from public, anon;
grant execute on function public.availability_is_admin(uuid) to authenticated, service_role;

alter table public.availability_change_history enable row level security;
alter table public.availability_alert_preferences enable row level security;
alter table public.availability_alert_deliveries enable row level security;
revoke all on public.availability_change_history, public.availability_alert_preferences,
  public.availability_alert_deliveries from anon, authenticated;
grant select on public.availability_change_history to authenticated;
grant select, insert, update on public.availability_alert_preferences to authenticated;
create policy "admins read change history" on public.availability_change_history for select to authenticated
  using (public.availability_is_admin(auth.uid()));
create policy "admins read own preference" on public.availability_alert_preferences for select to authenticated
  using (user_id = auth.uid() and public.availability_is_admin(auth.uid()));
create policy "admins create own preference" on public.availability_alert_preferences for insert to authenticated
  with check (user_id = auth.uid() and public.availability_is_admin(auth.uid()));
create policy "admins update own preference" on public.availability_alert_preferences for update to authenticated
  using (user_id = auth.uid() and public.availability_is_admin(auth.uid()))
  with check (user_id = auth.uid() and public.availability_is_admin(auth.uid()));
-- Delivery records contain recipient information and are service-role only.
revoke all on public.availability_alert_deliveries from anon, authenticated;

create function public.record_availability_change()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  v_old text;
  v_new text;
  v_date date;
  v_time time;
  v_status text;
  v_changed timestamptz := clock_timestamp();
  v_start timestamptz;
  v_kickoff timestamptz;
  v_id bigint;
  v_match_id bigint;
  v_player_id bigint;
begin
  if tg_op = 'INSERT' then
    v_old := 'no_response'; v_new := new.status;
    v_match_id := new.match_id; v_player_id := new.player_id;
  elsif tg_op = 'DELETE' then
    v_old := old.status; v_new := 'no_response';
    v_match_id := old.match_id; v_player_id := old.player_id;
  else
    v_old := old.status; v_new := new.status;
    v_match_id := new.match_id; v_player_id := new.player_id;
  end if;
  if v_old is not distinct from v_new then
    return case when tg_op = 'DELETE' then old else new end;
  end if;

  select m.match_date, m.kickoff_time, m.status into v_date, v_time, v_status
  from public.matches m where m.id = v_match_id;
  if v_date is not null and v_time is not null and v_status is distinct from 'Completed' then
    -- ISO weekdays: Friday=5; this chooses the most recent Friday on/before the fixture.
    v_start := ((v_date - ((extract(isodow from v_date)::int + 2) % 7))::timestamp
                + interval '12 hours') at time zone 'Europe/London';
    v_kickoff := (v_date::timestamp + v_time) at time zone 'Europe/London';
  end if;

  insert into public.availability_change_history
    (match_id, player_id, actor_user_id, previous_status, new_status, changed_at, alert_eligible)
  values
    (v_match_id, v_player_id,
     auth.uid(), coalesce(v_old,'no_response'), coalesce(v_new,'no_response'), v_changed,
     v_start is not null and v_changed >= v_start and v_changed < v_kickoff)
  returning id into v_id;

  if v_start is not null and v_changed >= v_start and v_changed < v_kickoff then
    insert into public.availability_alert_deliveries(change_id, recipient_user_id)
    select v_id, p.user_id from public."Players" p
    left join public.availability_alert_preferences pref on pref.user_id = p.user_id
    where p.is_admin = true and p.user_id is not null
      and coalesce(pref.email_enabled, true)
    on conflict (change_id, recipient_user_id) do nothing;
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;
revoke all on function public.record_availability_change() from public, anon, authenticated;
create trigger record_availability_change after insert or update or delete on public.availability
  for each row execute function public.record_availability_change();

create function public.claim_availability_alerts(p_limit integer default 20)
returns table(delivery_id bigint, change_id bigint, recipient_email text,
  player_name text, opponent text, match_date date, kickoff_time text,
  previous_status text, new_status text, changed_at timestamptz)
language plpgsql security definer set search_path = '' as $$
begin
  if auth.role() <> 'service_role' then
    raise exception 'Service role required' using errcode = '42501';
  end if;
  -- A manager may opt out or lose admin access after the change was queued.
  update public.availability_alert_deliveries d set state = 'cancelled'
  where d.state in ('pending','failed') and
    (not exists (select 1 from public."Players" p
      where p.user_id = d.recipient_user_id and p.is_admin = true)
     or exists (select 1 from public.availability_alert_preferences pref
       where pref.user_id = d.recipient_user_id and pref.email_enabled = false));
  update public.availability_alert_deliveries d set state = 'needs_review',
    last_error = 'Unknown provider outcome after 24 hours; automatic retry withheld to avoid duplicate email'
  where d.state = 'sending' and d.leased_until < now()
    and d.first_attempt_at <= now() - interval '23 hours';
  return query
  with claim as (
    select d.id from public.availability_alert_deliveries d
    where d.attempts < 6 and d.next_attempt_at <= now()
      and (d.state in ('pending','failed')
        or (d.state = 'sending' and d.leased_until < now()
          and d.first_attempt_at > now() - interval '23 hours'))
      and exists (select 1 from auth.users u where u.id = d.recipient_user_id and u.email is not null)
    order by d.id for update skip locked limit least(greatest(p_limit, 1), 50)
  ), leased as (
    update public.availability_alert_deliveries d
    set state = 'sending', attempts = d.attempts + 1,
        first_attempt_at = coalesce(d.first_attempt_at, now()),
        leased_until = now() + interval '5 minutes'
    from claim where d.id = claim.id returning d.*
  )
  select d.id, c.id, u.email::text, p.full_name::text, m.opponent::text,
         m.match_date, m.kickoff_time::text,
         c.previous_status, c.new_status, c.changed_at
  from leased d
  join public.availability_change_history c on c.id = d.change_id
  join public."Players" p on p.id = c.player_id
  join public.matches m on m.id = c.match_id
  join auth.users u on u.id = d.recipient_user_id
  where exists (select 1 from public."Players" manager
    where manager.user_id = d.recipient_user_id and manager.is_admin = true)
    and coalesce((select pref.email_enabled from public.availability_alert_preferences pref
      where pref.user_id = d.recipient_user_id), true);
end;
$$;
revoke all on function public.claim_availability_alerts(integer) from public, anon, authenticated;
grant execute on function public.claim_availability_alerts(integer) to service_role;

-- A webhook on INSERT to availability_alert_deliveries wakes the sender promptly.
-- A Supabase Cron retry job also invokes it, so transient webhook failures do not lose alerts.
commit;
