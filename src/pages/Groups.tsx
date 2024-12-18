import { collection, getDocs } from "firebase/firestore"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { db } from "../../config/firebase"
import GruopCard from "../componnets/user/GruopCard"

const Groups = () => {
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groupsCollectionRef = collection(db, "groups");
      const data = await getDocs(groupsCollectionRef);
      setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    }
    
    fetchGroups();
  }, [groups]);

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="flex-row mt-6">
        <div className="flex justify-center items-center">
          <Link to={'/creategroup'}>
            <span className="flex gap-2 text-primary hover:text-green-500 cursor-pointer">Create New Group<PlusIcon /></span>
          </Link>
        </div>

        <div className={`grid gap-8 justify-evenly ${groups.length <= 4 ? 'grid-cols-4' : 'md:grid-cols-3 grid-cols-1'}`}>
          {groups.map((g) => (
            <GruopCard name={g.name} description={g.description} members={g.members} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Groups