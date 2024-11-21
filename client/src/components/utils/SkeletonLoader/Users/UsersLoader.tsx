import { User } from '@/types/user-types/userTypes';
import { Table, TableBody } from "../../../ui/table"
import UsersSkeleton from './UsersSkeleton';
import UsersHeader from '@/components/tables/UsersTable/UserTableElements/TableHeader/TableHeader';

type UsersProps = {
    users: User[] | undefined;
}

const UsersLoader = ({ users }: UsersProps) => {
    const usersLength = users ? users.length : 10;

    return (
        <Table className='w-full min-w-full'>
            <UsersHeader />
            <TableBody>
                {
                    Array.from({ length: usersLength }).map((_, i) => (
                        <UsersSkeleton key={i} />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default UsersLoader