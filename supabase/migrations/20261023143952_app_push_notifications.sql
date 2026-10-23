begin;
create table public.app_push_config(
 id boolean primary key default true check(id),
 public_key text not null,
 broadcasts_enabled boolean not null default false
);
alter table public.app_push_config enable row level security;
revoke all on public.app_push_config from anon,authenticated;
grant select on public.app_push_config to authenticated;
create policy "signed in players read push configuration" on public.app_push_config for select to authenticated
 using(exists(select 1 from public."Players" p where p.user_id=(select auth.uid())));

create table public.app_devices(
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 installation_id uuid not null,
 first_app_use timestamptz,
 last_app_use timestamptz,
 permission text not null default 'default' check(permission in('default','granted','denied','unsupported')),
 notifications_enabled boolean not null default false,
 endpoint text unique,
 p256dh text,
 auth_key text,
 updated_at timestamptz not null default now(),
 unique(user_id,installation_id)
);
create index on public.app_devices(user_id);
create table public.app_push_preferences(
 user_id uuid primary key references auth.users(id) on delete cascade,
 news boolean not null default true,
 availability boolean not null default true,
 report boolean not null default true
);
alter table public.app_devices enable row level security;
alter table public.app_push_preferences enable row level security;
create policy "device records use authenticated functions only" on public.app_devices for all to authenticated using(false) with check(false);
revoke all on public.app_devices,public.app_push_preferences from anon,authenticated;
grant select,insert,update on public.app_push_preferences to authenticated;
create policy "players read own push preferences" on public.app_push_preferences for select to authenticated using(user_id=(select auth.uid()));
create policy "players create own push preferences" on public.app_push_preferences for insert to authenticated with check(user_id=(select auth.uid()));
create policy "players update own push preferences" on public.app_push_preferences for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));

create table public.app_push_messages(
 id bigint generated always as identity primary key,
 kind text not null check(kind in('news','availability','report','test')),
 target text not null,
 title text not null,
 body text not null,
 url text not null,
 created_by uuid not null references auth.users(id),
 created_at timestamptz not null default now(),
 unique(kind,target)
);
create index on public.app_push_messages(created_at desc);
create table public.app_push_deliveries(
 id bigint generated always as identity primary key,
 message_id bigint not null references public.app_push_messages(id) on delete cascade,
 device_id uuid not null references public.app_devices(id) on delete cascade,
 state text not null default 'pending' check(state in('pending','sending','accepted','failed','needs_review','cancelled','expired')),
 attempts integer not null default 0,
 next_attempt_at timestamptz not null default now(),
 leased_until timestamptz,
 accepted_at timestamptz,
 last_error text,
 unique(message_id,device_id)
);
create index on public.app_push_deliveries(state,next_attempt_at);
create index on public.app_push_deliveries(device_id);
alter table public.app_push_messages enable row level security;
alter table public.app_push_deliveries enable row level security;
revoke all on public.app_push_messages,public.app_push_deliveries from anon,authenticated;
grant select on public.app_push_messages,public.app_push_deliveries to authenticated;
create policy "managers read announcements" on public.app_push_messages for select to authenticated using((select public.current_user_is_admin()));
create policy "managers read push delivery status" on public.app_push_deliveries for select to authenticated using((select public.current_user_is_admin()));
grant all on public.app_devices,public.app_push_messages,public.app_push_deliveries,public.app_push_config,public.app_push_preferences to service_role;

-- Push-service allowlist prevents user-provided subscriptions becoming an SSRF proxy.
create function public.valid_push_endpoint(p_endpoint text) returns boolean
language sql immutable set search_path='' as $$
 select length(p_endpoint) between 20 and 2048 and p_endpoint ~
 '^https://(fcm[.]googleapis[.]com|([a-z0-9-]+[.])*push[.]apple[.]com|([a-z0-9-]+[.])*push[.]services[.]mozilla[.]com|([a-z0-9-]+[.])*notify[.]windows[.]com|([a-z0-9-]+[.])*wns[.]windows[.]com)/[^[:space:]#]+$'
$$;
revoke all on function public.valid_push_endpoint(text) from public,anon,authenticated;

create function public.record_app_device(p_installation_id uuid,p_is_app boolean,p_permission text,p_subscription jsonb default null,p_disable boolean default false)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_uid uuid:=auth.uid(); v_device public.app_devices; v_endpoint text;
begin
 if v_uid is null or not exists(select 1 from public."Players" where user_id=v_uid) then raise exception 'Player login required' using errcode='42501'; end if;
 if p_installation_id is null or p_permission not in('default','granted','denied','unsupported') then raise exception 'Invalid device details'; end if;
 if p_subscription is not null then
  v_endpoint:=p_subscription->>'endpoint';
  if p_permission<>'granted' or not coalesce(public.valid_push_endpoint(v_endpoint),false)
   or not coalesce((p_subscription#>>'{keys,p256dh}') ~ '^[A-Za-z0-9_-]{87}=?$',false)
   or not coalesce((p_subscription#>>'{keys,auth}') ~ '^[A-Za-z0-9_-]{22}={0,2}$',false) then raise exception 'Invalid push subscription'; end if;
 end if;
 insert into public.app_devices(user_id,installation_id,first_app_use,last_app_use,permission)
 values(v_uid,p_installation_id,case when p_is_app then now() end,case when p_is_app then now() end,p_permission)
 on conflict(user_id,installation_id) do update set
 first_app_use=coalesce(app_devices.first_app_use,excluded.first_app_use),
 last_app_use=coalesce(excluded.last_app_use,app_devices.last_app_use),
 permission=excluded.permission,updated_at=now()
 returning * into v_device;
 if p_disable or p_permission in('denied','unsupported') then
  update public.app_devices set notifications_enabled=false,endpoint=null,p256dh=null,auth_key=null where id=v_device.id;
 elsif p_subscription is not null then
  -- An endpoint is bound to one signed-in installation; no silent reassignment to another account.
  update public.app_devices set endpoint=v_endpoint,p256dh=p_subscription#>>'{keys,p256dh}',auth_key=p_subscription#>>'{keys,auth}',notifications_enabled=true where id=v_device.id;
 end if;
 select * into v_device from public.app_devices where id=v_device.id;
 return jsonb_build_object('id',v_device.id,'notifications_enabled',v_device.notifications_enabled,'first_app_use',v_device.first_app_use,'last_app_use',v_device.last_app_use);
end $$;
revoke all on function public.record_app_device(uuid,boolean,text,jsonb,boolean) from public,anon;
grant execute on function public.record_app_device(uuid,boolean,text,jsonb,boolean) to authenticated;

create function public.app_usage_summary() returns table(player_id bigint,full_name text,first_app_use timestamptz,last_app_use timestamptz,subscribed_devices bigint)
language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not public.current_user_is_admin() then raise exception 'Manager access required' using errcode='42501'; end if;
 return query select p.id,p.full_name,min(d.first_app_use),max(d.last_app_use),count(d.id) filter(where d.notifications_enabled and d.permission='granted')
 from public."Players" p left join public.app_devices d on d.user_id=p.user_id
 group by p.id,p.full_name order by p.full_name;
end $$;
revoke all on function public.app_usage_summary() from public,anon;
grant execute on function public.app_usage_summary() to authenticated;

create function public.queue_app_announcement(p_kind text,p_target text,p_title text,p_body text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_uid uuid:=auth.uid(); v_id bigint; v_count integer; v_url text; v_match public.matches; v_existing boolean:=false;
begin
 if v_uid is null or not public.current_user_is_admin() then raise exception 'Manager access required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtext('bcfc-push-announcements'));
 if p_kind not in('news','availability','report') or length(p_title) not between 1 and 120 or length(p_body) not between 1 and 300 then raise exception 'Invalid announcement'; end if;
 if not coalesce((select broadcasts_enabled from public.app_push_config where id),false) then raise exception 'Squad announcements are awaiting the phone test'; end if;
 if p_kind='news' then
  if p_target !~ '^[a-z0-9]+(-[a-z0-9]+)*$' or length(p_target)>150 then raise exception 'Invalid story'; end if;
  v_url:='/news/'||p_target;
 else
  if p_target !~ '^[0-9]{1,12}$' then raise exception 'Invalid fixture'; end if;
  select * into v_match from public.matches where id=p_target::bigint;
  if not found then raise exception 'Fixture not found'; end if;
  if p_kind='availability' and (v_match.status<>'Upcoming' or not v_match.availability_open or v_match.match_date<(now() at time zone 'Europe/London')::date) then raise exception 'Availability must be open before notifying players'; end if;
  if p_kind='report' and v_match.status<>'Completed' then raise exception 'The fixture must be completed before announcing its report'; end if;
  v_url:=case when p_kind='availability' then '/dashboard' else '/fixtures/'||p_target end;
 end if;
 select id into v_id from public.app_push_messages where kind=p_kind and target=p_target;
 if found then return jsonb_build_object('id',v_id,'already_sent',true,'devices',0); end if;
 if (select count(*) from public.app_push_messages where kind<>'test' and created_at>now()-interval '1 hour')>=5 then raise exception 'Please wait before sending more announcements'; end if;
 select count(*) into v_count from public.app_devices d
 left join public.app_push_preferences pref on pref.user_id=d.user_id
 where d.notifications_enabled and d.permission='granted' and exists(select 1 from public."Players" p where p.user_id=d.user_id)
 and case p_kind when 'news' then coalesce(pref.news,true) when 'availability' then coalesce(pref.availability,true) else coalesce(pref.report,true) end;
 if v_count=0 then raise exception 'No subscribed devices have this notification category enabled'; end if;
 insert into public.app_push_messages(kind,target,title,body,url,created_by) values(p_kind,p_target,p_title,p_body,v_url,v_uid) returning id into v_id;
 insert into public.app_push_deliveries(message_id,device_id)
 select v_id,d.id from public.app_devices d left join public.app_push_preferences pref on pref.user_id=d.user_id
 where d.notifications_enabled and d.permission='granted' and exists(select 1 from public."Players" p where p.user_id=d.user_id)
 and case p_kind when 'news' then coalesce(pref.news,true) when 'availability' then coalesce(pref.availability,true) else coalesce(pref.report,true) end;
 return jsonb_build_object('id',v_id,'already_sent',false,'devices',v_count);
end $$;
revoke all on function public.queue_app_announcement(text,text,text,text) from public,anon;
grant execute on function public.queue_app_announcement(text,text,text,text) to authenticated;

create function public.queue_app_push_test(p_installation_id uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_uid uuid:=auth.uid(); v_device uuid; v_id bigint;
begin
 if v_uid is null or not exists(select 1 from public."Players" where user_id=v_uid) then raise exception 'Player login required' using errcode='42501'; end if;
 select id into v_device from public.app_devices where user_id=v_uid and installation_id=p_installation_id and notifications_enabled and permission='granted';
 if v_device is null then raise exception 'Enable notifications on this device first'; end if;
 perform pg_advisory_xact_lock(hashtext(v_uid::text));
 if exists(select 1 from public.app_push_messages where kind='test' and created_by=v_uid and created_at>now()-interval '1 minute') then raise exception 'Please wait a minute before another test'; end if;
 insert into public.app_push_messages(kind,target,title,body,url,created_by)
 values('test',gen_random_uuid()::text,'BCFC London notifications are ready','This is your test notification. Tap to open the Player Portal.','/dashboard',v_uid) returning id into v_id;
 insert into public.app_push_deliveries(message_id,device_id) values(v_id,v_device);
 return jsonb_build_object('id',v_id,'devices',1);
end $$;
revoke all on function public.queue_app_push_test(uuid) from public,anon;
grant execute on function public.queue_app_push_test(uuid) to authenticated;

-- Secrets are only returned to the backend service role, never to app clients.
create function public.app_push_worker_config(p_secret text) returns jsonb
language sql security definer set search_path='' as $$
 select case when length(p_secret)=64 and p_secret=(select decrypted_secret from vault.decrypted_secrets where name='app_push_worker_secret' limit 1)
 then jsonb_build_object('publicKey',(select public_key from public.app_push_config where id),'privateKey',(select decrypted_secret from vault.decrypted_secrets where name='app_push_vapid_private' limit 1)) else null end
$$;
revoke all on function public.app_push_worker_config(text) from public,anon,authenticated;
grant execute on function public.app_push_worker_config(text) to service_role;

create function public.claim_app_push_deliveries() returns table(delivery_id bigint,message_id bigint,device_id uuid,attempts integer,endpoint text,p256dh text,auth_key text,title text,body text,url text)
language plpgsql security definer set search_path='' as $$
begin
 update public.app_push_deliveries set state='needs_review',last_error='Worker outcome unknown; retry withheld to avoid duplicate alert' where state='sending' and leased_until<now();
 update public.app_push_deliveries q set state='cancelled' where q.state in('pending','failed') and exists(
 select 1 from public.app_devices d join public.app_push_messages m on m.id=q.message_id left join public.app_push_preferences p on p.user_id=d.user_id
 where d.id=q.device_id and (not d.notifications_enabled or d.permission<>'granted' or not exists(select 1 from public."Players" x where x.user_id=d.user_id)
 or (m.kind='test' and m.created_by<>d.user_id)
 or (m.kind='news' and not coalesce(p.news,true)) or(m.kind='availability' and not coalesce(p.availability,true)) or(m.kind='report' and not coalesce(p.report,true))));
 update public.app_push_deliveries q set state='expired',last_error='Announcement expired' from public.app_push_messages m
 where q.message_id=m.id and q.state in('pending','failed') and m.created_at<now()-interval '1 day';
 return query with candidates as(
 select q.id from public.app_push_deliveries q where q.state in('pending','failed') and q.attempts<4 and q.next_attempt_at<=now()
 order by q.id for update skip locked limit 20
 ), claimed as(
 update public.app_push_deliveries q set state='sending',attempts=q.attempts+1,leased_until=now()+interval '3 minutes' from candidates c where q.id=c.id returning q.*)
 select q.id,m.id,d.id,q.attempts,d.endpoint,d.p256dh,d.auth_key,m.title,m.body,m.url from claimed q join public.app_devices d on d.id=q.device_id join public.app_push_messages m on m.id=q.message_id;
end $$;
revoke all on function public.claim_app_push_deliveries() from public,anon,authenticated;
grant execute on function public.claim_app_push_deliveries() to service_role;

create function public.wake_app_push() returns void language plpgsql security definer set search_path='' as $$
declare v_secret text;
begin
 update public.app_push_deliveries set state='needs_review',last_error='Worker outcome unknown; retry withheld' where state='sending' and leased_until<now();
 if not exists(select 1 from public.app_push_deliveries where state in('pending','failed') and attempts<4 and next_attempt_at<=now()) then return; end if;
 select decrypted_secret into v_secret from vault.decrypted_secrets where name='app_push_worker_secret' limit 1;
 if v_secret is null then return; end if;
 perform net.http_post(url:='https://qyvwpywlitnlbmzcxzlf.supabase.co/functions/v1/send-app-push',headers:=jsonb_build_object('Content-Type','application/json','x-push-secret',v_secret),body:='{}'::jsonb,timeout_milliseconds:=5000);
exception when others then raise warning 'Push wake deferred to retry job';
end $$;
revoke all on function public.wake_app_push() from public,anon,authenticated;
create function public.wake_app_push_after_queue() returns trigger language plpgsql security definer set search_path='' as $$
begin perform public.wake_app_push(); return null; end $$;
revoke all on function public.wake_app_push_after_queue() from public,anon,authenticated;
create trigger wake_app_push_after_queue after insert on public.app_push_deliveries for each statement execute function public.wake_app_push_after_queue();
commit;
