import { TableHead, TableHeader, TableRow } from '@/components/ui/table'

const MeasuresHeader = () => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className='text-center'>
                    Measure
                </TableHead>
                <TableHead className='text-center'>
                    Options
                </TableHead>
            </TableRow>
        </TableHeader>
    )
}

export default MeasuresHeader