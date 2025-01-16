import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../dist/config/firebase";


export const groupRequest = async (groupName: string) => {
  try {
    const q = query(collection(db, 'users'), where('userID', '==', auth.currentUser?.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (userDoc) => {
      const userRef = doc(db, 'users', userDoc.id); 
      await updateDoc(userRef, { group: groupName + 'pending' });
    });
    alert("Your request has been sent to the moderator of this group")

  } catch (error) {
    console.error("Error activating user:", error);
  }
};