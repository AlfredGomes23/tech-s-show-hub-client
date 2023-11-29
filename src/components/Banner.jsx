/* eslint-disable react/no-unescaped-entities */
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Carusole.css';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'
import Timestamp from 'react-timestamp';


const Banner = () => {
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        AOS.init({
            duration: 400
        });
    }, [axiosPublic]);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const r = await axiosPublic.get('/products?page=1&limit=5&search=all');
            return r?.data;
        }
    });
    // console.log(products);
    //loading
    if (isLoading) return <span className="loading loading-bars text-warning flex justify-center items-center text-center mx-auto"></span>;

    return (
        <div className="flex flex-col md:flex-row justify-center items-center mx-auto px-1 gap-5 lg:px-0 mb-5" data-aos="zoom-out">
            {/* text */}
            <div className='md:w-1/2 h-[50vh] flex flex-col justify-center items-center gap-5 mx-auto mb-5'>
                <p className='text-lg font-sil font-semibold'>Welcome to,</p>
                <h2 className='text-3xl text-accent font-pacifico'>Tech's Show Hub</h2>
                <p className='text-xl text-primary font-sil font-semibold'>Here you will find latest Tech products</p>
                <p className='text-secondary font-if font-semibold'>*Get Coupon for Subscription*</p>
            </div>
            {/* slider */}
            <Carousel autoPlay={true} infiniteLoop={true} className=' md:w-1/2  mx-auto rounded-xl overflow-hidden'>
                {
                    products?.map(product =>
                        <div key={product?._id} className='h-96 md:h-[60vh] card shadow-xl '>
                            <img src={product?.image} alt={product?.image} className='h-96 md:h-[60vh] rounded-xl overflow-hidden' />
                            <div className='myLegend'>
                                <h4 className='text-white text-2xl'>{product?.name}</h4>
                                <p className='text-sm'>Posted: <Timestamp date={product?.posted} /></p>
                            </div>
                        </div>)
                }
            </Carousel>
        </div>
    );
};

export default Banner;