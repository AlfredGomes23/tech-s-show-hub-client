import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ReportedProducts = () => {
    const axiosSecure = useAxiosSecure();

    const { data: reportedProducts, refetch, isLoading } = useQuery({
        queryKey: ["reportedProducts"],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported-products');
            return res.data;
        }
    });
    // console.log(reportedProducts);

    const handleDelete = async product => {
        //confirming
        Swal.fire({
            title: "Are you sure?",
            text: `Your want to Delete the Product`,
            confirmButtonText: "DELETE",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const r = await axiosSecure.delete(`/product/${product._id}`);
                    if (r.data.deletedCount) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Deleted",
                            showConfirmButton: false,
                            timer: 1500
                        });
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

    if (isLoading) return <p className="loading loading-dots text-secondary flex mx-auto text-center"></p>;

    return (
        <div>
            <h2 className="text-3xl text-center font-medium">Reported Products</h2>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                {
                    reportedProducts?.length === 0 ?
                        <p className="text-secondary text-3xl text-center">No Product Reported Now</p> :
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
                                    reportedProducts?.map((product, idx) =>
                                        <tr key={idx}>
                                            <th>{idx + 1}</th>
                                            <td className="w-56 md:w-96">{product?.name}</td>
                                            <td className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-fit gap-1 lg:gap-5">
                                                <Link to={`/product/${product._id}`} className="btn btn-sm btn-primary">View Details</Link>
                                                <button onClick={() => handleDelete(product)} className="btn btn-sm btn-error text-white" disabled={product.status === "Rejected"}>Delete</button>

                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>}
            </div>
        </div>
    );
};

export default ReportedProducts;