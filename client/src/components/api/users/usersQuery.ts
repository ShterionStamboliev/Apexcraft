import useToastHook from '@/components/hooks/custom-hooks/useToastHook'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useUsersApi from './usersApi';
import { UserSchema } from '@/components/models/user/newUserSchema';
import React from 'react';

type DialogStateAction = {
    userId?: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useUsersQuery = () => {
    const { fireSuccessToast, fireErrorToast } = useToastHook();

    const { createUser, getPaginatedUsers, editUser } = useUsersApi();

    const useGetUsers = (page: number, limit: number) => {
        return useQuery({
            queryKey: ['users', page],
            queryFn: () => getPaginatedUsers(page, limit),
            staleTime: 0
        });
    };

    const useCreateUser = ({ setIsOpen }: DialogStateAction) => {
        const client = useQueryClient();

        return useMutation({
            mutationFn: (userData: UserSchema) => createUser(userData),
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
            mutationFn: (userData: UserSchema) => editUser(userId!, userData),
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
        useGetUsers,
        useEditUser,
    }
};

export default useUsersQuery;