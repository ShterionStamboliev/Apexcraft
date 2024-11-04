import useToastHook from '@/components/hooks/custom-hooks/useToastHook'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserSchema } from '@/components/models/user/newUserSchema';
import React from 'react';
import { User } from '@/types/user-types/userTypes';
import { createEntity, editEntity,  } from '../apiCall';

type DialogStateAction = {
    userId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useUsersQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const useCreateUser = ({ setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (userData: UserSchema) => createEntity<User>('/users/create', userData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['users']
                });
                fireSuccessToast('User created successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        });
    };

    const useEditUser = ({ userId, setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (userData: UserSchema) => editEntity<User>(`/users/${userId}/edit`, userData),
            onSuccess: () => {
                client.invalidateQueries({
                    queryKey: ['users']
                });
                fireSuccessToast('User updated successfully!');
                setIsOpen(false);
            },
            onError: () => {
                fireErrorToast('Something went wrong. Please try again.');
            }
        })
    };

    return {
        useCreateUser,
        useEditUser,
    }
};

export default useUsersQuery;