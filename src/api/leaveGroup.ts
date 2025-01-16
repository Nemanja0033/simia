import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../dist/config/firebase";
import { removeMember } from "./removeMember";

export const leaveGroup = async (
  userID: string | undefined,
  username: string | null | undefined,
  groupID: string
) => {

  const msg = confirm("Are You Sure Want To Leave Group?")

 if(msg){
  if (!userID || !username) {
    console.error("Invalid userID or username.");
    return;
  }

  try {
    const userQuery = query(collection(db, "users"), where("userID", "==", userID));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      console.error("User not found.");
      return;
    }

    const updatePromises = userSnapshot.docs.map((userDoc) => {
      const userRef = doc(db, "users", userDoc.id);
      return updateDoc(userRef, { group: "" });
    });

    await Promise.all(updatePromises);

    await removeMember(username, groupID);

    location.href = "/groups";
  } catch (error) {
    console.error("Error leaving group:", error);
  }
 }
};
