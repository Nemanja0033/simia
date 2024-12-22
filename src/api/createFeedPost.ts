import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase"

export const createFeedPost = async (heading: string, content: string) => {
    try{
        const postCollectionRef = collection(db, 'groupPosts');
        await addDoc(postCollectionRef, {
        heading: heading,
        content: content,
        author: auth.currentUser?.displayName,
        createdAt: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          }),
        likes: {
            count: 0,
            users: [],
        }
    })
    }
    catch(err){
        console.log('Error while creating post', err);
    }
}