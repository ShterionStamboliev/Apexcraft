import EditUserForm from '@/components/forms/user-form/UserFormEdit/EditUser';
import { TableCell, TableRow } from '@/components/ui/table';
import { PaginatedUsers } from '@/types/user-types/userTypes'

type UsersCardProps = {
    users: PaginatedUsers;
}

const UsersCard = ({ users }: UsersCardProps) => {
    return (
        <>
            {
                users.data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className='font-semibold'>
                            {user.name_and_family}
                        </TableCell>
                        <TableCell className='text-center font-semibold'>
                            {user.username}
                        </TableCell>
                        <TableCell className="text-end font-semibold w-[200px]">
                            <EditUserForm
                                user={user}
                                userId={user.id!}
                            />
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}

export default UsersCard