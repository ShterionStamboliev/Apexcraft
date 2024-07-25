import { Table } from '@/components/ui/table'
import { Suspense, lazy,  useState } from 'react'
import SearchBar from '@/components/common/SearchBar/SearchBar';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter';
import { useArtisan } from '@/context/Artisan/ArtisanContext';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import CreateArtisan from '@/components/forms/artisans-form/ArtisanFormCreate/CreateArtisan';
import ArtisansHeader from './ArtisansTableElements/ArtisansHeader/ArtisansHeader';
import { Badge } from '@/components/ui/badge';

const ArtisansTableBody = lazy(() => import('@/components/tables/ArtisansTable/ArtisansTableBody'));

const ArtisansTable = () => {
    const { state } = useArtisan();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const filteredData = useSearchFilter<Artisan>(state.data, searchQuery);
    const [activeFilter, setActiveFilter] = useState({
        status: false,
    });

    const handleToggle = () => {
        setTimeout(() => {
            setActiveFilter(prevFilter => ({
                ...prevFilter,
                status: !prevFilter.status,
            }));
        }, 500);
    };

    const filterByStatus = (data: Artisan[], isActiveFilter: boolean) => {
        if (!isActiveFilter) return data;
        return data.filter(artisan => artisan.status === 'active');
    };

    const applyFilter = (data: Artisan[]) => {
        let filteredData = data;

        if (activeFilter.status) {
            filteredData = filterByStatus(filteredData, activeFilter.status);
        };

        return filteredData;
    };

    const finalFilteredData = applyFilter(filteredData);

    return (
        <div className="flex flex-1 py-8 overflow-x-auto md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex gap-24 md:gap-34'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className='flex gap-4'>

                        <CreateArtisan />
                    </div>
                </div>
                <span>Filter by:</span>
                <div className='flex my-4 gap-4'>
                    <Badge
                        variant='secondary'
                        onClick={handleToggle}
                        className={`${activeFilter.status ? 'bg-slate-900 text-blue-500' : ''}  cursor-pointer py-0 pb-0.5 text-center justify-center`}
                    >
                        active
                    </Badge>
                    {/* <Badge
                        variant='secondary'
                        onClick={handleToggle}
                        className={`${activeFilter.status ? 'bg-slate-800 text-white' : ''} cursor-pointer py-0 pb-0.5 text-center justify-center`}
                    >
                        inactive
                    </Badge> */}
                </div>
                <Table className='w-full min-w-full'>
                    <ArtisansHeader />
                    <Suspense fallback={<ActivitiesLoader />}>
                        <ArtisansTableBody
                            filteredData={finalFilteredData}
                        />
                    </Suspense>
                </Table>
            </div>
        </div>
    )
};

export default ArtisansTable