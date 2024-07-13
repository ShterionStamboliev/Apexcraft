import { TableBody } from "../../../ui/table"
import MeasuresSkeleton from './MeasuresSkeleton'

const MeasuresLoader = () => {
    return (
        <TableBody>
            {Array.from({ length: 7 }).map((_, i) => (
                <MeasuresSkeleton key={i} />
            ))}
        </TableBody>
    )
}

export default MeasuresLoader