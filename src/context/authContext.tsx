import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

type AuthContextProps = {
    isAuth: boolean,
    isActive: boolean,
    setIsAuth: any,
    setIsActive: any,
    setUserName: any,
    userName: string | null,
    userID: string | null,
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [userName, setUserName] = useState<string | null>(null);
    const [userID, setUserID] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
                setUserName(user.displayName || "Undefined");
                setUserID(user.uid);
            } else {
                setIsAuth(false);
                setUserName(null);
                setUserID(null);
            }
        });

        return () => unsubscribe()
    }, []);

    useEffect(() => {
        const checkUserStatus = async (userID: string) => {
            try {
              const q = query(collection(db, 'users'), where('userID', '==', userID));
              const querySnapshot = await getDocs(q);
      
              if (querySnapshot.empty) {
                console.log('User document does not exist');
                setIsActive(false); 
                return;
              }
      
              querySnapshot.forEach((doc) => {
                const data = doc.data().status;
                if (data === "active") {
                  setIsActive(true);
                } else {
                  setIsActive(false);
                }
              });
      
            } catch (error) {
              console.error('Error fetching user status:', error);
              setIsActive(false); 
            }
          };
      
          const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              checkUserStatus(user.uid);
            } else {
              console.log('No user signed in');
              setIsActive(false); 
            }
          });
      
          return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, userName, userID, isActive, setIsAuth, setUserName, setIsActive }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
