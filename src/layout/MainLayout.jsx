import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <div className="lg:min-h-[calc(100vh-420px)]">
                <Outlet ></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;