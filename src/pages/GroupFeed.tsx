import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import { Users } from "lucide-react";

const GroupFeed = () => {

    const { groupID } = useParams<{ groupID: string }>();
    const [feed, setFeed] = useState<any[]>([]);

    useEffect(() => {
        const fetchGroupFeed = async () => {
            const groupFeedCollectionRef = collection(db, "groups");
            const q = query(groupFeedCollectionRef, where("groupID", "==", groupID));
            const data = await getDocs(q);
            setFeed(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        fetchGroupFeed();
    }, [])

  return (
    <div className="w-full flex-row mt-20">
        {feed.map((f) => (
            <div className="flex w-full justify-center">
                <nav className="md:w-1/2 w-full flex justify-around h-[50px] rounded-md shadow-md gap-4 items-center">
                <b className="text-primary text-xl flex gap-2 items-center">{f.name} <span className="flex items-center text-sm"><Users size={16} />({f.members.length})</span></b> 
                {f.members.length < 2 ? 
                <button disabled className="btn btn-neutral btn-xs bg-primary text-white hover:text-primary border-none">+ NEW BLOG POST</button> 
                :
                <button className="btn btn-neutral btn-xs bg-primary text-white hover:text-primary border-none">+ NEW BLOG POST</button> 
                }              
                </nav>
            </div>
        ))}
    </div>
  )
}

export default GroupFeed