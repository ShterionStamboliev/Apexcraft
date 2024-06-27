import { useUser } from '@/context/User/UserContext';
import { TableBody } from "../../ui/table"
import SkeletonCard from "./TableSkeletonCard"

const TableLoadingPage = () => {
    const { state } = useUser();

    return (
        <TableBody>
            {state.user.map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </TableBody>
    )
}

export default TableLoadingPage