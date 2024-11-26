import { FormProvider } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { Activity } from '@/types/activity-types/activityTypes';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import {
    activitySchema,
    ActivitySchema,
} from '@/models/activity/activitySchema';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/hooks/useDialogState';
import { Activity as ActivityIcon } from 'lucide-react';
import { useSubmitHandler } from '@/utils/helpers/submitHandler';
import { useMutationHook } from '@/hooks/useMutationHook';
import { useEditActivityForm } from '@/hooks/entityHooks/useActivityForm';

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

    const form = useEditActivityForm(activity);

    const handleSubmit = useSubmitHandler(mutate, activitySchema);

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
                                defaultVal={activity.status}
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
