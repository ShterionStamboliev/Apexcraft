import { Measure } from '@/types/measure-types/measureTypes';
import { useMeasure } from '@/context/Measure/MeasureContext';
import { newMeasureSchema } from '@/components/models/measure/newMeasureSchema';
import useEditEntity from '../custom-hooks/useEditEntityHandler';

const useEditMeasure = (measure: Measure, onSuccess?: () => void) => {
    return useEditEntity<Measure>({
        entity: measure,
        initialFormState: { ...measure },
        schema: newMeasureSchema,
        useEntityContext: useMeasure,
        onSuccess,
    });
};

export default useEditMeasure;