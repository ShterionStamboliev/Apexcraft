import CreateUser from '@/components/forms/user-form/UserFormCreate/CreateUser';
import { Table } from "../../ui/table"
import UsersHeader from './UserTableElements/TableHeader/TableHeader';
import UsersTableBody from './UsersTableBody';

const UsersTable = () => {
    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <CreateUser />
                <Table className='w-full min-w-full'>
                    <UsersHeader />
                    <UsersTableBody />
                </Table>
            </div>
        </div>
    );
};

export default UsersTable;