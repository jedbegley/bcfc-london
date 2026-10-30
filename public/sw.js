/* Push-only service worker: no fetch handler and no caches of pages or player data. */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));

function safePath(value){
 try{
  const u=new URL(value,self.location.origin);
  return u.origin===self.location.origin && (/^\/news\/[a-z0-9-]+$/.test(u.pathname)||/^\/fixtures\/\d+$/.test(u.pathname)||u.pathname==='/dashboard'||/^\/dashboard\/news\/\d+$/.test(u.pathname))?u.pathname:'/dashboard';
 }catch{return '/dashboard';}
}
function database(){
 return new Promise((resolve,reject)=>{
  const request=indexedDB.open('bcfc-notification-receipts',1);
  request.onupgradeneeded=()=>request.result.createObjectStore('seen');
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error);
 });
}
async function showMessage(data){
 const id=String(data.id||'');
 if(!/^\d+$/.test(id))return;
 // Persist only a message ID and receipt time, never player details or page contents.
 let db;
 try{
  db=await database();
  const seen=await new Promise((resolve,reject)=>{const r=db.transaction('seen').objectStore('seen').get(id);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
  if(seen){db.close();return;}
 }catch{/* Stable notification tags remain as a fallback when IndexedDB is unavailable. */}
 await self.registration.showNotification(String(data.title||'BCFC London').slice(0,120),{
  body:String(data.body||'').slice(0,300),icon:'/icons/bcfc-192.png',badge:'/icons/bcfc-192.png',
  tag:`bcfc-${id}`,renotify:false,data:{url:safePath(data.url)}
 });
 if(db){
  await new Promise(resolve=>{
   const tx=db.transaction('seen','readwrite');const store=tx.objectStore('seen');
   store.put(Date.now(),id);
   const cursor=store.openCursor();cursor.onsuccess=()=>{const c=cursor.result;if(!c)return;if(c.value<Date.now()-7*86400000)c.delete();c.continue();};
   tx.oncomplete=resolve;tx.onerror=resolve;tx.onabort=resolve;
  });db.close();
 }
}
self.addEventListener('push',event=>{
 let data;try{data=event.data.json();}catch{data={id:String(Date.now()),title:'BCFC London',body:'Open the app to see the latest update.',url:'/dashboard'};}
 event.waitUntil(showMessage(data));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const url=new URL(safePath(event.notification.data?.url),self.location.origin).href;
 event.waitUntil((async()=>{
  const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
  for(const client of windows){if(new URL(client.url).origin===self.location.origin){await client.navigate(url);return client.focus();}}
  return self.clients.openWindow(url);
 })());
});
