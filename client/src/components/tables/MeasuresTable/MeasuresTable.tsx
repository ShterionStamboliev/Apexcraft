import { Table } from '@/components/ui/table'
import MeasuresHeader from './MeasuresTableElements/MeasuresHeader/MeasuresHeader'
import MeasuresTableBody from './MeasuresTableBody'

const MeasuresTable = () => {
    return (
        <div className="flex flex-1 gap-2 py-8 overflow-x-auto md:px-0">

            <div className='flex-1 overflow-x-auto'>

                <Table className='w-full min-w-full'>
                    <MeasuresHeader />

                    <MeasuresTableBody />
                </Table>
            </div>
        </div>
    )
}

export default MeasuresTable