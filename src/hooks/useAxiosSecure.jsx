import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const axiosSecure = axios.create({
    baseURL: 'https://server-techs-show-hub.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    //intercept request to add token
    axiosSecure.interceptors.request.use(config => {
        //get and set token in config
        // console.log(config, localStorage.getItem('access_key'));
        config.headers.authorization = `Bearer ${localStorage.getItem('access_key')}`
        return config;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    });

    //intercept response for errors
    axiosSecure.interceptors.response.use(response => response, async error => {
        const status = error?.response?.status;
        if (status === 401 || status === 403) {
            await logOut();
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Access Denied.",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;