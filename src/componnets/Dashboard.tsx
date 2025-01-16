import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../dist/config/firebase";
import Loader from "../ui/Loader";
import {
  AlarmClockCheck,
  Check,
  Group,
  History,
  Trash,
  Users,
  X,
} from "lucide-react";
import { activateUser } from "../api/activateUser";
import { deactivateUser } from "../api/deactivateUser";
import { deleteRequest } from "../api/deleteRequest";
import { clearUserHistory } from "../api/clearUserHistory";
import { deleteGroup } from "../api/deleteGroup";

const Dashboard = () => {
  const [activeUsers, setActiveUsers] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [groupSearch, setGroupSearch] = useState<string>("");
  const [userSearch, setUserSearch] = useState<string>("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [users, requests, histories, groupsData] = await Promise.all([
        getDocs(query(collection(db, "users"), where("status", "==", "active"))),
        getDocs(
          query(collection(db, "users"), where("status", "in", ["pending", "inactive"]))
        ),
        getDocs(collection(db, "history")),
        getDocs(collection(db, "groups")),
      ]);

      setActiveUsers(users.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setPendingUsers(requests.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setHistory(histories.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setGroups(groupsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen md:flex flex-row justify-around items-center md:mt-10 mt-32">
      {/* Active Users Section */}
      <div className="md:w-1/3 w-full h-96 m-3 rounded-md shadow-md">
        <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary">
          <Users /> Users ({activeUsers.length})
        </h1>
        <div className="flex justify-center mt-3 items-center gap-2">
          <input
            onChange={(e) => setUserSearch(e.target.value)}
            className="focus:ring-2 focus:ring-primary focus:outline-none rounded-md border border-primary"
            type="text"
            placeholder="Search user by username"
          />
        </div>
        <div className="flex-row overflow-auto h-72 justify-self-center mt-6">
          {activeUsers
            .filter((item) =>
              userSearch.toLowerCase() === ""
                ? true
                : item.username.toLowerCase().includes(userSearch.toLowerCase())
            )
            .map((u) => (
              <ul key={u.userID} className="mb-6 text-center">
                <li>
                  <b>Username</b>: <i>{u.username}</i>
                </li>
                <li>
                  <b>User Email</b>: <i>{u.email}</i>
                </li>
                <li>
                  <b>User ID</b>: <i>{u.userID}</i>
                </li>
                <li>
                  <b>User Status</b>: <i>{u.status}</i>
                </li>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => deactivateUser(u.userID)}
                    className="flex gap-2 text-red-400 hover:text-red-600"
                  >
                    <X /> Disable User
                  </button>
                </div>
              </ul>
            ))}
        </div>
      </div>

      {/* Pending Users Section */}
      <div className="md:w-1/3 flex-row w-full h-96 m-3 rounded-md shadow-md">
        <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary">
          <AlarmClockCheck /> Pending Users ({pendingUsers.length})
        </h1>
        <div className="flex-row overflow-auto h-80 justify-self-center mt-6">
          {pendingUsers.length === 0 ? (
            <h1 className="text-center font-bold">There is no pending users</h1>
          ) : (
            pendingUsers.map((p) => (
              <ul key={p.email} className="mb-6 text-center">
                <li>
                  <b>Username</b>: <i>{p.username}</i>
                </li>
                <li>
                  <b>Email</b>: <i>{p.email}</i>
                </li>
                <li>
                  <b>User Status:</b> <i>{p.status}</i>
                </li>
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

      {/* Groups Section */}
      <div className="md:w-1/3 w-full h-96 m-3 rounded-md shadow-md">
        <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary">
          <Group /> Groups ({groups.length})
        </h1>
        <div className="flex justify-center mt-3 items-center gap-2">
          <input
            onChange={(e) => setGroupSearch(e.target.value)}
            className="focus:ring-2 focus:ring-primary focus:outline-none rounded-md border border-primary"
            type="text"
            placeholder="Search group by name"
          />
        </div>
        <div className="flex-row w-full overflow-auto h-72 justify-self-center mt-6">
          {groups
            .filter((g) => g.groupID && g.name) // Filtriraj grupe koje imaju groupID i groupName
            .filter((g) =>
              groupSearch.toLowerCase() === ""
                ? true
                : g.groupName.toLowerCase().includes(groupSearch.toLowerCase())
            )
            .map((g) => (
              <div key={g.id} className="flex-row w-full h-auto mb-3">
                <div className="flex gap-2 justify-center">
                  <span className="font-bold text-primary">{g.name}</span>
                  <button
                    className="text-red-400 hover:text-red-600"
                    onClick={() => deleteGroup(g.groupID, g.name)}
                  >
                    <Trash />
                  </button>
                </div>
                <h1 className="text-center font-semibold">
                  Members ({g.members?.length || 0})
                </h1>
                <div className="h-32 justify-center">
                  {g.members?.map((member: string, index: number) => (
                    <ul key={index} className="flex justify-center">
                      <li>{member}</li>
                    </ul>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Login History Section */}
      <div className="md:w-1/3 flex-row w-full h-96 m-3 rounded-md shadow-md">
        <h1 className="text-center font-bold flex justify-center gap-2 items-center text-primary">
          <History /> Login History ({history.length})
        </h1>
        <div className="flex-row overflow-auto h-72 justify-self-center mt-4">
          {history.length === 0 ? (
            <h1 className="text-center font-bold">Login history is clear</h1>
          ) : (
            history.map((h) => (
              <ul key={h.email} className="mb-6 text-center">
                <li>
                  <b>Email</b>: <i>{h.email}</i>
                </li>
                <li>
                  <b>At</b>: <i>{h.at}</i>
                </li>
              </ul>
            ))
          )}
        </div>
        {history.length > 0 && (
          <div className="flex justify-center mt-2">
            <button
              onClick={clearUserHistory}
              className="text-red-400 hover:text-red-600 flex gap-2 items-center"
            >
              <Trash size={20} /> Clear History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
