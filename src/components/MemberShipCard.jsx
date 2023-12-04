/* eslint-disable react/no-unescaped-entities */
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import PaymentPart from "./PaymentPart";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";


//get today's date
function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
}
//date difference ( booking date to today)
const dateDiff = (b_date) => {
    //get date in ms
    const date1 = new Date(getDate());
    const date2 = new Date(b_date);
    const timeDifference = date2 - date1; // Difference in milliseconds

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert to days
    return parseInt(daysDifference);
};


const stripePromise = loadStripe(import.meta.env.VITE_Payment_PK);

const MemberShipCard = () => {
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [amount, setAmount] = useState(299);
    const [m_id, setM_id] = useState(null);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    //get current user from db
    const { data: u = {}, refetch, isLoading } = useQuery({
        queryKey: ['u'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/?email=${user?.email}`);
            return res.data;
        }
    });
    useEffect(() => {
        if (u?.role === "Subscriber") {
            setM_id(u?._id);
        }
    }, [u]);

    //handle coupon code application
    const handleCoupon = async e => {
        e.preventDefault();
        const code = e.target.code.value;

        //verify coupon
        const { data: coupons } = await axiosPublic.get('/coupons');
        const coupon = coupons.find(coupon => coupon.coupon === code);
        //not valid
        if (!coupon || dateDiff(coupon.expiryDate) < 1) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Invalid Coupon Code",
                showConfirmButton: false,
                timer: 2000
            });
            e.target.code.value = ''
            return;
        }
        //valid
        setAmount(amount - coupon.discount);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Coupon Code Applied",
            text: `You Got $ ${coupon.discount} Discount.`,
            showConfirmButton: false,
            timer: 2000
        });


    };

    //loading
    if (isLoading) return <p className="loading loading-dots text-secondary flex mx-auto text-center"></p>;

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
                {u.role === 'Subscriber' ? <div className="card-actions justify-end flex flex-col">
                    <p>Member ID:</p>
                    <p className="bg-white w-full text-black px-1">{m_id}</p>
                </div> :
                    <div className="space-y-5">
                        <div className="">
                            <p>Upgrade for exclusive benefits. Elevate your experience now!</p>
                            <div className="flex justify-end gap-5">
                                {/* coupon box */}
                                {amount === 299 &&
                                    <form onSubmit={handleCoupon} className="flex justify-between">
                                        <input type="text" name="code" placeholder="Coupon For Discount" className="px-1 rounded-md text-black outline-none w-full mx-1" required />
                                        <button className="btn btn-sm btn-secondary">Apply</button>
                                    </form>
                                }
                                <button className="btn btn-sm btn-primary" onClick={() => document.getElementById('payment_modal').showModal()}>Pay ${amount}</button>
                                {/* modal */}
                                <dialog id="payment_modal" className="modal">
                                    <div className="modal-box text-black space-y-5">
                                        <h2 className="text-center font-bold text-2xl">Pay the Amount</h2>
                                        {/* coupon code warning */}
                                        {amount === 299 ?
                                            <div>
                                                <p className="text-error text-2xl text-center font-sil font-bold">You Didn't Applied Any Coupon Code.</p>
                                                <p className="text-center text-info font-if font-bold">*Ignore If You Don't Want To Apply Coupon Code.</p>
                                            </div> :
                                            <p className="text-success text-center font-bold text-2xl font-sil">Coupon Code Applied.</p>
                                        }
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