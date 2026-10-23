import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import webpush from "npm:web-push@3.6.7";
import { deliverPush } from "./delivery.mjs";

const secretKeys=JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS")||"{}");
const supabase=createClient(Deno.env.get("SUPABASE_URL")!,secretKeys.default||Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,{auth:{persistSession:false}});

Deno.serve(async(request)=>{
  const secret=request.headers.get("x-push-secret");
  if(request.method!=="POST"||secret?.length!==64)return new Response("Forbidden",{status:403});
  const {data:vapid,error:authError}=await supabase.rpc("app_push_worker_config",{p_secret:secret});
  if(authError)return new Response("Authorization unavailable",{status:503});
  if(!vapid?.privateKey||!vapid?.publicKey)return new Response("Forbidden",{status:403});
  // A service-authenticated dry run verifies encryption in the deployed Deno runtime, without sending.
  const input=await request.json().catch(()=>({}));
  if(input.self_test===true){
    const test=webpush.generateVAPIDKeys();
    const req=webpush.generateRequestDetails({endpoint:"https://fcm.googleapis.com/fcm/send/self-test",keys:{p256dh:test.publicKey,auth:"AAAAAAAAAAAAAAAAAAAAAA"}},"self-test",{vapidDetails:{subject:"mailto:bcfclondon@hotmail.com",publicKey:vapid.publicKey,privateKey:vapid.privateKey}});
    return Response.json({encryption:!!req.body?.length});
  }
  const {data:rows,error}=await supabase.rpc("claim_app_push_deliveries");
  if(error)return new Response("Unable to claim notifications",{status:503});
  const mark=async(id:number,fields:Record<string,unknown>)=>{
    const {error}=await supabase.from("app_push_deliveries").update(fields).eq("id",id).eq("state","sending");
    if(error)throw error;
  };
  const disable=async(id:string)=>{
    const {error}=await supabase.from("app_devices").update({notifications_enabled:false,endpoint:null,p256dh:null,auth_key:null}).eq("id",id);
    if(error)throw error;
  };
  const outcomes=[];
  // Four concurrent sends; each claimed row is leased and each browser deduplicates message IDs.
  for(let offset=0;offset<(rows||[]).length;offset+=4){
    const batch=(rows||[]).slice(offset,offset+4);
    outcomes.push(...await Promise.all(batch.map(async(row:Record<string,unknown>)=>deliverPush(row,{generateRequest:webpush.generateRequestDetails,fetchImpl:fetch,mark,disable,vapid}))));
  }
  await supabase.rpc("wake_app_push");
  return Response.json({claimed:outcomes.length,outcomes});
});
