import useToastHook from '@/components/hooks/custom-hooks/useToastHook';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useArtisansApi from './artisansApi';
import { Artisan } from '@/types/artisan-types/artisanTypes';

type DialogStateAction = {
    artisanId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useArtisansQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const { createArtisan, editArtisan, getPaginatedArtisans } = useArtisansApi();

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

    const useGetArtisans = (page: number, limit: number) => {
        return useQuery({
            queryKey: ['artisans', page],
            queryFn: () => getPaginatedArtisans(page, limit),
            placeholderData: keepPreviousData
        });
    };

    return {
        useCreateArtisan,
        useEditArtisan,
        useGetArtisans
    }
};

export default useArtisansQuery;