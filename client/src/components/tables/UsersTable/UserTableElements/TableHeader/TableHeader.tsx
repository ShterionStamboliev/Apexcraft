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
                <TableHead className='w-[200px] text-center'>
                    User
                </TableHead>
                <TableHead className='w-[280px] text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default UsersHeader;