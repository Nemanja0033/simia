import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";

type MemberContextProps = {
    isMember: string | null; // Koristimo null da označimo nepoznato stanje
};

const MemberContext = createContext<MemberContextProps | undefined>(undefined);

export const MemberProvider = ({ children }: { children: ReactNode }) => {
    const [isMember, setIsMember] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Korisnik je prijavljen
                const q = query(collection(db, "users"), where("userID", "==", user.uid));
                try {
                    const querySnapshot = await getDocs(q);

                    if (querySnapshot.empty) {
                        console.log("User document does not exist");
                        setIsMember(null); // Nije član
                        return;
                    }

                    querySnapshot.forEach((doc) => {
                        const data = doc.data().group;
                        if (data) {
                            setIsMember(data); // Postavi grupu korisnika
                        } else {
                            setIsMember(null); // Nema grupe
                        }
                    });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setIsMember(null); // Greška u dohvatanju podataka
                }
            } else {
                // Nema prijavljenog korisnika
                console.log("No user is signed in");
                setIsMember(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <MemberContext.Provider value={{ isMember }}>
            {children}
        </MemberContext.Provider>
    );
};

export const useMember = () => {
    const context = useContext(MemberContext);
    if (context === undefined) {
        throw new Error("useMember must be used within a MemberProvider");
    }
    return context;
};