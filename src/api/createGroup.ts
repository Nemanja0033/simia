import { addDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

let counter = 0;

export const createGroup = async (name: string, description: string) => {
  counter++;
  if(counter === 1){
    try {
        const moderator = auth.currentUser?.displayName;
        const userID = auth.currentUser?.uid;

        if (!moderator || !userID) {
            alert("User not authenticated");
            return;
        }

        const groupCollectionRef = collection(db, "groups");
        await addDoc(groupCollectionRef, {
            name: name,
            description: description,
            moderator: moderator,
            members: [moderator],
            groupID: userID,
        });

        const userQuery = query(collection(db, "users"), where("userID", "==", userID));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userDocRef = userDoc.ref;

            await updateDoc(userDocRef, {
                group: name,
                moderator: name,
            });

            alert("Group successfully created and user updated!");
            location.reload();
            location.href = '/groups'
        } else {
            alert("User document not found!");
        }
    } catch (error) {
        console.error("Error creating group or updating user:", error);
        alert("Failed to create group. Please try again.");
    }
  }
  else{
    alert("Cannot make multiple groups at same time!");
  }
};
