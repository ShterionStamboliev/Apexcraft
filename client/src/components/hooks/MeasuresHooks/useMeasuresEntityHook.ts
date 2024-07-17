import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { useMeasure } from '@/context/Measure/MeasureContext';
import { Measure } from '@/types/measure-types/measureTypes';

const useMeasureEntityHandlers = () => {
    const {
        createEntity: createMeasure,
        getEntity: getMeasure,
        getEntities: getMeasures,
        deactivateEntity: deactivateMeasure,
        isLoading,
    } = useMeasure();

    return useEntityHandlers<Measure>({
        createEntity: createMeasure,
        getEntity: getMeasure,
        getEntities: getMeasures,
        deactivateEntity: deactivateMeasure,
        isLoading,
    });
}

export default useMeasureEntityHandlers