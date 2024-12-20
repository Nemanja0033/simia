import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";



const MemberContext = createContext<boolean| undefined>(undefined);

export const MemberProvider = ({children}: {children: ReactNode}) => {

    const [isMember, setIsMember] = useState<boolean>(false);

    useEffect(() => {
        async function fetchMember () {
            const q = query(collection(db, 'users'), where('userID', '==', auth.currentUser?.uid))
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log('User document does not exist');
                setIsMember(false);
                return;
              }
      
              querySnapshot.forEach((doc) => {
                const data = doc.data().member;
                if (data === doc.data().name) {
                  setIsMember(true);
                } else {
                  setIsMember(false);
                }
              });
            }
            fetchMember();
    }, []);

    return(
        <MemberContext.Provider value={isMember}>
            {children}
        </MemberContext.Provider>
    )
}

export const useMember = () => {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error("useMember must be used within an AuthProvider");
    }
    return context; 
}