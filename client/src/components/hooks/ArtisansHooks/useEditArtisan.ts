import useToastHook from '../custom-hooks/useToastHook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Artisan } from '@/types/artisan-types/artisanTypes';
import { useArtisan } from '@/context/Artisan/ArtisanContext';
import { newArtisanSchema } from '@/components/models/artisan/newArtisanSchema';

const useEditArtisan = (artisan: Artisan, onSuccess?: () => void) => {
    const { editEntity, isLoading } = useArtisan();
    const { fireToast } = useToastHook();

    const form = useForm<Artisan>({
        defaultValues: artisan && {
            ...artisan,
            company: artisan.company
        },
        resolver: zodResolver(newArtisanSchema)
    });

    const { reset } = form;

    const onSubmit = async (data: Artisan) => {
        try {
            if (artisan?.id) {
                const isEditSuccess = await editEntity(artisan.id, data);
                if (isEditSuccess && onSuccess) {
                    onSuccess();
                    reset();
                    fireToast({
                        title: 'Edit successful',
                        variant: 'success',
                    });
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                fireToast({
                    title: error.message,
                    variant: 'destructive',
                });
            }
        }
    };

    return {
        form,
        isLoading,
        onSubmit
    };
};

export default useEditArtisan;