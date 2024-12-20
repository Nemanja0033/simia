import { DoorOpenIcon, Users } from "lucide-react"
import { Link } from "react-router-dom"

const GruopCard = ({name, description, members, groupID}: {name: string, description: string, members: [], groupID:string}) => {
  return (
    <div className="lg:w-64 w-full h-auto shadow-lg flex-row mt-12">
        <div className="flex justify-center mb-2">
            <i className="font-bold text-xl text-primary">{name}</i>
        </div>
        <div className="flex justify-center items-center mb-2">
          <Users size={16} className="text-primary" />{members.length}
        </div>
        <div className="flex justify-center overflow-auto mb-2 h-52 items-center">
            <p className="text-md text-center text-gray-500">{description}</p>
        </div>
        <div className="flex justify-center mb-3">
           <Link to={`/group/${groupID}`}><button className="btn-sm btn btn-neutral border-none text-white bg-primary hover:text-primary">Join Group <DoorOpenIcon /></button></Link>
        </div>
    </div>
  )
}

export default GruopCard