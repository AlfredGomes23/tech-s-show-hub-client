/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    //loading
    if (loading) return <div className=' flex justify-center items-center text-center mx-auto'>
        <p className='text-3xl text-warning'>Loading <span className="loading loading-bars loading-md"></span></p>
    </div>;

    //user
    if (user?.email) return children

    //not user
    return <Navigate to='/login' state={{ form: location }} replace></Navigate>;
};

export default PrivateRoutes;