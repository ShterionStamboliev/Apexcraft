import { TableBody } from "../../ui/table"
import TableSkeletonCard from './TableSkeletonCard';

const TableLoadingPage = () => {

    return (
        <TableBody>
            {Array.from({ length: 7 }).map((_, i) => (
                <TableSkeletonCard key={i} />
            ))}
        </TableBody>
    )
}

export default TableLoadingPage