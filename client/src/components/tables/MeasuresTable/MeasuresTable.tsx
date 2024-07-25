import { Table } from '@/components/ui/table'
import MeasuresHeader from './MeasuresTableElements/MeasuresHeader/MeasuresHeader'
import CreateMeasure from '@/components/forms/measures-form/MeasureFormCreate/CreateMeasure'
import { lazy, Suspense, useState } from 'react'
import { useMeasure } from '@/context/Measure/MeasureContext'
import { Measure } from '@/types/measure-types/measureTypes'
import SearchBar from '@/components/common/SearchBar/SearchBar'
import MeasuresLoader from '@/components/utils/SkeletonLoader/Measures/MeasuresLoader'
import useSearchFilter from '@/components/hooks/custom-hooks/useSearchFilter'

const MeasuresTableBody = lazy(() => import('@/components/tables/MeasuresTable/MeasuresTableBody'))

const MeasuresTable = () => {
    const { state } = useMeasure();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const filteredData = useSearchFilter<Measure>(state.data, searchQuery);

    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <div className='flex gap-24 md:gap-34'>
                    <SearchBar
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    <div className='flex gap-4'>
                        <CreateMeasure />
                    </div>
                </div>
                <Table className='w-full min-w-full'>
                    <MeasuresHeader />
                    <Suspense fallback={<MeasuresLoader />}>
                        <MeasuresTableBody
                            filteredData={filteredData}
                        />
                    </Suspense>
                </Table>
            </div>
        </div>
    );
};

export default MeasuresTable;