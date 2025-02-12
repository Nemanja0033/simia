import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";
import { db } from "../lib/firebase";

type CommentContextProps = {
  addComment: any
  showComments: any
  comments: any;
};

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<any[]>([]);

  const showComments = async (heading: string) => {
    try {
      const q = query(collection(db, "blogPosts"), where("heading", "==", heading));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((blogDoc) => {
        const blogComments = blogDoc.data().comments || [];
        if (Array.isArray(blogComments)) {
          setComments(blogComments);
        } else {
          console.warn("Comments field is not an array.");
        }
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async (heading: string, newComment: string) => {
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

        setComments((prevComments) => [...prevComments, newComment]);
      }
    } catch (err) {
      console.error("Error while adding comment:", err);
    }
  };

  return (
    <CommentContext.Provider value={{ addComment, showComments, comments }}>
      {children}
    </CommentContext.Provider>
  );
};

// Hook za korišćenje CommentContext-a
export const useComments = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error("useComments must be used within a CommentProvider");
  }
  return context;
};
