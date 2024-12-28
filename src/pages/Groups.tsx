import { collection, getDocs } from "firebase/firestore"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../../config/firebase"
import GruopCard from "../componnets/user/GruopCard"
import Loader from "../ui/Loader"
import { useMember } from "../context/memberContext"

const Groups = () => {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { isMember } = useMember();

  useEffect(() => {
    const fetchGroups = async () => {
      const groupsCollectionRef = collection(db, "groups");
      const data = await getDocs(groupsCollectionRef);
      setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      setLoading(false);
    }
    
    fetchGroups();
  }, []);

  if(loading){
    return <Loader />
  }

  return (
    <div className="w-full h-screen flex justify-center md:mt-16 mt-32">
      <div className="flex-row mt-6">
        <div className="flex justify-center items-center">
         {isMember === "" ?  <Link to={'/creategroup'}><span className="flex gap-2 text-primary hover:text-green-500 cursor-pointer">Create New Group<PlusIcon /></span></Link>
         :
         ''
         }
        </div>

        <div className={`grid gap-8 justify-evenly ${groups.length <= 4 ? 'md:grid-cols-4 grid-cols-1' : 'md:grid-cols-3 grid-cols-1'}`}>
          {groups.map((g) => (
            <GruopCard name={g.name} description={g.description} members={g.members} groupID={g.groupID} moderator={g.moderator} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Groups