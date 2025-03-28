import { LogOutIcon, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { logout } from "../api/logout";
import { useAdmin } from "../context/adminContext";
import Loader from "../ui/Loader";
// import ThemeToggler from "../ui/Theme";
import { useMenu } from "../context/menuContext";

const Navbar = () => {
  const { isAuth } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const location = useLocation();
    const { toggleMenu } = useMenu();

  const isActive = (path: string) => location.pathname === path;

  if (loading) {
    return <Loader />;
  }

  return (
    <nav className="w-full h-[70px]  bg-base-100 fixed top-0 shadow-md flex justify-around items-center">
      <div className="flex justify-center text-xl font-bold text-primary">
        <Link to={'/'}><img src="/logo.png" className="w-24"></img></Link>
      </div>
  
      <div className="md:flex hidden gap-4 items-center text-md tracking-wider">
        <Link className={`hover:text-primary ${isActive("/") ? "border-b-2 border-primary" : ""}`} to="/">Home</Link>
        {isAuth && <Link className={`hover:text-primary ${isActive("/groups") ? "border-b-2 border-primary" : ""}`} to="/groups">Groups</Link>}
        {!isAuth ? (
          <Link className={`hover:text-primary ${isActive("/login") ? "border-b-2 border-primary" : ""}`} to="/login">
            <button className="btn btn-neutral btn-sm border-none  text-primary hover:bg-primary hover:text-white">Sign Up</button>
          </Link>
        ) : (
          <div className="flex items-center gap-2 hover:text-primary cursor-pointer tracking-wider">
            <button className="btn btn-neutral btn-sm border-none  text-primary hover:bg-primary hover:text-white" onClick={logout}>Logout<LogOutIcon /></button>
          </div>
        )}
        {isAdmin && (
          <Link className="text-primary font-bold" to="/admin">
          Admin
          </Link>
        )}
      </div>
  
      <div className="md:hidden flex items-center">
        {!isAuth ? (
          <div className="flex items-center gap-5">
            <Link className={`hover:text-primary ${isActive("/login") ? "border-b-2 border-primary" : ""}`} to="/login">
            <button className="btn btn-neutral btn-sm border-none  text-primary hover:bg-primary hover:text-white">Sign Up</button>
          </Link>
          <button onClick={toggleMenu}><Menu /></button>
          </div>
        ) : (
          <div className="flex items-center gap-5 hover:text-primary tracking-wider">
            <button className="btn btn-neutral btn-sm border-none  text-primary hover:bg-primary hover:text-white" onClick={logout}>Logout <LogOutIcon size={18} /></button>
            <button onClick={toggleMenu}><Menu /></button>
          </div>
        )}
      </div>
    </nav>
  );
  
};

export default Navbar;
