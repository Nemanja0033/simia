import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { Info, UserCheck, Users } from "lucide-react";
import Loader from "../ui/Loader";
import { useMember } from "../context/memberContext";

const GroupFeed = () => {
    const { groupID } = useParams<{ groupID: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [feed, setFeed] = useState<any[]>([]);
    const { isMember } = useMember();

    console.log('member',isMember)

    useEffect(() => {
        const fetchGroupFeed = async () => {
            const groupFeedCollectionRef = collection(db, "groups");
            const q = query(groupFeedCollectionRef, where("groupID", "==", groupID));
            const data = await getDocs(q);
            setFeed(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
        }

        fetchGroupFeed();
    }, [groupID]);

    const openModal = () => {
        const modal = document.getElementById('my_modal_2') as HTMLDialogElement | null;
        if (modal) {
          modal.showModal();
        } else {
          console.error("Modal element not found");
        }
      };

    if(loading){
        return <Loader />
    }

  return (
    <div>
        {feed.map((f) => (
           isMember === f.name ?
           (
            <div className="w-full flex-row mt-20">
                <div className="flex w-full justify-center">
                    <nav className="md:w-1/2 w-full flex justify-around h-[50px] rounded-md shadow-md gap-4 items-center">
                        <b className="text-primary text-xl flex gap-2 items-center">{f.name} <span className="flex items-center text-sm"><Users size={16} />({f.members.length})</span></b> 
                        <div className="flex gap-3 items-center">
                        {f.members.length < 2 ? 
                        <button disabled className="btn btn-neutral btn-xs bg-primary text-white hover:text-primary border-none">+ NEW BLOG POST</button> 
                        :
                        <button className="btn btn-neutral btn-xs bg-primary text-white hover:text-primary border-none">+ NEW BLOG POST</button> 
                        }
                        <button className="btn btn-neutral btn-xs bg-primary text-white hover:text-primary border-none">Post to feed</button>               
                        {auth.currentUser?.uid === f.groupID ?
                        <div className="flex items-center">
                        <button className="btn btn-xs btn-neutral bg-primary text-white hover:text:primary" onClick={openModal}><UserCheck /></button>
                        <dialog id="my_modal_2" className="modal">
                          <div className="modal-box">
                            <div className="ml-12">
                            <span className="font-bold text-primary text-xl">Members</span>
                            {f.members.map((m: string) => (
                                <li><i>{m}</i></li>
                            ))}
                            </div>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>Close</button>
                          </form>
                        </dialog>
                      </div>    
                        : ''
                        }
                        </div>               
                    </nav>
                </div>
                <i className="text-center md:text-sm text-xs text-primary flex justify-center items-center gap-2 mt-3">
                    <Info size={16}/>Use the feed to share opinions and contribute to the creation of quality content
                </i>
            </div>
           ) 
           :
           <h1 className="text-center mt-32">Not a member!</h1>
        ))}
    </div>
  )
}

export default GroupFeed