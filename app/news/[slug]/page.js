import {notFound} from 'next/navigation';
import {getPublishedArticle} from '../published';
import ArticleBody from '../ArticleBody';
import ShareButtons from '../../ShareButtons';
export const dynamic='force-dynamic';
export async function generateMetadata({params}){
 const {slug}=await params;
 const article=await getPublishedArticle(slug);
 if(!article)return {title:'Article unavailable',robots:{index:false,follow:false}};
 const url=`https://www.bcfclondon.co.uk/news/${article.slug}`;
 const image=`https://www.bcfclondon.co.uk${article.image_url}`;
 return {title:article.preview_title,description:article.summary,alternates:{canonical:url},openGraph:{title:article.preview_title,description:article.summary,url,type:'article',images:[{url:image,width:1200,height:630,alt:article.preview_title}]},twitter:{card:'summary_large_image',title:article.preview_title,description:article.summary,images:[image]}};
}
export default async function NewsArticle({params}){
 const {slug}=await params;
 const article=await getPublishedArticle(slug);
 if(!article)notFound();
 return <main style={{background:'#fff',minHeight:'70vh'}}><div style={{maxWidth:880,margin:'auto',padding:'30px 24px 0'}}><a href="/news">← Back to News</a></div><ArticleBody article={article} photo={article.photo_url}/><div style={{maxWidth:880,margin:"auto",padding:24}}><ShareButtons title={article.preview_title}/></div></main>;
}
