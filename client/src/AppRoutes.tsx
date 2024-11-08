import { Navigate, Route, Routes } from 'react-router-dom';
import UserLoginForm from './components/forms/user-form/UserFormLogin/UserLoginForm';
import TableLayout from './components/layouts/Table/TableLayout';
import UsersTablePage from './components/pages/UsersTablePage';
import Homepage from './components/pages/Homepage';
import ActivitiesTablePage from './components/pages/ActivitiesTablePage';
import MeasuresTablePage from './components/pages/MeasuresTablePage';
import ProjectsTablePage from './components/pages/ProjectsTablePage';
import CompaniesTablePage from './components/pages/CompaniesTablePage';
import ArtisansTablePage from './components/pages/ArtisansTablePage';
import ProjectTasksPage from './components/pages/ProjectTasksPage';
import TaskEditPage from './components/pages/TaskEditPage';
import UserGuard from './components/guards/UserGuard';
import ManagerGuard from './components/guards/ManagerGuard';
import UserProjectsPage from './components/pages/UserProjectsPage';
import UserProjectTaskPage from './components/pages/UserProjectTaskPage';

const AppRoutes = () => {
    return (
        <Routes>
            {/*Manager/admin only routes */}
            <Route element={<ManagerGuard />}>
                <Route
                    path='/users'
                    element={
                        <TableLayout>
                            <UsersTablePage />
                        </TableLayout>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/artisans'
                    element={
                        <TableLayout>
                            <ArtisansTablePage />
                        </TableLayout>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/companies'
                    element={
                        <TableLayout>
                            <CompaniesTablePage />
                        </TableLayout>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/activities'
                    element={
                        <TableLayout>
                            <ActivitiesTablePage />
                        </TableLayout>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/measures'
                    element={
                        <TableLayout>
                            <MeasuresTablePage />
                        </TableLayout>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/projects'
                    element={
                        <TableLayout>
                            <ProjectsTablePage />
                        </TableLayout>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/projects/:id/tasks'
                    element={
                        <TableLayout>
                            <ProjectTasksPage />
                        </TableLayout>
                    }
                />
            </Route>
            <Route element={<ManagerGuard />}>
                <Route
                    path='/projects/:id/tasks/:taskId/edit'
                    element={
                        <TableLayout>
                            <TaskEditPage />
                        </TableLayout>
                    }
                />
            </Route>
            {/*Manager/admin only routes */}


            {/* User only routes */}
            <Route element={<UserGuard />}>
                <Route
                    path='/my-projects'
                    element={
                        <TableLayout>
                            <UserProjectsPage />
                        </TableLayout>
                    }
                />
            </Route>
            <Route element={<UserGuard />}>
                <Route
                    path='/my-projects/:taskId/task'
                    element={
                        <TableLayout>
                            <UserProjectTaskPage />
                        </TableLayout>
                    }
                />
            </Route>
            {/* User only routes */}

            {/* Public routes */}
            <Route
                path='/login'
                element={
                    <UserLoginForm />
                }
            />
            <Route
                path='/'
                element={
                    <TableLayout>
                        <Homepage />
                    </TableLayout>
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