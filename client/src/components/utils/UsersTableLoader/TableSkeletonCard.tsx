import { Skeleton } from "../../ui/skeleton"
import { TableCell, TableRow } from "../../ui/table"

const TableSkeletonCard = () => {
    return (
        <>
            <TableRow>
                <TableCell>
                    <Skeleton className="p-2 h-5 w-4 align-middle" />
                </TableCell>
                <TableCell>
                    <Skeleton className="p-2 h-5 w-24 align-middle" />
                </TableCell>
                <TableCell>
                    <Skeleton className="p-2 h-5 w-28 align-middle" />
                </TableCell>
                <TableCell>
                    <Skeleton className="p-2 h-5 w-14 align-middle" />
                </TableCell>
                <TableCell>
                    <Skeleton className="p-2 h-5 w-16 align-middle" />
                </TableCell>

                <TableCell className='text-right'>
                    <Skeleton className="inline-flex items-center justify-center whitespace-nowrap w-14 h-9 px-4 py-2 mr-2" />
                    <Skeleton className="inline-flex items-center justify-center whitespace-nowrap w-3/12 h-9 px-4 py-2 mr-2" />
                    <Skeleton className="inline-flex items-center justify-center whitespace-nowrap w-24 h-9 px-4 py-2 mr-2" />
                </TableCell>
            </TableRow>
        </>
    )
}

export default TableSkeletonCard