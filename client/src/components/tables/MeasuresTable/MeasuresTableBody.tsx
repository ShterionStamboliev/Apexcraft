import { Button } from '@/components/ui/button'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { measures } from './measureDummyData'

const MeasuresTableBody = () => {
    
    return (
        <TableBody>
            {measures.map((measure, index) => (
                <TableRow key={index}>
                    <TableCell className='text-center'>
                        {measure.measure}
                    </TableCell>
                    <TableCell className='text-center'>
                        {measure.value}
                    </TableCell>
                    <TableCell className="text-center w-[300px]">
                        <Button variant={'outline'} className='mr-2'>
                            Edit
                        </Button>
                        <Button variant={'outline'}>
                            Deactivate
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default MeasuresTableBody