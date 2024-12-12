import { HomeIcon, Users } from "lucide-react"
import { Link } from "react-router-dom"

const BottomNav = () => {
  return (
    <nav className="md:hidden fixed items-center bg-base-100 z-50 bottom-0 flex justify-center gap-12 h-[60px] w-full">
        <Link className="hover:text-primary" to={'/'}><HomeIcon /></Link>
        <Link className="hover:text-primary" to={'/groups'}><Users /></Link>
    </nav>
  )
}

export default BottomNav