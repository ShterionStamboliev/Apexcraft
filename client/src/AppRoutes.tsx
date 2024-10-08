import { Navigate, Route, Routes } from 'react-router-dom';
import UserLoginForm from './components/forms/user-form/UserFormLogin/UserLoginForm';
import LayoutLoginForm from './components/layouts/Login/LayoutLoginForm';
import LayoutUsersTable from './components/layouts/Table/LayoutUsersTable';
import UsersTablePage from './components/pages/UsersTablePage';
import Homepage from './components/pages/Homepage';
import ActivitiesTablePage from './components/pages/ActivitiesTablePage';
import MeasuresTablePage from './components/pages/MeasuresTablePage';
import ProjectsTablePage from './components/pages/ProjectsTablePage';
import CompaniesTablePage from './components/pages/CompaniesTablePage';
import ArtisansTablePage from './components/pages/ArtisansTablePage';
import ProjectTasksPage from './components/pages/ProjectTasksPage';
import TaskEditPage from './components/pages/TaskEditPage';
import UserProjects from './components/pages/UserProjects';
import UserGuard from './components/guards/UserGuard';
import ManagerGuard from './components/guards/ManagerGuard';

const AppRoutes = () => {
    return (
        <Routes>
            {/*Manager/admin only routes */}
            <Route element={<ManagerGuard />}>
                <Route
                    path='/users'
                    element={
                        <LayoutUsersTable>
                            <UsersTablePage />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/artisans'
                    element={
                        <LayoutUsersTable>
                            <ArtisansTablePage />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/companies'
                    element={
                        <LayoutUsersTable>
                            <CompaniesTablePage />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/activities'
                    element={
                        <LayoutUsersTable>
                            <ActivitiesTablePage />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/measures'
                    element={
                        <LayoutUsersTable>
                            <MeasuresTablePage />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/projects'
                    element={
                        <LayoutUsersTable>
                            <ProjectsTablePage />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/projects/:id/tasks'
                    element={
                        <LayoutUsersTable>
                            <ProjectTasksPage />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/projects/:id/tasks/:taskId/edit'
                    element={
                        <LayoutUsersTable>
                            <TaskEditPage />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            {/*Manager/admin only routes */}


            {/* User only routes */}
            <Route element={<UserGuard />}>
                <Route
                    path='/my-projects'
                    element={
                        <LayoutUsersTable>
                            <UserProjects />
                        </LayoutUsersTable>
                    }
                />
            </Route>
            {/* User only routes */}

            {/* Public routes */}
            <Route
                path='/login'
                element={
                    <LayoutLoginForm>
                        <UserLoginForm />
                    </LayoutLoginForm>
                }
            />
            <Route
                path='/'
                element={
                    <LayoutUsersTable>
                        <Homepage />
                    </LayoutUsersTable>
                }
            />
            <Route
                path='*'
                element={
                    <Navigate to='/' />
                }
            />
            {/* Public routes */}
        </Routes>
    )
}

export default AppRoutes;