import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useArtisansQuery from '@/components/api/artisans/artisansQuery';
import { CircleAlert, ContactRound } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ArtisansCard from './ArtisansCard';
import ArtisansHeader from './ArtisansTableElements/ArtisansHeader/ArtisansHeader';
import Pagination from '@/components/common/Pagination/Pagination';
import useSearchParamsHook from '@/components/hooks/custom-hooks/useSearchParamsHook';

const ArtisansTableBody = () => {
    const { setSearchParams, itemsLimit, page } = useSearchParamsHook();

    const { useGetArtisans } = useArtisansQuery();
    const { data: artisans, isPending, isError, error } = useGetArtisans(page, itemsLimit);

    const totalPages: number | undefined = artisans?.totalPages;

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
                <ArtisansHeader />
                <TableBody>
                    {
                        artisans.data.length === 0 ?
                            (
                                <TableRow>
                                    <TableCell colSpan={2} className='text-center text-3xl'>
                                        <NoResultsFound
                                            title='No artisans found'
                                            description="It looks like you haven't added any artisans yet."
                                            Icon={ContactRound}
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                <ArtisansCard
                                    artisans={artisans}
                                />
                            )
                    }
                </TableBody>
            </Table>
            <Pagination
                page={page}
                setSearchParams={setSearchParams}
                totalPages={totalPages}
            />
        </>
    )
}

export default ArtisansTableBody