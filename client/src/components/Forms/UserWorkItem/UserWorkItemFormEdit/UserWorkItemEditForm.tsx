import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import TaskItemStatusSelector from '@/components/common/FormElements/TaskItemStatusSelector';
import { useWorkItemFormHooks } from '@/hooks/forms/useWorkItemForm';
import { WorkItem, WorkItemSchema } from '@/types/task-types/workItemType';
import { FormProvider } from 'react-hook-form';

type UserWorkItemEditFormProps = {
    workItem: WorkItem;
    handleSubmit: (data: WorkItemSchema) => void;
    isPending: boolean;
};

const UserWorkItemEditForm = ({
    workItem,
    handleSubmit,
    isPending,
}: UserWorkItemEditFormProps) => {
    const { useEditWorkItemForm } = useWorkItemFormHooks();

    const form = useEditWorkItemForm(workItem);
    return (
        <FormProvider {...form}>
            <form
                id='user-work-item-edit'
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <div className='flex flex-col gap-2'>
                    <FormFieldInput
                        name='name'
                        label='Item title'
                        type='text'
                    />
                    <FormFieldInput
                        name='finished_work'
                        label='Finished work'
                        type='text'
                    />
                    <FormTextareaInput
                        name='note'
                        label='Item note'
                        type='text'
                    />
                </div>
                <div className='flex flex-col pt-4 sm:flex-row sm:flex-1 sm:justify-between'>
                    <FormDatePicker
                        name='start_date'
                        label='Select a start date'
                    />
                    <FormDatePicker
                        name='end_date'
                        label='Select an end date'
                    />
                </div>
                <TaskItemStatusSelector
                    name='status'
                    label='Select status'
                    defaultVal={`${workItem.status}`}
                />
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    label='Submit changes'
                    formName='user-work-item-edit'
                    className='mt-6'
                />
            </form>
        </FormProvider>
    );
};

export default UserWorkItemEditForm;
