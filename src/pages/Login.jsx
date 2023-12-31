import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle, FcPrevious } from "react-icons/fc";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";


const Login = () => {
    const { login, signIn } = useAuth();
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
    const axiosSecure = useAxiosSecure();
    const [logging, setLogging] = useState(false);
    const [gLogging, setGLogging] = useState(false);
    // console.log(from);

    useEffect(() => {
        AOS.init({
            duration: 500
        });
    }, []);

    const { register, handleSubmit } = useForm();

    //login by email
    const onSubmit = async (data) => {
        setLogging(true);
        // console.log(data);
        const { email, password } = data;
        try {
            await login(email, password);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged In",
                text: 'Welcome Back',
                showConfirmButton: false,
                timer: 1000
            });
            //navigate
            navigate(from, { replace: true });
        } catch (err) {
            setErr(err.message);
            Swal.fire({
                position: "center",
                icon: "error",
                title: err.message,
                showConfirmButton: false,
                timer: 1000
            });
        }
        setLogging(false)
    };

    //sign in by google
    const handleSignIn = async () => {
        setGLogging(true);
        try {
            await signIn()
                .then(async r => {
                    const user = r?.user;
                    const { displayName, email, photoURL } = user;
                    // console.log(r?.user);
                    //checking if new user
                    await axiosSecure.get(`/user/?email=${r?.user?.email}`)
                        .then(async res => {
                            // console.log(res?.data);
                            //old user
                            if (res?.data?._id) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: 'Signed In',
                                    text: `Welcome Back, ${displayName}.`,
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                                //navigate
                                navigate(from, { replace: true });
                            } else {
                                console.log(displayName, email, photoURL);
                                //add the new user to database
                                await axiosSecure.post('/user', {
                                    displayName,
                                    email,
                                    photoURL,
                                    role: 'User',
                                    limit: 1
                                })
                                    .then(res => {
                                        console.log(res?.data);
                                        if (res?.data?.insertedId) {
                                            Swal.fire({
                                                position: "center",
                                                icon: "success",
                                                title: "Signed Up",
                                                text: `Welcome, ${displayName} `,
                                                showConfirmButton: false,
                                                timer: 1000
                                            });
                                            //go to home
                                            navigate('/', { replace: true });
                                        }
                                        else throw "Failed."
                                    });
                            }
                        })
                })
        } catch (err) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: err,
                showConfirmButton: false,
                timer: 3000
            });
        }
        setGLogging(false);
    };

    return (
        <div className="hero min-h-screen bg-base-200 bg-gradient-to-r from-primary to-accent">
            <Link to={from} className="absolute top-2 left-2 flex text-3xl z-10 btn btn-ghost"><FcPrevious /></Link>
            <div className="hero-content flex-col lg:flex-row">
                {/* photo */}
                <div className="flex-1 mx-auto hidden lg:block w-1/2" data-aos="slide-left">
                    <img src="https://i.ibb.co/nRqCK61/login-img.png" className="w-4/5 mx-auto rounded-lg opacity-90" alt="" />
                </div>
                {/* login card */}
                <div className="lg:w-1/2 pt-10 md:pt-0" data-aos="slide-right">
                    <div className="card shrink-0 w-96 shadow-2xl bg-base-100 mx-auto">
                        <h1 className="text-5xl text-center font-bold">Login now!</h1>
                        {
                            err ? <p className="text-center text-error font-semibold">{err}</p> : ''
                        }
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
                                {logging ?
                                    <p className="text-3xl flex gpa-1 mx-auto btn bg-gradient-to-r from-primary to-accent text-white">Logging in<span className="loading loading-spinner text-secondary my-3"></span></p> :
                                    <button className="btn bg-gradient-to-r from-primary to-accent text-white text-3xl w-1/2 mx-auto" disabled={gLogging}>Login</button>}
                            </div>
                        </form>
                        {/* bottom part*/}
                        <p className="text-center">New Here? <Link to='/register' className="link link-primary font-medium">Register</Link></p>

                        <p className="ml-5 text-secondary font-medium">OR,</p>

                        <button className="btn lg:w-2/3 mx-auto bg-gradient-to-r from-primary to-accent text-white text-2xl mb-5" onClick={handleSignIn} disabled={logging}>
                            Login with
                            <FcGoogle className={gLogging ? "text-4xl animate-spin" : 'text-4xl'} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;