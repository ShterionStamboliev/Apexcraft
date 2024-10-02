import { Artisan } from '@/types/artisan-types/artisanTypes';
import { apiCall } from './apiCall';

const useArtisanApi = () => {
    const fetchArtisans = async (): Promise<Artisan[]> => {
        const data: Artisan[] = await apiCall('/artisans', 'GET');
        return data;
    };

    return {
        fetchArtisans,
    }
}

export default useArtisanApi;