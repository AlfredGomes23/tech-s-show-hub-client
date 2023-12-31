/* eslint-disable react/no-unescaped-entities */
import { CiFacebook, CiTwitter, CiYoutube } from "react-icons/ci";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
    useEffect(() => {
        AOS.init({
            duration: 400
        });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        //TODO:send to database
        const email = e.target.email.value;
        // console.log(email);

        toast.success("Subscribed.");
    }
    return (
        <footer className="bg-base-200 rounded-xl" data-aos="slide-up">
            <div className="footer lg:px-10">
                {/* 1st 1/2 */}
                <aside className="mx-auto">
                    <div className="flex flex-col items-center gap-5">
                        <img src="../../public/favicon.ico" className="w-20 lg:w-32" alt="" />
                        <h2 className="text-3xl font-pacifico mb-5">Tech's Show Hub</h2></div>
                    <p>Tech's Show Hub Ltd.<br />Providing reliable service since 2001</p>
                </aside>
                {/* 2nd 1/2 */}
                <nav className="mx-auto pt-5 lg:pt-10 text-center">
                    <header className="footer-title mx-auto">Social</header>
                    <div className="grid grid-flow-col gap-4 text-3xl mx-auto">
                        <Link to='#'><CiFacebook /></Link>
                        <Link to='#'><CiTwitter /></Link>
                        <Link to='#'><CiYoutube /></Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <header className="footer-title mt-5">Newsletter</header>
                        <fieldset className="form-control w-80 join join-horizontal">
                            <input type="text" name="email" placeholder="Enter your email address..." className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Subscribe</button>

                        </fieldset>
                    </form>
                </nav>
            </div>
            <div className="text-center py-5">
                <small className="text-xs">Copyright © 2023 - All right reserved by Tech's Show Hub Ltd</small>
            </div>
        </footer>
    );
};

export default Footer;