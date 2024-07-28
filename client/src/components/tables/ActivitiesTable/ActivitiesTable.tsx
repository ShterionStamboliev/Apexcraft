import { Table } from '@/components/ui/table'
import ActivitiesHeader from './ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader'
import CreateActivity from '@/components/forms/activities-form/ActivityFormCreate/CreateActivity'
import { Suspense, lazy, useState } from 'react'
import { useActivity } from '@/context/Activity/ActivityContext';
import { Activity } from '@/types/activity-types/activityTypes';
import ActivitiesLoader from '@/components/utils/SkeletonLoader/Activities/ActivitiesLoader';
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter';
import TableTopNavigation from '@/components/common/SearchBar/TableTopNavigation';

const ActivitiesTableBody = lazy(() => import('@/components/tables/ActivitiesTable/ActivitiesTableBody'));

const ActivitiesTable = () => {
    const { state } = useActivity();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const filteredData = useSearchFilter<Activity>(state.data, searchQuery);

    return (
        <div className="flex flex-1 py-8 overflow-x-auto md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <TableTopNavigation
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    Component={CreateActivity}
                />
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