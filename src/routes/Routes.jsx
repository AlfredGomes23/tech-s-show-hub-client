import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Error404 from "../pages/error404";
import DashboardLayout from "../layout/DashboardLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

const routes = createBrowserRouter([
    {
        path: "/",
        errorElement:<Error404></Error404>,
        element: <MainLayout></MainLayout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            {
                path: '',
                element:<Home></Home>
            },
        ]
    },
    {
        path:'/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children:[
            {
                path:'',
                element:''
            }
        ]
    },
    {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'/register',
        element:<Register></Register>
    }
]);
export default routes;