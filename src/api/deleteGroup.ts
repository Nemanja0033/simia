import { collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export const deleteGroup = async (groupID: string, groupName: string) => {
    const confirmMsg = confirm("Are you sure you want to delete this group including all members and data?");
    if (!confirmMsg) return;

    try {
        // Brisanje grupe
        const groupCollectionRef = collection(db, "groups");
        const groupQuery = query(groupCollectionRef, where("groupID", "==", groupID));
        const groupSnapshot = await getDocs(groupQuery);

        if (groupSnapshot.empty) {
            console.error(`No group found with ID: ${groupID}`);
            alert("Group not found. Please check the ID.");
            return;
        }

        const deleteGroupPromises = groupSnapshot.docs.map((doc) =>
            deleteDoc(doc.ref).catch((err) => {
                console.error(`Failed to delete document with ID ${doc.id}:`, err);
            })
        );
        await Promise.all(deleteGroupPromises);

        console.log("Group documents successfully deleted.");

        // Ažuriranje korisnika
        const userCollectionRef = collection(db, "users");
        const userQuery = query(userCollectionRef, where("group", "==", groupName));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
            const updateUserPromises = userSnapshot.docs.map((userDoc) =>
                updateDoc(userDoc.ref, {
                    group: "",
                    moderator: "",
                }).catch((err) => {
                    console.error(`Failed to update user document with ID ${userDoc.id}:`, err);
                })
            );
            await Promise.all(updateUserPromises);
            console.log("User documents successfully updated.");
        } else {
            console.log("No users found to update.");
        }
    } catch (err) {
        console.error("Error while deleting group:", err);
    }
};
