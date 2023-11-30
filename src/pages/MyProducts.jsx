import { Link } from "react-router-dom";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";


const MyProducts = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: products =[]} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const r = await axiosSecure.get(`/products/${user?.email}`);
            console.log(r.data);
            return r.data;
        }
    });
    console.log(products);

    const handleDelete = id => {
        console.log(id);

    }
    return (
        <div>
            <h2 className="text-3xl text-center font-medium">My Products</h2>
            <div className="divider"></div>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Vote</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {
                            products?.map((product, idx) =>
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3 avatar mask mask-squircle w-12 h-12">
                                            <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </td>
                                    <td>{product?.name}</td>
                                    <td>
                                        <div className="flex items-center gap-5">
                                            <span className="text-success">
                                                <BiSolidUpvote className="text-2xl" />
                                                {product?.upvotes?.length}
                                            </span>
                                            <span className="text-error">
                                                {product?.downvotes?.length}
                                                <BiSolidDownvote className="text-2xl" />
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={product?.status === 'Accepted' ? "text-success"
                                            : product?.status === 'Rejected' ? "text-error" : 'text-warning'}>{product?.status}</p>

                                    </td>
                                    <td>
                                        <Link to={`/dashboard/update-product/${product?._id}`} className="btn btn-warning btn-sm">Update</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(product?._id)} className="btn btn-error btn-sm">Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyProducts;