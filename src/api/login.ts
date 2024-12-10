import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

// login with existing account creds
export const loginWithEmail = async (setIsAuth: Function, email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
            setIsAuth(true);
            location.href = '/';
        })
        .catch((error) => {
            alert('Invalid Password or email');
            console.log(error);
        });
};