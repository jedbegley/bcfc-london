-- Activate after send-app-push is deployed and its service-authenticated encryption check passes.
-- Idle calls do not invoke Edge Functions. No content announcements are scheduled automatically.
select cron.schedule('retry-app-push','* * * * *','select public.wake_app_push()');
