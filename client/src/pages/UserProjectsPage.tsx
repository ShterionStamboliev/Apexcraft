import UserProjectsTableBody from '@/components/Tables/UserProjectsTable/UserProjectsTableBody';
import Sidebar from '../components/Sidebar/Sidebar';

const UserProjectsPage = () => {
    return (
        <div className='flex md:gap-60 min-h-screen'>
            <Sidebar />

            <div className='flex flex-col w-full overflow-x-auto md:gap-8'>
                <UserProjectsTableBody />
            </div>
        </div>
    );
};

export default UserProjectsPage;
