import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";

type ModeratorContextProps = {
    isModerator: any,
}

const ModeratorContext = createContext<ModeratorContextProps | undefined>(undefined);

export const ModeratorProvider = ({children}: {children: ReactNode}) => {
    const [isModerator, setIsModerator] = useState<string>("");

    useEffect(() => {
        async function checkIsModerator() {
            const collectionRef = collection(db, "users");
            const q = query(collectionRef, where("userID", "==", auth.currentUser?.uid));
            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                const data = doc.data().moderator
                if(data){
                    setIsModerator(data);
                }
                else{
                    setIsModerator("");
                }
            })
        }

        checkIsModerator();
    })

    return(
        <ModeratorContext.Provider value={{isModerator}}>
            {children}
        </ModeratorContext.Provider>
    )

}
