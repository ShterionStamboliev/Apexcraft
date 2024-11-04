import CreateUser from '@/components/forms/user-form/UserFormCreate/CreateUser';
import UsersTableBody from './UsersTableBody';

const UsersTable = () => {
    return (
        <div className="flex flex-col flex-1 pr-2 py-8 items-center md:px-0">
            <div className='w-full mb-4'>
                <CreateUser />
            </div>
            <UsersTableBody />
        </div>
    );
};

export default UsersTable;