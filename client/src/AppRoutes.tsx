import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutHomepage from './components/layouts/Home/LayoutHomepage';
import Homepage from './components/pages/Homepage';
import UserLoginForm from './components/forms/user-form/UserLoginForm';
import LayoutLoginForm from './components/layouts/Login/LayoutLoginForm';

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <LayoutHomepage>
                        <Homepage />
                    </LayoutHomepage>
                }
            />
            <Route
                path='/login'
                element={
                    <LayoutLoginForm>
                        <UserLoginForm />
                    </LayoutLoginForm>
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