import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export const createUser = async (username: string) => {
    try {
        const collectionRef = collection(db, "users");
        await addDoc(collectionRef, {
            username: username,
            userID: auth.currentUser?.uid,
        });
        console.log("User successfully added!");
    } catch (error) {
        console.error("Error adding user:", error);
    }
};