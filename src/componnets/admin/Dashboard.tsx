import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../../config/firebase";
import Loader from "../../ui/Loader";
import { History, Users } from "lucide-react";

const Dashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   const fetchUsers = async () => {
    try{
      const usersCollectionRef = collection(db, "users");
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      setLoading(false);
    }
    catch(err){
      console.error("Error while fetching users data", err);
    }
  }

  const fetchHistory = async () => {
    try{
      const historyCollectionRef = collection(db, "history");
      const data = await getDocs(historyCollectionRef);
      setHistory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      setLoading(false);
    }
    catch(err){
      console.error("Error while fetching users data", err);
    }
  }

  useEffect(() => {
     fetchUsers();
     fetchHistory();
  }, [])

  if(loading){
    return <Loader />
  }

  return (
    <div className="w-full h-screen md:flex flex-row justify-around items-center">
        <div className="md:w-1/3 flex-row w-full h-96 overflow-auto m-3 rounded-md shadow-md">
             <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary"><Users />Users ({users.length})</h1>
             <div className="flex-row justify-self-center mt-6">
              {users.map((u) => (
                <ul key={u.userID} className="mb-6 text-center">
                  <li><b>Username</b>: <i>{u.username}</i></li>
                  <li><b>User ID</b>: <i>{u.userID}</i></li>
                  <li><b>User Email</b>: <i>{u.email}</i></li>
                </ul>
              ))}
             </div>
        </div>
        <div className="md:w-1/3 flex-row w-full h-96 overflow-auto m-3 rounded-md shadow-md">
        <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary"><History />Login History</h1>
        <div className="flex-row justify-self-center mt-6">
              {history.map((h) => (
                <ul key={h.email} className="mb-6 text-center">
                  <li><b>Email</b>: <i>{h.email}</i></li>
                  <li><b>At</b>: <i>{h.at}</i></li>
                </ul>
              ))}
             </div>
        </div>
        <div className="md:w-1/3 flex-row w-full h-96 overflow-auto m-3 rounded-md shadow-md">
            <h1 className="text-center font-bold">Groups</h1> 
        </div>
    </div>
  )
}

export default Dashboard