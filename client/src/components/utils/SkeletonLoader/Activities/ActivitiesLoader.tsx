import { TableBody } from "../../../ui/table"
import ActivitiesSkeleton from './ActivitiesSkeleton'

const ActivitiesLoader = () => {
    return (
        <TableBody>
            {Array.from({ length: 7 }).map((_, i) => (
                <ActivitiesSkeleton key={i} />
            ))}
        </TableBody>
    )
}

export default ActivitiesLoader