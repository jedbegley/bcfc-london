import { createClient } from '@supabase/supabase-js';
import { cache } from 'react';
export function newsClient() {
 return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {auth:{persistSession:false},global:{fetch:(url,options)=>fetch(url,{...options,cache:'no-store'})}});
}
export const getPublishedArticle=cache(async(slug)=>{
 const {data,error}=await newsClient().rpc('published_news_article',{p_slug:slug});
 if(error)throw new Error('Could not load article');
 return data?.[0]||null;
});
export function previewCard(row){
 return {date:row.published_at,displayDate:new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',dateStyle:'long'}).format(new Date(row.published_at)),label:'CLUB NEWS',category:row.category,title:row.preview_title,summary:row.summary,link:`/news/${row.slug}`,image:row.image_url,imageAlt:row.preview_title,imageFit:'contain',thumbnail:true,button:'Read Story →'};
}
