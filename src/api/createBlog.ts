import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

export const createBlogPost = async (heading: string, content: string, groupName: string, url:string) => {
    try{
        const postCollectionRef = collection(db, 'blogPosts');
        await addDoc(postCollectionRef, {
        heading: heading,
        content: content,
        author: auth.currentUser?.displayName,
        group: groupName,
        thumbnail: url,
        image: url,
        comments: [],
        createdAt: new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
          }),
    });
    location.href = '/'
    }
    catch(err){
        console.log('Error while creating post', err);
    }
}