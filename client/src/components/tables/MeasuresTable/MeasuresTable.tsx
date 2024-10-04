import { Table } from '@/components/ui/table'
import MeasuresHeader from './MeasuresTableElements/MeasuresHeader/MeasuresHeader'
import CreateMeasure from '@/components/forms/measures-form/MeasureFormCreate/CreateMeasure'
import MeasuresTableBody from '@/components/tables/MeasuresTable/MeasuresTableBody'

const MeasuresTable = () => {
    return (
        <div className="relative flex flex-col flex-1 py-8 overflow-x-auto md:px-0 md:flex-row">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <CreateMeasure />
                <Table className='w-full min-w-full'>
                    <MeasuresHeader />
                    <MeasuresTableBody />
                </Table>
            </div>
        </div>
    );
};

export default MeasuresTable;