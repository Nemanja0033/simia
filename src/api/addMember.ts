import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const addMember = async (username: string, groupID: string) => {
  try {
    // Pravi upit za kolekciju 'groups' gde je groupID jednak prosleđenom
    const q = query(collection(db, "groups"), where("groupID", "==", groupID));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("Group not found for the provided groupID.");
      return;
    }

    querySnapshot.forEach(async (groupDoc) => {
      const groupData = groupDoc.data(); 

      // Log podataka za debagovanje
      console.log("Group data:", groupData);

      const currentMembers = Array.isArray(groupData.members) ? groupData.members : []; // Validacija za members

      if (!username) {
        console.error("Username is undefined or empty.");
        return;
      }

      const userRef = doc(db, "groups", groupDoc.id);

      // Dodaj novog člana u postojeće članove
      await updateDoc(userRef, { members: [...currentMembers, username] });
    });
  } catch (error) {
    console.error("Error adding member:", error);
  }
};
