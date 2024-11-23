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
        <div className="flex flex-col flex-1 py-8">
            <div className='flex flex-col flex-1 py-12 items-center md:px-0'>
                <div className='flex flex-col-reverse md:flex-col-reverse lg:flex-row gap-4 w-full mb-4 justify-center'>
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
                </div>
            </div>
        </div>
    )
}

export default MeasuresLoader