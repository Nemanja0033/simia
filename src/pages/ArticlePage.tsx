import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const ArticlePage = () => {

    const { heading } = useParams();
    const [article, setArticle] = useState<any[]>([]);

    useEffect(() => {
        const fetchArticle = async () => {
            const q = query(collection(db, 'blogPosts'), where("heading", "==", heading));
            const data = await getDocs(q);
            setArticle(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        fetchArticle();
    }, [heading])

  return (
    <div className="w-full flex justify-center mt-28">
        {article.map((a, index) => (
            <div key={index} className="md:w-1/2 w-full flex-row">
                <div className="flex justify-between items-end">
                    <h1 className="text-2xl font-bold text-center">{a.heading}</h1>
                    <span className="text-sm text-gray-600">{a.createdAt}</span>
                </div>
                <div className="flex justify-center">
                    <img src={a.image} alt={a.heading} />
                </div>
                <div dangerouslySetInnerHTML={{__html: a.content}} className="mt-6">
                    
                </div>
            </div>
        ))}
    </div>
  )
}

export default ArticlePage