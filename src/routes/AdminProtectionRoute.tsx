import { Navigate } from 'react-router-dom';
import { useAdmin } from '../context/adminContext';
import Loader from '../ui/Loader';

const AdminProtectionRoute = ({ children }: { children: JSX.Element }) => {

  const { isAdmin, loading } = useAdmin();

  if (loading) {
    console.log("Loading state...");
    return <Loader />;
  }

  if (isAdmin) {
    return children;
  }

  console.log("Redirecting to login...");
  return <Navigate to="/unauthorized" />;
};

export default AdminProtectionRoute;
