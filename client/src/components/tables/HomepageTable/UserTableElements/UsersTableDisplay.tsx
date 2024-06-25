import TableLoadingPage from '@/components/utils/UsersTableLoader/TableLoadingPage'
import { Suspense, lazy } from 'react'

const TableLazyComponent = lazy(() => import('./UsersTableBody'))

const UsersTableDisplay = () => {
    return (
        <Suspense fallback={<TableLoadingPage />}>
            <TableLazyComponent />
        </Suspense>
    )
}

export default UsersTableDisplay