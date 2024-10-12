import UserProjectsTableBody from './UserProjectsTableBody';

const UserProjectsTable = () => {
    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex flex-row flex-wrap gap-5'>
                    <UserProjectsTableBody />
                </div>
            </div>
        </div>
    );
};

export default UserProjectsTable;