import { Table } from '@/components/ui/table'
import ActivitiesHeader from './ActivitiesTableElements/ActivitiesHeader/ActivitiesHeader'
import CreateActivity from '@/components/forms/activities-form/ActivityFormCreate/CreateActivity'
import { Suspense, lazy } from 'react'
import TableLoadingPage from '@/components/utils/UsersTableLoader/TableLoadingPage'

const ActivitiesTableBody = lazy(() => import('@/components/tables/ActivitiesTable/ActivitiesTableBody'));

const ActivitiesTable = () => {
    return (
        <div className="flex flex-1 gap-2 py-8 overflow-x-auto md:px-0">

            <CreateActivity />
            <div className='flex-1 overflow-x-auto'>

                <Table className='w-full min-w-full'>
                    <ActivitiesHeader />

                    <Suspense fallback={<TableLoadingPage />}>
                        <ActivitiesTableBody />
                    </Suspense>
                </Table>
            </div>
        </div>
    )
};

export default ActivitiesTable