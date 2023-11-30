import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductsList from "./ProductsList";


const Featured = () => {
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        AOS.init({
            duration: 400
        });
    }, []);

    const { data: featured = [], isLoading } = useQuery({
        queryKey: ['featured'],
        queryFn: async () => {
            const products = await axiosPublic('/products');
            return products.data?.filter(product => product?.featured === true);
        }
    });
    // console.log(featured);
    //loading
    if (isLoading) return <span className="loading loading-bars text-warning flex justify-center items-center text-center mx-auto"></span>;
    
    return (
        <div>
            <h2 className="text-3xl text-center font-medium">Featured Products</h2>
            <div className="divider"></div>
            {
                featured?.length === 0 ? <span className="text-warning flex justify-center items-center text-center mx-auto">NO Product Available.</span>:
                <ProductsList products={featured} lg='lg:grid-cols-4'></ProductsList>}

        </div>
    );
};

export default Featured;