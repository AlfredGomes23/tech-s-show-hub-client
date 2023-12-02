import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Register = () => {
    const { createUser, updateUser } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        AOS.init({
            duration: 500
        });
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm();

    //on submit register
    const onSubmit = (data) => {
        // console.log(data);
        const { name, url, email, password } = data;
        //confirming
        Swal.fire({
            title: "Are you sure?",
            text: `Your name: [ ${name} ],
            Your Email: [ ${email} ],
            Your Photo URL: [ ${url} ]`,
            confirmButtonText: "Register",
            showDenyButton: true,
            denyButtonText: 'Cancel'
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    //create and set name, url
                    await createUser(email, password);
                    await updateUser(name, url);
                    //add the user to database
                    await axiosSecure.post('/user', {
                        displayName: name,
                        email,
                        photoURL: url,
                        role: 'User'
                    }).then(res => {
                            // console.log(res?.data);
                            if (res?.data?.insertedId) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Account Registered",
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                                //go to home
                                navigate('/', { replace: true });
                            }
                            else throw "Failed."
                        });
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

    return (
        <div className="hero min-h-screen bg-base-200 py-5  bg-gradient-to-r from-accent to-primary">
            <div className="hero-content flex-col w-fit shadow-2xl bg-base-100 rounded-xl max-w-lg" data-aos="zoom-in">
                <h1 className="text-5xl text-center font-bold ">Register here!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body py-0">
                    {/* name, url */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text"
                                {...register("name", { required: true })}
                                name="name"
                                placeholder="Name"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text"
                                {...register("url", { required: true })}
                                name="url"
                                placeholder="Photo URL"
                                className="input input-bordered"
                                required />
                        </div>
                    </div>
                    {/* email, password */}
                    <div>
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    {...register("email", { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                    required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password", { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/ })}
                                    name="password"
                                    placeholder="Password"
                                    className="input input-bordered" required />
                            </div>
                        </div>
                        {errors.email && <p className="text-center text-error font-semibold">Enter a Valid Email Address</p>}
                        {errors.password && <p className="text-center text-error font-semibold">Password MUST contain Minimum 6 characters Including at least a Upper, a Lower case letter, also a Number</p>}
                    </div>
                    <div className="flex gap-1 mx-auto">
                        <input type="checkbox"
                            {...register("checkbox", { required: true })}
                            name="checkbox"
                            id="" />
                        <p>Accept terms and conditions.</p>
                    </div>
                    {errors.checkbox && <span className="text-center text-error font-semibold">You must accept our Terms and conditions</span>}
                    <div className="form-control">
                        <button className="btn w-1/2 mx-auto bg-gradient-to-r from-accent to-primary text-secondary text-3xl mt-5">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;