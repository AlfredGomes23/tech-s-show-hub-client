/* eslint-disable react/prop-types */

import ProductCard from "./ProductCard";


const ProductsList = ({ products, lg, refetch }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${lg} gap-5 my-5`}>{
            products?.map(product => <ProductCard
                key={product?._id}
                id={product?._id}
                product={product}
                refetch={refetch}></ProductCard>)
        }</div>
    );
};

export default ProductsList;