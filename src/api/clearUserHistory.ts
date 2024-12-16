import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const clearUserHistory = async () => {
  try {
    const historyCollectionRef = collection(db, "history");
    const querySnapshot = await getDocs(historyCollectionRef);

    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    console.log("User history cleared successfully.");
  } catch (error) {
    console.error("Error clearing user history:", error);
  }
};
