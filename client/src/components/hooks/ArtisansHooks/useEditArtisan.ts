import { Artisan } from '@/types/artisan-types/artisanTypes';
import { useArtisan } from '@/context/Artisan/ArtisanContext';
import { newArtisanSchema } from '@/components/models/artisan/newArtisanSchema';
import useEditEntity from '../custom-hooks/useEditEntityHandler';

const useEditArtisan = (artisan: Artisan, onSuccess?: () => void) => {
    return useEditEntity<Artisan>({
        entity: artisan,
        initialFormState: { ...artisan },
        schema: newArtisanSchema,
        useEntityContext: useArtisan,
        onSuccess,
    });
};

export default useEditArtisan;