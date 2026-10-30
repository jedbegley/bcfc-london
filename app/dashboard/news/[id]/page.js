import ManagerNews from '../ManagerNews';
export default async function NewsReview({params}){const {id}=await params;return <ManagerNews id={id}/>;}
