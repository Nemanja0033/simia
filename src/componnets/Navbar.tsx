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

        <div className="md:flex hidden gap-6 text-md">
            <Link className="hover:text-primary" to={'/'}>Home</Link>
            <Link className="hover:text-primary" to={'/groups'}>Groups</Link>
            {!isAuth ? <Link className="hover:text-primary" to={'/login'}><button className="">Sign Up</button></Link>
            :
            <div className="flex items-center gap-2 hover:text-primary">
              <button onClick={logout}>Logout</button>
              <LogOutIcon />
            </div>
            }
        </div>

        <div className="md:hidden flex items-center">
          {!isAuth ? <Link className="hover:text-primary" to={'/login'}><button className="">Sign Up</button></Link>
            :
            <div className="flex items-center gap-2 hover:text-primary">
              <button onClick={logout}>Logout</button>
              <LogOutIcon />
            </div>
            }
        </div>
    </nav>
  )
}

export default Navbar