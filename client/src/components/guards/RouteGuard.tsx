import { useAuth } from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const RouteGuard = () => {
    const { user, role, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (user && role === 'мениджър') {
        return <Outlet />
    }

    return <Navigate to='/login' />
}

export default RouteGuard