export function isInstalledApp() {
  return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
}
export function installationId() {
  let value=localStorage.getItem('bcfc_app_device_id');
  if(!value){value=crypto.randomUUID();localStorage.setItem('bcfc_app_device_id',value);}
  return value;
}
export function pushSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}
export async function recordDevice(supabase, {subscription=null,disable=false}={}) {
  const {data,error}=await supabase.rpc('record_app_device',{
    p_installation_id:installationId(),p_is_app:isInstalledApp(),
    p_permission:pushSupported()?Notification.permission:'unsupported',
    p_subscription:subscription?.toJSON()||null,p_disable:disable
  });
  if(error)throw error;
  return data;
}
export async function stopPushOnLogout(supabase) {
  try {
    const registration=await navigator.serviceWorker?.getRegistration('/');
    const subscription=await registration?.pushManager?.getSubscription();
    await recordDevice(supabase,{disable:true}).catch(()=>{});
    await subscription?.unsubscribe();
  } catch { /* Logout must still work on unsupported browsers or unavailable networks. */ }
}
