/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const UsersRoutes = ({children}) => {
    const location = useLocation();
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = null, isLoading } = useQuery({
        queryKey: ['role'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user?.email}`);
            return res.data.role;
        }
    });
    // console.log(role);

    if (loading || isLoading) return <div className=' flex justify-center items-center text-center mx-auto'>
        <p className='text-3xl text-warning'>Loading <span className="loading loading-bars loading-md"></span></p>
    </div>;

    if (role === 'User' || role === "Subscriber") return children;

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default UsersRoutes;