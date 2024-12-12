import { query, collection, where, getDocs } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";

type AdminContextProps = {
    isAdmin: boolean,
    loading: boolean
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider = ({children}: {children: ReactNode}) => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkIfUserIsAdmin = async (userID: string) => {
          try {
            console.log("Checking if user is admin with userID:", userID);
            const q = query(collection(db, 'users'), where('userID', '==', userID));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
              console.log('User document does not exist');
              setIsAdmin(false);
              setLoading(false); 
              return;
            }
    
            querySnapshot.forEach((doc) => {
              const data = doc.data().admin;
              console.log('Admin status in db:', data);
              if (data === "true") {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
            });
    
            setLoading(false); 
          } catch (error) {
            console.error('Error fetching admin status:', error);
            setIsAdmin(false);
            setLoading(false); 
          }
        };
    
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            console.log('User UID onAuthStateChanged:', user.uid);
            checkIfUserIsAdmin(user.uid);
          } else {
            console.log('No user signed in');
            setIsAdmin(false);
            setLoading(false); 
          }
        });
    
        return () => unsubscribe();
      }, []);

      return(
        <AdminContext.Provider value={{isAdmin, loading}}>
            {children}
        </AdminContext.Provider>
      )
}

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context; 
}