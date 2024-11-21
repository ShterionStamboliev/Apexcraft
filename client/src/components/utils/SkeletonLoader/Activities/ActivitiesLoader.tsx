import { PaginatedActivities } from '@/types/activity-types/activityTypes'
import { Table, TableBody } from "../../../ui/table"
import ActivitiesSkeleton from './ActivitiesSkeleton'
import ActivitiesHeader from '@/components/tables/ActivitiesTable/ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader';

type ActivitiesProps = {
    activity: PaginatedActivities | undefined;
}

const ActivitiesLoader = ({ activity }: ActivitiesProps) => {
    const activitiesCount = activity ? activity.data.length : 10;

    return (
        <Table className='w-full min-w-full'>
            <ActivitiesHeader />
            <TableBody>
                {
                    Array.from({ length: activitiesCount }).map((_, i) => (
                        <ActivitiesSkeleton key={i} />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default ActivitiesLoader