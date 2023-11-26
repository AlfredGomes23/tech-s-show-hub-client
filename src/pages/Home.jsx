/* eslint-disable react/no-unescaped-entities */
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import Trending from "../components/Trending";
import { Helmet } from 'react-helmet-async';


const Home = () => {
    return (
        <div>
            <Helmet><title>Tech's Show Hub | Home</title></Helmet>
            <Banner></Banner>
            <Featured></Featured>
            <Trending></Trending>
        </div>
    );
};

export default Home;