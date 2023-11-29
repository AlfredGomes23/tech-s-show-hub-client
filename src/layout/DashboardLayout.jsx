/* eslint-disable react/no-unescaped-entities */
import { MdDashboardCustomize } from "react-icons/md";

import { Link, Outlet } from 'react-router-dom';
import DashBoardNabLinks from '../components/DashBoardNabLinks';

const DashboardLayout = () => {
    return (
        // Navbar menu for lg + sidebar drawer for md
        <div className='max-w-7xl mx-auto'>
            <div className="drawer ">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-200 rounded-lg shadow-lg mb-3">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <MdDashboardCustomize className="text-3xl"/>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">
                            <Link to='/' className="btn btn-ghost text-3xl font-pacifico mx-auto">Tech's Show Hub</Link>
                        </div>
                        {/* Navbar menu content here */}
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                <DashBoardNabLinks></DashBoardNabLinks>
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    <div className='min-h-[calc(100vh-160px)]'>
                        <Outlet></Outlet>
                    </div>
                </div>
                {/* Sidebar content here */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 pt-10 w-48 min-h-fit my-auto rounded-r-xl bg-base-200 gap-3">
                        <h2 className="text-2xl font-if font-semibold underline text-center">Dashboard</h2>
                        <DashBoardNabLinks></DashBoardNabLinks>
                    </ul>
                </div>
            </div>
            {/* footer */}
            <footer className="text-center bg-base-200 rounded-lg shadow-lg py-5 mb-3">
                <small className="text-xs">Copyright © 2023 - All right reserved by Tech's Show Hub Ltd</small>
            </footer>
        </div>
    );
};

export default DashboardLayout;