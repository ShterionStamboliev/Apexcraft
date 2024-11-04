import { User } from '@/types/user-types/userTypes';
import { Table, TableBody } from "../../../ui/table"
import UsersSkeleton from './UsersSkeleton';
import UsersHeader from '@/components/tables/UsersTable/UserTableElements/TableHeader/TableHeader';

type UsersProps = {
    users: User[];
}

const UsersLoader = ({ users }: UsersProps) => {
    return (
        <Table className='w-full min-w-full'>
            <UsersHeader />
            <TableBody>
                {users && Array.from({ length: users.length }).map((_, i) => (
                    <UsersSkeleton key={i} />
                ))
                }
            </TableBody>
        </Table>
    )
}

export default UsersLoader