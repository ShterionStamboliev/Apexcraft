import { PaginatedActivities } from '@/types/activity-types/activityTypes'
import { Table, TableBody } from "../../../ui/table"
import ActivitiesSkeleton from './ActivitiesSkeleton'
import ActivitiesHeader from '@/components/tables/ActivitiesTable/ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader';

type ActivitiesProps = {
    activity: PaginatedActivities;
}

const ActivitiesLoader = ({ activity }: ActivitiesProps) => {
    return (
        <Table className='w-full min-w-full'>
            <ActivitiesHeader />
            <TableBody>
                {
                    activity && Array.from({ length: activity.data.length }).map((_, i) => (
                        <ActivitiesSkeleton key={i} />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default ActivitiesLoader