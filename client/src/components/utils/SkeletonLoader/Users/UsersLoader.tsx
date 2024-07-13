import { TableBody } from "../../../ui/table"
import UsersSkeleton from './UsersSkeleton';

const UsersLoader = () => {
    return (
        <TableBody>
            {Array.from({ length: 7 }).map((_, i) => (
                <UsersSkeleton key={i} />
            ))}
        </TableBody>
    )
}

export default UsersLoader