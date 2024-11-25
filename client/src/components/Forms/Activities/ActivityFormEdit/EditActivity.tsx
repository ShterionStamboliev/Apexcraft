import { FormProvider, useForm } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { Activity } from '@/types/activity-types/activityTypes';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import {
    ActivitySchema,
    newActivitySchema,
} from '@/models/activity/newActivitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/hooks/custom-hooks/useDialogState';
import { useMutationHook } from '@/hooks/custom-hooks/useMutationHook';
import { Activity as ActivityIcon } from 'lucide-react';

type ActivityFormProps = {
    activityId: string;
    activity: Activity;
};

const EditActivityForm = ({ activity, activityId }: ActivityFormProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditEntity } = useMutationHook();

    const { mutate, isPending } = useEditEntity<ActivitySchema>({
        URL: `/activities/${activityId}/edit`,
        queryKey: ['activities'],
        successToast: 'Activity updated successfully!',
        setIsOpen,
    });

    const form = useForm<ActivitySchema>({
        resolver: zodResolver(newActivitySchema),
        defaultValues: {
            name: activity.name,
            status: activity.status,
        },
        mode: 'onChange',
    });

    const handleSubmit = (activityData: ActivitySchema) => {
        mutate(activityData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTriggerButtonEdit />
            <DialogContent className='max-w-[400px] rounded-md sm:max-w-[425px]'>
                <DialogHeader title='Edit activity' />
                <FormProvider {...form}>
                    <form
                        id='form-edit'
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <FormFieldInput
                            type='text'
                            label='Activity name'
                            name='name'
                            className='pl-10'
                            Icon={ActivityIcon}
                        />
                        <div className='flex flex-1 pt-2 justify-between'>
                            <StatusSelector
                                label='Status'
                                name='status'
                                defaultVal={`${activity.status}`}
                            />
                        </div>
                        <DialogFooter
                            disabled={!form.formState.isDirty || isPending}
                            label='Submit changes'
                            formName='form-edit'
                            className='mt-6'
                        />
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default EditActivityForm;
