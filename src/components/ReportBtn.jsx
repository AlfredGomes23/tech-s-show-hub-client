/* eslint-disable react/prop-types */
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";


const ReportBtn = ({ id }) => {
    const [clicked, setClicked] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [reported, setReported] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        setClicked(true);
        console.log(e.target.report.value);

        //save to db
        const res = await axiosSecure.post('/report', {
            email: user?.email,
            p_id: id,
            report: e.target.report.value
        });
        if(res.data.insertedId) {
            toast.success("Reported.");
            setReported(true);
        }
    }
    return (
        <div className="absolute top-1 right-0">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-sm text-white btn-error" onClick={() => document.getElementById('my_modal_1').showModal()}>Report</button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-error font-sil text-center">Report</h3>
                    { reported ? <p className="text-success text-2xl text-center py-5">Reported</p> :
                        <form onSubmit={handleSubmit}>
                        <textarea name="report" className="w-full min-h-[20vh] input input-bordered rounded-lg px-5 py-3" placeholder="write your report about the product..." disabled={clicked}></textarea>
                        <input type="submit" className="btn btn-error text-white mt-5" disabled={clicked} />
                    </form>}
                    <div className="modal-action absolute bottom-5 right-5">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-warning text-white">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ReportBtn;