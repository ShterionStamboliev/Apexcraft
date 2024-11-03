import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import UsersLoader from '@/components/utils/SkeletonLoader/Users/UsersLoader';
import useUsersQuery from '@/components/api/users/usersQuery';
import { CircleAlert, Users } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import UsersCard from './UsersCard';
import UsersHeader from './UserTableElements/TableHeader/TableHeader';

const UsersTableBody = () => {
    const { useGetUsers } = useUsersQuery();
    const { data: users, isPending, isError, error } = useGetUsers();

    if (isPending) {
        return <UsersLoader />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
            Icon={CircleAlert}
        />
    };

    return (
        <Table className='w-full min-w-full'>
            <UsersHeader />
            <TableBody>
                {
                    users.length === 0 ? (
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
    );
};

export default UsersTableBody