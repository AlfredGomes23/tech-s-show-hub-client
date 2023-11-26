
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
            dashboard
            <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;