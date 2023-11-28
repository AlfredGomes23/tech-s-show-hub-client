/* eslint-disable react/prop-types */

import ProductCard from "./ProductCard";


const ProductsList = ({ products, lgCols }) => {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${lgCols} gap-5 my-5`}>{
            products?.map(product => <ProductCard
                key={product?._id}
                product={product}></ProductCard>)
        }</div>
    );
};

export default ProductsList;