import { useAuth } from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const RouteGuard = () => {
    const { user, role } = useAuth();

    if (!user) {
        return <Navigate to='/login' />;
    }

    if (role === 'manager') {
        return <Outlet />;
    }

    if (role === 'user') {
        return <Outlet />
    }

    return null;
}

export default RouteGuard