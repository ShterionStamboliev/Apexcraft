import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import MeasuresLoader from '@/components/utils/SkeletonLoader/Measures/MeasuresLoader';
import useMeasuresQuery from '@/components/api/measures/measuresQuery';
import EditMeasureForm from '@/components/forms/measures-form/MeasureFormEdit/EditMeasure';
import { CircleAlert, Ruler } from 'lucide-react';
import ErrorMessage from '@/components/common/FormMessages/ErrorMessage';
import NoResultsFound from '@/components/common/FormMessages/NoResultsFound';

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
        <TableBody>
            {measures?.length === 0 ? (
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
                )))
            }
        </TableBody>
    )
}

export default MeasuresTableBody