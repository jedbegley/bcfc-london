"use client";
import {useEffect,useState} from 'react';
import {supabase} from "../browserSupabase";
import {formatMatchDate} from '../fixtureDisplay';
const button={background:'#e31b23',color:'#fff',border:0,borderRadius:6,padding:'12px 16px',fontWeight:700,cursor:'pointer'};
const date=value=>value?new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',dateStyle:'medium',timeStyle:'short'}).format(new Date(value)):'Not recorded yet';
export default function PushAdmin(){
 const [usage,setUsage]=useState([]),[stories,setStories]=useState([]),[fixtures,setFixtures]=useState([]),[messages,setMessages]=useState([]);
 const [selectedStory,setSelectedStory]=useState(''),[selectedFixture,setSelectedFixture]=useState('');
 const [enabled,setEnabled]=useState(false),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[deliveries,setDeliveries]=useState([]);
 async function load(){
  const results=await Promise.all([
   supabase.rpc('app_usage_summary'),fetch('/api/notification-stories').then(r=>{if(!r.ok)throw Error();return r.json();}),
   supabase.from('matches').select('id,opponent,match_date,status,availability_open').order('match_date',{ascending:false}),
   supabase.from('app_push_config').select('broadcasts_enabled').single(),
   supabase.from('app_push_messages').select('id,kind,target,title,created_at').order('created_at',{ascending:false}).limit(20),
   supabase.from('app_push_deliveries').select('message_id,state').order('id',{ascending:false}).limit(1000)
  ]);
  for(const result of results)if(result?.error)throw result.error;
  setUsage(results[0].data||[]);setStories(results[1]);setFixtures(results[2].data||[]);setEnabled(results[3].data.broadcasts_enabled);setMessages(results[4].data||[]);setDeliveries(results[5].data||[]);
 }
 useEffect(()=>{load().catch(()=>setMessage('Manager notification information could not be loaded. Please refresh.'));},[]);
 const devices=usage.reduce((total,row)=>total+Number(row.subscribed_devices),0);
 const announced=(kind,target)=>messages.some(m=>m.kind===kind&&m.target===String(target));
 async function send(kind,target,title,body){
  if(!window.confirm(`Send “${title}” to up to ${devices} subscribed devices? Player preferences apply. Each story or fixture announcement can be sent once.`))return;
  setBusy(true);setMessage('Queuing notification…');
  const {data,error}=await supabase.rpc('queue_app_announcement',{p_kind:kind,p_target:String(target),p_title:title,p_body:body.slice(0,300)});
  setMessage(error?error.message:data.already_sent?'This announcement has already been queued. No duplicate sent.':`Queued for ${data.devices} subscribed devices. Push-service acceptance does not confirm it was read.`);
  await load().catch(()=>{});setBusy(false);
 }
 const story=stories.find(s=>s.url===selectedStory),fixture=fixtures.find(f=>String(f.id)===selectedFixture);
 const newsTarget=story?.url.split('/').pop();
 return <section style={{background:'#fafafa',border:'1px solid #ddd',borderRadius:12,padding:24,marginTop:24,textAlign:'left'}}>
  <h2 style={{marginTop:0}}>Notify players</h2>
  <p>Announcements are sent only when you press a button and confirm. Publishing news or adding a fixture sends nothing automatically.</p>
  <p><strong>{devices} subscribed device{devices===1?'':'s'}</strong> · {usage.filter(p=>p.last_app_use).length} players with recorded app use</p>
  {!enabled&&<p style={{borderLeft:'4px solid #e31b23',paddingLeft:12}}>Squad announcements are paused until the first phone notification test is confirmed. Use “Send me a test notification” above.</p>}
  <label style={{display:'block',fontWeight:700,marginTop:20}}>News story<select value={selectedStory} onChange={e=>setSelectedStory(e.target.value)} style={{display:'block',width:'100%',maxWidth:'100%',padding:10,margin:'10px 0'}}><option value="">Choose a published story</option>{stories.map(s=><option key={s.url} value={s.url}>{s.title}</option>)}</select></label>
  <button style={button} disabled={busy||!enabled||!story||announced('news',newsTarget)} onClick={()=>send('news',newsTarget,'New club news',story.title)}>{announced('news',newsTarget)?'Story already announced':'Notify players of this story'}</button>
  <label style={{display:'block',fontWeight:700,marginTop:24}}>Fixture<select value={selectedFixture} onChange={e=>setSelectedFixture(e.target.value)} style={{display:'block',width:'100%',padding:10,margin:'10px 0'}}><option value="">Choose a fixture</option>{fixtures.map(f=><option key={f.id} value={f.id}>{formatMatchDate(f.match_date)} · {f.opponent} · {f.status}{f.status==='Upcoming'&&!f.availability_open?' · Availability closed':''}</option>)}</select></label>
  <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
   <button style={button} disabled={busy||!enabled||!fixture||fixture.status!=='Upcoming'||!fixture.availability_open||announced('availability',fixture?.id)} onClick={()=>send('availability',fixture.id,'Availability is open',`Please update your availability for ${fixture.opponent} on ${formatMatchDate(fixture.match_date)}.`)}>Notify players: availability open</button>
   {fixture?.id===11 && <button style={{...button,background:'#111'}} disabled={busy||!enabled||announced('fixture',fixture.id)} onClick={()=>send('fixture',fixture.id,'Match Details vs East Putney FC ⚽','Sunday’s squad and matchday details are ready! 9:45 meet, 10:30 KO, Clapham Common Pitch 9.')}>{announced('fixture',fixture.id)?'Match details already announced':'Notify players: match details ready'}</button>}
   <button style={{...button,background:'#111'}} disabled={busy||!enabled||!fixture||fixture.status!=='Completed'||announced('report',fixture?.id)} onClick={()=>send('report',fixture.id,'Match report is live',`${fixture.opponent}: read the report, vote MOTM and pay your match fee.`)}>Notify players: match report live</button>
  </div>
  {fixture?.id===11 && <p>This match-details notification opens the <a href="/fixtures/11">East Putney fixture preview</a>. It goes to devices opted into availability announcements and is separate from “availability open”.</p>}
  <p role="status">{message}</p>
  <button onClick={()=>load().catch(()=>setMessage('Could not refresh.'))} disabled={busy} style={{margin:'12px 0',padding:10}}>Refresh app usage and delivery status</button>
  <details><summary style={{cursor:'pointer',fontWeight:700}}>Player app use</summary><p>This records signed-in launches from the home-screen app, starting with this update. “Not recorded yet” does not prove someone has not installed it. Notification status is the latest registered subscription, not proof of reading.</p>
   <div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr>{['Player','First app use','Last app use','Subscribed devices'].map(label=><th key={label} style={{textAlign:'left',padding:8,borderBottom:'1px solid #ddd'}}>{label}</th>)}</tr></thead><tbody>{usage.map(p=><tr key={p.player_id}><td style={{padding:8}}>{p.full_name}</td><td style={{padding:8}}>{date(p.first_app_use)}</td><td style={{padding:8}}>{date(p.last_app_use)}</td><td style={{padding:8}}>{p.subscribed_devices}</td></tr>)}</tbody></table></div>
  </details>
  <details style={{marginTop:20}}><summary style={{cursor:'pointer',fontWeight:700}}>Recent notification status</summary>{messages.map(m=>{
   const rows=deliveries.filter(d=>d.message_id===m.id),count=state=>rows.filter(d=>d.state===state).length;
   return <div key={m.id} style={{borderBottom:'1px solid #ddd',padding:'12px 0'}}><strong>{m.title}</strong> · {date(m.created_at)}<br/>Accepted by push service: {count('accepted')} · Waiting: {count('pending')+count('sending')+count('failed')} · Needs review: {count('needs_review')} · Expired/cancelled: {count('expired')+count('cancelled')}</div>;
  })}</details>
 </section>;
}
