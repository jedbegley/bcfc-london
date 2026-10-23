"use client";
import {useEffect} from 'react';
import {createClient} from '@supabase/supabase-js';
import {isInstalledApp,recordDevice,pushSupported} from './pushClient';
const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function AppNotifications(){
 useEffect(()=>{
  let active=true;
  let lastRecord=0;
  let lastUser=null;
  async function update(){
   try{
    const {data:{session}}=await supabase.auth.getSession();
    if(!session||!active)return;
    if(lastUser===session.user.id&&Date.now()-lastRecord<15*60*1000)return;
    // First/last app use is recorded only from a signed-in standalone window.
    if(!isInstalledApp())return;
    const registration=pushSupported()?await navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}):null;
    const sub=await registration?.pushManager.getSubscription();
    await recordDevice(supabase,{subscription:pushSupported()&&Notification.permission==='granted'?sub:null,disable:!sub});
    lastRecord=Date.now();lastUser=session.user.id;
   }catch{/* Analytics and push registration must never interrupt the website. */}
  }
  if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).catch(()=>{});
  update();
  const {data:{subscription}}=supabase.auth.onAuthStateChange(()=>{lastRecord=0;setTimeout(update,0);});
  const visible=()=>{if(document.visibilityState==='visible')update();};
  document.addEventListener('visibilitychange',visible);
  return()=>{active=false;subscription.unsubscribe();document.removeEventListener('visibilitychange',visible);};
 },[]);
 return null;
}
