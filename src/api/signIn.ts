import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../lib/firebase';
import { createUser } from "./createUser";
import { trackLoginHistory } from "./trackLoginHistory";

// Email and password signup method
export const signUpWithEmail = async (
    setIsAuth: any,
    setUserName: any,
    email: string,
    password: string,
    username: string
) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: username });
        setIsAuth(true);
        setUserName(username);
        await createUser(username);
        await trackLoginHistory();
        location.href = '/';
    } catch (error) {
        alert(`${email} is currently in use or invalid.`);
        console.error("Error during signup:", error);
    }
};
