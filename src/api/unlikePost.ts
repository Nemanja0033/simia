import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";

export const toggleDislikePost = async (postID: number, username: string | null | undefined) => {
  if (!username) {
    console.error("Username is required to like or unlike a post.");
    return;
  }

  const q = query(collection(db, "groupPosts"), where("postID", "==", postID));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (postDoc) => {
    const postData = postDoc.data();
    const currentUsers = Array.isArray(postData.likes.users) ? postData.likes.users : [];
    const userRef = doc(db, "groupPosts", postDoc.id);

    if (currentUsers.includes(username)) {
      const updatedUsers = currentUsers.filter((user: any) => user !== username);
      await updateDoc(userRef, {
        dislikes: {
          users: updatedUsers,
        },
      });
    } else {
      await updateDoc(userRef, {
        dislikes: {
          users: [...currentUsers, username],
        },
      });
    }
  });
};
