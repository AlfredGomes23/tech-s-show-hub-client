/* eslint-disable react/no-unescaped-entities */
import useAuth from "../hooks/useAuth";
import MemberShipCard from "../components/MemberShipCard";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const MyProfile = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: role = null, isLoading } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user?.email}`);
            return res.data.role;
        }
    });
    // console.log(role);

    //loading
    if (loading || isLoading) return <span className="loading loading-bars text-warning flex justify-center items-center text-center mx-auto"></span>;

    return (
        <div className="my-10">
            <h2 className="text-3xl text-center font-medium">Your Profile</h2>
            <div className="divider"></div>
            <div className="flex flex-col-reverse lg:flex-row lg:px-32 lg:gap-10">
                <div className="lg:w-1/2 pt-5">
                    {/* name email card */}
                    <h3 className="text-3xl  font-semibold">Name: {user?.displayName}</h3>
                    <h3 className="text-3xl  font-medium">Email: {user?.email}</h3>
                    <p className="text-3xl my-5">Role: <span
                        className={role === 'Admin' ? "text-success font-bold" :
                            role === 'Moderator' ? "text-info font-bold" : ''
                        }>{role}</span></p>
                    {
                        role !== "Admin" && role !== "Moderator" &&
                        <div>
                            <p className="text-xl font-medium mt-5 underline">MemberShip: </p>
                            {/* membership card */}
                            <MemberShipCard></MemberShipCard>
                        </div>}
                </div>
                {/* my photo */}
                <div className="avatar flex-col lg:w-1/2">
                    <h3 className="text-xl text-center font-medium">Photo: </h3>
                    <div className="w-56 rounded-xl mx-auto">
                        <img src={user?.photoURL} alt={user?.displayName} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;