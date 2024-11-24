import EditActivityForm from '@/components/forms/activities-form/ActivityFormEdit/EditActivity';
import { TableCell, TableRow } from '@/components/ui/table';
import { Activity } from '@/types/activity-types/activityTypes';

type ActivitiesCardProps = {
    activities: Activity[];
};

const ActivitiesCard = ({ activities }: ActivitiesCardProps) => {
    return (
        <>
            {activities.map((activity) => (
                <TableRow key={activity.id}>
                    <TableCell className='font-semibold'>
                        {activity.name}
                    </TableCell>
                    <TableCell className='text-end w-[200px]'>
                        <EditActivityForm
                            activity={activity}
                            activityId={activity.id!}
                        />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default ActivitiesCard;
