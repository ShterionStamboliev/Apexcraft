import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import MeasuresLoader from '@/components/utils/SkeletonLoader/Measures/MeasuresLoader';
import useMeasuresQuery from '@/components/api/measures/measuresQuery';
import { CircleAlert, Ruler } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';
import MeasuresCard from './MeasuresCard';
import MeasuresHeader from './MeasuresTableElements/MeasuresHeader/MeasuresHeader';

const MeasuresTableBody = () => {
    const { useGetMeasures } = useMeasuresQuery();
    const { data: measures, isPending, isError, error } = useGetMeasures();

    if (isPending) {
        return <MeasuresLoader />
    };

    if (isError) {
        return <ErrorMessage
            title='Oops...'
            error={`${error.message}. Please try again.`}
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