import { QueryKey, useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { createEntity, editEntity } from '@/api/apiCall';
import useToastHook from './useToastHook';

interface MutationEntityStateActions {
    URL: string,
    queryKey: QueryKey,
    successToast: string,
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMutationHook = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const client = useQueryClient();

    const useCreateNewEntity = <TData>({
        URL,
        queryKey,
        successToast,
        setIsOpen
    }: MutationEntityStateActions
    ): UseMutationResult<void, Error, TData, unknown> => {
        return useMutation({
            mutationFn: (entityData: TData) => createEntity<TData>(URL, entityData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: queryKey
                });
                fireSuccessToast(successToast);
                setIsOpen && setIsOpen(false)
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const useEditEntity = <TData>({
        URL,
        queryKey,
        successToast,
        setIsOpen,
    }: MutationEntityStateActions
    ): UseMutationResult<void, Error, TData, unknown> => {
        return useMutation({
            mutationFn: (entityData: TData) => editEntity<TData>(URL, entityData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: queryKey
                });
                fireSuccessToast(successToast);
                setIsOpen && setIsOpen(false)
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    return {
        useCreateNewEntity,
        useEditEntity
    }
}