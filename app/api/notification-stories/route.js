import {getNewsArticles} from '../../news/articles';
export const dynamic='force-dynamic';
export async function GET(){
 const stories=await getNewsArticles();
 return Response.json(stories.filter(story=>story.link.startsWith('/news/')).map(story=>({title:story.title,body:story.summary,url:story.link})),{headers:{'Cache-Control':'no-store'}});
}
