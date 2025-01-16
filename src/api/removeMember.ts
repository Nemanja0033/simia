import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const removeMember = async (
  username: string | null | undefined,
  groupID: string
) => {
  if (!username) {
    console.error("Username is undefined or empty.");
    return;
  }

  try {
    const groupQuery = query(collection(db, "groups"), where("groupID", "==", groupID));
    const groupSnapshot = await getDocs(groupQuery);

    if (groupSnapshot.empty) {
      console.error("Group not found for the provided groupID.");
      return;
    }

    const updatePromises = groupSnapshot.docs.map(async (groupDoc) => {
      const groupData = groupDoc.data();
      const currentMembers = Array.isArray(groupData.members) ? groupData.members : [];
      const updatedMembers = currentMembers.filter((member: string) => member !== username);

      const groupRef = doc(db, "groups", groupDoc.id);
      return updateDoc(groupRef, { members: updatedMembers });
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error("Error removing member:", error);
  }
};
