import { FormProvider, useForm } from 'react-hook-form';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import { Activity } from '@/types/activity-types/activityTypes';
import DialogHeader from '@/components/common/DialogElements/DialogHeader';
import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import StatusSelector from '@/components/common/FormElements/FormStatusSelector';
import useActivitiesQuery from '@/components/api/activities/activitiesQuery';
import { ActivitySchema, newActivitySchema } from '@/components/models/activity/newActivitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import DialogTriggerButtonEdit from '@/components/common/DialogElements/DialogTriggerButtonEdit';
import useDialogState from '@/components/hooks/custom-hooks/useDialogState';

type ActivityFormProps = {
    activityId: string;
    activity: Activity;
}

const EditActivityForm = ({ activity, activityId }: ActivityFormProps) => {
    const { isOpen, setIsOpen } = useDialogState();

    const { useEditActivity } = useActivitiesQuery();

    const { mutate, isPending } = useEditActivity({ activityId, setIsOpen });

    const form = useForm<ActivitySchema>({
        resolver: zodResolver(newActivitySchema),
        defaultValues: {
            name: activity.name,
            status: activity.status,
        },
        mode: 'onChange'
    });

    const handleSubmit = (activityData: ActivitySchema) => {
        mutate(activityData);
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
        >
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
    )
}

export default EditActivityForm