import { useArtisan } from '@/context/Artisan/ArtisanContext';
import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { Artisan } from '@/types/artisan-types/artisanTypes';

const useArtisanEntityHandlers = () => {
    const {
        createEntity: createArtisan,
        getEntity: getArtisan,
        getEntities: getArtisans,
        deactivateEntity: deactivateArtisan,
        isLoading,
    } = useArtisan();

    return useEntityHandlers<Artisan>({
        createEntity: createArtisan,
        getEntity: getArtisan,
        getEntities: getArtisans,
        deactivateEntity: deactivateArtisan,
        isLoading,
    });
}

export default useArtisanEntityHandlers;