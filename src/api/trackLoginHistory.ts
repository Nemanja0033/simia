import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase"

export const trackLoginHistory = async () => {
    const historyRef = collection(db, "history");
    await addDoc(historyRef, {
        email: auth.currentUser?.email,
        at: new Date().toLocaleString('en-US', {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
          }),
    })
}