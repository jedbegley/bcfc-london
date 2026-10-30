import styles from './article.module.css';
export default function ArticleBody({article,photo}){
 return <article className={styles.article}>
  <p className={styles.category}>{article.category}</p><h1>{article.title}</h1>
  {photo&&<img className={styles.photo} src={photo} alt="Player of the Month" />}
  <div className={styles.copy}>{article.content.split(/\n\s*\n/).map((paragraph,i)=><p key={i}>{paragraph}</p>)}</div>
 </article>;
}
