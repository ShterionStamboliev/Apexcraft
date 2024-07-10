import CreateUser from '@/components/forms/user-form/UserFormCreate/CreateUser';
import { Table } from "../../ui/table"
import { Suspense, lazy } from 'react';
import TableLoadingPage from '@/components/utils/UsersTableLoader/TableLoadingPage';
import UsersHeader from './UserTableElements/TableHeader/TableHeader';

const UsersTableBody = lazy(() => import('@/components/tables/UsersTable/UsersTableBody'));

const UsersTable = () => {
    return (
        <div className="flex flex-1 gap-2 py-8 overflow-x-auto md:px-0">

            <CreateUser />
            <div className='flex-1 pr-12 overflow-x-auto'>

                <Table className='w-full min-w-full'>
                    <UsersHeader />

                    <Suspense fallback={<TableLoadingPage />}>
                        <UsersTableBody />
                    </Suspense>
                </Table>
            </div>
        </div>
    );
};

export default UsersTable;