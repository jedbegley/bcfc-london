"use client";
import {useEffect,useState} from 'react';
import {supabase} from '../../browserSupabase';
import ArticleBody from '../../news/ArticleBody';
import {londonInput,approvalISO} from './schedule.mjs';
import styles from './manager.module.css';
const empty={internal_title:'',title:'',slug:'',preview_title:'',summary:'',content:'',category:'CLUB NEWS',image_url:'',photo_player_id:'',notification_title:'',notification_body:'',review_due_at:null};
const date=value=>value?new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',dateStyle:'long',timeStyle:'short'}).format(new Date(value)):'No review scheduled';
export default function ManagerNews({id}){
 const [revision,setRevision]=useState(0);
 const [status,setStatus]=useState('Checking manager access…'),[allowed,setAllowed]=useState(false),[rows,setRows]=useState([]),[article,setArticle]=useState(null),[saved,setSaved]=useState(null),[players,setPlayers]=useState([]),[due,setDue]=useState(''),[busy,setBusy]=useState(false),[preview,setPreview]=useState(true);
 useEffect(()=>{
  const {data:{subscription}}=supabase.auth.onAuthStateChange(event=>{
   if(event==='SIGNED_OUT'||event==='SIGNED_IN'){setAllowed(false);setArticle(null);setSaved(null);setRows([]);setPlayers([]);setStatus('Checking manager access…');setRevision(v=>v+1);}
  });
  return()=>subscription.unsubscribe();
 },[]);
 useEffect(()=>{
  let active=true;
  async function load(){
   const {data:{user},error:authError}=await supabase.auth.getUser();
   if(authError||!user){if(active)setStatus('Sign in with your manager account to continue.');return;}
   const {data:manager,error}=await supabase.from('Players').select('is_admin').eq('user_id',user.id).single();
   if(error||!manager?.is_admin){if(active)setStatus('Manager access required.');return;}
   const [{data:news,error:newsError},{data:photos,error:photoError}]=await Promise.all([supabase.from('news').select('*').order('updated_at',{ascending:false}),supabase.from('public_squad').select('id,full_name,photo_url').order('full_name')]);
   if(newsError||photoError)throw newsError||photoError;
   if(!active)return;
   setPlayers(photos||[]);setRows(news||[]);setAllowed(true);setStatus('');
   if(id){const selected=id==='new'?{...empty}:news.find(n=>String(n.id)===String(id));if(!selected){setStatus('Article not found.');return;}setArticle(selected);setSaved(selected);setDue(londonInput(selected.review_due_at));}
  }
  load().catch(()=>{if(active)setStatus('Could not load private news. Please refresh.');});
  return()=>{active=false;};
 },[id,revision]);
 const dirty=article&&saved&&(JSON.stringify(article)!==JSON.stringify(saved)||due!==londonInput(saved.review_due_at));
 function field(key,label,multiline=false){return <label className={styles.field} key={key}>{label}{multiline?<textarea rows={key==='content'?18:3} value={article[key]||''} onChange={e=>setArticle({...article,[key]:e.target.value})} required/>:<input value={article[key]||''} onChange={e=>setArticle({...article,[key]:e.target.value})} required/>}</label>;}
 async function action(kind){
  setBusy(true);setStatus('');
  try{
   if(kind!=='save'&&dirty)throw Error('Save your changes, then review the saved preview before continuing.');
   let result;
   if(kind==='save')result=await supabase.rpc('save_news_draft',{p_article:{...article,review_due_at:approvalISO(due),photo_player_id:article.photo_player_id||null}});
   if(kind==='publish'){
    if(!window.confirm('Publish this article publicly now? This does not notify the squad.'))return;
    result=await supabase.rpc('publish_news_article',{p_id:article.id,p_expected_updated_at:article.updated_at});
   }
   if(kind==='notify'){
    if(!window.confirm(`Send this squad notification?\n\n${article.notification_title}\n${article.notification_body}\n\nPlayer preferences apply. This announcement can be sent once.`))return;
    result=await supabase.rpc('queue_news_notification',{p_id:article.id});
   }
   if(result.error)throw result.error;
   if(kind==='notify'){
    setStatus(result.data.already_sent?'Already queued. No duplicate notification sent.':`Squad notification queued for ${result.data.devices} devices.`);
    const {data,error}=await supabase.from('news').select('*').eq('id',article.id).single();if(error)throw error;setArticle(data);setSaved(data);
   }else{
    setArticle(result.data);setSaved(result.data);setDue(londonInput(result.data.review_due_at));setPreview(true);setStatus(kind==='publish'?'Published. No squad notification was sent.':'Saved privately.');
    if(id==='new')window.location.assign(`/dashboard/news/${result.data.id}`);
   }
  }catch(error){setStatus(error.message||'Action failed. Please refresh and try again.');}finally{setBusy(false);}
 }
 const photo=players.find(p=>String(p.id)===String(article?.photo_player_id))?.photo_url;
 return <main className={styles.page}><a href="/dashboard">← Manager dashboard</a><h1>Private news desk</h1><p role="status">{status}</p>
 {!allowed&&<a href={`/login?next=${encodeURIComponent(id?`/dashboard/news/${id}`:'/dashboard/news')}`}>Sign in</a>}
 {allowed&&!id&&<><p>Schedule a private approval reminder. Articles stay unpublished until you approve them.</p><a href="/dashboard/news/new">Create draft</a>{rows.map(row=><section className={styles.card} key={row.id}><h2><a href={`/dashboard/news/${row.id}`}>{row.internal_title}</a></h2><p>{row.state.replaceAll('_',' ')} · {date(row.review_due_at)}</p><p>{row.published?'Publicly published':'Private — not published'}</p></section>)}</>}
 {allowed&&article&&<><a href="/dashboard/news">All drafts and articles</a><p><strong>{article.state?.replaceAll('_',' ')||'New draft'}</strong> · Approval review: {date(saved.review_due_at)} (UK time)</p><p>Publishing and notifying the squad are separate actions.</p>
 <div className={styles.actions}><button type="button" onClick={()=>setPreview(!preview)}>{preview?'Edit article':'Preview current changes'}</button>{article.state!=='published'&&<><button disabled={busy||!article.id||dirty} onClick={()=>action('publish')}>Approve and publish</button><span>{dirty?'Unsaved changes — save before approval.':''}</span></>}{article.state==='published'&&<><a href={`/news/${article.slug}`}>View published article</a><button disabled={busy||!!article.notification_sent_at||dirty} onClick={()=>action('notify')}>{article.notification_sent_at?'Squad already notified':'Send spoiler-free squad notification'}</button></>}</div>
 {preview?<><div className={styles.card}><h2>Public preview</h2><img src={article.image_url} alt="Spoiler-free article preview" style={{width:'100%',maxWidth:600}}/><h3>{article.preview_title}</h3><p>{article.summary}</p><p><strong>Squad push:</strong> {article.notification_title}{article.notification_body&&<><br/>{article.notification_body}</>}</p></div><p>Private full article preview{dirty?' (unsaved changes)':''}</p><ArticleBody article={article} photo={photo}/></>:<form onSubmit={e=>{e.preventDefault();action('save');}}>
 <fieldset disabled={busy||article.state==='published'} className={styles.form}>
 {field('internal_title','Internal title (managers only)')}{field('title','Full article headline')}{field('slug','Public URL slug — keep spoiler-free')}{field('preview_title','Homepage, News and social headline')}{field('summary','Public preview description',true)}{field('image_url','Spoiler-free preview image path')}{field('category','Category')}
 <label className={styles.field}>Player photo inside full article<select value={article.photo_player_id||''} onChange={e=>setArticle({...article,photo_player_id:e.target.value})}><option value="">No player photo</option>{players.map(p=><option key={p.id} value={p.id}>{p.full_name}</option>)}</select></label>
 {field('content','Article text (blank line between paragraphs)',true)}{field('notification_title','Separate squad notification headline')}<label className={styles.field}>Separate squad notification body (optional)<textarea rows={3} value={article.notification_body||''} onChange={e=>setArticle({...article,notification_body:e.target.value})}/></label>
 <label className={styles.field}>Private approval reminder (UK time)<input type="datetime-local" value={due} onChange={e=>setDue(e.target.value)}/></label><p>This time requests manager approval. It never publishes automatically. Leave blank for an unscheduled draft.</p><button type="submit">Save private draft and schedule</button>
 </fieldset></form>}
 </>}
 </main>;
}
