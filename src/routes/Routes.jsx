import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Error404 from "../pages/error404";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import PrivateRoutes from "./PrivateRoutes";
import AddProduct from "../pages/AddProduct";
import MyProfile from "../pages/MyProfile";
import MyProducts from "../pages/MyProducts";

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement: <Error404></Error404>,
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'products',
                element: <Products></Products>,
                loader: () => fetch('http://localhost:5000/productsCount')
            },
            {
                path: 'product/:id',
                element:
                    <PrivateRoutes>
                        <ProductDetails></ProductDetails>
                    </PrivateRoutes>
            },
        ]
    },
    {
        path: '/dashboard',
        element:
            <PrivateRoutes>
                <DashboardLayout></DashboardLayout>
            </PrivateRoutes>,
        children: [
            //user routes
            {
                path: 'add-product',
                element:
                    <AddProduct></AddProduct>
            },
            {
                path: 'my-profile',
                element:
                    <MyProfile></MyProfile>
            },
            {
                path: 'my-products',
                element:
                    <MyProducts></MyProducts>
            },
            //Moderator
            // {
            //     path: 'my-profile',
            //     element:
            //         <MyProfile></MyProfile>
            // },
        ]
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: 'register',
        element: <Register></Register>
    },
]);
export default routes;