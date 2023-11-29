import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { WithContext as ReactTags } from 'react-tag-input';
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";

//get time
function getCurrentTime() {
    const now = new Date();
    const isoString = now.toISOString();

    // Extract only the date and time portion
    const formattedTime = isoString.split('T')[0] + 'T' + isoString.split('T')[1].substring(0, 8) + 'Z';

    return formattedTime;
}

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProduct = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm();
    const [tags, setTags] = useState([]);

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
    const handleTagClick = index => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const onSubmit = async (data) => {
        //check if no tags
        if (tags?.length < 1) return toast.error("Product Tag is Required.");
        

       

    };

    return (
        <div className="mt-5 mb-10">
            <h2 className="text-3xl text-center font-medium">Add Product</h2>
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
                            <input type="text" {...register("p_name")} placeholder="Product Name" className="input input-bordered w-full max-w-md mx-auto" required />
                        </label>
                        {/* file input */}
                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">Pick Product Image</span>
                            </div>
                            <input type="file" {...register("image")} className="file-input file-input-bordered w-full max-w-md mx-auto" required />
                        </label>
                        {/* tag */}
                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">Product Tags</span>
                            </div>
                            <ReactTags
                                tags={tags}
                                // suggestions={suggestions}
                                // delimiters={delimiters}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                handleTagClick={handleTagClick}
                                inputFieldPosition="inline"
                                placeholder="Add Product Tags"
                                autocomplete allowUnique inline
                            />
                        </label>
                        {/* link */}
                        <label className="form-control w-full max-w-md mx-auto">
                            <div className="label">
                                <span className="label-text">External Link</span>
                            </div>
                            <input type="text" {...register("link")} placeholder="External Link" className="input input-bordered w-full max-w-md mx-auto" />
                        </label>
                    </div>
                    {/* right 1/2 */}
                    <div className="lg:w-1/2 px-5 lg:px-0 flex flex-col lg:flex-col-reverse">
                        {/* owner */}
                        <div className="flex flex-col lg:flex-row gap-3 justify-center order-last mx-auto mt-5">
                            {/* avatar */}
                            <div className="avatar">
                                <div className="w-48 mask mask-squircle">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            <div>
                                {/* name */}
                                <label className="form-control lg:w-96">
                                    <div className="label">
                                        <span className="label-text">Your name</span>
                                    </div>
                                    <input type="text" defaultValue={user?.displayName} className="input input-bordered w-full" disabled />
                                </label>
                                {/* email */}
                                <label className="form-control lg:w-96">
                                    <div className="label">
                                        <span className="label-text">Your Email</span>
                                    </div>
                                    <input type="text" defaultValue={user?.email} className="input input-bordered w-full" disabled />
                                </label>
                            </div>
                        </div>
                        {/* description */}
                        <label className="form-control mx-auto w-96 lg:w-full">
                            <div className="label">
                                <span className="label-text">Product Description</span>
                            </div>
                            <textarea {...register("description")} className="textarea textarea-bordered h-24" placeholder="Description" required ></textarea>
                        </label>
                    </div>
                </div>
                <button className="btn btn-outline btn-primary text-2xl font-bold btn-wide mx-auto flex mt-5">Submit</button>
            </form>

        </div >
    );
};

export default AddProduct;