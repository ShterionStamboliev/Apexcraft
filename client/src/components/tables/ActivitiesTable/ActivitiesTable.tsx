import { Table } from '@/components/ui/table'
import ActivitiesHeader from './ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader'
import CreateActivity from '@/components/forms/activities-form/ActivityFormCreate/CreateActivity'
import { Suspense, lazy, useEffect, useState } from 'react'
import { useActivity } from '@/context/Activity/ActivityContext';
import { Activity } from '@/types/activity-types/activityTypes';
import FilterDropdown from '@/components/common/Filter/FilterDropdown';
import SearchBar from '@/components/common/SearchBar/SearchBar';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';

const ActivitiesTableBody = lazy(() => import('@/components/tables/ActivitiesTable/ActivitiesTableBody'));

const ActivitiesTable = () => {
    const { state } = useActivity();
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [filteredData, setFilteredData] = useState<Activity[]>(state.activity);

    useEffect(() => {
        const fetchSearchResults = () => {
            if (searchQuery.trim() === '') {
                setFilteredData(state.activity);
                return;
            }
            const filterData = state.activity.filter((value) => {
                return value.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            });
            setFilteredData(filterData);
        }
        fetchSearchResults();

    }, [searchQuery, state.activity]);
    
    return (
        <div className="flex flex-1 gap-2 py-8 overflow-x-auto md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex gap-24 md:gap-34'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className='flex gap-4'>
                        <FilterDropdown />
                        <CreateActivity />
                    </div>
                </div>
                <Table className='w-full min-w-full'>
                    <ActivitiesHeader />

                    <Suspense fallback={<ActivitiesLoader />}>
                        <ActivitiesTableBody
                            filteredData={filteredData}
                        />
                    </Suspense>
                </Table>
            </div>
        </div>
    )
};

export default ActivitiesTable