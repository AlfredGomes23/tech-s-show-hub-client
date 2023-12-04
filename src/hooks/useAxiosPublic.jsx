import axios from 'axios';


const axiosPublic = axios.create({
    baseURL: 'https://server-techs-show-hub.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;