import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials:true
})

const useAxiosSecure = () => {
    //intercept request to add token
    axiosSecure.interceptors.request.use(config => {
        //get and set token in config
        // console.log(config, localStorage.getItem('access_key'));
        config.headers.authorization = `Bearer ${localStorage.getItem('access_key')}`
        return config;
    }, error => {
        console.log(error);
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;