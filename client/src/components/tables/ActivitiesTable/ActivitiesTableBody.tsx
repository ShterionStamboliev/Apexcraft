import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useActivitiesQuery from '@/components/api/activities/activitiesQuery';
import { Activity, CircleAlert } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ActivitiesCard from './ActivitiesCard';
import ActivitiesHeader from './ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader';
import Paginator from './Pagination';
import { useState } from 'react';

const ActivitiesTableBody = () => {
    const [page, setPage] = useState<number>(1);
    const itemsLimit: number = 10;

    const { useGetActivities } = useActivitiesQuery();
    const { data: activities, isPending, isError, error } = useGetActivities(page, itemsLimit);

    const totalPages: number | undefined = activities?.totalPages;

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
            <Table className='w-full min-w-full'>
                <ActivitiesHeader />
                <TableBody>
                    {
                        activities?.data.length === 0 ?
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
            </Table>
            <Paginator
                setPage={setPage}
                totalPages={totalPages}
            />
        </>
    )
}

export default ActivitiesTableBody