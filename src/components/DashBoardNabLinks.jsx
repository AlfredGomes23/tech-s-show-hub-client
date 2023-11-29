
import { NavLink } from 'react-router-dom';

const DashBoardNabLinks = () => {
    return (
        <>
        <li><NavLink to='/dashboard/my-profile'>My Profile</NavLink></li>
        <li><NavLink to='/dashboard/add-product'>Add Product</NavLink></li>
        <li><NavLink to='/dashboard/my-products'>My Products</NavLink></li>
        </>
    );
};

export default DashBoardNabLinks;