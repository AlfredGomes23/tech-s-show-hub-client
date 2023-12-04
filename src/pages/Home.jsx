/* eslint-disable react/no-unescaped-entities */
import Banner from "../components/Banner";
import CouponsSlider from "../components/CouponsSlider";
import Featured from "../components/Featured";
import Trending from "../components/Trending";
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div className="-z-20">
            <Helmet><title>Tech's Show Hub | Home</title></Helmet>
            <Banner></Banner>
            <Featured></Featured>
            {/* <Trending></Trending> */}
            <CouponsSlider></CouponsSlider>
        </div>
    );
};

export default Home;