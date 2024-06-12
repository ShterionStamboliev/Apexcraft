import {
    TableHeader,
    TableRow,
    TableHead
} from "@/components/ui/table"
import { UsersTableHeaderProps } from "@/types/table-types/userTableTypes"

const UsersTableHeader = (
    {
        username,
        name_and_family,
        status,
        role
    }: UsersTableHeaderProps) => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead>
                    {username}
                </TableHead>
                <TableHead>
                    {name_and_family}
                </TableHead>
                <TableHead>
                    {status}
                </TableHead>
                <TableHead>
                    {role}
                </TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default UsersTableHeader