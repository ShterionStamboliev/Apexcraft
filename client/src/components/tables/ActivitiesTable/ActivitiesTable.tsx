import { Table } from '@/components/ui/table'
import ActivitiesHeader from './ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader'
import CreateActivity from '@/components/forms/activities-form/ActivityFormCreate/CreateActivity'
import ActivitiesTableBody from './ActivitiesTableBody';

const ActivitiesTable = () => {

    return (
        <div className="flex flex-1 py-8 overflow-x-auto md:px-0">
            <div className='flex-1 pr-7 overflow-x-auto'>
                <CreateActivity />
                <Table className='w-full min-w-full'>
                    <ActivitiesHeader />
                    <ActivitiesTableBody />
                </Table>
            </div>
        </div>
    )
};

export default ActivitiesTable