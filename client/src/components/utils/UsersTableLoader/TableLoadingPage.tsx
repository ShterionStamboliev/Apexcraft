import { TableBody } from "../../ui/table"
import SkeletonCard from "./TableSkeletonCard"

import { dummyUsers } from "@/components/tables/HomepageTable/dummyData"

const TableLoadingPage = () => {
    return (
        <TableBody>
            {dummyUsers.map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </TableBody>
    )
}

export default TableLoadingPage