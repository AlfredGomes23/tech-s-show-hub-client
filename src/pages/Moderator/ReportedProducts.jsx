import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ReportedProducts = () => {
    const axiosSecure = useAxiosSecure();
    const {data:reportedProducts, refetch, isLoading}= useQuery({
        queryKey:["reportedProducts"],
        queryFn: async () => {
            const res = await axiosSecure.get('/reported-products');
            return res.data;
        }
    });
console.log(reportedProducts);

    const handleDelete = async product => {
        console.log("clicked");
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
                </table>
            </div>
        </div>
    );
};

export default ReportedProducts;