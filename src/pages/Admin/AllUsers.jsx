import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";


const AllUsers = () => {
    const { user: admin } = useAuth()
    const axisSecure = useAxiosSecure();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axisSecure.get('/users');
            return res.data;
        }
    });
    // console.log(pendingProducts);

    const handleModerator = async user => {
        Swal.fire({
            title: `Make Moderator-[ ${user.name} ]`,
            text: "Are you sure?",
            confirmButtonText: "Make",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const res = await axisSecure.patch(`/user/${user?._id}`, { role:"Moderator" });
                    // console.log(res.data.modifiedCount);
                    if (res.data.modifiedCount) {
                        toast.success("User Role Updated to Moderator.");
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
    const handleAdmin = async user => {
        Swal.fire({
            title: `Make Moderator-[ ${user.name} ]`,
            text: "Are you sure?",
            confirmButtonText: "Make",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const res = await axisSecure.patch(`/user/${user?._id}`, { role: "Admin" });
                    // console.log(res.data.modifiedCount);
                    if (res.data.modifiedCount) {
                        toast.success("User Role Updated to Admin");
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
            <h2 className="text-3xl text-center font-medium">All Users</h2>
            <div className="divider"></div>
            <div className="overflow-x-auto">
                    <table className="table w-fit mx-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {/* row */}
                            {
                                users?.map((user, idx) =>
                                    <tr key={idx}>
                                        <td className="w-32">{user?.displayName}</td>
                                        <td className="w-32">{user?.email}</td>
                                        <td className="flex flex-col md:flex-row w-fit gap-1 lg:gap-5">
                                            <button className="btn btn-sm btn-success"
                                                onClick={() => handleModerator(user)}
                                                disabled={user?.role === 'Moderator' || user?.email === admin.email}>Make Moderator</button>

                                            <button className="btn btn-sm btn-error text-white"
                                            onClick={() => handleAdmin(user)}
                                            disabled={user?.role === 'Admin'}>Make Admin</button>

                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
            </div>
        </div>
    );
};

export default AllUsers;