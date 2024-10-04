import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useActivitiesQuery from '@/components/api/activities/activitiesQuery';
import EditActivityForm from '@/components/forms/activities-form/ActivityFormEdit/EditActivity';

const ActivitiesTableBody = () => {
    const { useGetActivities } = useActivitiesQuery();
    const { data: activities, isPending, isError, error } = useGetActivities();

    if (isPending) {
        return <ActivitiesLoader />
    };

    if (isError) {
        return <div>Error: {error.message}</div>
    };

    return (
        <>
            <TableBody>
                {activities?.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={2} className='text-center text-3xl'>
                            No results found
                        </TableCell>
                    </TableRow>
                ) : (activities.map((activity) => (
                    <TableRow key={activity.id}>
                        <TableCell>
                            {activity.name}
                        </TableCell>
                        <TableCell className='text-end w-[200px]'>
                            <EditActivityForm
                                activity={activity}
                                activityId={activity.id!}
                            />
                        </TableCell>
                    </TableRow>
                )))}
            </TableBody>
        </>
    )
}

export default ActivitiesTableBody