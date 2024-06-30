import { useUser } from '@/context/User/UserContext';
import { UserFormType } from '@/types/user-types/userTypes';
import useToastHook from '../custom-hooks/useToastHook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues, formSchema } from '@/components/models/user/editUserSchema';

const useEditUserForm = (user: UserFormType, onSuccess?: () => void) => {
    const { editUser, isLoading } = useUser();
    const { fireToast } = useToastHook();

    const form = useForm<FormValues>({
        defaultValues: user && {
            username: user.username,
            name_and_family: user.name_and_family,
            password: '*******',
            role: user.role,
            status: user.status,
        },
        resolver: zodResolver(formSchema)
    });

    const { reset } = form;

    const onSubmit = async (data: FormValues) => {
        try {
            if (user?.id) {
                const isEditSuccess = await editUser(user.id, data);
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

export default useEditUserForm;