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
import { useCallback, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/components/hooks/custom-hooks/useDebounce';

const ActivitiesTableBody = () => {
    const { itemsLimit, page, setSearchParams } = useSearchParamsHook();
    const [search, setSearch] = useState('');
    const debounceSearchTerm = useDebounce(search, 300);

    const { data: activities, isPending, isError } = useGetPaginatedData<Activity>({
        URL: '/activities',
        queryKey: ['activities', page, debounceSearchTerm],
        limit: itemsLimit,
        page,
        search: debounceSearchTerm
    });

    const totalPages: number | undefined = activities?.totalPages;

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearch(newSearchTerm);
        setSearchParams(prev => {
            const updatedParams = new URLSearchParams(prev);
            if (newSearchTerm) {
                updatedParams.set('q', newSearchTerm);
            } else {
                updatedParams.delete('q');
            }
            updatedParams.set('page', '1');
            return updatedParams;
        });
    }, [setSearchParams]);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryParam = searchParams.get('q') || '';
        setSearch(queryParam);
    }, []);

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