import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Register = () => {
    useEffect(() => {
        AOS.init({
            duration: 500
        });
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);

    };

    return (
        <div className="hero min-h-screen bg-base-200 py-5  bg-gradient-to-r from-accent to-primary">
            <div className="hero-content flex-col w-fit shadow-2xl bg-base-100 rounded-xl max-w-lg" data-aos="zoom-in">
                <h1 className="text-5xl text-center font-bold ">Register here!</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body py-0">
                    {/* name url */}
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
                    {/* email password */}
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
                        {errors.password && <p className="text-center text-error font-semibold">Your Password MUST contain Minimum 6 characters Including at least a Upper, a Lower case letter, also a Number</p>}
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
                        <button className="btn w-1/2 mx-auto bg-gradient-to-r from-accent to-primary text-secondary text-3xl ">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;