import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { useMeasure } from '@/context/Measure/MeasureContext';
import { Measure } from '@/types/measure-types/measureTypes';

const useMeasureEntityHandlers = () => {
    const {
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    } = useMeasure();

    return useEntityHandlers<Measure>({
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    });
}

export default useMeasureEntityHandlers