import CreateUser from '@/components/forms/user-form/UserFormCreate/CreateUser';
import { Table } from "../../ui/table"
import { Suspense, lazy, useState } from 'react';
import UsersHeader from './UserTableElements/TableHeader/TableHeader';
import { useUser } from '@/context/User/UserContext';
import { User } from '@/types/user-types/userTypes';
import UsersLoader from '@/components/utils/SkeletonLoader/Users/UsersLoader';
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter';
import TableTopNavigation from '@/components/common/SearchBar/TableTopNavigation';

const UsersTableBody = lazy(() => import('@/components/tables/UsersTable/UsersTableBody'));

const UsersTable = () => {
    const { state } = useUser();
    const [searchQuery, setSearchQuery] = useState<string>('')
    const filteredData = useSearchFilter<User>(state.data, searchQuery);

    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <TableTopNavigation
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    Component={CreateUser}
                />
                <Table className='w-full min-w-full'>
                    <UsersHeader />
                    <Suspense fallback={<UsersLoader />}>
                        <UsersTableBody
                            filteredData={filteredData}
                        />
                    </Suspense>
                </Table>
            </div>
        </div>
    );
};

export default UsersTable;