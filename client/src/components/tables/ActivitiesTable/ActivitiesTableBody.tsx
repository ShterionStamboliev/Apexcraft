import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import { CircleAlert, Activity as ActivityIcon } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ActivitiesCard from './ActivitiesCard';
import ActivitiesHeader from './ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader';
import Pagination from '@/components/common/Pagination/Pagination';
import useSearchParamsHook from '@/components/hooks/custom-hooks/useSearchParamsHook';
import { useGetPaginatedData } from '@/components/hooks/custom-hooks/useQueryHook';
import { Activity } from '@/types/activity-types/activityTypes';
import { Input } from '@/components/ui/input';
import useSearchHandler from '@/components/hooks/custom-hooks/useSearchHandler';

const ActivitiesTableBody = () => {
    const { itemsLimit, page, setSearchParams } = useSearchParamsHook();

    const { search, handleSearch, debounceSearchTerm } = useSearchHandler({ setSearchParams });

    const { data: activities, isPending, isError } = useGetPaginatedData<Activity>({
        URL: '/activities',
        queryKey: ['activities', page, debounceSearchTerm],
        limit: itemsLimit,
        page,
        search: debounceSearchTerm
    });

    const totalPages: number | undefined = activities?.totalPages;

    if (isPending) {
        return <ActivitiesLoader activity={activities} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            Icon={CircleAlert}
        />
    };

    return (
        <>
            <div className='mb-4'>
                <Input
                    type="text"
                    placeholder="Search activities..."
                    value={search}
                    onChange={handleSearch}
                    className="max-w-sm"
                />
            </div>
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
                                            Icon={ActivityIcon}
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
            <Pagination
                setSearchParams={setSearchParams}
                page={page}
                totalPages={totalPages}
            />
        </>
    )
}

export default ActivitiesTableBody