import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { addMember } from "./addMember";


export const acceptMember = async (userID: string, groupName: string, username: string, groupID: string ) => {
  try {
    const q = query(collection(db, 'users'), where('userID', '==', userID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (userDoc) => {
      const userRef = doc(db, 'users', userDoc.id); 
      await updateDoc(userRef, { group: groupName });
    });
    addMember(username, groupID);
    alert('Member Request Accepted!');
  } catch (error) {
    console.error("Error accepting member:", error);
  }
};