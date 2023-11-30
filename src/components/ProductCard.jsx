/* eslint-disable react/prop-types */
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import Timestamp from 'react-timestamp';
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const { _id, name, tags, image, upvotes, downvotes, posted } = product;

    //check if user can vote
    let canVote = true;
    if (upvotes?.includes(user?.email) || downvotes?.includes(user?.email) || user?.email === product?.ownerEmail) canVote = false;

    // console.log(isVoted());

    const handleUp = () => {
        if (!user?.email) return navigate('/login', { state: { form: location } }, { replace: true });

        if (!canVote) return toast.error('You Can Not Vote.');
        axiosSecure.patch(`/product/vote/${_id}?email=${user?.email}&vote=upvotes`)
            .then((r) => {
                if (r.data.modifiedCount) {
                    toast.success('Upvoted successfully.');
                    canVote = false;
                    refetch();
                }
            })
    };
    const handleDown = () => {
        if (!user?.email) return navigate('/login', { state: { form: location } }, { replace: true });
        if (!canVote) return toast.error('You Can Not Vote.');

        axiosSecure.patch(`/product/vote/${_id}?email=${user?.email}&vote=downvotes`)
            .then((r) => {
                if (r.data.modifiedCount) {
                    canVote = false;
                    refetch();
                    toast.success('Downvoted successfully.');
                }
            })
    };

    return (
        <div className="card card-compact w-64 bg-base-100 shadow-xl mx-auto">
            <figure><img src={image} alt={name} className="h-40" /></figure>
            <div className="card-body">
                <Link to={`/product/${_id}`} className="card-title">{name}</Link>
                    <p className="flex gap-1 justify-center font-medium flex-wrap">Tags:{
                        tags?.map((tag, idx) =>
                            <span key={idx} className="bg-secondary h-fit px-1 rounded-xl text-white">{tag}</span>)}
                    </p>
                <p>Posted: <Timestamp date={posted} /></p>
                <div className="flex justify-around">
                    {/* upvote btn */}
                    <button onClick={handleUp} className="btn btn-md w-fit text-success relative">
                        <BiSolidUpvote className="text-2xl" />
                        <span className="absolute -top-1 -right-0 bg-transparent p-1 rounded-full">{upvotes?.length}</span>
                    </button>
                    {/* downvote btn */}
                    <button onClick={handleDown} className="btn btn-md w-fit text-error relative">
                        <BiSolidDownvote className="text-2xl" />
                        <span className="absolute -top-1 -right-0 bg-transparent p-1 rounded-full">{downvotes?.length}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;