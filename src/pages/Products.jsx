import useAxiosSecure from "../hooks/useAxiosSecure";


const Products = () => {
    const axiosSecure = useAxiosSecure();
     axiosSecure.get('/users')
        .then(r => console.log(r));

    return (
        <div>
            products
        </div>
    );
};

export default Products;