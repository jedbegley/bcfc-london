"use client";
import {useEffect,useState} from 'react';
import {createClient} from '@supabase/supabase-js';
import {installationId,isInstalledApp,pushSupported,recordDevice} from '../pushClient';
const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const button={background:'#e31b23',color:'#fff',border:0,borderRadius:6,padding:'12px 16px',fontWeight:700,cursor:'pointer',margin:'6px'};
function decodeKey(value){const raw=atob(value.replace(/-/g,'+').replace(/_/g,'/'));return Uint8Array.from(raw,c=>c.charCodeAt(0));}
export default function PushPreferences(){
 const [ready,setReady]=useState(false),[supported,setSupported]=useState(false),[installed,setInstalled]=useState(false);
 const [enabled,setEnabled]=useState(false),[key,setKey]=useState(''),[registration,setRegistration]=useState(null);
 const [message,setMessage]=useState(''),[busy,setBusy]=useState(false),[userId,setUserId]=useState(null);
 const [prefs,setPrefs]=useState({news:true,availability:true,report:true});
 useEffect(()=>{
  let active=true;
  (async()=>{
   try{
    const {data:{session}}=await supabase.auth.getSession();if(!session)return;
    const app=isInstalledApp();
    const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    const works=pushSupported()&&(!ios||app);
    if(!active)return;
    setInstalled(app);setSupported(works);setUserId(session.user.id);
    const [{data:config,error},{data:preference}]=await Promise.all([
     supabase.from('app_push_config').select('public_key').single(),
     supabase.from('app_push_preferences').select('news,availability,report').eq('user_id',session.user.id).maybeSingle()
    ]);
    if(error)throw error;
    if(!active)return;
    setKey(config.public_key);if(preference)setPrefs(preference);
    if(works){
     await navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'});
     const reg=await navigator.serviceWorker.ready;
     const subscription=await reg.pushManager.getSubscription();
     const device=await recordDevice(supabase,{subscription:Notification.permission==='granted'?subscription:null,disable:!subscription});
     if(active){setRegistration(reg);setEnabled(device.notifications_enabled);}
    }else if(app)await recordDevice(supabase);
   }catch{if(active)setMessage('Notification settings could not be loaded. Please refresh and try again.');}
   finally{if(active)setReady(true);}
  })();
  return()=>{active=false;};
 },[]);
 async function enable(){
  if(!registration||!key)return;
  setBusy(true);setMessage('');
  try{
   // Subscribe directly from the tap. The browser asks permission; no automatic prompt.
   const subscription=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:decodeKey(key)});
   const device=await recordDevice(supabase,{subscription});
   setEnabled(device.notifications_enabled);setMessage('Notifications enabled on this device. You can send yourself a test below.');
  }catch{setMessage(Notification.permission==='denied'?'Notifications are blocked in your device settings. Allow them for BCFC London, then return here.':'Could not enable notifications. Please check your connection and try again.');}
  finally{setBusy(false);}
 }
 async function disable(){
  setBusy(true);
  try{await recordDevice(supabase,{disable:true});await (await registration?.pushManager.getSubscription())?.unsubscribe();setEnabled(false);setMessage('Notifications disabled on this device.');}
  catch{setMessage('Could not finish disabling notifications. Please retry.');}
  finally{setBusy(false);}
 }
 async function savePreferences(){
  setBusy(true);const {error}=await supabase.from('app_push_preferences').upsert({user_id:userId,...prefs});
  setMessage(error?'Could not save your preferences.':'Notification preferences saved across your devices.');setBusy(false);
 }
 async function test(){
  setBusy(true);const {error}=await supabase.rpc('queue_app_push_test',{p_installation_id:installationId()});
  setMessage(error?error.message:'Test queued for this device only. Leave the app or lock your phone to check it arrives.');setBusy(false);
 }
 return <section style={{background:'#fafafa',border:'1px solid #ddd',borderRadius:12,padding:24,marginTop:24,textAlign:'left'}}>
  <h2 style={{marginTop:0}}>App notifications</h2>
  <p>Choose updates for BCFC London. Signed-in app launches record your first and latest app use, visible to club managers.</p>
  {!ready?<p>Loading notification settings…</p>:!supported?<p>{installed?'Push notifications are not supported by this device/browser. Your email alerts are unchanged.':<>On iPhone, <a href="/install">add BCFC London to your home screen</a>, open its icon and sign in to enable notifications.</>}</p>:<>
   <p><strong>This device: {enabled?'Notifications enabled':'Notifications off'}</strong></p>
   <button style={button} disabled={busy||!registration||!key} onClick={enabled?disable:enable}>{enabled?'Disable notifications':'Enable notifications'}</button>
   {enabled&&<button style={{...button,background:'#111'}} disabled={busy} onClick={test}>Send me a test notification</button>}
   <fieldset style={{border:'1px solid #ddd',marginTop:20,padding:16}}><legend>Updates I want</legend>
    {[['news','New news stories'],['availability','Availability announcements'],['report','Match reports, MOTM voting and match fees']].map(([name,label])=><label key={name} style={{display:'block',padding:'8px 0'}}><input type="checkbox" checked={prefs[name]} onChange={e=>setPrefs({...prefs,[name]:e.target.checked})} disabled={busy}/> {label}</label>)}
    <button style={button} disabled={busy} onClick={savePreferences}>Save notification preferences</button>
   </fieldset>
  </>}
  <p role="status" style={{lineHeight:1.5}}>{message}</p>
 </section>;
}
