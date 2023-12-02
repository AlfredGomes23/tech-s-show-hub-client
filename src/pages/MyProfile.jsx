/* eslint-disable react/no-unescaped-entities */
import useAuth from "../hooks/useAuth";
import MemberShipCard from "../components/MemberShipCard";


const MyProfile = () => {
    const { user, loading } = useAuth();

    //loading
    if (loading) return <span className="loading loading-bars text-warning flex justify-center items-center text-center mx-auto"></span>;

    return (
        <div className="my-10">
            <h2 className="text-3xl text-center font-medium">Your Profile</h2>
            <div className="divider"></div>
            <div className="flex flex-col-reverse lg:flex-row lg:px-32 lg:gap-10">
                <div className="lg:w-1/2 pt-5">
                    {/* name email card */}
                    <h3 className="text-3xl  font-semibold">Name: {user?.displayName}</h3>
                    <h3 className="text-3xl  font-medium">Email: {user?.email}</h3>
                    <div>
                        <p className="text-xl font-medium mt-5 underline">MemberShip: </p>
                        {/* membership card */}
                        <MemberShipCard></MemberShipCard>
                    </div>
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