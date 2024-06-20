import { Table } from '@/components/ui/table'
import ActivitiesHeader from './ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader'
import ActivitiesTableBody from './ActivitiesTableBody'

const ActivitiesTable = () => {
    return (
        <div className="flex flex-1 gap-2 py-8 overflow-x-auto md:px-0">

            <div className='flex-1 overflow-x-auto'>

                <Table className='w-full min-w-full'>
                    <ActivitiesHeader />

                    <ActivitiesTableBody />
                </Table>
            </div>
        </div>
    )
}

export default ActivitiesTable