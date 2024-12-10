import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

// login with existing account creds
export const loginWithEmail = async (setIsAuth: Function, setUserName: Function, email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(async (result) => {
            setIsAuth(true);
            setUserName(result.user.displayName || "");
            localStorage.setItem("isAuth", "true");
            localStorage.setItem("userID", result.user.uid);
            location.href = '/';
        })
        .catch((error) => {
            alert('Invalid Password or email');
            console.log(error);
        });
};