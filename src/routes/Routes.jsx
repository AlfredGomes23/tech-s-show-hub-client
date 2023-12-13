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
import UpdateProduct from "../pages/UpdateProduct";
import ReviewQueue from "../pages/Moderator/ReviewQueue";
import ReportedProducts from "../pages/Moderator/ReportedProducts";
import Stats from "../pages/Admin/Stats";
import AllUsers from "../pages/Admin/AllUsers";
import Coupons from "../pages/Admin/Coupons";
import ModeratorRoutes from "./ModeratorRoutes";
import AdminRoutes from "./AdminRoutes";
import UsersRoutes from "./UsersRoutes";

const routes = createBrowserRouter([
    {
        //home routes
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
                loader: () => fetch('https://server-techs-show-hub.vercel.app/productsCount')
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
    //dashboard routes
    {
        path: '/dashboard',
        element:
            <PrivateRoutes>
                <DashboardLayout></DashboardLayout>
            </PrivateRoutes>,
        children: [
            //user routes
            {
                path: 'my-profile',
                element:
                    <MyProfile></MyProfile>
            },
            {
                path: 'add-product',
                element:
                    <UsersRoutes>
                        <AddProduct></AddProduct>
                    </UsersRoutes>
            },
            {
                path: 'my-products',
                element:
                    <UsersRoutes>
                        <MyProducts></MyProducts>
                    </UsersRoutes >
            },
            {
                path: 'update-product/:id',
                element:
                    <UsersRoutes>
                        <UpdateProduct></UpdateProduct>
                    </UsersRoutes >
            },
            //Moderator routes
            {
                path: 'review-products',
                element:
                    <ModeratorRoutes>
                        <ReviewQueue></ReviewQueue>
                    </ModeratorRoutes>
            },
            {
                path: 'reports',
                element:
                    <ModeratorRoutes>
                        <ReportedProducts></ReportedProducts>
                    </ModeratorRoutes>
            },
            //Admin routes
            {
                path: 'stats',
                element:
                    <AdminRoutes>
                        <Stats></Stats>
                    </AdminRoutes>
            },
            {
                path: 'users',
                element:
                    <AdminRoutes>
                        <AllUsers></AllUsers>
                    </AdminRoutes>
            },
            {
                path: 'coupons',
                element:
                    <AdminRoutes>
                        <Coupons></Coupons>
                    </AdminRoutes>
            }
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