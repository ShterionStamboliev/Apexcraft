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

const UsersTableBody = () => {
    const { itemsLimit, page, setSearchParams } = useSearchParamsHook();

    const { data: users, isPending, isError, error } = useGetPaginatedData<User>({
        URL: '/users',
        queryKey: ['users', page],
        limit: itemsLimit,
        page
    });

    const totalPages: number | undefined = users?.totalPages;

    if (isPending) {
        return <UsersLoader users={users!} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
            Icon={CircleAlert}
        />
    };

    return (
        <>
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