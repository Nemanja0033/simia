import { LogIn } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="w-full h-[60px] bg-base-100 shadow-md flex justify-around items-center">
        <div className="flex justify-center text-xl font-bold text-primary">
            <span>Blog-App</span>
        </div>

        <div className="md:flex hidden gap-6 text-md">
            <Link className="hover:text-primary" to={'/'}>Home</Link>
            <Link className="hover:text-primary" to={'/gruops'}>Groups</Link>
            <Link className="hover:text-primary" to={'/login'}><button className="">Sign Up</button></Link>
        </div>

        <div className="md:hidden flex items-center">
            <Link className="hover:text-primary flex gap-2" to={'/login'}><button className="">Sign Up</button><LogIn /></Link>
        </div>
    </nav>
  )
}

export default Navbar