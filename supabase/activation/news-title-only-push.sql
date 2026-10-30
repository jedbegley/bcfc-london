-- Allow an optional body for news pushes; other notification types retain their body requirement.
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
 if p_kind not in('news','availability','report','fixture') or length(p_title) not between 1 and 120 or p_body is null or length(p_body)>300 or (p_kind<>'news' and length(p_body)<1) then raise exception 'Invalid announcement'; end if;
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
 or length(coalesce(p_article->>'notification_body','')) > 300
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
