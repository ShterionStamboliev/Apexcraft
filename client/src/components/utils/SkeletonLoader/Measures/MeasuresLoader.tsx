import { Measure } from '@/types/measure-types/measureTypes'
import { Table, TableBody } from "../../../ui/table"
import MeasuresSkeleton from './MeasuresSkeleton'
import MeasuresHeader from '@/components/tables/MeasuresTable/MeasuresTableElements/MeasuresHeader/MeasuresHeader';

type MeasureProps = {
    measures: Measure[] | undefined;
}

const MeasuresLoader = ({ measures }: MeasureProps) => {
    const companiesCount = measures ? measures.length : 10;

    return (
        <Table className='w-full min-w-full'>
            <MeasuresHeader />
            <TableBody>
                {
                    Array.from({ length: companiesCount }).map((_, i) => (
                        <MeasuresSkeleton key={i} />
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default MeasuresLoader