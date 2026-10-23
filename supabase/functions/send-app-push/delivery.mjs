export function validEndpoint(value) {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' && !u.username && !u.password && !u.port && !u.hash &&
      /^(fcm\.googleapis\.com|([a-z0-9-]+\.)*push\.apple\.com|([a-z0-9-]+\.)*push\.services\.mozilla\.com|([a-z0-9-]+\.)*notify\.windows\.com|([a-z0-9-]+\.)*wns\.windows\.com)$/.test(u.hostname);
  } catch { return false; }
}

export async function deliverPush(row, { generateRequest, fetchImpl, mark, disable, vapid }) {
  if (!validEndpoint(row.endpoint)) {
    await mark(row.delivery_id, { state:'needs_review',last_error:'Unsupported push service' });
    return 'needs_review';
  }
  let details;
  try {
    details = generateRequest({ endpoint:row.endpoint,keys:{p256dh:row.p256dh,auth:row.auth_key} },
      JSON.stringify({id:String(row.message_id),title:row.title,body:row.body,url:row.url}),
      {TTL:86400,urgency:'normal',topic:`bcfc-${row.message_id}`,vapidDetails:{subject:'mailto:bcfclondon@hotmail.com',publicKey:vapid.publicKey,privateKey:vapid.privateKey}});
  } catch {
    await mark(row.delivery_id,{state:'needs_review',last_error:'Subscription could not be encrypted'});
    return 'needs_review';
  }
  let response;
  try {
    response=await fetchImpl(details.endpoint,{method:details.method,headers:details.headers,body:details.body,redirect:'error',signal:AbortSignal.timeout(10000)});
  } catch {
    // The service may have accepted it before the connection failed. Do not resend blindly.
    await mark(row.delivery_id,{state:'needs_review',last_error:'Unknown push-service outcome; automatic retry withheld'});
    return 'needs_review';
  }
  if(response.ok){
    await mark(row.delivery_id,{state:'accepted',accepted_at:new Date().toISOString(),last_error:null,leased_until:null});
    return 'accepted';
  }
  if(response.status===404||response.status===410){
    await disable(row.device_id);
    await mark(row.delivery_id,{state:'expired',last_error:'Device subscription expired',leased_until:null});
    return 'expired';
  }
  if(response.status===429||response.status>=500){
    const state=row.attempts>=4?'needs_review':'failed';
    await mark(row.delivery_id,{state,last_error:`Push service returned ${response.status}`,leased_until:null,next_attempt_at:new Date(Date.now()+(response.status===429?900000:60000)).toISOString()});
    return state;
  }
  await mark(row.delivery_id,{state:'needs_review',last_error:`Push service returned ${response.status}`,leased_until:null});
  return 'needs_review';
}
