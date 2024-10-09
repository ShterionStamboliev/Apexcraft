import EditUserForm from '@/components/forms/user-form/UserFormEdit/EditUser';
import { TableCell, TableRow } from '@/components/ui/table';
import { User } from '@/types/user-types/userTypes'

type UsersCardProps = {
    users: User[];
}

const UsersCard = ({ users }: UsersCardProps) => {
    return (
        <>
            {
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
                ))
            }
        </>
    )
}

export default UsersCard