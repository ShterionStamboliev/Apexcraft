import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import UsersLoader from '@/components/utils/SkeletonLoader/Users/UsersLoader';
import useUsersQuery from '@/components/api/users/usersQuery';
import EditUserForm from '@/components/forms/user-form/UserFormEdit/EditUser';
import { CircleAlert, Users } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';

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
        <TableBody>
            {users.length === 0 ? (
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
                users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>
                            {user.name_and_family}
                        </TableCell>
                        <TableCell className='text-center'>
                            {user.username}
                        </TableCell>
                        <TableCell className="text-end w-[200px]">
                            <EditUserForm
                                user={user}
                                userId={user.id!}
                            />
                        </TableCell>
                    </TableRow>
                )))
            }
        </TableBody>
    );
};

export default UsersTableBody