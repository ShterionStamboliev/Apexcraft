import { Measure } from '@/types/measure-types/measureTypes';
import { apiCall } from './apiCall';

const useMeasuresApi = () => {
    const getMeasures = async (): Promise<Measure[]> => {
        const data: Measure[] = await apiCall('/measures', 'GET');
        return data;
    };

    return {
        getMeasures,
    }
}

export default useMeasuresApi;