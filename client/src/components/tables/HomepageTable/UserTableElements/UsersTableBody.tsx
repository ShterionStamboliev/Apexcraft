import { UserTableData } from '@/types/table-types/userTableTypes'
import { Button } from '@/components/ui/button';
import {
    TableBody,
    TableCell,
    TableRow
} from '@/components/ui/table';

type UserTableCellProps = {
    userData: UserTableData;
};

const UsersTableBody = ({ userData }: UserTableCellProps) => {
    return (
        <TableBody>
            {userData.map((user, index) => (
                <TableRow key={index}>
                    <TableCell>
                        {user.id}
                    </TableCell>
                    <TableCell>
                        {user.username}
                    </TableCell>
                    <TableCell>
                        {user.name_and_family}
                    </TableCell>
                    <TableCell>
                        {user.status}
                    </TableCell>
                    <TableCell>
                        {user.role}
                    </TableCell>

                    <TableCell className='text-right w-[300px]'>
                        <Button
                            className="mr-2 hover:bg-zinc-300"
                            variant={'outline'}
                        >
                            Edit
                        </Button>
                        <Button
                            className="mr-2 hover:bg-red-400"
                            variant={'outline'}
                        >
                            Delete
                        </Button>
                        <Button
                            className="mr-2"
                            variant={'outline'}
                        >
                            Deactivate
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default UsersTableBody