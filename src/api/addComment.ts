import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const addComment = async (heading: string, newComment: object) => {
    try {
      const q = query(collection(db, "blogPosts"), where("heading", "==", heading));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("No blog post found with the provided heading.");
        return;
      }

      for (const blogDoc of querySnapshot.docs) {
        const blogData = blogDoc.data();
        const currentComments = Array.isArray(blogData.comments) ? blogData.comments : [];

        const blogRef = doc(db, "blogPosts", blogDoc.id);
        await updateDoc(blogRef, { comments: [...currentComments, newComment] });

      }
      location.reload()
    } catch (err) {
      console.error("Error while adding comment:", err);
    }
  };