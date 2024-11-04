import { Artisan } from '@/types/artisan-types/artisanTypes';
import { apiCall } from '../apiCall';

const useArtisansApi = () => {
    const createArtisan = async (artisanData: Artisan): Promise<Artisan> => {
        const data: Artisan = await apiCall('/artisans/create', 'POST', artisanData);
        return data;
    };

    const editArtisan = async (artisanId: string, artisanData: Artisan): Promise<void> => {
        return await apiCall(`/artisans/${artisanId}/edit`, 'PUT', artisanData);
    };

    return {
        createArtisan,
        editArtisan
    }
}

export default useArtisansApi;