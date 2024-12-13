
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isActive } = useAuth();

    if (!isActive) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
