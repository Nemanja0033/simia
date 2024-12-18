import { PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"

const Groups = () => {
  return (
    <div className="w-full h-screen flex justify-center">
      <div className="flex-row mt-6">
        <div className="flex justify-center items-center">
          <Link to={'/creategroup'}>
            <span className="flex gap-2 text-primary hover:text-green-500 cursor-pointer">Create New Group<PlusIcon /></span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Groups