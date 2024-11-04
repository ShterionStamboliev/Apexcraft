import { Measure } from '@/types/measure-types/measureTypes';
import { apiCall } from '../apiCall';

const useMeasuresApi = () => {
    const createMeasure = async (measureData: Measure): Promise<void> => {
        const data = await apiCall('/measures/create', 'POST', measureData);
        return data;
    };

    const editMeasure = async (measureId: string, measureData: Measure): Promise<void> => {
        return await apiCall(`/measures/${measureId}/edit`, 'PUT', measureData);
    };

    return {
        createMeasure,
        editMeasure,
    }
}

export default useMeasuresApi;