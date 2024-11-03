import { Artisan, PaginatedArtisans } from '@/types/artisan-types/artisanTypes';
import { apiCall } from '../apiCall';

const useArtisansApi = () => {
    const createArtisan = async (artisanData: Artisan): Promise<Artisan> => {
        const data: Artisan = await apiCall('/artisans/create', 'POST', artisanData);
        return data;
    };

    const getArtisans = async (): Promise<PaginatedArtisans> => {
        const data: PaginatedArtisans = await apiCall('/artisans', 'GET');
        return data;
    };

    const getPaginatedArtisans = async (page: number, limit: number): Promise<PaginatedArtisans> => {
        const data: PaginatedArtisans = await apiCall(`/artisans?_page=${page}&_limit=${limit}`, 'GET');
        return data;
    };

    const editArtisan = async (artisanId: string, artisanData: Artisan): Promise<void> => {
        return await apiCall(`/artisans/${artisanId}/edit`, 'PUT', artisanData);
    };

    return {
        getArtisans,
        getPaginatedArtisans,
        createArtisan,
        editArtisan
    }
}

export default useArtisansApi;