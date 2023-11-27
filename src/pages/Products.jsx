import useAuth from "../hooks/useAuth";


const Products = () => {
    const {user} = useAuth();
    console.log(user);
    return (
        <div>
        products    
        </div>
    );
};

export default Products;