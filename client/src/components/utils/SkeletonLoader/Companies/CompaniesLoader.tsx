import { TableBody } from "../../../ui/table"
import CompaniesSkeleton from './CompaniesSkeleton'

const CompaniesLoader = () => {
    return (
        <TableBody>
            {Array.from({ length: 7 }).map((_, i) => (
                <CompaniesSkeleton key={i} />
            ))}
        </TableBody>
    )
}

export default CompaniesLoader