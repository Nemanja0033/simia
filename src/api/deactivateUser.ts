import { query, collection, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";


export const deactivateUser = async (userID: string) => {
  try {
    const q = query(collection(db, 'users'), where('userID', '==', userID));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (userDoc) => {
      const userRef = doc(db, 'users', userDoc.id); 
      await updateDoc(userRef, { status: "inactive" });
      location.reload();
    });

    console.log(`User with ID ${userID} has been activated.`);
  } catch (error) {
    console.error("Error activating user:", error);
  }
};