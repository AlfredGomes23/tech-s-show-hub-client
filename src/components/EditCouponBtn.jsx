/* eslint-disable react/prop-types */
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

// validate selected date
const validateSelectedDate = date => {
    const selectedDate = new Date(date);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        return false;
    }

    return true; // Validation passed
};

const EditCouponBtn = ({ coupon, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const [submitting, setSubmitting] = useState(false);


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async data => {
        setSubmitting(true);
        const { discount, expiryDate, description } = data;

        const newCoupon = { coupon: coupon.coupon, discount, expiryDate, description };
        // console.log(newCoupon);
        //save to db
        const res = await axiosSecure.patch(`/coupon/${coupon._id}`,newCoupon);
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Coupon Updated",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Update Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
        document.getElementById('update_coupon_modal').close();
        refetch();
        setSubmitting(false);
    };
    return (
        <div>
            <button className="btn btn-sm btn-info" onClick={() => document.getElementById('update_coupon_modal').showModal()}>Edit</button>
            <button className=""
            ></button>

            <dialog id="update_coupon_modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {/* modal content */}
                    <h2 className="text-3xl text-center text-info font-medium">Update Coupon Details</h2>
                    <div className="divider"></div>
                    {/* coupon form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Coupon */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Coupon Code</span>
                            </div>
                            <abbr title="Not Possible to Update Coupon Code, So that it Remains UNIQUE. If You Really Need to Update, just Delete it And Add New One.">
                                <input type="text" {...register("coupon")} defaultValue={coupon.coupon} className="input input-bordered w-full max-w-xs" disabled /></abbr>
                            {errors.coupon && (
                                <p role="alert" className="text-error">Already Exist</p>
                            )}
                        </label>
                        {/* discount */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Discount Amount</span>
                            </div>
                            <input type="number" {...register("discount", { max: 200, min: 10 })} defaultValue={coupon.discount} className="input input-bordered w-full max-w-xs" required />
                            {errors.discount && (
                                <p role="alert" className="text-error">Limited to $10-$200.</p>
                            )}

                        </label>
                        {/* Expiry date */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Expiry date</span>
                            </div>
                            <input type="date" {...register("expiryDate",
                                { validate: (value) => validateSelectedDate(value) })}
                                defaultValue={coupon.expiryDate} className="input input-bordered w-full max-w-xs" required />
                            {errors.expiryDate && (
                                <p role="alert" className="text-error">Select A Future Date</p>
                            )}

                        </label>
                        {/* description */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Coupon Description</span>
                            </div>
                            <input type="text" {...register("description")} defaultValue={coupon.description} className="input input-bordered w-full max-w-xs" required />
                        </label>
                        <button className="btn btn-sm mx-auto flex my-5 lg:col-span-2 btn-warning" disabled={submitting}>Submit</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default EditCouponBtn;