import { useAuth } from '@/context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const UserGuard = () => {
    const { user } = useAuth();

    if (user && user?.role === 'user') {
        return <Outlet />
    }

    if (!user || user === null) {
        return <Navigate to='/login' replace={true} />
    }
}

export default UserGuard