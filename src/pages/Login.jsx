import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle, FcHome, FcPrevious } from "react-icons/fc";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const form = location?.state?.pathname || '/';
    useEffect(() => {
        AOS.init({
            duration: 500
        });
    }, []);

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        //add on database and firebase


        Swal.fire({
            position: "center",
            icon: "success",
            title: "Account Registered",
            showConfirmButton: false,
            timer: 1000
        });
        //navigate
        navigate(form, { replace: true });
    };

    return (
        <div className="hero min-h-screen bg-base-200 bg-gradient-to-r from-primary to-accent">
            <Link to={form} className="absolute top-2 left-2 flex text-3xl z-10 btn btn-ghost"><FcPrevious /> <FcHome /></Link>
            <div className="hero-content flex-col lg:flex-row">
                {/* photo */}
                <div className="flex-1 mx-auto hidden lg:block w-1/2" data-aos="slide-left">
                    <img src="https://i.ibb.co/nRqCK61/login-img.png" className="w-4/5 mx-auto rounded-lg opacity-90" alt="" />
                </div>
                {/* login card */}
                <div className="lg:w-1/2 pt-10 md:pt-0" data-aos="slide-right">
                    <div className="card shrink-0 w-96 shadow-2xl bg-base-100 mx-auto">
                        <h1 className="text-5xl text-center font-bold">Login now!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    {...register("email")}
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            {/* password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password")}
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <button className="btn bg-gradient-to-r from-primary to-accent text-white text-3xl w-1/2 mx-auto ">Login</button>
                            </div>
                        </form>
                        {/* bottom part*/}
                        <p className="text-center">New Here? <Link to='/register' className="link link-primary font-medium">Register</Link></p>
                        <p className="ml-5 text-secondary font-medium">OR,</p>
                        <button className="btn lg:w-2/3 mx-auto bg-gradient-to-r from-primary to-accent text-white text-2xl mb-5">Login with <FcGoogle className="text-4xl" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;