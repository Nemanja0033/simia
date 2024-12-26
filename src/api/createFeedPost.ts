import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase"

export const createFeedPost = async (heading: string, content: string, groupName: string, groupID: string | undefined) => {
    try{
        const postCollectionRef = collection(db, 'groupPosts');
        await addDoc(postCollectionRef, {
        heading: heading,
        content: content,
        author: auth.currentUser?.displayName,
        group: groupName,
        groupID: groupID,
        postID: Math.random(),
        createdAt: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          }),
        likes: {
            users: [],
        }
    })
        location.reload();
    }
    catch(err){
        console.log('Error while creating post', err);
    }
}