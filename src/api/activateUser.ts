import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../dist/config/firebase";


export const activateUser = async (userID: string) => {
  try {
    const q = query(collection(db, 'users'), where('userID', '==', userID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (userDoc) => {
      const userRef = doc(db, 'users', userDoc.id); 
      await updateDoc(userRef, { status: "active" });
    });

  } catch (error) {
    console.error("Error activating user:", error);
  }
};