import { useAuth } from '@/context/AuthContext'
import { Navigate } from 'react-router-dom'

type RouteGuardProps = {           // In this string[] we can further add more roles,
    allowedRoles: string[];        // or even filter future managers by their names
};                          

const RouteGuard = ({ allowedRoles }: RouteGuardProps) => {
    const { user } = useAuth();

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to='/' replace />
    };
}

export default RouteGuard