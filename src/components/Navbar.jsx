/* eslint-disable react/no-unescaped-entities */
import { Link, NavLink } from "react-router-dom";
import { TiThMenuOutline } from "react-icons/ti";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
    const { user, logOut } = useAuth();
    // console.log(user);

    useEffect(() => {
        AOS.init({
            duration: 400
        });
    }, []);


    const handleLogOut = async () => {
        try{
            await logOut();
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "You are Logged Out.",
                showConfirmButton: false,
                timer: 1500
            });
        }catch(err){
            Swal.fire({
                position: "center",
                icon: "error",
                title: err,
                showConfirmButton: false,
                timer: 1000
            });
        }
    };
    const navLinks = <>
        <li className="px-4">{user?.displayName}</li>
        <li><Link to='/dashboard/my-profile'>Dashboard</Link></li>
        <li><button className="btn btn-sm btn-ghost" onClick={handleLogOut}>Logout</button></li>
    </>;
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='products'>Products</NavLink></li>
        {
            user?.email ?
                <li className="dropdown hidden md:block ml-3">
                    <div tabIndex={0} role="button" className="btn btn-ghost p-0">
                        <img className="avatar w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-fit absolute right-0">
                        {navLinks}
                    </ul>
                </li>
                : <li><NavLink to='login'>Login</NavLink></li>}
    </>;


    return (
        <div className="navbar bg-base-200 p-3 rounded-lg shadow-lg mb-3" data-aos="slide-down">
            {/* profile dropdown at start */}
            {user?.email && <div className="dropdown md:hidden">
                <div tabIndex={0} className="btn btn-ghost p-0">
                    <img className="avatar w-10 h-10 rounded-full" src={user?.photoURL} alt="" />
                </div>
                <ul className="dropdown-content z-10 menu p-2 shadow bg-base-100 rounded-box w-fit">
                    {navLinks}
                </ul>
            </div>}
            {/* logo at center */}
            <div className="navbar-start">
                <Link to='/' className="btn btn-ghost text-3xl font-pacifico mx-auto">Tech's Show Hub</Link>
            </div>
            {/* nav links at end */}
            <div className="navbar-end">
                {/* row */}
                <ul className="menu menu-horizontal px-1 hidden md:flex md:items-center md:justify-center">
                    {links}
                </ul>
                {/* dropdown */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <TiThMenuOutline className="text-3xl" />
                    </div>
                    <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-fit absolute right-0">
                        {links}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;