import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import moment from "moment";

const CouponsSlider = () => {
    const axiosPublic = useAxiosPublic();

    const { data: coupons = [], isLoading } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/coupons');
            return data;
        }
    });

    //loading
    if (isLoading) return <span className="loading loading-bars text-warning flex justify-center items-center text-center mx-auto"></span>;

    return (
        <div className="my-10">
            <h2 className="text-3xl text-center font-medium">Get Discounts On Subscription</h2>
            <div className="divider"></div>
            <div>
                <Carousel autoPlay={true} infiniteLoop={true} className='z-0 md:w-1/2  mx-auto rounded-xl overflow-hidden'>
                    {
                        coupons?.map(coupon =>
                            <div key={coupon?._id} className='h-96 md:h-[60vh] card shadow-xl '>
                                <img src="https://i.ibb.co/JRzFJj1/coupon-bg.png" alt="" />
                                <div className='myLegend'>
                                    <h2 className=' text-lg text-info'>Use
                                        <span className="text-3xl"> {coupon.coupon}</span></h2>
                                    <h3 className="text-xl text-success">And get <span className="text-5xl font-semibold font-sil">$ {coupon.discount}</span></h3>
                                    <p>Valid till: <span className="text-error text-3xl font-if">{moment(coupon.expiryDate).format("Do MMM YY")}</span></p>
                                    <p className="font-sil text-warning">{'=>'} <span className="text-white">{coupon.description}</span></p>

                                </div>
                            </div>)
                    }
                </Carousel>
            </div>

        </div>
    );
};

export default CouponsSlider;