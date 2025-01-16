import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../dist/config/firebase";

export const toggleLikePost = async (postID: number, username: string | null | undefined) => {
  if (!username) {
    console.error("Username is required to like or unlike a post.");
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
      const currentUsers = Array.isArray(postData.likes?.users) ? postData.likes.users : [];
      const userRef = doc(db, "groupPosts", postDoc.id);

      if (currentUsers.includes(username)) {
        const updatedUsers = currentUsers.filter((user: string) => user !== username);
        await updateDoc(userRef, {
          likes: {
            users: updatedUsers,
          },
        });
        console.log(`User ${username} removed from likes.`);
      } else {
        await updateDoc(userRef, {
          likes: {
            users: [...currentUsers, username],
          },
        });
        console.log(`User ${username} added to likes.`);
      }
    }
    location.reload();
  } catch (error) {
    console.error("Error toggling like for the post:", error);
  }
};
