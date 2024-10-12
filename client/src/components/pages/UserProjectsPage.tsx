import Sidebar from '../Sidebar/Sidebar'
import UserProjectsTable from '../tables/UserProjectsTable/UserProjectsTable';

const UserProjectsPage = () => {
    return (
        <div className="flex gap-2 md:gap-8">
            <Sidebar />

            <UserProjectsTable />
        </div>
    )
}

export default UserProjectsPage