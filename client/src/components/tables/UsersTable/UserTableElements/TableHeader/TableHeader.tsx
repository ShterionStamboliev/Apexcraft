import {
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

const UsersHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[250px]'>
                    Name, Surname
                </TableHead>
                <TableHead className='w-[200px]'>
                    User
                </TableHead>
                {/* <TableHead className='w-[150px]'>
                    Role
                </TableHead>
                <TableHead className='w-[150px]'>
                    Status
                </TableHead> */}
                <TableHead className='w-[280px]'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default UsersHeader;