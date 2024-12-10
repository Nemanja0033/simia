import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
    const auth = prompt("Enter Password");
    const pass = '123';

    if(auth === pass){
        return children 
    }
    else{
        return <Navigate to={'/'} />;
    }
}

export default ProtectedRoute