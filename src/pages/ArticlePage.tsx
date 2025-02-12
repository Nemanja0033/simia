import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { auth, db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addComment } from "../api/addComment";
import { useAuth } from "../context/authContext";
import Loader from "../ui/Loader";

const ArticlePage = () => {

    const { heading } = useParams();
    const [article, setArticle] = useState<any[]>([]);
    const [comment, setComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [commentSearch, setCommentSearch] = useState<string>("");
    const [hideShowAnonymousComments, setHideShowAnonymousComments] = useState<boolean>(false);
    const { isAuth } = useAuth();

    useEffect(() => {
        const fetchArticle = async () => {
            const q = query(collection(db, 'blogPosts'), where("heading", "==", heading));
            const data = await getDocs(q);
            setArticle(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        }

        fetchArticle();
    }, [heading]);
    
        const newComment = {
            author: isAuth ? auth.currentUser?.displayName : 'Anonymous',
            date: new Date().toLocaleString('en-US', {
                month: 'short',
                day: '2-digit',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
              }),
            content: comment,
        }

    if(loading){
        return <Loader />
    }

  return (
   <>
    <div className="w-full flex justify-center mt-28">
        {article.map((a, index) => (
            <div key={index} className="md:w-1/2 w-full flex-row">
                <div className="flex justify-start items-end">
                    <h1 className="text-2xl font-bold text-center">{a.heading}</h1>
                </div>
                <div className="flex justify-start items-end gap-2 mt-1 mb-1">
                    <i className="text-gray-600">Writen by <i className="font-bold">{a.group}</i></i>
                    <i className="text-sm text-gray-600">{a.createdAt}</i>
                </div>
                <div className="flex justify-center">
                    <img src={a.image} alt={a.heading} />
                </div>
                <div dangerouslySetInnerHTML={{__html: a.content}} className="mt-6">
                    
                </div>
                <div className={`flex flex-col shadow-md w-full min-h-[200px] max-h-[600px] p-4 rounded-md mt-6 `}>
                <div className="flex justify-start">
                    <h1>Comments ({a.comments.length})</h1>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <input
                    type="text"
                    placeholder="Write Comment"
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                    onClick={() => addComment(a.heading, newComment)}
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                    Submit
                    </button>
                </div>

                {a.comments.length < 1 ? '' :
                (
                <div className="w-full flex justify-start gap-3 items-center mt-3">
                    <input className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                           type="text"
                           placeholder="Search Comment. . ." onChange={(e) => setCommentSearch(e.target.value)} />
                    <button onClick={() => setHideShowAnonymousComments(!hideShowAnonymousComments)} className="btn btn-neutral w-32 md:w-auto h-auto btn-xs text-primary border-none hover:text-white hover:bg-primary">{hideShowAnonymousComments == true ? "Show All Comments" : "Hide Anonymous Comments"}</button>
                </div>
                )}

                <div className="mt-3 overflow-auto md:mb-0 mb-12">
                    {a.comments.filter((item: any) => 
                    hideShowAnonymousComments === true ? item.author !== 'Anonymous'
                    : item.author
                    ).filter((item: any) => commentSearch.toLowerCase() === '' ? 
                    true : item.content.toLowerCase().includes(commentSearch.toLowerCase())).map((c: any, index: number) => (
                    <div key={index} className="flex flex-col gap-3 mb-4">
                        <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="font-semibold text-lg">{c.author}</span>
                            <span className="text-xs text-gray-500">{c.date}</span>
                        </div>
                        </div>

                        <div className="p-3 rounded-md w-full overflow-auto shadow-sm">
                        <p className="text-gray-700 break-words">{c.content}</p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        ))}
    </div>
    </>
  )
}

export default ArticlePage