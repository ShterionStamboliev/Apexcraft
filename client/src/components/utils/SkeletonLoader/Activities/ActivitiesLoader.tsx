import { Activity } from '@/types/activity-types/activityTypes'
import { Table, TableBody } from "../../../ui/table"
import ActivitiesSkeleton from './ActivitiesSkeleton'
import ActivitiesHeader from '@/components/tables/ActivitiesTable/ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader';
import { PaginatedData } from '@/components/common/Pagination/Pagination';

type ActivitiesProps = {
    activity: PaginatedData<Activity> | undefined;
}

const ActivitiesLoader = ({ activity }: ActivitiesProps) => {
    const activitiesCount = activity ? activity.data.length : 10;

    return (
        <div className="flex flex-col flex-1 py-8">
            <div className='flex flex-col flex-1 py-8 items-center md:px-0'>
                <div className='flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-4 w-full mb-4 justify-center'>
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
                </div>
            </div>
        </div>
    )
}

export default ActivitiesLoader