/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
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

const AddCouponBtn = ({ refetch }) => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [submitting, setSubmitting] = useState(false);

    //check coupon code is unique or not
    const validateCouponCode = async code => {
        const { data } = await axiosPublic.get('/coupons');
        // console.log(data);
        if (data?.find(d => d.coupon === code)) return false;
        return true;
    };

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async data => {
        setSubmitting(true);
        // console.log(data);
        //save to db
        const res = await axiosSecure.post('/coupon', data);
        if (res.data.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Coupon Added",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Update Failed",
                showConfirmButton: false,
                timer: 1500
            });
        }
        document.getElementById('my_modal_coupon').close();
        refetch();
        setSubmitting(false);
    };

    return (
        <div>
            <button className="btn mx-auto flex btn-sm my-5 btn-primary" onClick={() => document.getElementById('my_modal_coupon').showModal()}>Add Coupon</button>

            <dialog id="my_modal_coupon" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    {/* modal content */}
                    <h2 className="text-3xl text-center text-primary font-medium">Add Coupon Details</h2>
                    <div className="divider"></div>
                    {/* coupon form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Coupon */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Coupon Code</span>
                            </div>
                            <input type="text" {...register("coupon",
                                { maxLength: 7, validate: (value) => validateCouponCode(value) })} name="coupon" placeholder="Coupon Code" className="input input-bordered w-full max-w-xs" required />
                            {errors.coupon && (
                                <p role="alert" className="text-error">Already Exist</p>
                            )}
                        </label>
                        {/* discount */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Discount Amount</span>
                            </div>
                            <input type="number" {...register("discount", { max: 200, min: 10 })} name="discount" placeholder="Discount Amount" className="input input-bordered w-full max-w-xs" required />
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
                                name="expiryDate" placeholder="Expiry date" className="input input-bordered w-full max-w-xs" required />
                            {errors.expiryDate && (
                                <p role="alert" className="text-error">Select A Future Date</p>
                            )}

                        </label>
                        {/* description */}
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Coupon Description</span>
                            </div>
                            <input type="text" {...register("description")} name="description" placeholder="Coupon Description" className="input input-bordered w-full max-w-xs" required />
                        </label>
                        <button className="btn btn-sm mx-auto flex my-5 lg:col-span-2 btn-warning" disabled={submitting}>Submit</button>
                    </form>
                </div>
            </dialog>
        </div>

    );
};

export default AddCouponBtn;