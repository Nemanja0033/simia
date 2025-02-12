import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { trackLoginHistory } from "./trackLoginHistory";

// login with existing account creds
export const loginWithEmail = async (setIsAuth: Function, email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
            setIsAuth(true);
            await trackLoginHistory();
            location.href = '/';
        })
        .catch((error) => {
            alert('Invalid Password or email');
            console.log(error);
        });
};