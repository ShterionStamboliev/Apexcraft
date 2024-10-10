import {
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

const UsersHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='w-[250px] font-bold'>
                    Name, Surname
                </TableHead>
                <TableHead className='w-[200px] font-bold text-center'>
                    User
                </TableHead>
                <TableHead className='w-[280px] font-bold text-end'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default UsersHeader;