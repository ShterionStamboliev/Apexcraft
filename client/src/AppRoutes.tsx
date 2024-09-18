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
import CompaniesTablePage from './components/pages/CompaniesTablePage';
import ArtisansTablePage from './components/pages/ArtisansTablePage';
import ProjectTasksPage from './components/pages/ProjectTasksPage';
import CreateTaskForm from './components/forms/tasks-form/TaskFormCreate/CreateTask';

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
                    path='/artisans'
                    element={
                        <LayoutUsersTable>
                            <ArtisansTablePage />
                        </LayoutUsersTable>
                    }
                />
                <Route
                    path='/companies'
                    element={
                        <LayoutUsersTable>
                            <CompaniesTablePage />
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
                    path='/projects/:id/tasks'
                    element={
                        <LayoutUsersTable>
                            <ProjectTasksPage />
                        </LayoutUsersTable>
                    }
                />
                <Route
                    path='/projects/:id/create-task'
                    element={
                        <LayoutUsersTable>
                            <CreateTaskForm />
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