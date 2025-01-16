import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

type AuthContextProps = {
  isAuth: boolean;
  isActive: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
  userName: string | null;
  userID: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
        setUserID(user.uid);
      } else {
        setIsAuth(false);
        setUserID(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userID) {
      const getUserData = async () => {
        setLoading(true);
        try {
          const q = query(collection(db, "users"), where("userID", "==", userID));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              setUserName(data.username || null);
              setIsActive(data.status === "active");
            });
          } else {
            setUserName(null);
            setIsActive(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserName(null);
          setIsActive(false);
        } finally {
          setLoading(false);
        }
      };

      getUserData();
    } else {
      setUserName(null);
      setIsActive(false);
      setLoading(false);
    }
  }, [userID]);

  return (
    <AuthContext.Provider
      value={{ isAuth, userName, userID, isActive, setIsAuth, setUserName, setIsActive, loading }}
    >
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
