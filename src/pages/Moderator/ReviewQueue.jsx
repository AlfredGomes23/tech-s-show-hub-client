import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const ReviewQueue = () => {
    const axisSecure = useAxiosSecure();
    
    const { data: pendingProducts = [], refetch, isLoading } = useQuery({
        queryKey: ["pendingProducts"],
        queryFn: async () => {
            const res = await axisSecure.get('/pending-products');
            return res.data;
        }
    });
    console.log(pendingProducts);

    const handleFeatured = async product => {        
        Swal.fire({
            title: `Feature-[ ${product.name} ]`,
            text: "Are you sure?",
            confirmButtonText: "Feature",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const res = await axisSecure.patch(`/pending-product/update/${product._id}`, { featured: true });
                    // console.log(res.data.modifiedCount);
                    if (res.data.modifiedCount) {
                        toast.success("Updated to Featured Product");
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
    const handleAccept = async product => {
        Swal.fire({
            title: `Accept-[ ${product.name} ]`,
            text: "Are you sure?",
            confirmButtonText: "Accept",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const res = await axisSecure.patch(`/pending-product/update/${product._id}`, { status: "Accepted" });
                    // console.log(res.data.modifiedCount);
                    if (res.data.modifiedCount) {
                        toast.success("Product Status Updated to Accepted");
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
    const handleReject = async product => {
        Swal.fire({
            title: `Reject-[ ${product.name} ]`,
            text: "Are you sure?",
            confirmButtonText: "Reject",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const res = await axisSecure.patch(`/pending-product/update/${product._id}`, { status: "Rejected" });
                    // console.log(res.data.modifiedCount);
                    if (res.data.modifiedCount) {
                        toast.success("Product Status Updated to Rejected");
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
            <h2 className="text-3xl text-center font-medium">Review Products Queue</h2>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                <table className="table w-fit mx-auto">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="w-fit">
                        {/* row */}
                        {
                            isLoading ?
                                <span className="loading loading-dots text-secondary flex mx-auto text-center"></span> :
                                pendingProducts?.map((product, idx) =>
                                    <tr key={idx}>
                                        <th>{idx + 1}</th>
                                        <td className="w-56 md:w-96">{product?.name}</td>
                                        <td className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-fit gap-1 lg:gap-5">
                                            <Link to={`/product/${product._id}`} className="btn btn-sm btn-primary">View Details</Link>
                                            <button onClick={() => handleFeatured(product)} className="btn btn-sm btn-warning" disabled={product.featured}>Make Featured</button>
                                            <button onClick={() => handleAccept(product)} className="btn btn-sm btn-success">Accept</button>
                                            <button onClick={() => handleReject(product)} className="btn btn-sm btn-error text-white" disabled={product.status === "Rejected"}>Reject</button>

                                        </td>
                                    </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewQueue;