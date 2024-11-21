import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import MeasuresLoader from '@/components/utils/SkeletonLoader/Measures/MeasuresLoader';
import { CircleAlert, Ruler } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import MeasuresCard from './MeasuresCard';
import MeasuresHeader from './MeasuresTableElements/MeasuresHeader/MeasuresHeader';
import { useFetchDataQuery } from '@/components/hooks/custom-hooks/useQueryHook';
import { Measure } from '@/types/measure-types/measureTypes';

const MeasuresTableBody = () => {
    const { data: measures, isPending, isError } = useFetchDataQuery<Measure[]>({
        URL: '/measures',
        queryKey: ['measures']
    });

    if (isPending) {
        return <MeasuresLoader measures={measures} />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            Icon={CircleAlert}
        />
    };

    return (
        <Table className='w-full min-w-full'>
            <MeasuresHeader />
            <TableBody>
                {
                    measures?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={2} className='text-center text-3xl'>
                                <NoResultsFound
                                    title='No measures found'
                                    description="It looks like you haven't added any measures yet."
                                    Icon={Ruler}
                                />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <MeasuresCard
                            measures={measures}
                        />
                    )
                }
            </TableBody>
        </Table>
    )
}

export default MeasuresTableBody