import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

const ActivitiesHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='text-right'>
                    Activity
                </TableHead>
                <TableHead className='text-center'>
                    Measures
                </TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default ActivitiesHeader