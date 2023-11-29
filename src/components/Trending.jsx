import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProductsList from "./ProductsList";

const Trending = () => {
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        AOS.init({
            duration: 400
        });
    }, []);

    const { data: trending = [], isLoading } = useQuery({
        queryKey: ['trending'],
        queryFn: async () => {
            const t = await axiosPublic('/products/trending');
            console.log(t.data);
            return t.data;
        }
    });
    console.log(trending);

    //loading
    if (isLoading) return <span className="loading loading-bars text-warning flex justify-center items-center text-center mx-auto"></span>;
    return (
        <div>
            <h2 className="text-3xl text-center font-medium">Trending Products</h2>
            <div className="divider"></div>
            <ProductsList products={trending} lgCols={3}></ProductsList>
        </div>
    );
};

export default Trending;