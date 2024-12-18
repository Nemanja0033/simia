import { collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase"; 

export const deleteRequest = async (userID: string) => {
    try {
        const userCollectionRef = collection(db, 'users');
        const q = query(userCollectionRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);
        const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        location.reload();
    } catch (error) {
        console.error("Error deleting documents: ", error);
    }
};