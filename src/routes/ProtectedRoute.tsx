
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isActive, isAuth } = useAuth();

    if (!isAuth) {
        return <Navigate to="/login" />;
    }
    if(!isActive){
        return <div className="w-full h-screen flex justify-center items-center"><h1 className="text-xl text-center">Your account is currently pending review by an administrator for verification. We appreciate your patience during this process <a className="underline text-primary" href="/">Back Home</a></h1></div>
    }

    return children;
};

export default ProtectedRoute;
