import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaRegUser, FaStar } from "react-icons/fa";
import { MdComment, MdEmail } from "react-icons/md";



const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    let canVote = true;
    const { register, handleSubmit, reset } = useForm();


    const { data: product = {}, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const p = await axiosPublic.get(`/product/${id}`);
            if (user?.email === p.data.ownerEmail) canVote = false;
            return p.data;
        }
    });
    //check if user can vote
    if (product?.upvotes?.includes(user?.email) || product?.downvotes?.includes(user?.email)) canVote = false;

    // console.log(isVoted());

    const handleUp = () => {
        if (!canVote) return toast.error('You Can Not Vote.');

        axiosSecure.patch(`/product/${product?._id}?email=${user?.email}&vote=upvotes`)
            .then((r) => {
                if (r.data.modifiedCount) {
                    canVote = false;
                    refetch();
                    toast.success('Upvoted successfully.');
                }
            })
    };
    const handleDown = () => {
        if (!canVote) return toast.error('You Can Not Vote.');

        axiosSecure.patch(`/product/${product?._id}?email=${user?.email}&vote=downvotes`)
            .then((r) => {
                if (r.data.modifiedCount) {
                    canVote = false;
                    refetch();
                    toast.success('Downvoted successfully.');
                }
            })
    };
    const onSubmit = async (data) => {
        // console.log(data);
        const { comment, rating } = data;
        if (rating === 'rating') return toast.error("Require A Rating selection.");
        try {
            await axiosSecure.post(`/review/${id}`, {
                email: user?.email,
                name: user?.displayName,
                comment,
                rating
            })
                .then(r => {
                    if (r.data.modifiedCount) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Review Posted.",
                            showConfirmButton: false,
                            timer: 1000
                        });
                        reset();
                        refetch();
                    }
                })
        } catch (err) {
            toast.error(err.message);
        }

    };

    return (
        <div>
            <h2 className="text-3xl text-center font-medium mt-10">Product Details</h2>
            <div className="divider"></div>
            {/* hero part */}
            <div className="hero min-h-screen rounded-lg" style={{ backgroundImage: `url(${product?.image})` }} >
                <div className="hero-content text-center text-[#000] font-if font-semibold glass rounded-lg">
                    <div className="max-w-md">
                        {/* details */}
                        <h1 className="mb-5 text-5xl font-bold">{product?.name}</h1>
                        <p className="flex gap-1 justify-center flex-wrap">Tags:{
                            product?.tags?.map((tag, idx) =>
                                <span key={idx} className="text-lg bg-[#0025] h-fit px-1 rounded-xl text-white">{tag}</span>)}
                        </p>
                        <p className="mb-5 text-lg">{product?.description}..<Link to={product?.link} className="link link-secondary">Read More here</Link></p>
                        {/* vote buttons*/}
                        <div className="flex justify-around font-pacifico">
                            {/* upvote btn */}
                            <button onClick={handleUp} className="btn btn-md w-fit text-success relative">
                                <BiSolidUpvote className="text-2xl" />
                                <span className="absolute -top-1 -right-0 bg-transparent p-1 rounded-full">{product?.upvotes?.length}</span>
                            </button>
                            {/* downvote btn */}
                            <button onClick={handleDown} className="btn btn-md w-fit text-error relative">
                                <BiSolidDownvote className="text-2xl" />
                                <span className="absolute -top-1 -right-0 bg-transparent p-1 rounded-full">{product?.downvotes?.length}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* review part */}
            <div className="flex flex-col lg:flex-row gap-5 items-center mt-10">
                {/* reviews */}
                <div className="text-xl lg:w-2/3 min-h-[495px]">
                    <p className="underline mb-3 font-bold text-center text-2xl">Reviews: {product?.reviews?.length}</p>
                    {
                        product?.reviews?.length !== 0 ?
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{
                                // reviews
                                product?.reviews?.map((review, idx) =>
                                    <div key={idx} className="card w-72 mx-auto bg-base-100 shadow-xl" data-aos="zoom-in">
                                        <div className="card-body">
                                            <h2 className="card-title"><FaRegUser />{review?.name}</h2>
                                            <h2 className="flex text-yellow-500 absolute right-3 to-0 items-center">{review?.rating}<FaStar /></h2>
                                            <h2 className="card-title text-sm flex"><MdEmail />{review?.email}</h2>
                                            <p className="flex items-center gap-1"><MdComment className="" />{review?.comment}</p>

                                        </div>
                                    </div>)
                            }</div>
                            : <p className="text-secondary">No one reviewed.</p>
                    }
                </div>
                {/* add review */}
                <form onSubmit={handleSubmit(onSubmit)} className="join flex-col w-full gap-5 lg:w-1/3 px-10 mb-5">
                    <div className="text-2xl font-semibold text-primary text-center underline">Post Your Review</div>
                    {/* user details */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Your Details</span>
                        </div>
                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 h-12 mr-1 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            <input type="text" disabled defaultValue={user?.displayName} className="input input-bordered w-1/2 ml-5" />
                        </div>
                    </label>
                    {/* review */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Your Review</span>
                        </div>
                        <textarea
                            {...register("comment")}
                            className="textarea select-bordered outline-[#0005]"
                            name="comment" placeholder="your review..." rows='4' required />
                    </label>
                    {/* rating */}
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Your Review</span>
                        </div>
                        <select {...register("rating")} className="select select-bordered join-item" name="rating" defaultValue="rating">
                            <option value='rating' disabled>Rating</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </label>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;