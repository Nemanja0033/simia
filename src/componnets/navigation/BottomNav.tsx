import { HomeIcon, ShieldEllipsis, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { useAdmin } from "../../context/adminContext"
import { useMenu } from "../../context/menuContext";

const BottomNav = () => {

  const { isAdmin } = useAdmin();
  const { isOpen } = useMenu();


  return (
    <div>
      {isOpen == true ? 
      (
        <nav className="md:hidden fixed items-center bg-base-100 z-50 bottom-0 flex justify-around gap-12 h-[60px] w-full">
        <Link className="hover:text-primary" to={'/'}><HomeIcon /></Link>
        <Link className="hover:text-primary" to={'/groups'}><Users /></Link>
        {isAdmin ? (
          <Link
            className='hover:text-primary font-bold flex gap-2'
            to="/admin"
          >
            <ShieldEllipsis />
          </Link>
        ) : (
          <div className="hidden"></div>
        )}
    </nav>
      )
    :
    ''}
    </div>
  )
}

export default BottomNav