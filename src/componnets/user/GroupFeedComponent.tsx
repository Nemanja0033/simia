import { query, collection, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../config/firebase";

const GroupFeedComponent = ({groupID}: {groupID: string | undefined}) => {

    const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchGroupPosts = async () => {
      try {
        const q = query(
          collection(db, "groupPosts"),
          where("groupID", "==", groupID),
          orderBy("createdAt", "desc"),
        );
        const data = await getDocs(q);
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

  fetchGroupPosts();
}, [groupID]);


  return (
    <div className="flex md:w-1/2 w-full justify-center">
       <div className="flex-row overflow-auto">
       {posts.map((m) => (
          <div className="flex-row w-full rounded-md shadow-md mt-12">
            <div className="flex justify-start gap-2 items-center ml-3 mt-3">
               <span className="font-bold text-md">{m.author}</span>
               <i className="text-xs font-light">{m.createdAt}</i>
            </div>
            <div className="flex justify-center text-center ml-3 min-h-14 max-h-52 overflow-auto w-[95%] mt-3">
              <p className="text-center">{m.content}</p>
             </div>
          </div>
        ))}
       </div>
    </div>
  )
}

export default GroupFeedComponent