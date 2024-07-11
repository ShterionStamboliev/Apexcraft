import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutHomepage from './components/layouts/Home/LayoutHomepage';
import UserLoginForm from './components/forms/user-form/UserFormLogin/UserLoginForm';
import LayoutLoginForm from './components/layouts/Login/LayoutLoginForm';
import RouteGuard from './components/guards/RouteGuard';
import LayoutUsersTable from './components/layouts/Table/LayoutUsersTable';
import UsersTablePage from './components/pages/UsersTablePage';
import Homepage from './components/pages/Homepage';
import ActivitiesTablePage from './components/pages/ActivitiesTablePage';
import MeasuresTablePage from './components/pages/MeasuresTablePage';
import ProjectsTablePage from './components/pages/ProjectsTablePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<RouteGuard />}>
                <Route
                    path='/users'
                    element={
                        <LayoutUsersTable>
                            <UsersTablePage />
                        </LayoutUsersTable>
                    }
                />
                <Route
                    path='/activities'
                    element={
                        <LayoutUsersTable>
                            <ActivitiesTablePage />
                        </LayoutUsersTable>
                    }
                />
                <Route
                    path='/measures'
                    element={
                        <LayoutUsersTable>
                            <MeasuresTablePage />
                        </LayoutUsersTable>
                    }
                />
                <Route
                    path='/projects'
                    element={
                        <LayoutUsersTable>
                            <ProjectsTablePage />
                        </LayoutUsersTable>
                    }
                />
                <Route
                    path='/'
                    element={
                        <LayoutHomepage>
                            <Homepage />
                        </LayoutHomepage>
                    }
                />
            </Route>

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