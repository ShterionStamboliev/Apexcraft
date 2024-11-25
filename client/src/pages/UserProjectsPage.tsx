import Sidebar from '../components/Sidebar/Sidebar';
import UserProjectsTable from '../components/Tables/UserProjectsTable/UserProjectsTable';

const UserProjectsPage = () => {
    return (
        <div className='flex md:gap-60 min-h-screen'>
            <Sidebar />

            <div className='flex-1 flex px-2 md:gap-8'>
                <UserProjectsTable />
            </div>
        </div>
    );
};

export default UserProjectsPage;
