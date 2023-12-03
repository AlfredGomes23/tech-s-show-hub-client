import { Link } from "react-router-dom";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const MyProducts = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: products =[], refetch} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const r = await axiosSecure.get(`/products/${user?.email}`);
            return r.data;
        }
    });
    // console.log(products);

    const handleDelete = async id => {
        console.log(id);
        //confirming
        Swal.fire({
            title: "Are you sure?",
            text: `Your want to Delete the Product`,
            confirmButtonText: "DELETE",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const r = await axiosSecure.delete(`/product/${id}`);
                    if (r.data.deletedCount) {
                        toast.success("Product DELETED.");
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

       
    };

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
                            <th className="hidden lg:block">Photo</th>
                            <th>Name</th>
                            <th>Vote</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row */}
                        {
                            products?.map((product, idx) =>
                                <tr key={idx}>
                                    <th className="w-fit">{idx + 1}</th>
                                    <td className="hidden lg:block">
                                        <div className="flex items-center gap-3 avatar mask mask-squircle w-12 h-12">
                                            <img src={product?.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </td>
                                    <td>{product?.name}</td>
                                    <td>
                                        <div className="flex items-center text-center gap-0 lg:gap-5">
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
                                    <td className=" flex flex-col lg:flex-row w-fit gap-1 lg:gap-5">
                                        <Link to={`/dashboard/update-product/${product?._id}`} className="btn btn-warning btn-sm">Update</Link>
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