import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { CircleAlert, ContactRound } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import ArtisansCard from './ArtisansCard';
import ArtisansHeader from './ArtisansTableElements/ArtisansHeader/ArtisansHeader';
import Pagination from '@/components/common/Pagination/Pagination';
import useSearchParamsHook from '@/components/hooks/custom-hooks/useSearchParamsHook';
import { useGetPaginatedData } from '@/components/hooks/custom-hooks/useQueryHook';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import ArtisansLoader from '@/components/utils/SkeletonLoader/Artisans/ArtisansLoader';
import useSearchHandler from '@/components/hooks/custom-hooks/useSearchHandler';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import CreateArtisan from '@/components/forms/artisans-form/ArtisanFormCreate/CreateArtisan';

const ArtisansTableBody = () => {
    const { setSearchParams, itemsLimit, page } = useSearchParamsHook();

    const { search, handleSearch, debounceSearchTerm } = useSearchHandler({ setSearchParams });

    const { data: artisans, isPending, isError } = useGetPaginatedData<Artisan>({
        URL: '/artisans',
        queryKey: ['artisans'],
        limit: itemsLimit,
        page,
        search: debounceSearchTerm,
    });

    const totalPages: number | undefined = artisans?.totalPages;

    if (isPending) {
        return <ArtisansLoader artisans={artisans} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            Icon={CircleAlert}
        />
    };

    return (
        <div className='flex flex-col flex-1 py-8 items-center md:px-0'>
            <div className='flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-4 w-full mb-4 md:w-2/3 justify-between'>
                <SearchBar
                    handleSearch={handleSearch}
                    placeholder='Search artisans...'
                    search={search}
                />
                <CreateArtisan />
            </div>
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
        </div>
    )
}

export default ArtisansTableBody