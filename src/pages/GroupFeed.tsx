import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { Check, Info, ShieldCheck, Users } from "lucide-react";
import Loader from "../ui/Loader";
import { useMember } from "../context/memberContext";
import { acceptMember } from "../api/acceptMember";
import { createFeedPost } from "../api/createFeedPost";

const GroupFeed = () => {
    const { groupID } = useParams<{ groupID: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [feed, setFeed] = useState<any[]>([]);
    const [memberRequest, setMemeberRequest] = useState<any[]>([]);
    const [heading, setHeading] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const { isMember } = useMember();

    const IS_MEMBER = (name: string) => isMember === name;
    const IS_MODERATOR = (id: string) => auth.currentUser?.uid === id;

    async function fetchMemberRequests (groupName: string){
      const q = query(collection(db, 'users'), where("group", "==", groupName + 'pending'));
      const data = await getDocs(q);
      setMemeberRequest(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

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


    const openModal = (id: string) => {
        const modal = document.getElementById(id) as HTMLDialogElement | null;
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
           IS_MEMBER(f.name) ? //check is user a member of this group
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
                        <button className="btn btn-neutral btn-xs bg-primary text-white hover:text-primary border-none" onClick={() => openModal('my_modal_1')}>Post to feed</button>               
                        <dialog id="my_modal_1" className="modal">
                          <div className="modal-box">
                          <h1 className="font-bold text-primary text-xl text-center mb-3">Share on Feed</h1>
                            <div className="flex justify-center items-center">
                              <input className="focus:ring-2 focus:ring-primary w-full focus:outline-none rounded-md border border-primary" type="text" placeholder="Post Heading. . ." value={heading} onChange={(e) => {setHeading(e.target.value)}} />
                            </div>
                            <div className="flex justify-center mt-3">
                              <textarea className="focus:ring-2 focus:ring-primary w-full min-h-32 focus:outline-none rounded-md border border-primary" placeholder="Your content. . ." value={content} onChange={(e) => {setContent(e.target.value)}} />
                            </div>
                            <div className="flex justify-center mt-3">
                              <button onClick={() => createFeedPost(heading, content)} className="btn-neutral btn bg-primary text-white w-full hover:text-primary border-none">Post</button>
                            </div>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>Close</button>
                          </form>
                        </dialog>
                        {IS_MODERATOR(f.groupID) ? // check is current user a moderator of group
                        <div className="flex items-center">
                        <button className="btn btn-xs btn-neutral border-none bg-primary text-white hover:text:primary" onClick={() => fetchMemberRequests(f.name)} onDoubleClick={() => openModal('my_modal_2')}><ShieldCheck /></button>
                        <dialog id="my_modal_2" className="modal">
                          <div className="modal-box">
                            <div className="ml-12">
                            <h1 className="font-bold text-primary text-xl text-center">Member Requests</h1>
                            {memberRequest.map((m) => (
                              <div className="flex justify-center gap-3 items-center text-md mt-3">
                                <span className="font-bold">{m.username}</span>
                                <i className="text-sm">{m.email}</i>
                                <button className="text-primary hover:text-green-500" onClick={() => acceptMember(m.userID, f.name, m.username, f.groupID)}><Check /></button>
                              </div>
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