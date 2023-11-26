import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const useAuth = () => {
    const auths = useContext(AuthContext);
    return auths;
};

export default useAuth;