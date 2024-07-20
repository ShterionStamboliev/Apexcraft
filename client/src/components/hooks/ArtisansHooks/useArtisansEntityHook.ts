import { useArtisan } from '@/context/Artisan/ArtisanContext';
import useEntityHandlers from '../custom-hooks/useEntityHandlers';
import { Artisan } from '@/types/artisan-types/artisanTypes';

const useArtisanEntityHandlers = () => {
    const {
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    } = useArtisan();

    return useEntityHandlers<Artisan>({
        createEntity,
        getEntity,
        getEntities,
        deactivateEntity,
        isLoading,
    });
}

export default useArtisanEntityHandlers;