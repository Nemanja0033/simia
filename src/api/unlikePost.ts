import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export const toggleDislikePost = async (postID: number, username: string | null | undefined) => {
  if (!username) {
    console.error("Username is required to dislike or undo dislike on a post.");
    return;
  }

  try {
    const q = query(collection(db, "groupPosts"), where("postID", "==", postID));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`No post found with postID: ${postID}`);
      return;
    }

    for (const postDoc of querySnapshot.docs) {
      const postData = postDoc.data();
      const currentUsers = Array.isArray(postData.dislikes?.users) ? postData.dislikes.users : [];
      const userRef = doc(db, "groupPosts", postDoc.id);

      if (currentUsers.includes(username)) {
        const updatedUsers = currentUsers.filter((user: string) => user !== username);
        await updateDoc(userRef, {
          dislikes: {
            users: updatedUsers,
          },
        });
        console.log(`User ${username} removed from dislikes.`);
      } else {
        await updateDoc(userRef, {
          dislikes: {
            users: [...currentUsers, username],
          },
        });
        console.log(`User ${username} added to dislikes.`);
      }
    }
    location.reload();
  } catch (error) {
    console.error("Error toggling dislike for the post:", error);
  }
};
