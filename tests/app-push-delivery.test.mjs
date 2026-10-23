import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {deliverPush,validEndpoint} from '../supabase/functions/send-app-push/delivery.mjs';
const row={delivery_id:1,message_id:2,device_id:'device',attempts:1,endpoint:'https://web.push.apple.com/test',p256dh:'x',auth_key:'y',title:'News',body:'Story',url:'/news/story'};
async function run(status,fail=false,attempts=1){const marks=[],disabled=[];const result=await deliverPush({...row,attempts},{generateRequest:()=>({endpoint:row.endpoint,method:'POST',headers:{},body:'encrypted'}),fetchImpl:async()=>{if(fail)throw Error('network');return new Response('',{status});},mark:async(id,data)=>marks.push(data),disable:async id=>disabled.push(id),vapid:{}});return{result,marks,disabled};}
test('push service acceptance, expired subscription, retries and ambiguous outcome',async()=>{
 assert.equal((await run(201)).result,'accepted');
 assert.equal((await run(410)).disabled.length,1);
 assert.equal((await run(503)).result,'failed');
 assert.equal((await run(429)).result,'failed');
 assert.equal((await run(503,false,4)).result,'needs_review');
 assert.equal((await run(400)).result,'needs_review');
 assert.equal((await run(500,true)).result,'needs_review');
 for(const url of ['http://127.0.0.1/','https://fcm.googleapis.com.evil.test/x','https://evil.test@fcm.googleapis.com/x','https://fcm.googleapis.com:444/x'])assert.equal(validEndpoint(url),false,url);
});
test('push-only worker does not cache pages and notification clicks stay on site',async()=>{
 const source=await readFile(new URL('../public/sw.js',import.meta.url),'utf8');const handlers={};
 const self={location:{origin:'https://www.bcfclondon.co.uk'},addEventListener:(type,fn)=>handlers[type]=fn};
 const context=vm.createContext({self,URL});vm.runInContext(source,context);
 assert(!handlers.fetch);assert(handlers.push);assert(handlers.notificationclick);
 assert.equal(vm.runInContext("safePath('https://evil.test/phishing')",context),'/dashboard');
 assert.equal(vm.runInContext("safePath('/news/story')",context),'/news/story');
 assert.equal(vm.runInContext("safePath('/fixtures/9')",context),'/fixtures/9');
});
