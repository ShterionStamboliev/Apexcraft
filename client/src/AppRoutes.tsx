import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutMain from './layouts/LayoutMain';
import Homepage from './components/Homepage';
import UserLoginForm from './forms/user-form/UserLoginForm';

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <LayoutMain>
                        <Homepage />
                    </LayoutMain>
                }
            />
            <Route
                path='/login'
                element={
                    <LayoutMain>
                        <UserLoginForm />
                    </LayoutMain>
                }
            />
            <Route
                path='*'
                element={
                    <Navigate to='/' />
                }
            />
        </Routes>
    )
}

export default AppRoutes;