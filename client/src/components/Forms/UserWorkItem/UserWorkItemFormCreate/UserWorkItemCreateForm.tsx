import DialogFooter from '@/components/common/DialogElements/DialogFooter';
import FormDatePicker from '@/components/common/FormElements/FormDatePicker';
import FormFieldInput from '@/components/common/FormElements/FormFieldInput';
import FormTextareaInput from '@/components/common/FormElements/FormTextareaInput';
import TaskItemStatusSelector from '@/components/common/FormElements/TaskItemStatusSelector';
import { useWorkItemFormHooks } from '@/hooks/forms/useWorkItemForm';
import { WorkItemSchema } from '@/models/workItem/workItemSchema';
import { FormProvider } from 'react-hook-form';

type UserWorkItemCreateFormProps = {
    handleSubmit: (workItemData: WorkItemSchema) => void;
    isPending: boolean;
};

const UserWorkItemCreateForm = ({
    handleSubmit,
    isPending,
}: UserWorkItemCreateFormProps) => {
    const { useCreateWorkItemForm } = useWorkItemFormHooks();

    const form = useCreateWorkItemForm();

    return (
        <FormProvider {...form}>
            <form id='task-item' onSubmit={form.handleSubmit(handleSubmit)}>
                <FormFieldInput
                    className='p-0'
                    label='Task name'
                    name='name'
                    type='text'
                />
                <FormFieldInput
                    label='Finished work'
                    name='finished_work'
                    type='text'
                />
                <FormTextareaInput label='Note' name='note' type='text' />
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
                    label='Status'
                    name='status'
                    defaultVal=''
                />
                <DialogFooter
                    disabled={!form.formState.isDirty || isPending}
                    className='mt-6'
                    formName='task-item'
                    label='Submit'
                />
            </form>
        </FormProvider>
    );
};

export default UserWorkItemCreateForm;
