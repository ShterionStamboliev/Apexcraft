import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import UsersLoader from '@/components/utils/SkeletonLoader/Users/UsersLoader';
import useUsersQuery from '@/components/api/users/usersQuery';
import EditUserForm from '@/components/forms/user-form/UserFormEdit/EditUser';

const UsersTableBody = () => {
    const { useGetUsers } = useUsersQuery();
    const { data: users, isPending, isError, error } = useGetUsers();

    if (isPending) {
        return <UsersLoader />
    };

    if (isError) {
        return <div>Error: {error.message}</div>
    };

    return (
        <>
            <TableBody>
                {users.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={3} className='text-center text-3xl'>
                            No results found
                        </TableCell>
                    </TableRow>
                ) : (users.map((user) => (
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
                )))}
            </TableBody>
        </>
    );
};

export default UsersTableBody