import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../../config/firebase";
import Loader from "../../ui/Loader";
import { AlarmClockCheck, Check, History, Trash, Users, X } from "lucide-react";
import { activateUser } from "../../api/activateUser";
import { deactivateUser } from "../../api/deactivateUser";
import { deleteRequest } from "../../api/deleteRequest";
import { clearUserHistory } from "../../api/clearUserHistory";

const Dashboard = () => {
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   const fetchUsers = async () => {
    try{
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("status", "==", "active"));
      const data = await getDocs(q)
      setActiveUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})))
      setLoading(false);
    }
    catch(err){
      console.error("Error while fetching users data", err);
    }
  }

  const fechUserRequests = async () => {
    try{
      const requestsCollectionRef = collection(db, "users");
      const q = query(requestsCollectionRef, where("status", "in", ["pending", "inactive"]));;
      const data = await getDocs(q);
      setPendingUsers(data.docs.map((doc => ({...doc.data(), id: doc.id}))))
    }
    catch(err){
      console.error('Error while fetching user requests', err);
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
    const callFunctions = async () => {
      try {
        await Promise.all([fetchHistory(), fetchUsers(), fechUserRequests()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    callFunctions();
  }, []);
  

  if(loading){
    return <Loader />
  }

  return (
    <div className="w-full h-screen md:flex flex-row justify-around items-center">
        <div className="md:w-1/3 w-full h-96 m-3 rounded-md shadow-md">
             <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary"><Users />Users ({activeUsers.length})</h1>
             <div className="flex-row overflow-auto h-80 justify-self-center mt-6">
              {activeUsers.map((u) => (
                <ul key={u.userID} className="mb-6 text-center">
                  <li><b>Username</b>: <i>{u.username}</i></li>
                  <li><b>User Email</b>: <i>{u.email}</i></li>
                  <li><b>User ID</b>: <i>{u.userID}</i></li>
                  <li><b>User Status</b>: <i>{u.status}</i></li>
                  <div className="flex justify-center gap-2">
                  <button onClick={() => deactivateUser(u.userID)} className="flex gap-2 text-red-400 hover:text-red-600"><X />Disable User</button>
                  </div>
                </ul>
              ))}
             </div>
        </div>
  
        <div className="md:w-1/3 flex-row w-full h-96 m-3 rounded-md shadow-md">
            <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary"><AlarmClockCheck />Pending Users ({pendingUsers.length})</h1> 
            <div className="flex-row overflow-auto h-80 justify-self-center mt-6">
            {pendingUsers.length === 0 ? (
              <h1 className="text-center font-bold">There is no pending users</h1>
            ) : (
              pendingUsers.map((p) => (
                <ul key={p.email} className="mb-6 text-center">
                  <li><b>Username</b>: <i>{p.username}</i></li>
                  <li><b>Email</b>: <i>{p.email}</i></li>
                  <li><b>User Status:</b> <i>{p.status}</i></li>
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => activateUser(p.userID)} 
                      className="flex gap-2 text-primary hover:text-green-700"
                    >
                      <Check /> Approve
                    </button>
                    <button 
                      onClick={() => deleteRequest(p.userID)} 
                      className="flex gap-2 text-red-400 hover:text-red-600"
                    >
                      <X /> Decline
                    </button>
                  </div>
                </ul>
              ))
            )}

            </div>
        </div>

        <div className="md:w-1/3 flex-row w-full h-96 m-3 rounded-md shadow-md">
        <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary"><History />Login History ({history.length})</h1>
            <div className="flex-row overflow-auto h-72 justify-self-center mt-4">
               {history.length === 0 ? (
                <h1 className="text-center font-bold">Login history is clear</h1>
               )
              :
              (
                history.map((h) => (
                  <ul key={h.email} className="mb-6 text-center">
                    <li><b>Email</b>: <i>{h.email}</i></li>
                    <li><b>At</b>: <i>{h.at}</i></li>
                  </ul>
                ))
              )}
            </div>
          {history.length === 0 ? '' :
          (
            <div className="flex justify-center mt-2">
            <button onClick={clearUserHistory} className="text-red-400 hover:text-red-600 flex gap-2 items-center"><Trash size={20} />Clear History</button>
          </div>
          )}
        </div>
    </div>
  )
}

export default Dashboard