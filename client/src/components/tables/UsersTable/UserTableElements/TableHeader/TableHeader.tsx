import {
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

const UsersHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>
                    Name, Surname
                </TableHead>
                <TableHead>
                    User
                </TableHead>
                <TableHead>
                    Role
                </TableHead>
                <TableHead>
                    Status
                </TableHead>
                <TableHead>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default UsersHeader;