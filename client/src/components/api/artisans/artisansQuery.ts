import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useArtisansApi from './artisansApi';
import { Artisan } from '@/types/artisan-types/artisanTypes';

type DialogStateAction = {
    artisanId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useArtisansQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const { createArtisan, editArtisan, getArtisans } = useArtisansApi();

    const useCreateArtisan = ({ setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (artisanData: Artisan) => createArtisan(artisanData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['artisans']
                });
                fireSuccessToast('Artisan created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const useEditArtisan = ({ artisanId, setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (artisanData: Artisan) => editArtisan(artisanId!, artisanData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['artisans']
                });
                fireSuccessToast('Artisan updated successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        })
    };

    const useGetArtisans = () => {
        return useQuery({
            queryKey: ['artisans'],
            queryFn: getArtisans,
            staleTime: 0
        });
    };

    return {
        useCreateArtisan,
        useEditArtisan,
        useGetArtisans
    }
};

export default useArtisansQuery;