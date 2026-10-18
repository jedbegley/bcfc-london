-- Apply after the sender is deployed and Vault contains:
--   availability_alert_url: https://PROJECT.supabase.co/functions/v1/send-availability-alerts
--   availability_alert_secret: same random value as Edge Function ALERT_WEBHOOK_SECRET
-- Never commit secret values. Without these secrets, this migration raises and changes nothing.
begin;
create extension if not exists pg_cron with schema pg_catalog;

do $$
begin
  if (select count(*) from vault.decrypted_secrets
      where name in ('availability_alert_url', 'availability_alert_secret')) <> 2 then
    raise exception 'Availability sender URL and secret must be installed in Vault first';
  end if;
end;
$$;

create function public.wake_availability_alerts()
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_url text;
  v_secret text;
begin
  select decrypted_secret into v_url from vault.decrypted_secrets
    where name = 'availability_alert_url';
  select decrypted_secret into v_secret from vault.decrypted_secrets
    where name = 'availability_alert_secret';
  if v_url is null or v_secret is null then
    raise exception 'Availability sender configuration missing';
  end if;
  perform net.http_post(
    url := v_url,
    body := '{}'::jsonb,
    headers := jsonb_build_object('Content-Type','application/json',
                                  'x-alert-secret',v_secret),
    timeout_milliseconds := 5000
  );
end;
$$;
revoke all on function public.wake_availability_alerts() from public, anon, authenticated;

create function public.wake_availability_alerts_on_insert()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  begin
    perform public.wake_availability_alerts();
  exception when others then
    -- Availability writes must succeed even if a webhook is unavailable.
    raise warning 'Availability alert wakeup failed: %', sqlerrm;
  end;
  return new;
end;
$$;
revoke all on function public.wake_availability_alerts_on_insert() from public, anon, authenticated;

create trigger wake_availability_alerts after insert on public.availability_alert_deliveries
  for each row execute function public.wake_availability_alerts_on_insert();

select cron.schedule('retry-availability-alerts', '*/5 * * * *',
  'select public.wake_availability_alerts()');
commit;
