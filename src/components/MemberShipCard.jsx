/* eslint-disable react/no-unescaped-entities */
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import PaymentPart from "./PaymentPart";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";



const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);

const MemberShipCard = () => {
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [amount, setAmount] = useState(299);
    const [m_id, setM_id] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { data: u = {}, refetch } = useQuery({
        queryKey: ['u'],
        queryFn: async () => {
            const res = axiosSecure.get(`/user/?email=${user?.email}`);
            return res.data;
        }
    });
    useEffect(() => {
        if (u?.role === "Subscriber") {
            setM_id(u?._id);
        }
    }, [u]);

    const handleCoupon = () => {
        //verify coupon

        setAmount(194.45);
    };
    const check = () => {
        if (amount === 299) toast.error("No Coupon Applied.");
    };



    return (
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
                { u.role === 'Subscriber'? <div className="card-actions justify-end flex flex-col">
                    <p>Member ID:</p>
                    <p className="bg-white w-full text-black px-1">{m_id}</p>
                </div> :
                    <div className="space-y-5">
                        <div className="">
                            <p>Upgrade for exclusive benefits. Elevate your experience now!</p>
                            <div className="flex gap-5">
                                {/* coupon box */}
                                {amount === 299 ? <div className="flex justify-between">
                                    <input type="text" placeholder="Coupon For Discount" className="px-1 rounded-md text-black outline-none w-full mx-1" />
                                    <button onClick={handleCoupon} className="btn btn-sm btn-secondary">Apply</button>
                                </div> :
                                    <p className="text-green-500">Coupon Applied.</p>}
                                <button className="btn btn-sm btn-primary" onClick={() => {
                                    check();
                                    document.getElementById('my_modal_3').showModal()
                                }}>Pay ${amount}</button>
                                {/* modal */}
                                <dialog id="my_modal_3" className="modal">
                                    <div className="modal-box text-black">
                                        <h2 className="text-center font-bold text-2xl">Pay the Amount</h2>
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                        {/* payment form */}
                                        <Elements stripe={stripePromise}>
                                            <PaymentPart
                                                amount={amount}
                                                setError={setError}
                                                refetch={refetch}></PaymentPart>
                                        </Elements>
                                    </div>
                                </dialog>
                            </div>
                        </div>

                    </div>}

            </div>
            {error && <p>{error}</p>}
        </div>
    );
};

export default MemberShipCard;