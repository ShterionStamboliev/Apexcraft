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
        <div className="flex flex-col flex-1 py-8">
            <div className='flex flex-col flex-1 py-8 items-center md:px-0'>
                <div className='flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-4 w-full mb-4 justify-center'>
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
                </div>
            </div>
        </div>
    )
}

export default UsersLoader