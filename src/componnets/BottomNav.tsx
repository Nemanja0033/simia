import { HomeIcon, ShieldEllipsis, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { useAdmin } from "../context/adminContext"
import { useMenu } from "../context/menuContext";

const BottomNav = () => {

  const { isAdmin } = useAdmin();
  const { isOpen } = useMenu();


  return (
    <div>
      {isOpen === true ? (
        <nav className="md:hidden fixed items-center backdrop-blur-lg z-50 bottom-0 flex justify-around gap-12 h-[60px] w-full">
          <Link className="text-primary" to={'/'}><HomeIcon /></Link>
          <Link className="text-primary" to={'/groups'}><Users /></Link>
          {isAdmin ? (
            <Link
              className='text-primary font-bold flex gap-2'
              to="/admin"
            >
              <ShieldEllipsis />
            </Link>
          ) : (
            <div className="hidden"></div>
          )}
        </nav>
      ) : null}
    </div>
  );
  
} 

export default BottomNav