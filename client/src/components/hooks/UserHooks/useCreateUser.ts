import { useEffect, useState } from 'react';
import { User } from '@/types/user-types/userTypes';
import useToastHook from '../custom-hooks/useToastHook';
import { useUser } from '@/context/User/UserContext';

const useCreateUser = () => {
    const { createUser, isLoading } = useUser();
    const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false);
    const { fireToast } = useToastHook();

    const handleCreateUser = async (userData: User) => {
        try {
            const isCreateSuccessful = await createUser(userData);
            if (isCreateSuccessful) {
                setIsCreateSuccess(true);
                fireToast({
                    title: 'Записът беше успешен',
                    variant: 'success',
                });
            } else {
                fireToast({
                    title: 'Съществува потребител с избраното име',
                    variant: 'destructive',
                });
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

    useEffect(() => {
        if (isCreateSuccess) {
            setIsCreateSuccess(false);
        }
    }, [isCreateSuccess]);

    return {
        handleCreateUser,
        isLoading,
        isCreateSuccess
    };
};

export default useCreateUser;