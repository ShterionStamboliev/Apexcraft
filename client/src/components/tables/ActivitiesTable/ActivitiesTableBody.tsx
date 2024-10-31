import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useActivitiesQuery from '@/components/api/activities/activitiesQuery';
import { Activity, CircleAlert } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ActivitiesCard from './ActivitiesCard';

const ActivitiesTableBody = () => {
    const { useGetActivities } = useActivitiesQuery();
    const { data: activities, isPending, isError, error } = useGetActivities();

    if (isPending) {
        return <ActivitiesLoader />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
            Icon={CircleAlert}
        />
    };

    return (
        <>
            <TableBody>
                {
                    activities?.length === 0 ?
                        (
                            <TableRow>
                                <TableCell colSpan={2} className='text-center text-3xl'>
                                    <NoResultsFound
                                        title='No activities found'
                                        description="It looks like you haven't added any activities yet."
                                        Icon={Activity}
                                    />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <ActivitiesCard
                                activities={activities}
                            />
                        )
                }
            </TableBody>
        </>
    )
}

export default ActivitiesTableBody