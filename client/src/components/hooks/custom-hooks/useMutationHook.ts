import { QueryKey, useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import useToastHook from './useToastHook';
import { createEntity } from '@/components/api/apiCall';

type DialogStateAction = {
    URL: string,
    queryKey: QueryKey,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMutationHook = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const client = useQueryClient();

    const useCreateNewEntity = <TData>({
        URL,
        queryKey,
        setIsOpen
    }: DialogStateAction
    ): UseMutationResult<void, Error, TData, unknown> => {
        return useMutation({
            mutationFn: (entityData: TData) => createEntity<TData>(URL, entityData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: queryKey
                });
                fireSuccessToast('Measure created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    return {
        useCreateNewEntity
    }
}