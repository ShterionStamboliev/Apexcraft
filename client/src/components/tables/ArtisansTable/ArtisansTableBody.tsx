import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { CircleAlert, ContactRound } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ArtisansCard from './ArtisansCard';
import ArtisansHeader from './ArtisansTableElements/ArtisansHeader/ArtisansHeader';
import Pagination from '@/components/common/Pagination/Pagination';
import useSearchParamsHook from '@/components/hooks/custom-hooks/useSearchParamsHook';
import { useGetPaginatedData } from '@/components/hooks/custom-hooks/useFetchQueryHook';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import ArtisansLoader from '@/components/utils/SkeletonLoader/Artisans/ArtisansLoader';

const ArtisansTableBody = () => {
    const { setSearchParams, itemsLimit, page } = useSearchParamsHook();

    const { data: artisans, isPending, isError, error } = useGetPaginatedData<Artisan>('artisans', page, itemsLimit);

    const totalPages: number | undefined = artisans?.totalPages;

    if (isPending) {
        return <ArtisansLoader artisans={artisans!} />
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