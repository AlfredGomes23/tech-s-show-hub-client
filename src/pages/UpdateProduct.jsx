import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import { WithContext as ReactTags } from 'react-tag-input';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const { data: product = {}, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const p = await axiosPublic.get(`/product/${id}`);
            setTags(p.data.tags.map(t => ({ id: t, text: t })));
            return p.data;
        }
    });


    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = tag => {
        setTags([...tags, tag]);
    };
    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        setTags(newTags);
    };

    const onSubmit = async (data) => {
        const { p_name, description, link } = data;
        let upload = false;

        //check new one and upload image to hosting server
        let p_photoUrl = '';
        if (data.image.length) {
            const imageFile = { image: data.image[0] }
            const hostResp = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': "multipart/form-data" }
            });
            if (hostResp?.data?.success) {
                p_photoUrl = hostResp?.data?.data?.display_url
                upload = true;
            }
        } else {
            p_photoUrl = product?.image;
            upload = true;
        }
        // console.log(upload);

        //send product to server
        if (upload) {
            const newProduct = {
                name: p_name,
                image: p_photoUrl,
                tags: await tags?.map(tag => tag?.text),
                upvotes: product.upvotes,
                downvotes: product.downvotes,
                description: description,
                reviews: product?.reviews,
                posted: product?.posted,
                link: link,
                ownerName: product?.ownerName,
                ownerPhotoURL: product?.ownerPhotoURL,
                ownerEmail: product?.ownerEmail,
                featured: false,
                status: 'Pending'
            };
            // console.log(newProduct);

            const r = await axiosSecure.patch(`/product/update/${product?._id}`, newProduct);
            if (r?.data?.modifiedCount) {
                toast.success("Updated.");
                refetch();
                navigate('/dashboard/my-products');
            }
        }


    };
    // console.log(product?.tags);

    return (
        <div className="mt-5 mb-10">
            <h2 className="text-3xl text-center font-medium">Update Product</h2>
            <div className="divider"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="lg:flex justify-around">
                    {/* left 1/2 */}
                    <div className="lg:w-1/2 px-5 lg:px-0">
                        {/* product name */}
                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">Product Name?</span>
                            </div>
                            <input type="text" {...register("p_name")} defaultValue={product?.name} className="input input-bordered w-full max-w-md mx-auto" required />
                        </label>

                        {/* tag */}
                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <p className=" ">Product Tags</p>
                            </div>
                            <ReactTags
                                tags={tags}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                inputFieldPosition="inline"
                                placeholder="Add Product Tags"
                                autocomplete allowUnique inline
                            />
                        </label>
                        {/* description */}
                        <label className="form-control mx-auto w-full max-w-md  lg:w-full">
                            <div className="label">
                                <span className="label-text">Product Description</span>
                            </div>
                            <textarea {...register("description")} className="textarea textarea-bordered h-48" defaultValue={product?.description} required ></textarea>
                        </label>
                        {/* link */}
                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">External Link</span>
                            </div>
                            <input type="text" {...register("link")} defaultValue={product.link} className="input input-bordered w-full max-w-md mx-auto" />
                        </label>
                    </div>
                    {/* right 1/2 */}
                    <div className="lg:w-1/2 px-5 lg:px-0 flex flex-col lg:flex-col-reverse">
                        {/* owner */}
                        <div className="flex flex-col lg:flex-row gap-3 justify-center order-last mx-auto mt-5">
                            {/* avatar */}
                            <div className="avatar">
                                <div className="w-48 mask mask-squircle">
                                    <img src={product?.ownerPhotoURL} />
                                </div>
                            </div>
                            <div>
                                {/* name */}
                                <label className="form-control lg:w-96">
                                    <div className="label">
                                        <span className="label-text">Your name</span>
                                    </div>
                                    <input type="text" defaultValue={product?.ownerName} className="input input-bordered w-full" disabled />
                                </label>
                                {/* email */}
                                <label className="form-control lg:w-96">
                                    <div className="label">
                                        <span className="label-text">Your Email</span>
                                    </div>
                                    <input type="text" defaultValue={product?.ownerEmail} className="input input-bordered w-full" disabled />
                                </label>
                            </div>
                        </div>
                        {/* file input */}
                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">Pick Product Image</span>
                            </div>
                            <input type="file" {...register("image")} className="file-input file-input-bordered w-full max-w-md mx-auto" />
                        </label>
                        <div className="card w-64 bg-base-100 rounded-lg my-5 shadow-xl mx-auto">
                            <figure>
                                <img src={product?.image} alt={product?.name} className="rounded-xl" />
                            </figure>
                        </div>
                    </div>
                </div>
                <button className="btn btn-outline btn-primary text-2xl font-bold btn-wide mx-auto flex mt-5">Post</button>
            </form>

        </div >
    );
};

export default UpdateProduct;