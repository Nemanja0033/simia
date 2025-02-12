import { DoorClosedIcon, DoorOpenIcon, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { groupRequest } from "../api/groupRequest"
import { useMember } from "../context/memberContext"
import { auth } from "../lib/firebase"

const GruopCard = ({name, description, members, groupID, moderator}: {name: string, description: string, members: [], groupID:string, moderator:string}) => {

  const { isMember } = useMember();

  return (
    <div className="w-64 h-auto shadow-lg flex-row mt-12 md:mb-0 mb-20">
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
          {isMember === name ? //check is member or moderator
          (
            <Link to={`/group/${groupID}`}><button className="btn-sm btn btn-neutral border-none text-white bg-primary hover:text-primary">Enter Group <DoorOpenIcon /></button></Link>
          )
          :
          (
           isMember == name + 'pending' || isMember !== '' ? <button disabled className="btn btn-neutral btn-sm bg-primary text-white">Request Sent</button>
           :
           <button onClick={() => groupRequest(name)} className="btn-sm btn btn-neutral border-none text-white bg-primary hover:text-primary">Request Enter <DoorClosedIcon /></button>
          )
        }
        </div>
    </div>
  )
}

export default GruopCard