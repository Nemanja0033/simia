import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";
import { db } from "../../config/firebase";

type CommentContextProps = {
    addComment: any,
    showComments: any,
    comments: any[],
}

const CommentContext = createContext<CommentContextProps | undefined>(undefined);

export const CommentProvider = ({children}: {children: ReactNode}) => {
    
    const [comments, setComments] = useState<any[]>([]);

    const showComments = async (heading: string) => {
      try {
        const q = query(collection(db, "blogPosts"), where("heading", "==", heading));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((blogDoc) => {
          const blogComments = blogDoc.data().comments;
          setComments(blogComments)
        })

      } catch (error) {
        console.error("Error fethcing comments", error);
      }
    };

    const addComment = async (heading: string, newComment: any) => {
      try{
        const q = query(collection(db, 'blogPosts'), where("heading", "==", heading));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.error("Group not found for the provided groupID.");
          return;
        }
    
        querySnapshot.forEach(async (blogDoc) => {
          const blogData = blogDoc.data(); 
          const currentComment = Array.isArray(blogData.comments) ? blogData.comments : []; 
          setComments(currentComment);
          const addedComment = newComment;
    
          const blogRef = doc(db, "blogPosts", blogDoc.id);
          await updateDoc(blogRef, { comments: [...currentComment, addedComment  ] });
      });
      location.reload();
      }
      catch(err){
        console.error("Error while adding comment", err);
      }
    }

    return(
      <CommentContext.Provider value={{addComment, comments, showComments}}>
        {children}
      </CommentContext.Provider>
    )
}

export const useComments = () => {
    const context = useContext(CommentContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an CommentProvider");
    }
    return context; 
}