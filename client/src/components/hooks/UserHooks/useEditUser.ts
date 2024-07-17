import { useUser } from '@/context/User/UserContext';
import { UserFormType } from '@/types/user-types/userTypes';
import useToastHook from '../custom-hooks/useToastHook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/components/models/user/editUserSchema';

const useEditUser = (user: UserFormType, onSuccess?: () => void) => {
    const { editEntity, isLoading } = useUser();
    const { fireToast } = useToastHook();

    const form = useForm<UserFormType>({
        defaultValues: user && {
            ...user,
            password: '*******'
        },
        resolver: zodResolver(formSchema)
    });

    const { reset } = form;

    const onSubmit = async (data: UserFormType) => {
        try {
            if (user?.id) {
                const isEditSuccess = await editEntity(user.id, data);
                if (isEditSuccess && onSuccess) {
                    onSuccess();
                    reset();
                    fireToast({
                        title: 'Редакцията беше успешна',
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

export default useEditUser;