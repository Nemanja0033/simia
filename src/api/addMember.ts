import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../dist/config/firebase";

export const addMember = async (username: string, groupID: string) => {
  try {
    const q = query(collection(db, "groups"), where("groupID", "==", groupID));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("Group not found for the provided groupID.");
      return;
    }

    querySnapshot.forEach(async (groupDoc) => {
      const groupData = groupDoc.data(); 
      console.log("Group data:", groupData);
      const currentMembers = Array.isArray(groupData.members) ? groupData.members : []; 

      if (!username) {
        console.error("Username is undefined or empty.");
        return;
      }

      const userRef = doc(db, "groups", groupDoc.id);
      await updateDoc(userRef, { members: [...currentMembers, username] });
    });
  } catch (error) {
    console.error("Error adding member:", error);
  }
};
