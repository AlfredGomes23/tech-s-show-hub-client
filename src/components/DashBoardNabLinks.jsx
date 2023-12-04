import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const DashBoardNabLinks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: role = null } = useQuery({
        queryKey: ['role', user],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user?.email}`);
            return res.data.role;
        }
    });
    // console.log(role);

    return (
        <>
            <li><NavLink to='/dashboard/my-profile'>My Profile</NavLink></li>
            {
                role === "Admin" ?
                    <>
                        <li><NavLink to='/dashboard/stats'>Statistics</NavLink></li>
                        <li><NavLink to='/dashboard/users'>All Users</NavLink></li>
                        <li><NavLink to='/dashboard/coupons'>All Coupons</NavLink></li>
                    </> :
                    role === "Moderator" ?
                        <>
                            <li><NavLink to='/dashboard/review-products'>Review Product Queue</NavLink></li>
                            <li><NavLink to='/dashboard/reports'>Reports Products</NavLink></li>

                        </> :
                        <>
                            <li><NavLink to='/dashboard/add-product'>Add Product</NavLink></li>
                            <li><NavLink to='/dashboard/my-products'>My Products</NavLink></li>
                        </>
            }
        </>
    );
};

export default DashBoardNabLinks;