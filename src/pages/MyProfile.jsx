/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const MyProfile = () => {
    const { user, loading } = useAuth();
    let m_id = "N/A", amount = 299,applied = false, subscribed = false;

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
                        <div className="card w-96 bg-base-100 shadow-xl image-full mx-auto mt-5">
                            <figure><img src="https://i.ibb.co/0V11KCd/card-bg.jpg" alt="Shoes" /></figure>
                            <div className="card-body flex flex-col justify-center">
                                {/* card header */}
                                <div className="flex justify-between">
                                    <span className="font-pacifico font-medium text-xl">Tech's Show Hub</span>
                                    <span className="underline text-[#FFD700]">MemberShip Card</span>
                                </div>
                                {/* user data */}
                                <div className="flex ">
                                    <div className="avatar mr-5">
                                        <div className="w-10 rounded-xl mx-auto">
                                            <img src={user?.photoURL} alt={user?.displayName} />
                                        </div>
                                    </div>
                                    <div>
                                        <h4>{user?.displayName}</h4>
                                        <p>{user?.email}</p>
                                    </div>
                                </div>
                                {/* payment data */}
                                { subscribed ? <div className="card-actions justify-end flex flex-col">
                                    <p>Member ID:</p>
                                    <p className="bg-white w-full text-black px-1">{m_id}</p>
                                </div> :
                                <div className="space-y-5">
                                    <div className="flex items-center">
                                        <p>"Upgrade for exclusive benefits. Elevate your experience now!"</p>
                                        <Link className="btn btn-sm btn-primary">Pay {amount}</Link>
                                    </div>
                                    { applied || <div className="flex justify-between">
                                        <input type="text" placeholder="Coupon For Discount" className="px-1 rounded-md" />
                                        <button className="btn btn-sm btn-secondary">Apply</button>
                                    </div>}
                                </div>}

                            </div>
                        </div>
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