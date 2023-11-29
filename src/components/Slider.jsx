/* eslint-disable react/prop-types */
import { Carousel } from "react-responsive-carousel";
import Timestamp from "react-timestamp";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Slider.css'

const Slider = ({products}) => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} className='z-0 md:w-1/2  mx-auto rounded-xl overflow-hidden'>
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
    );
};

export default Slider;