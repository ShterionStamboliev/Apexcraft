import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import UsersLoader from '@/components/utils/SkeletonLoader/Users/UsersLoader';
import { CircleAlert, Users } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import UsersCard from './UsersCard';
import UsersHeader from './UserTableElements/TableHeader/TableHeader';
import useSearchParamsHook from '@/components/hooks/custom-hooks/useSearchParamsHook';
import Pagination from '@/components/common/Pagination/Pagination';
import { User } from '@/types/user-types/userTypes';
import { useGetPaginatedData } from '@/components/hooks/custom-hooks/useQueryHook';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import useSearchHandler from '@/components/hooks/custom-hooks/useSearchHandler';

const UsersTableBody = () => {
    const { itemsLimit, page, setSearchParams } = useSearchParamsHook();

    const { search, handleSearch, debounceSearchTerm } = useSearchHandler({ setSearchParams });

    const { data: users, isPending, isError } = useGetPaginatedData<User>({
        URL: '/users',
        queryKey: ['users'],
        limit: itemsLimit,
        page,
        search: debounceSearchTerm
    });

    const totalPages: number | undefined = users?.totalPages;

    if (isPending) {
        return <UsersLoader users={users} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            Icon={CircleAlert}
        />
    };

    return (
        <>
            <SearchBar
                handleSearch={handleSearch}
                placeholder='Search users...'
                search={search}
            />
            <Table className='w-full min-w-full'>
                <UsersHeader />
                <TableBody>
                    {
                        users?.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className='text-center text-3xl'>
                                    <NoResultsFound
                                        title='No users found'
                                        description="It looks like you haven't added any users yet."
                                        Icon={Users}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <UsersCard
                                users={users}
                            />
                        )
                    }
                </TableBody>
            </Table>
            <Pagination
                setSearchParams={setSearchParams}
                page={page}
                totalPages={totalPages}
            />
        </>
    );
};

export default UsersTableBody