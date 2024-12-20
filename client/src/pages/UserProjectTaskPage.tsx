import Sidebar from '../components/Sidebar/Sidebar';
import UserProjectTaskTableBody from '../components/Tables/UserProjectTaskTable/UserProjectTaskTableBody';

const UserProjectTaskPage = () => {
    return (
        <div className='flex md:gap-60 min-h-screen'>
            <Sidebar />

            <div className='flex flex-col w-full overflow-x-auto md:gap-8'>
                <UserProjectTaskTableBody />
            </div>
        </div>
    );
};

export default UserProjectTaskPage;
