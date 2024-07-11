import CreateUser from '@/components/forms/user-form/UserFormCreate/CreateUser';
import { Table } from "../../ui/table"
import { Suspense, lazy, useEffect, useState } from 'react';
import TableLoadingPage from '@/components/utils/UsersTableLoader/TableLoadingPage';
import UsersHeader from './UserTableElements/TableHeader/TableHeader';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import FilterDropdown from '@/components/common/Filter/FilterDropdown';
import { useUser } from '@/context/User/UserContext';
import { FetchUser } from '@/types/user-types/userTypes';

const UsersTableBody = lazy(() => import('@/components/tables/UsersTable/UsersTableBody'));

const UsersTable = () => {
    const { state } = useUser();
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filteredData, setFilteredData] = useState<FetchUser[]>(state.user);

    useEffect(() => {
        const fetchSearchResults = () => {
            if (searchQuery.trim() === '') {
                setFilteredData(state.user);
                return;
            }
            const filterData = state.user.filter((value) => {
                return value.name_and_family
                    .toLowerCase()
                    .includes(searchQuery
                        .toLowerCase());
            });
            setFilteredData(filterData);
        }
        fetchSearchResults();
    }, [searchQuery, state.user]);

    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex gap-24 md:gap-34'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className='flex gap-4'>
                        <FilterDropdown />
                        <CreateUser />
                    </div>
                </div>
                <Table className='w-full min-w-full'>
                    <UsersHeader />
                    <Suspense fallback={<TableLoadingPage />}>
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