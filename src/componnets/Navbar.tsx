import { LogOutIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { logout } from "../api/logout"

const Navbar = () => {

  const { isAuth } = useAuth()

  return (
    <nav className="w-full h-[60px] bg-base-100 shadow-md flex justify-around items-center">
        <div className="flex justify-center text-xl font-bold text-primary">
            <span>Blog-App</span>
        </div>

        <div className="md:flex hidden gap-6 text-md  tracking-wider">
            <Link className="hover:text-primary" to={'/'}>Home</Link>
            <Link className="hover:text-primary" to={'/groups'}>Groups</Link>
            {!isAuth ? <Link className="hover:text-primary" to={'/login'}><button className="">Sign Up</button></Link>
            :
            <div className="flex items-center gap-2 hover:text-primary cursor-pointer tracking-wider">
              <button onClick={logout}>Logout</button>
              <LogOutIcon size={18} />
            </div>
            }
        </div>

        <div className="md:hidden flex items-center">
          {!isAuth ? <Link className="hover:text-primary" to={'/login'}><button className="text-primary">Sign Up</button></Link>
            :
            <div className="flex items-center gap-2 hover:text-primary tracking-wider">
              <button onClick={logout}>Logout</button>
              <LogOutIcon size={18} />
            </div>
            }
        </div>
    </nav>
  )
}

export default Navbar