import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "../hooks/useAxiosSecure";
import ProductsList from '../components/ProductsList';
import PageTitle from '../components/PageTitle';
import Pagination from '../components/Pagination';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';


const Products = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const { count } = useLoaderData();
    const perPage = 20;
    const totalPage = parseInt(count / perPage) + 1;

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?page=${currentPage}&limit=${perPage}`);
            return res.data;
        }
    });

    // console.log(products);


    //search
    const handleSearch = e => {
        e.preventDefault();

        const tag = e.target.tag.value;
        console.log(tag);

        //TODO: fetch product of this tag
    }

    //loading
    if (isLoading) return <div className=' flex justify-center items-center text-center mx-auto'>
        <p className='text-3xl text-warning'>Loading <span className="loading loading-bars loading-md"></span></p>
    </div>;

    return (
        <div>
            {/* TODO: add slider */}
            {/* searchbar */}
            <form onSubmit={handleSearch} className="join flex justify-center">
                <input type='text' name='tag' className="input input-bordered join-item" placeholder="Search Tag here..." />
                <button className="btn join-item input-bordered">Search</button>
            </form>
            <PageTitle title='All Products' />
            {/* cards */}
            <div>
                <ProductsList products={products} lgCols={4}></ProductsList>
            </div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                ></Pagination>
            </div>


        </div>
    );
};

export default Products;