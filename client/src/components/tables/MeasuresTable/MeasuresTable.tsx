import { Table } from '@/components/ui/table'
import MeasuresHeader from './MeasuresTableElements/MeasuresHeader/MeasuresHeader'
import MeasuresTableBody from './MeasuresTableBody'
import CreateMeasure from '@/components/forms/measures-form/MeasureFormCreate/CreateMeasure'

const MeasuresTable = () => {
    return (
        <div className="flex flex-1 gap-2 py-8 overflow-x-auto md:px-0">

            <CreateMeasure />
            <div className='flex-1 pr-12 overflow-x-auto'>

                <Table className='w-full min-w-full'>
                    <MeasuresHeader />

                    <MeasuresTableBody />
                </Table>
            </div>
        </div>
    )
}

export default MeasuresTable