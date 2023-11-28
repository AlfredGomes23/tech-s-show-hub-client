import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "../hooks/useAxiosSecure";
import ProductsList from '../components/ProductsList';
import Pagination from '../components/Pagination';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';


const Products = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const { count } = useLoaderData();
    const perPage = 20;
    const totalPage = parseInt(count / perPage) + 1;

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', currentPage, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?page=${currentPage}&limit=${perPage}&search=${search}`);
            return res.data;
        }
    });

    // console.log(products);


    //search
    const handleSearch = e => {
        e.preventDefault();

        const tag = e.target.tag.value;
        setSearch(tag);
    }

    //loading
    if (isLoading) return <div className=' flex justify-center items-center text-center mx-auto'>
        <p className='text-3xl text-warning'>Loading <span className="loading loading-bars loading-md"></span></p>
    </div>;

    return (
        <div>
            {/* TODO: add slider */}
            <div className='flex justify-between px-20 flex-col md:flex-row items-center'>
                <h1 className='text-3xl text-center'>All Products</h1>
                {/* search bar */}
                <form onSubmit={handleSearch} className="join flex justify-center">
                    <input type='text' name='tag' className="input input-bordered join-item" placeholder="Search Tag here..." />
                    <button className="btn join-item input-bordered">Search</button>
                </form></div>
            <div className="divider"></div>

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