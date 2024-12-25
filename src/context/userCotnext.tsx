import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";

type UserContextProps = {
    user: any
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider =  ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const q = query(collection(db, 'users'), where('userID', '==', auth.currentUser?.uid));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                  setUser(data);
              });
        }

        fetchUser();
    }, []);

    return(
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within an AuthProvider");
    }
    return context; 
}
