import useToastHook from '../custom-hooks/useToastHook';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActivity } from '@/context/Activity/ActivityContext';
import { Activity } from '@/types/activity-types/activityTypes';
import { FormValues, formSchema } from '@/components/models/activity/editActivitySchema';

const useEditActivityForm = (activity: Activity, onSuccess?: () => void) => {
    const { editActivity, isLoading } = useActivity();
    const { fireToast } = useToastHook();

    const form = useForm<FormValues>({
        defaultValues: activity && {
            name: activity.name,
        },
        resolver: zodResolver(formSchema)
    });

    const { reset } = form;

    const onSubmit = async (data: FormValues) => {
        try {
            if (activity?.id) {
                const isEditSuccess = await editActivity(activity.id, data);
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

export default useEditActivityForm;