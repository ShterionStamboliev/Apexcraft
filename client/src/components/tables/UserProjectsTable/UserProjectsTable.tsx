import UserProjectsTableBody from './UserProjectsTableBody';

const UserProjectsTable = () => {
    return (
        <div className='flex flex-col flex-1 py-8 md:px-0'>
            <div className='flex-1 pr-7 overflow-x-auto md:gap-60'>
                <div className='flex flex-row flex-wrap gap-5'>
                    <UserProjectsTableBody />
                </div>
            </div>
        </div>
    );
};

export default UserProjectsTable;
