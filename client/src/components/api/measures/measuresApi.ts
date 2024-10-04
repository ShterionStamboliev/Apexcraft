import { Measure } from '@/types/measure-types/measureTypes';
import { apiCall } from '../apiCall';

const useMeasuresApi = () => {
    const createMeasure = async (measureData: Measure): Promise<void> => {
        const data = await apiCall('/measures/create', 'POST', measureData);
        return data;
    };

    const getMeasures = async (): Promise<Measure[]> => {
        const data: Measure[] = await apiCall('/measures', 'GET');
        return data;
    };

    const editMeasure = async (measureId: string, measureData: Measure): Promise<void> => {
        return await apiCall(`/measures/${measureId}/edit`, 'PUT', measureData);
    };

    return {
        getMeasures,
        createMeasure,
        editMeasure,
    }
}

export default useMeasuresApi;