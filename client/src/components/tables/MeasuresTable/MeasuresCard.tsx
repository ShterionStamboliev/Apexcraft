import EditMeasureForm from '@/components/forms/measures-form/MeasureFormEdit/EditMeasure';
import { TableCell, TableRow } from '@/components/ui/table';
import { Measure } from '@/types/measure-types/measureTypes'

type MeasuresCardProps = {
    measures: Measure[];
}

const MeasuresCard = ({ measures }: MeasuresCardProps) => {
    return (
        <>
            {
                measures.map((measure) => (
                    <TableRow key={measure.id}>
                        <TableCell>
                            {measure.name}
                        </TableCell>
                        <TableCell className='text-end w-[200px]'>
                            <EditMeasureForm
                                measure={measure}
                                measureId={measure.id!}
                            />
                        </TableCell>
                    </TableRow>
                ))
            }
        </>
    )
}

export default MeasuresCard