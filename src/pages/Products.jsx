import { useQuery } from '@tanstack/react-query'
import ProductsList from '../components/ProductsList';
import Pagination from '../components/Pagination';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Slider from '../components/Slider';
import useAxiosPublic from '../hooks/useAxiosPublic';


const Products = () => {
    const axiosPublic =  useAxiosPublic()
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const { count } = useLoaderData();
    const perPage = 20;
    const totalPage = parseInt(count / perPage) + 1;

    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', currentPage, search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products?page=${currentPage}&limit=${perPage}&search=${search}`);
            return res.data;
        }
    });
    const { data: trending = [] } = useQuery({
        queryKey: ['trending'],
        queryFn: async () => {
            const t = await axiosPublic('/products/trending');
            return t.data;
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
            <div className='flex justify-between px-20 flex-col md:flex-row items-center'>
                <h1 className='text-3xl text-center'>All Products</h1>
                {/* search bar */}
                <form onSubmit={handleSearch} className="join flex justify-center mb-5">
                    <input type='text' name='tag' className="input input-bordered join-item" placeholder="Search Tag here..." />
                    <button className="btn join-item input-bordered">Search</button>
                </form></div>
            {/* slider */}
            <Slider products={trending}></Slider>
            <div className="divider"></div>

            {/* cards */}
            <div>
                {
                    products?.length === 0 ? <span className="text-warning flex justify-center items-center text-center mx-auto">NO Product Available.</span> :
                    <ProductsList products={products} lg='lg:grid-cols-4' refetch={refetch}></ProductsList>}
            </div>
            {/* pagination */}
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