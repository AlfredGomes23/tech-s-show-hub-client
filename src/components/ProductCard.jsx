/* eslint-disable react/prop-types */
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import Timestamp from 'react-timestamp';

const ProductCard = ({ product }) => {
    //TODO: fetch product by id use transtan query
    const { _id, name, tags, image, upvote, downvote, posted } = product;

    return (
        <div className="card card-compact w-64 bg-base-100 shadow-xl mx-auto">
            <figure><img src={image} alt={name} className="h-40" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="flex gap-1 justify-center font-medium flex-wrap">Tags:{
                    tags?.map((tag, idx) =>
                        <span key={idx} className="bg-secondary h-fit px-1 rounded-xl text-white">{tag}</span>)}
                </p>
                <p><Timestamp date={posted} /></p>
                <div className="flex justify-around">
                    <div className="btn btn-md w-fit text-success relative">
                        <BiSolidUpvote className="text-2xl" />
                        <span className="absolute -top-2 -right-2 outline-dashed bg-transparent p-1 rounded-full">{upvote}</span>
                    </div>
                    <div className="btn btn-md w-fit text-error relative">
                        <BiSolidDownvote className="text-2xl" />
                        <span className="absolute -top-2 -right-2 outline-dashed bg-transparent p-1 rounded-full">{downvote}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;