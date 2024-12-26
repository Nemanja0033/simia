import { query, collection, where, getDocs, orderBy } from "firebase/firestore";
import { useState, useEffect } from "react";
import { auth, db } from "../../../config/firebase";
import { toggleLikePost } from "../../api/likePost";
import { toggleDislikePost } from "../../api/unlikePost";

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
}, [groupID,]);


return (
  <div className="flex md:w-1/2 w-full justify-center">
    <div className="flex-row w-full">
      {posts.map((m) => (
        <div className="flex-row w-full rounded-md shadow-md mt-12">
          <div className="flex justify-start gap-2 items-center ml-3 mt-3">
            <span className="font-bold text-md">{m.author}</span>
            <i className="text-xs font-light">{m.createdAt}</i>
          </div>
          <div className="flex justify-center text-center ml-3 max-h-52 min-h-32 overflow-auto w-full mt-3">
            {m.content}
          </div>
          <div className="flex justify-center items-center gap-4 h-8">
            <button onClick={() => toggleLikePost(m.postID, auth.currentUser?.displayName)} className="text-primary flex gap-2">
              <span className="text-primary font-bold text-md">For</span>
              {m.likes.users.length}
            </button>
            <button onClick={() => toggleDislikePost(m.postID, auth.currentUser?.displayName)} className="text-red-400 flex gap-2">
              <span className="text-red-400 font-bold text-md">Against</span>
              {m.dislikes.users.length}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

}

export default GroupFeedComponent