import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase";

export const createGroup = async (name: string, description: string) => {
    const moderator = auth.currentUser?.displayName;
    const groupCollectionRef = collection(db, "groups");
    await addDoc(groupCollectionRef, {
        name: name,
        description: description,
        moderator: moderator,
        members: [moderator,],
        groupID: auth.currentUser?.uid,
    });
    alert("Group succesfully created!");
}