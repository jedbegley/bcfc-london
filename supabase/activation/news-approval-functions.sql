-- Recovery snapshot: definitions already active in production on 30 October 2026.
-- Contains no article content or winner identity. Do not run before provisioning the news table.
CREATE OR REPLACE FUNCTION public.claim_app_push_deliveries()
 RETURNS TABLE(delivery_id bigint, message_id bigint, device_id uuid, attempts integer, endpoint text, p256dh text, auth_key text, title text, body text, url text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
 update public.app_push_deliveries set state='needs_review',last_error='Worker outcome unknown; retry withheld to avoid duplicate alert' where state='sending' and leased_until<now();
 update public.app_push_deliveries q set state='cancelled' where q.state in('pending','failed') and exists(
 select 1 from public.app_devices d join public.app_push_messages m on m.id=q.message_id left join public.app_push_preferences p on p.user_id=d.user_id
 where d.id=q.device_id and (not d.notifications_enabled or d.permission<>'granted' or not exists(select 1 from public."Players" x where x.user_id=d.user_id)
 or (m.kind in ('test','review') and m.created_by<>d.user_id)
 or (m.kind='review' and not exists(select 1 from public."Players" admin where admin.user_id=d.user_id and admin.is_admin=true))
 or (m.kind='news' and not coalesce(p.news,true)) or(m.kind in ('availability','fixture') and not coalesce(p.availability,true)) or(m.kind='report' and not coalesce(p.report,true))));
 update public.app_push_deliveries q set state='expired',last_error='Announcement expired' from public.app_push_messages m
 where q.message_id=m.id and q.state in('pending','failed') and m.created_at<now()-interval '1 day';
 return query with candidates as(
 select q.id from public.app_push_deliveries q where q.state in('pending','failed') and q.attempts<4 and q.next_attempt_at<=now()
 order by q.id for update skip locked limit 20
 ), claimed as(
 update public.app_push_deliveries q set state='sending',attempts=q.attempts+1,leased_until=now()+interval '3 minutes' from candidates c where q.id=c.id returning q.*)
 select q.id,m.id,d.id,q.attempts,d.endpoint,d.p256dh,d.auth_key,m.title,m.body,m.url from claimed q join public.app_devices d on d.id=q.device_id join public.app_push_messages m on m.id=q.message_id;
end $function$
;

CREATE OR REPLACE FUNCTION public.process_news_approvals()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v public.news; v_message bigint; v_count integer:=0;
begin
 for v in select * from public.news where state='scheduled' and review_due_at<=now() order by review_due_at for update skip locked loop
  update public.news set state='awaiting_approval',updated_at=clock_timestamp() where id=v.id;
  -- Only this article's designated manager receives the reminder. Copy is spoiler-free.
  if exists(select 1 from public."Players" where user_id=v.approval_owner and is_admin=true) then
   insert into public.app_push_messages(kind,target,title,body,url,created_by)
   values('review',v.id::text||':'||extract(epoch from v.review_due_at)::text,
    replace(v.preview_title,' Revealed 🏆','')||' - Ready for Review','Your article is ready. Review and approve it before publishing.',
    '/dashboard/news/'||v.id::text,v.approval_owner)
   on conflict(kind,target) do update set target=excluded.target returning id into v_message;
   insert into public.app_push_deliveries(message_id,device_id)
   select v_message,d.id from public.app_devices d where d.user_id=v.approval_owner and d.notifications_enabled and d.permission='granted'
   on conflict(message_id,device_id) do nothing;
   update public.news set review_message_id=v_message,review_notified_at=clock_timestamp() where id=v.id;
  end if;
  v_count:=v_count+1;
 end loop;
 return v_count;
end $function$
;

CREATE OR REPLACE FUNCTION public.publish_news_article(p_id bigint, p_expected_updated_at timestamp with time zone)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v public.news;
begin
 if auth.uid() is null or not public.current_user_is_admin() then raise exception 'Manager access required' using errcode='42501'; end if;
 select * into v from public.news where id=p_id for update;
 if not found then raise exception 'Article not found'; end if;
 if v.state='published' then return to_jsonb(v); end if;
 if v.updated_at is distinct from p_expected_updated_at then raise exception 'Article changed. Reload and review before publishing'; end if;
 update public.news set state='published',published=true,published_at=clock_timestamp(),published_by=auth.uid(),updated_at=clock_timestamp() where id=p_id returning * into v;
 -- Approval publishes only; it never queues a player announcement.
 return to_jsonb(v);
end $function$
;

CREATE OR REPLACE FUNCTION public.published_news_article(p_slug text)
 RETURNS TABLE(slug text, title text, content text, preview_title text, summary text, image_url text, photo_url text, category text, published_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
 select n.slug,n.title,n.content,n.preview_title,n.summary,n.image_url,p.photo_url,n.category,n.published_at
 from public.news n left join public."Players" p on p.id=n.photo_player_id
 where n.slug=p_slug and n.state='published' and n.published=true and n.published_at<=now();
$function$
;

CREATE OR REPLACE FUNCTION public.published_news_previews()
 RETURNS TABLE(slug text, preview_title text, summary text, image_url text, category text, published_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
 select n.slug,n.preview_title,n.summary,n.image_url,n.category,n.published_at
 from public.news n where n.state='published' and n.published=true and n.published_at<=now()
 order by n.published_at desc,n.id desc;
$function$
;

CREATE OR REPLACE FUNCTION public.queue_app_announcement(p_kind text, p_target text, p_title text, p_body text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v_uid uuid:=auth.uid(); v_id bigint; v_count integer; v_url text; v_match public.matches; v_existing boolean:=false;
begin
 if v_uid is null or not public.current_user_is_admin() then raise exception 'Manager access required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtext('bcfc-push-announcements'));
 if p_kind not in('news','availability','report','fixture') or length(p_title) not between 1 and 120 or length(p_body) not between 1 and 300 then raise exception 'Invalid announcement'; end if;
 if not coalesce((select broadcasts_enabled from public.app_push_config where id),false) then raise exception 'Squad announcements are awaiting the phone test'; end if;
 if p_kind='news' then
  if exists(select 1 from public.news where slug=p_target and state<>'published') then raise exception 'Publish the article before notifying players'; end if;
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
end $function$
;

CREATE OR REPLACE FUNCTION public.queue_news_notification(p_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v public.news; v_result jsonb;
begin
 if auth.uid() is null or not public.current_user_is_admin() then raise exception 'Manager access required' using errcode='42501'; end if;
 select * into v from public.news where id=p_id for update;
 if not found or v.state<>'published' or not v.published then raise exception 'Publish the article before notifying players'; end if;
 v_result:=public.queue_app_announcement('news',v.slug,v.notification_title,v.notification_body);
 update public.news set notification_sent_at=(select created_at from public.app_push_messages where id=(v_result->>'id')::bigint) where id=v.id;
 return v_result;
end $function$
;

CREATE OR REPLACE FUNCTION public.record_news_notification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
 if new.kind='news' then update public.news set notification_sent_at=new.created_at where slug=new.target and state='published'; end if;
 return new;
end $function$
;

CREATE OR REPLACE FUNCTION public.save_news_draft(p_article jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
declare v public.news; v_id bigint:=nullif(p_article->>'id','')::bigint;
 v_due timestamptz:=nullif(p_article->>'review_due_at','')::timestamptz;
 v_photo bigint:=nullif(p_article->>'photo_player_id','')::bigint;
 v_slug text:=p_article->>'slug'; v_image text:=p_article->>'image_url';
begin
 if auth.uid() is null or not public.current_user_is_admin() then raise exception 'Manager access required' using errcode='42501'; end if;
 if coalesce(v_slug,'') !~ '^[a-z0-9]+(-[a-z0-9]+)*$' or length(v_slug)>150 or v_slug in
 ('september-player-of-the-month-2026','london-cup-draw-downing-street-friendly','scott-murray-new-kit','from-number-10-to-number-10','london-cup-walkover-2026','cup-draws-2026','barnes-stormers-preview','shepherds-tuesday-2-2-bristol-city','aberdeen-0-3-bristol-city','andy-burnham') then raise exception 'Choose a unique article URL slug'; end if;
 if length(coalesce(p_article->>'title','')) not between 1 and 200
 or length(coalesce(p_article->>'internal_title','')) not between 1 and 200
 or length(coalesce(p_article->>'preview_title','')) not between 1 and 120
 or length(coalesce(p_article->>'summary','')) not between 1 and 300
 or length(coalesce(p_article->>'content','')) not between 1 and 50000
 or length(coalesce(p_article->>'notification_title','')) not between 1 and 120
 or length(coalesce(p_article->>'notification_body','')) not between 1 and 300
 then raise exception 'Complete the article, preview and notification fields within their length limits'; end if;
 if coalesce(v_image,'') !~ '^/[a-zA-Z0-9/_-]+\.(png|jpg|jpeg|webp)$' then raise exception 'Use a local spoiler-free preview image'; end if;
 if v_photo is not null and not exists(select 1 from public."Players" where id=v_photo) then raise exception 'Player profile not found'; end if;
 if v_id is not null then
  select * into v from public.news where id=v_id for update;
  if not found then raise exception 'Article not found'; end if;
  if v.state='published' then raise exception 'Published articles cannot be changed in the draft editor'; end if;
  if v.updated_at is distinct from (p_article->>'updated_at')::timestamptz then raise exception 'This article changed. Reload before saving'; end if;
 end if;
 if v_due is not null and v_due<=now() and (v_id is null or v_due is distinct from v.review_due_at) then raise exception 'Choose a future approval time'; end if;
 if v_id is null then
  insert into public.news(title,slug,summary,content,category,image_url,published,internal_title,preview_title,photo_player_id,state,approval_owner,review_due_at,notification_title,notification_body)
  values(p_article->>'title',v_slug,p_article->>'summary',p_article->>'content',coalesce(p_article->>'category','CLUB NEWS'),v_image,false,p_article->>'internal_title',p_article->>'preview_title',v_photo,case when v_due is null then 'draft' else 'scheduled' end,auth.uid(),v_due,p_article->>'notification_title',p_article->>'notification_body') returning * into v;
 else
  update public.news set title=p_article->>'title',slug=v_slug,summary=p_article->>'summary',content=p_article->>'content',category=coalesce(p_article->>'category','CLUB NEWS'),image_url=v_image,internal_title=p_article->>'internal_title',preview_title=p_article->>'preview_title',photo_player_id=v_photo,
  state=case when v_due is not distinct from v.review_due_at then v.state when v_due is null then 'draft' else 'scheduled' end,
  review_due_at=v_due,review_message_id=case when v_due is not distinct from v.review_due_at then v.review_message_id end,
  review_notified_at=case when v_due is not distinct from v.review_due_at then v.review_notified_at end,
  notification_title=p_article->>'notification_title',notification_body=p_article->>'notification_body',updated_at=clock_timestamp()
  where id=v_id returning * into v;
 end if;
 return to_jsonb(v);
end $function$
;