import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../config/firebase';
import { createUser } from "./createUser";

// Email and password signup method
export const signUpWithEmail = async (
    setIsAuth: Function,
    setUserName: Function,
    email: string,
    password: string,
    username: string
) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(result.user, { displayName: username });

        setIsAuth(true);
        setUserName(username);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userName", username);
        localStorage.setItem("userID", result.user.uid);

        await createUser(username);

        location.href = '/';
    } catch (error) {
        alert(`${email} is currently in use or invalid.`);
        console.error("Error during signup:", error);
    }
};
