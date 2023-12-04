import { useQuery } from "@tanstack/react-query";
import AddCouponBtn from "../../components/AddCouponBtn";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import moment from 'moment';
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import EditCouponBtn from "../../components/EditCouponBtn";

const Coupons = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [working, setWorking] = useState(false);

    const { data: coupons = [], refetch, isLoading } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/coupons');
            return data;
        }
    });
    // console.log(coupons);

    const handleDelete = async id => {
        setWorking(true);
        //confirming to delete from db
        Swal.fire({
            title: "Are you sure?",
            text: `Your want to Delete the Coupon`,
            confirmButtonText: "DELETE",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const r = await axiosSecure.delete(`/coupon/${id}`);
                    if (r.data.deletedCount) {
                        toast.success("Coupon DELETED.");
                        refetch();
                    }
                } catch (err) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: err,
                        showConfirmButton: false,
                        timer: 2000
                    });
                }

            }
        });
        setWorking(false);
    }


    if (isLoading) return <p className="loading loading-dots text-secondary flex mx-auto text-center"></p>;

    return (
        <div>
            <h2 className="text-3xl text-center font-medium">Manage All Coupons</h2>
            <div className="divider"></div>
            {
                coupons?.length === 0 ?
                    <p className="text-secondary text-3xl text-center">No Coupon Available now</p> :
                    <table className="table w-fit mx-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Coupon Code</th>
                                <th className="text-center">Details</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row */}
                            {
                                coupons?.map((coupon, idx) =>
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td className="w-32">{coupon.coupon}</td>
                                        <td className="w-56 ">
                                            <p>Discount: $ <span className="font-bold text-success">{coupon.discount}</span></p>
                                            <p>Expiries:
                                                <span className="font-bold ml-1 text-error">
                                                    {moment(coupon.expiryDate).format("Do MMM YY")}
                                                </span>
                                            </p>
                                            <p className="italic">Description: {coupon.description}</p>
                                        </td>
                                        <td className="flex flex-col md:flex-row w-fit gap-1 lg:gap-5">
                                            <EditCouponBtn
                                                coupon={coupon}
                                                refetch={refetch}></EditCouponBtn>
                                            <button className="btn btn-sm btn-error text-white" onClick={() => handleDelete(coupon._id)} disabled={working}>Delete</button>

                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>}
            <AddCouponBtn refetch={refetch}></AddCouponBtn>
        </div>
    );
};

export default Coupons;