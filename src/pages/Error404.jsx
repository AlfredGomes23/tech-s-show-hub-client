import { FcHighPriority, FcHome, FcPrevious } from "react-icons/fc";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-5">
            <FcHighPriority className="text-9xl"/>
            <h1 className="text-5xl font-sil text-error">Error 404</h1>
            <p className="text-3xl font-if text-error">Page Not Found</p>
            <Link to='/' className="btn btn-active absolute left-3 top-5">
                <FcPrevious className="text-2xl"/>
                <FcHome className="text-5xl" />
                </Link>
        </div>
    );
};

export default Error404;