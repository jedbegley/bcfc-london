-- A separate, one-time match-details announcement opens the fixture preview.
-- Respect the existing availability announcement preference and manager-only RPC.
alter table public.app_push_messages drop constraint app_push_messages_kind_check;
alter table public.app_push_messages add constraint app_push_messages_kind_check
  check (kind in ('news','availability','report','fixture','test'));

create or replace function public.queue_app_announcement(p_kind text,p_target text,p_title text,p_body text) returns jsonb
language plpgsql security definer set search_path='' as $$
declare v_uid uuid:=auth.uid(); v_id bigint; v_count integer; v_url text; v_match public.matches; v_existing boolean:=false;
begin
 if v_uid is null or not public.current_user_is_admin() then raise exception 'Manager access required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtext('bcfc-push-announcements'));
 if p_kind not in('news','availability','report','fixture') or length(p_title) not between 1 and 120 or length(p_body) not between 1 and 300 then raise exception 'Invalid announcement'; end if;
 if not coalesce((select broadcasts_enabled from public.app_push_config where id),false) then raise exception 'Squad announcements are awaiting the phone test'; end if;
 if p_kind='news' then
  if p_target !~ '^[a-z0-9]+(-[a-z0-9]+)*$' or length(p_target)>150 then raise exception 'Invalid story'; end if;
  v_url:='/news/'||p_target;
 else
  if p_target !~ '^[0-9]{1,12}$' then raise exception 'Invalid fixture'; end if;
  select * into v_match from public.matches where id=p_target::bigint;
  if not found then raise exception 'Fixture not found'; end if;
  if p_kind='availability' and (v_match.status<>'Upcoming' or not v_match.availability_open or v_match.match_date<(now() at time zone 'Europe/London')::date) then raise exception 'Availability must be open before notifying players'; end if;
  if p_kind='fixture' and (v_match.status<>'Upcoming' or v_match.match_date<(now() at time zone 'Europe/London')::date) then raise exception 'Fixture must be upcoming before announcing match details'; end if;
  if p_kind='report' and v_match.status<>'Completed' then raise exception 'The fixture must be completed before announcing its report'; end if;
  v_url:=case when p_kind='availability' then '/dashboard' else '/fixtures/'||p_target end;
 end if;
 select id into v_id from public.app_push_messages where kind=p_kind and target=p_target;
 if found then return jsonb_build_object('id',v_id,'already_sent',true,'devices',0); end if;
 if (select count(*) from public.app_push_messages where kind<>'test' and created_at>now()-interval '1 hour')>=5 then raise exception 'Please wait before sending more announcements'; end if;
 select count(*) into v_count from public.app_devices d
 left join public.app_push_preferences pref on pref.user_id=d.user_id
 where d.notifications_enabled and d.permission='granted' and exists(select 1 from public."Players" p where p.user_id=d.user_id)
 and case p_kind when 'news' then coalesce(pref.news,true) when 'availability' then coalesce(pref.availability,true) when 'fixture' then coalesce(pref.availability,true) else coalesce(pref.report,true) end;
 if v_count=0 then raise exception 'No subscribed devices have this notification category enabled'; end if;
 insert into public.app_push_messages(kind,target,title,body,url,created_by) values(p_kind,p_target,p_title,p_body,v_url,v_uid) returning id into v_id;
 insert into public.app_push_deliveries(message_id,device_id)
 select v_id,d.id from public.app_devices d left join public.app_push_preferences pref on pref.user_id=d.user_id
 where d.notifications_enabled and d.permission='granted' and exists(select 1 from public."Players" p where p.user_id=d.user_id)
 and case p_kind when 'news' then coalesce(pref.news,true) when 'availability' then coalesce(pref.availability,true) when 'fixture' then coalesce(pref.availability,true) else coalesce(pref.report,true) end;
 return jsonb_build_object('id',v_id,'already_sent',false,'devices',v_count);
end $$;
