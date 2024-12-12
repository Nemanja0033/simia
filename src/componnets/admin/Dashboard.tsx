
const Dashboard = () => {
  return (
    <div className="w-full h-screen md:flex flex-row justify-around">
        <div className="md:w-1/3 flex-row w-full h-96 overflow-auto m-3 rounded-md shadow-md">
             <h1 className="text-center font-bold">Users</h1>
        </div>
        <div className="md:w-1/3 flex-row w-full h-96 overflow-auto m-3 rounded-md shadow-md">
            <h1 className="text-center font-bold">Logging History</h1>
        </div>
        <div className="md:w-1/3 flex-row w-full h-96 overflow-auto m-3 rounded-md shadow-md">
            <h1 className="text-center font-bold">Groups</h1> 
        </div>
    </div>
  )
}

export default Dashboard