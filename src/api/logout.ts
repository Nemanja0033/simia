import { signOut } from "firebase/auth"
import { auth } from "../../dist/config/firebase"

export const logout = async () => {
    try{
        await signOut(auth);
        location.href = '/login'
    }
    catch (err) {
        console.error("Error while logout user", err);
    }
}