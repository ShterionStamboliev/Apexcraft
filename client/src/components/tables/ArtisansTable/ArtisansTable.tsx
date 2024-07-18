import { Table } from '@/components/ui/table'
import { Suspense, lazy, useState } from 'react'
import FilterDropdown from '@/components/common/Filter/FilterDropdown';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter';
import { useArtisan } from '@/context/Artisan/ArtisanContext';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import CreateArtisan from '@/components/forms/artisans-form/ArtisanFormCreate/CreateArtisan';
import ArtisansHeader from './ArtisansTableElements/ArtisansHeader/ArtisansHeader';

const ArtisansTableBody = lazy(() => import('@/components/tables/ArtisansTable/ArtisansTableBody'));

const ArtisansTable = () => {
    const { state } = useArtisan();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const filteredData = useSearchFilter<Artisan>(state.data, searchQuery);

    return (
        <div className="flex flex-1 py-8 overflow-x-auto md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex gap-24 md:gap-34'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className='flex gap-4'>
                        <FilterDropdown />
                        <CreateArtisan />
                    </div>
                </div>
                <Table className='w-full min-w-full'>
                    <ArtisansHeader />
                    <Suspense fallback={<ActivitiesLoader />}>
                        <ArtisansTableBody
                            filteredData={filteredData}
                        />
                    </Suspense>
                </Table>
            </div>
        </div>
    )
};

export default ArtisansTable